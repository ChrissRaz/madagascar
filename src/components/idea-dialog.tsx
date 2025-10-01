'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

export function IdeaDialog({ petition, children, onSign }: SignPetitionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [taona, setTaona] = useState("");
  const [faritra, setFaritra] = useState("");
  const [hevitrao, setHevitrao] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (open) {
      setTaona("");
      setFaritra("");
      setHevitrao("");
      setConsent(false);
      setErrors({});
      setIsSaved(false);
      setIsSaving(false);
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!taona || parseInt(taona, 10) <= 0) {
      newErrors.taona = "Ampidiro ny taonanao marina.";
    }
    if (!faritra) {
      newErrors.faritra = "Misafidiana faritra.";
    }
    if (!hevitrao.trim()) {
      newErrors.hevitrao = "Soraty ny hevitrao, tsy azo foana.";
    }
    if (!consent) {
      newErrors.consent = "Tokony hanamarika ianao fa tsy misy fanarahana na fanangonana angona manokana.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);

      const payload = {
        topicId: petition._id,
        userId: null,
        answer: hevitrao,
        age: parseInt(taona, 10),
        region: faritra,
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

      await res.json();

      setIsSaving(false);
      setIsSaved(true);
      onSign();

      setTimeout(() => {
        setIsSaved(false);
        setOpen(false);
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
              <strong className="mt-2 block text-orange-300">Torolalana:</strong>{" "}
              Fenoy ny mombamomba anao sy ny hevitrao momba ity sosokevitra ity.
              Ny valiny dia atao **anonyme** ary tsy misy fanangonana angona manokana.
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
            {errors.taona && <p className="text-red-500 text-sm">{errors.taona}</p>}
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
            {errors.faritra && <p className="text-red-500 text-sm">{errors.faritra}</p>}
          </div>

          {/* Hevitrao */}
          <div>
            <label className="block text-sm font-medium mb-1">Hevitrao</label>
            <Textarea
              placeholder="Soraty eto ny hevitrao..."
              value={hevitrao}
              onChange={(e) => setHevitrao(e.target.value)}
              rows={6}
            />
            {errors.hevitrao && <p className="text-red-500 text-sm">{errors.hevitrao}</p>}
          </div>

          {/* Checkbox anonymat */}
          <div className="flex items-start gap-2">
            <input
              id="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm">
              Manaiky aho fa tsy misy fanarahana ahy ary tsy misy fanangonana mombamomba manokana. 
              Anonyme tanteraka ity fandraisana anjara ity.
            </label>
          </div>
          {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
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
