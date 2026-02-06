import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  width?: number;
  height?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  onLoad,
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const MAX_RETRIES = 3;

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    console.error('Image failed to load:', src);
    setHasError(true);
    
    // Retry loading the image
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setHasError(false);
      }, 1000 * (retryCount + 1)); // Exponential backoff
    }
  };

  // Force reload when retry count changes
  const imageSrc = retryCount > 0 ? `${src}?retry=${retryCount}` : src;

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Skeleton loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
      )}
      
      {/* Error state */}
      {hasError && retryCount >= MAX_RETRIES && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="text-center p-4">
            <svg className="w-12 h-12 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-slate-500">Image unavailable</p>
          </div>
        </div>
      )}
      
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          crossOrigin="anonymous"
          loading={loading}
        />
      )}
    </div>
  );
};
