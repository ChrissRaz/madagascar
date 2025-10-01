import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = getPlaceholderImage('hero-background');

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-left space-y-6">
        <main className="text-5xl md:text-6xl font-bold font-headline">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-accent to-primary text-transparent bg-clip-text">
              Demôkrasy
            </span>
          </h1>{' '}
          manan-danja ny Feonao.
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Toerana ahafahanao maneho an-kalalahana ny hevitrao mahakasika ny raharaham-pirenena.
          Ny feonao no hitarika ny fiovana ary teknolojia "Intelligece Artificielle (IA)" no hanamora izany.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button asChild className="w-full md:w-1/3" size="lg">
            <Link href="/petitions">
              Haneho hevitra
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="z-10">
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            width={700}
            height={500}
            className="rounded-lg shadow-2xl"
            data-ai-hint={heroImage.imageHint}
          />
      </div>

    </section>
  );
}
