import React, { useState, useEffect } from 'react';
import { fetchTeamMembers } from '../lib/imageUpload';
import { OptimizedImage } from './OptimizedImage';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  image_path: string;
}

export const TeamSection: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        const members = await fetchTeamMembers();
        console.log('✅ Fetched team members:', members);
        console.log('📸 Image URLs:', members.map(m => m.image_url));
        setTeamMembers(members);
      } catch (err) {
        setError('Failed to load team members');
        console.error('❌ Error loading team members:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-48 h-48 bg-slate-200 rounded-full mx-auto"></div>
                  <div className="h-6 bg-slate-200 rounded w-32 mx-auto"></div>
                  <div className="h-4 bg-slate-200 rounded w-24 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-demmy-green">
          Meet Our Team
        </h2>
        
        {teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg mb-4">No team members yet.</p>
            <p className="text-slate-500 text-sm">Upload team member photos from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative mb-4">
                  <OptimizedImage
                    src={member.image_url}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                    width={192}
                    height={192}
                  />
                </div>
                <h3 className="text-xl font-semibold text-demmy-green">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
