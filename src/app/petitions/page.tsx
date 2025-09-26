'use client';

import { useState, useEffect } from 'react';
import { PetitionCard } from '@/components/petition-card';
import type { Petition } from '@/lib/definitions';
import { MOCK_PETITIONS } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function PetitionsPage() {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setPetitions(MOCK_PETITIONS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Active Petitions</h1>
        <p className="text-muted-foreground mt-2">Join your fellow citizens in making a difference.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <Skeleton className="h-[180px] w-full rounded-md" />
              <div className="space-y-2 pt-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
               <div className="flex-grow"></div>
               <Skeleton className="h-10 w-full mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {petitions.map((petition) => (
            <PetitionCard key={petition.id} petition={petition} />
          ))}
        </div>
      )}
    </div>
  );
}
