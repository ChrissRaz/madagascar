'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, FileSignature, CheckCircle, ChartColumn } from 'lucide-react';
import type { Petition } from '@/lib/definitions';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { useAppContext } from '@/context/app-context';
import { SignPetitionDialog } from './sign-petition-dialog';
import { useState } from 'react';
import Link from 'next/link';
import { IdeaDialog } from './idea-dialog';
import { StatsDialog } from './statistics-dialog';

interface PetitionCardProps {
  petition: Petition;
}

export function PetitionCard({ petition }: PetitionCardProps) {
  const { signedPetitions, user } = useAppContext();
  const [signatures, setSignatures] = useState(petition.signatures);

  const image = getPlaceholderImage(petition.imageId);
  const hasSigned = signedPetitions.includes(petition._id);

  const handleSign = () => {
    setSignatures(s => s + 1);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] ">
          <Image
            src={petition.imageId}
            alt={petition.title}
            fill
            className="object-cover"
            data-ai-hint={petition.description}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <CardTitle className="font-headline text-xl mb-2 line-clamp-2">{petition.title}</CardTitle>
          <CardDescription className="line-clamp-3">{petition.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="flex items-center text-muted-foreground">
          <Users className="h-5 w-5 mr-2 text-primary" />
          <span className="font-bold text-foreground">{signatures.toLocaleString()}</span>
          <span className="ml-1.5">Sosokevitra voaray</span>
        </div>

        <div className="flex items-center text-muted-foreground mt-4">
          <span className="text-xs mr-1">Misokatra ny </span>

          <span className="text-xs  mr-1">{petition.startDate}</span>
          <span className="text-xs  mr-1">hatramin'ny</span>
          <span className="text-xs">{petition.endDate}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        
       <>
          <IdeaDialog petition={petition} onSign={handleSign}>
            <Button className="w-1/2 mr-2">
              <FileSignature className="mr-2 h-4 w-4" />
              Haneho hevitra aho
            </Button>

          </IdeaDialog>

          <StatsDialog petition={petition}>
            <Button className="w-1/3 ml-2" variant={"secondary"}>
              <ChartColumn className="mr-2 h-4 w-4" />
              Statistika
            </Button>
          </StatsDialog>
        </>

      </CardFooter>
    </Card>
  );
}
