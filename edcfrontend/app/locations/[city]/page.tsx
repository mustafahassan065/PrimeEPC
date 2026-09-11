import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { targetLocations } from '@/lib/locationData';
import LocationLandingTemplate from '@/components/LocationLandingTemplate';

interface Props {
  params: Promise<{ city: string }> | { city: string };
}

// Generate Static HTML pages at build time
export function generateStaticParams() {
  return targetLocations.map((location) => ({
    city: location.slug,
  }));
}

// Dynamically Inject EXACT Match SEO Titles & Meta Descriptions
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const location = targetLocations.find((loc) => loc.slug === resolvedParams.city);
  
  if (!location) {
    return { title: 'Location Not Found' };
  }

  return {
    title: `Residential / Domestic EPC in ${location.name} for £50`,
    description: `${location.name} is covered by Prime EPC for Energy Performance Certificates. ${location.description} Book direct for a £50 fixed fee.`,
    alternates: {
      canonical: `https://www.primeepcdesign.co.uk/locations/${location.slug}`,
    }
  };
}

export default async function DynamicLocationPage({ params }: Props) {
  const resolvedParams = await params;
  const location = targetLocations.find((loc) => loc.slug === resolvedParams.city);

  if (!location) {
    notFound();
  }

  return (
    <LocationLandingTemplate 
      cityName={location.name} 
      citySlug={`locations/${location.slug}`} 
      housingContext={location.description} 
      postcodes={location.postcodes.split(', ')} 
    />
  );
}
