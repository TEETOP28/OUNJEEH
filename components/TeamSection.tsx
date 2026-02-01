import React, { useMemo } from 'react';
import { useSupabaseImages } from '../hooks/useSupabaseImages';
import { OptimizedImage } from './OptimizedImage';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// Fallback data with local images
const fallbackTeamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/images/team/placeholder-1.jpg'
  },
  // Add more fallback members...
];

export const TeamSection: React.FC = () => {
  // Memoize fallback images to prevent re-creating array on every render
  const fallbackImages = useMemo(() => fallbackTeamMembers.map(m => m.image), []);
  
  // Fetch images from Supabase 'team' bucket
  const { images, loading, error } = useSupabaseImages({
    bucket: 'team-photos',
    folder: '', // optional subfolder
    fallbackImages
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        
        {loading && (
          <div className="text-center">
            <p className="text-gray-600">Loading team members...</p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <div key={image.name} className="text-center">
              <OptimizedImage
                src={image.url}
                alt={fallbackTeamMembers[index]?.name || 'Team member'}
                className="w-48 h-48 rounded-full mx-auto object-cover mb-4"
                width={192}
                height={192}
              />
              <h3 className="text-xl font-semibold">
                {fallbackTeamMembers[index]?.name || 'Team Member'}
              </h3>
              <p className="text-gray-600">
                {fallbackTeamMembers[index]?.role || 'Team'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
