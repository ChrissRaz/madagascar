'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/app-context';
import type { Petition } from '@/lib/definitions';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Loader2, Camera, Check } from 'lucide-react';

interface SignPetitionDialogProps {
  petition: Petition;
  children: React.ReactNode;
  onSign: () => void;
}

export function SignPetitionDialog({ petition, children, onSign }: SignPetitionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();
  const { signPetition } = useAppContext();
  const faceImage = getPlaceholderImage('face-verification-placeholder');

  const handleSign = async () => {
    setIsVerifying(true);
    // Simulate API call for face verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // On "success"
    setIsVerifying(false);
    setIsVerified(true);
    
    // Simulate signing process and show success
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    signPetition(petition.id);
    onSign(); // Update local card state
    toast({
      title: 'Petition Signed!',
      description: `Thank you for supporting "${petition.title}".`,
      className: 'bg-green-600 text-white border-green-600',
    });
    setOpen(false);
    
    // Reset state for next time
    setTimeout(() => {
        setIsVerified(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Verify Your Identity to Sign</DialogTitle>
          <DialogDescription>
            To ensure one signature per person, we use facial verification. Please look into your camera.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-dashed border-primary/50 flex items-center justify-center bg-muted">
            <Image
              src={faceImage.imageUrl}
              alt={faceImage.description}
              width={256}
              height={256}
              className="object-cover scale-110"
              data-ai-hint={faceImage.imageHint}
            />
            {isVerifying && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">Verifying...</p>
                </div>
            )}
            {isVerified && (
                <div className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center">
                    <Check className="h-16 w-16 text-white" />
                     <p className="mt-4 font-bold text-white">Verified!</p>
                </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="w-full"
            onClick={handleSign}
            disabled={isVerifying || isVerified}
            size="lg"
          >
            {isVerifying || isVerified ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Camera className="mr-2 h-4 w-4" />
            )}
            {isVerified ? 'Signing...' : isVerifying ? 'Verifying...' : 'Verify & Sign'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
