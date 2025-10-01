'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_PETITIONS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { FileSignature, CheckCircle, BarChart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, signedPetitions } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
        <div className="container py-12">
            <div className="mb-8">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-4 w-1/3 mt-4" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
            </div>
            <div>
                <Skeleton className="h-8 w-1/4 mb-4" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    );
  }
  
  const signedList = MOCK_PETITIONS.filter(p => signedPetitions.includes(p.id));

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Welcome, {user.name}</h1>
        <p className="text-muted-foreground mt-2">Here's a summary of your activity and impact.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Petitions Signed</CardTitle>
                <FileSignature className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{signedPetitions.length}</div>
                <p className="text-xs text-muted-foreground">out of {MOCK_PETITIONS.length} available</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex items-center">
                    Verified
                </div>
                <p className="text-xs text-muted-foreground">Facial identity confirmed</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Participation Rank</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Top 15%</div>
                <p className="text-xs text-muted-foreground">of all users on the platform (simulated)</p>
            </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Your Signed Petitions</h2>
        <Card>
            <CardContent className="p-0">
                <div className="divide-y">
                    {signedList.length > 0 ? (
                        signedList.map((petition) => (
                            <div key={petition._id} className="flex items-center p-4">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0"/>
                                <div className="flex-1">
                                    <p className="font-medium">{petition.title}</p>
                                    <p className="text-sm text-muted-foreground hidden sm:block">{petition.description}</p>
                                </div>
                                <Badge variant="outline" className="ml-4">Signed</Badge>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            You haven't signed any petitions yet.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
