'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Check } from 'lucide-react';
import { Petition } from '@/lib/definitions';

interface SignPetitionDialogProps {
  petition: Petition;
  children: React.ReactNode;
  onSign: () => void;
}

const regions = [
  "Analamanga","Vakinankaratra","Itasy","Bongolava","Diana","Sava","Sofia",
  "Boeny","Betsiboka","Melaky","Alaotra-Mangoro","Analanjirofo","Atsinanana",
  "Amoron'i Mania","Haute Matsiatra","Vatovavy","Fitovinany","Atsimo-Atsinanana",
  "Anosy","Androy","Atsimo-Andrefana","Menabe"
];

const quickAnswers = ["Manaiky", "Tsy manaiky", "Mbola mieritreritra"];

export function IdeaDialog({ petition, children, onSign }: SignPetitionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [taona, setTaona] = useState("");
  const [faritra, setFaritra] = useState("");
  const [valinteny, setValinteny] = useState("");
  const [hevitrao, setHevitrao] = useState("");

  // const handleSubmit = async () => {
  //   setIsSaving(true);
  //   await new Promise(resolve => setTimeout(resolve, 1500));

  //   // Simulation save
  //   console.log({ petitionId: petition._id, taona, faritra, valinteny, hevitrao });

  //   setIsSaving(false);
  //   setIsSaved(true);
  //   onSign();

  //   setTimeout(() => {
  //     setIsSaved(false);
  //     setOpen(false);
  //     setTaona("");
  //     setFaritra("");
  //     setValinteny("");
  //     setHevitrao("");
  //   }, 1200);
  // };

  useEffect(()=>{

    if(open){
      setTaona("");
      setFaritra("");
      setValinteny("");
      setHevitrao("");
      setIsSaved(false);
      setIsSaving(false);
    } 

    console.log(petition);
    

  },[open]);


  useEffect(()=>{

    console.log(petition);
    
  },[]);

  const handleSubmit = async () => {

    console.log(petition);
    
  try {
    setIsSaving(true);

    const payload = {
      topicId: petition._id,     // id du topic/urne
      userId: null,             // tu pourras remplacer par un vrai userId après
      answer: hevitrao,         // texte de l’idée
      age: parseInt(taona, 10), // ton champ âge
      region: faritra,          // ton champ région
    };

    const res = await fetch("/api/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status}`);
    }

    const data = await res.json();

    console.log("Réponse API:", data);

    setIsSaving(false);
    setIsSaved(true);
    onSign();

    setTimeout(() => {

      setIsSaved(false);
      setOpen(false);
      setTaona("");
      setFaritra("");
      setValinteny("");
      setHevitrao("");

    }, 1200);

  } catch (err) {

    console.error("Erreur envoi idée:", err);
    setIsSaving(false);

  }

};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-4/5">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Hevitra momba ny "{petition.title}"
          </DialogTitle>
          <DialogDescription>
            {petition.longDescription}
            <div>
              <strong className="mt-2 block text-orange-300">Torolalana:</strong> Fenoy ny mombamomba anao sy ny hevitrao momba ity sosokevitra ity.
              Ho an'ny fanatsarana ny serivisy, ny hevitrao dia ho aravona aminy hevitrin'ny vahoka aminy alalan'ny teknolojia "Intelligence Artificielle (IA)".
              Misaotra mialoha amin'ny fandraisanao anjara!
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* === FORMULAIRE === */}
        <div className="space-y-4 py-4">
          {/* Taona */}
          <div>
            <label className="block text-sm font-medium mb-1">Taona</label>
            <Input
              type="number"
              placeholder="Ampidiro ny taonanao"
              value={taona}
              onChange={(e) => setTaona(e.target.value)}
            />
          </div>

          {/* Faritra */}
          <div>
            <label className="block text-sm font-medium mb-1">Faritra</label>
            <Select onValueChange={setFaritra} value={faritra}>
              <SelectTrigger>
                <SelectValue placeholder="Misafidiana faritra" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valinteny haingana */}
          {/* <div>
            <label className="block text-sm font-medium mb-2">Valinteny haingana</label>
            <div className="flex gap-2 flex-wrap">
              {quickAnswers.map((ans) => (
                <Badge
                  key={ans}
                  variant={valinteny === ans ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setValinteny(ans)}
                >
                  {ans}
                </Badge>
              ))}
            </div>
          </div> */}

          {/* Hevitrao */}
          <div>
            <label className="block text-sm font-medium mb-1">Hevitrao</label>
            <Textarea
              placeholder="Soraty eto ny hevitrao..."
              value={hevitrao}
              onChange={(e) => setHevitrao(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            type="button"
            className="w-full"
            onClick={handleSubmit}
            disabled={isSaving || isSaved}
            size="lg"
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaved ? <Check className="mr-2 h-4 w-4" /> : null}
            {isSaved ? "Voaray!" : isSaving ? "Mikajiana..." : "Alefa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
