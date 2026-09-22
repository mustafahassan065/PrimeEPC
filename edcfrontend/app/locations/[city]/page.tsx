import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { targetLocations } from '@/lib/locationData';
import LocationLandingTemplate from '@/components/LocationLandingTemplate';
import JsonLd from '@/components/seo/JsonLd';
import { BUSINESS } from '@/lib/business';

interface Props {
  params: Promise<{ city: string }> | { city: string };
}

// Per-city title and H1 map — unique for every location
const cityMeta: Record<string, { title: string; h1: string; description: string }> = {
  bolton: {
    title: 'EPC Bolton from £50 | Local Assessor, BL1-BL7 | Prime EPC',
    h1: 'EPC Bolton: Local Energy Performance Certificates from £50',
    description: 'Accredited EPC assessor based in Bolton. Domestic EPC £50 fixed fee for BL1-BL7. Book online for a 24-48 hour turnaround — no hidden fees.',
  },
  manchester: {
    title: 'EPC Manchester from £50 | Accredited Assessor | Prime EPC',
    h1: 'EPC Manchester: Energy Performance Certificates from £50',
    description: 'Domestic and commercial EPC certificates across Manchester. Fixed £50 fee, accredited assessor, lodged on the national register within 24-48 hours.',
  },
  salford: {
    title: 'EPC Salford from £50 | Eccles, Swinton, Quays | Prime EPC',
    h1: 'EPC Salford: Certificates for Homes and Businesses',
    description: 'EPC certificates across Salford, Eccles, Swinton and Salford Quays. Fixed £50 domestic fee. Accredited assessor, fast turnaround.',
  },
  oldham: {
    title: 'EPC Oldham from £50 | Chadderton, Royton, Shaw | Prime EPC',
    h1: 'EPC Oldham: Energy Performance Certificates',
    description: 'Accredited EPC assessments across Oldham, Chadderton, Royton and Shaw. Fixed £50 domestic fee. Book online today.',
  },
  blackburn: {
    title: 'EPC Blackburn from £50 | BB1-BB12 | Prime EPC',
    h1: 'EPC Blackburn: Energy Performance Certificates from £50',
    description: 'EPC certificates across Blackburn, Darwen and surrounding areas. Fixed £50 domestic fee. Accredited assessor, 24-48 hour turnaround.',
  },
  stockport: {
    title: 'EPC Stockport from £50 | SK1-SK8 | Prime EPC',
    h1: 'EPC Stockport: Accredited Energy Assessments',
    description: 'Domestic and commercial EPC certificates across Stockport. Fixed £50 fee. Accredited assessor covering SK1 to SK8, fast digital certificate.',
  },
  rochdale: {
    title: 'EPC Rochdale from £50 | Heywood, Middleton | Prime EPC',
    h1: 'EPC Rochdale: Certificates for Sales and Lettings',
    description: 'EPC assessments across Rochdale, Heywood and Middleton. Fixed £50 domestic fee. Fully accredited, 24-48 hour certificate turnaround.',
  },
  warrington: {
    title: 'EPC Warrington from £50 | WA1-WA5 | Prime EPC',
    h1: 'EPC Warrington: Energy Performance Certificates from £50',
    description: 'Accredited EPC certificates across Warrington and Cheshire. Fixed £50 domestic fee, 24-48 hour turnaround. Book online today.',
  },
  liverpool: {
    title: 'EPC Liverpool from £50 | Accredited Assessor | Prime EPC',
    h1: 'EPC Liverpool: Energy Performance Certificates from £50',
    description: 'Domestic and commercial EPC certificates across Liverpool and Merseyside. Fixed £50 fee. Accredited assessor, fast digital certificate.',
  },
}

export function generateStaticParams() {
  return targetLocations.map((location) => ({
    city: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const location = targetLocations.find((loc) => loc.slug === resolvedParams.city);

  if (!location) {
    return { title: 'Location Not Found' };
  }

  const meta = cityMeta[location.slug] || {
    title: `EPC ${location.name} from £50 | Prime EPC`,
    h1: `EPC ${location.name}: Energy Performance Certificates from £50`,
    description: `Accredited EPC certificates in ${location.name}. Fixed £50 domestic fee, 24-48 hour turnaround. Book online today.`,
  };

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
    openGraph: {
      url: `/locations/${location.slug}`,
    },
  };
}

export default async function DynamicLocationPage({ params }: Props) {
  const resolvedParams = await params;
  const location = targetLocations.find((loc) => loc.slug === resolvedParams.city);

  if (!location) {
    notFound();
  }

  const meta = cityMeta[location.slug] || {
    title: `EPC ${location.name} from £50 | Prime EPC`,
    h1: `EPC ${location.name}: Energy Performance Certificates from £50`,
    description: `Accredited EPC certificates in ${location.name}.`,
  };

  return (
    <>
      {/* Location-specific LocalBusiness schema */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${BUSINESS.url}/locations/${location.slug}/#business`,
        name: `Prime EPC & Design Consultants — ${location.name}`,
        url: `${BUSINESS.url}/locations/${location.slug}`,
        telephone: BUSINESS.phoneIntl,
        email: BUSINESS.email,
        areaServed: { '@type': 'City', name: location.name },
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.street,
          addressLocality: BUSINESS.locality,
          addressRegion: BUSINESS.region,
          postalCode: BUSINESS.postcode,
          addressCountry: 'GB',
        },
        offers: {
          '@type': 'Offer',
          price: '50',
          priceCurrency: 'GBP',
          description: `Domestic EPC in ${location.name}`,
        },
      }} />

      <LocationLandingTemplate
        cityName={location.name}
        citySlug={`locations/${location.slug}`}
        housingContext={location.description}
        postcodes={location.postcodes.split(', ')}
        h1={meta.h1}
      />
    </>
  );
}