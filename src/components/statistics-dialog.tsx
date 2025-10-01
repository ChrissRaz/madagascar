'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis
} from 'recharts';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Download } from 'lucide-react';
import { Petition, StatisticsTheme } from '@/lib/definitions';


function downloadPDF(statistics: StatisticsTheme, petition: Petition) {
  const doc = new jsPDF();

  // Titre
  doc.setFontSize(16);
  doc.text(`Statistiques - ${petition?.title}`, 14, 20);

  // Total
  doc.setFontSize(12);
  doc.text(`Nombre total d'idées: ${statistics?.total}`, 14, 35);

  // Répartition par âge
  doc.text("Répartition par âge:", 14, 50);
  autoTable(doc, {
    startY: 55,
    head: [["Tranche d'âge", "Nombre"]],
    body: statistics?.ageStats.map((a: any) => [a.range, a.count]),
    theme: "striped",
  });

  // Répartition par région
  const afterAgeTableY = (doc as any).lastAutoTable.finalY + 10;
  doc.text("Répartition par région:", 14, afterAgeTableY);
  autoTable(doc, {
    startY: afterAgeTableY + 5,
    head: [["Région", "Nombre"]],
    body: statistics?.regionStats.map((r: any) => [r.region, r.count]),
    theme: "striped",
  });

  // Synthèse IA
  const afterRegionTableY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.text("Synthèse IA:", 14, afterRegionTableY);
  doc.setFontSize(11);
  const summary = doc.splitTextToSize(statistics?.aiSummary, 180);
  doc.text(summary, 14, afterRegionTableY + 7);

  // Sauvegarde
  doc.save(`stats-${petition?.title}.pdf`);
}



interface StatsDialogProps {
  petition: Petition;
  children: React.ReactNode;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7", "#F43F5E"];

export function StatsDialog({ petition, children }: StatsDialogProps) {

  const [open, setOpen] = useState(false);

  const [statistics, setStatistics] = useState<StatisticsTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    if (!petition) return;

    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/statistics/${petition._id}`);
        if (!res.ok) {
          throw new Error(`Erreur API: ${res.status}`);
        }
        const data: StatisticsTheme = await res.json();
        setStatistics(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erreur de récupération des statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();

  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Statistika momban'ny lohahevitra: {petition?.title}
          </DialogTitle>
          <DialogDescription>
            Ireto ambany ireto ny statistika momba ny sosokevitra voaray ary ny famintinana nataon'ny IA.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Total */}
          <div className="text-center">
            <p className="text-lg font-semibold">Isan'ny hevitra voaray</p>
            <p className="text-3xl font-bold text-primary">{statistics?.total}</p>
          </div>

          {/* Répartition par âge */}
          <div>
            <p className="font-medium mb-2">fizarana araka ny taona</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statistics?.ageStats}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {statistics?.ageStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Répartition par région */}
          <div>
            <p className="font-medium mb-2">fizarana araka ny faritra</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statistics?.regionStats}>
                <XAxis dataKey="region" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
              {statistics?.regionStats.map((r) => (
                <span key={r.region} className="px-2 py-1 bg-muted rounded-md">
                  {r.region}: {r.count}
                </span>
              ))}
            </div>
          </div>

          {/* Synthèse IA */}
          <div className="p-3 border rounded-lg bg-muted">
            <p className="font-medium mb-1">Famintinana avy amin'ny Teknolojia IA</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {statistics?.aiSummary}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => downloadPDF(statistics as StatisticsTheme,petition)} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Télécharger (PDF)
            </Button>
            <Button onClick={() => setOpen(false)} className="flex-1">
                Fermer
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
