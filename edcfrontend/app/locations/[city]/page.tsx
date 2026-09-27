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
    description: 'Accredited EPC assessor based in Bolton. Domestic EPC starting from  £50 fee for BL1-BL7. Book online for a 24-48 hour turnaround — no hidden fees.',
  },
  manchester: {
    title: 'EPC Manchester from £50 | Accredited Assessor | Prime EPC',
    h1: 'EPC Manchester: Energy Performance Certificates from £50',
    description: 'Domestic and commercial EPC certificates across Manchester. Starting from £50 fee, accredited assessor, lodged on the national register within 24-48 hours.',
  },
  salford: {
    title: 'EPC Salford from £50 | Eccles, Swinton, Quays | Prime EPC',
    h1: 'EPC Salford: Certificates for Homes and Businesses',
    description: 'EPC certificates across Salford, Eccles, Swinton and Salford Quays.Starting from £50 domestic fee. Accredited assessor, fast turnaround.',
  },
  oldham: {
    title: 'EPC Oldham from £50 | Chadderton, Royton, Shaw | Prime EPC',
    h1: 'EPC Oldham: Energy Performance Certificates',
    description: 'Accredited EPC assessments across Oldham, Chadderton, Royton and Shaw. Starting from £50 domestic fee. Book online today.',
  },
  blackburn: {
    title: 'EPC Blackburn from £50 | BB1-BB12 | Prime EPC',
    h1: 'EPC Blackburn: Energy Performance Certificates from £50',
    description: 'EPC certificates across Blackburn, Darwen and surrounding areas.Starting from £50 domestic fee. Accredited assessor, 24-48 hour turnaround.',
  },
  stockport: {
    title: 'EPC Stockport from £50 | SK1-SK8 | Prime EPC',
    h1: 'EPC Stockport: Accredited Energy Assessments',
    description: 'Domestic and commercial EPC certificates across Stockport.Starting from £50 fee. Accredited assessor covering SK1 to SK8, fast digital certificate.',
  },
  rochdale: {
    title: 'EPC Rochdale from £50 | Heywood, Middleton | Prime EPC',
    h1: 'EPC Rochdale: Certificates for Sales and Lettings',
    description: 'EPC assessments across Rochdale, Heywood and Middleton.Starting from £50 domestic fee. Fully accredited, 24-48 hour certificate turnaround.',
  },
  warrington: {
    title: 'EPC Warrington from £50 | WA1-WA5 | Prime EPC',
    h1: 'EPC Warrington: Energy Performance Certificates from £50',
    description: 'Accredited EPC certificates across Warrington and Cheshire.Starting from £50 domestic fee, 24-48 hour turnaround. Book online today.',
  },
  liverpool: {
    title: 'EPC Liverpool from £50 | Accredited Assessor | Prime EPC',
    h1: 'EPC Liverpool: Energy Performance Certificates from £50',
    description: 'Domestic and commercial EPC certificates across Liverpool and Merseyside.Starting from £50 fee. Accredited assessor, fast digital certificate.',
  },
  bury: {
    title: 'EPC Bury from £50 | Radcliffe, Whitefield, Ramsbottom | Prime EPC',
    h1: 'EPC Bury: Energy Performance Certificates from £50',
    description: 'Accredited EPC certificates across Bury, Radcliffe, Whitefield, Prestwich and Ramsbottom.Starting from £50 domestic fee, 24-48 hour turnaround.',
  },
  tameside: {
    title: 'EPC Tameside from £50 | Ashton, Hyde, Stalybridge | Prime EPC',
    h1: 'EPC Tameside: Energy Performance Certificates from £50',
    description: 'EPC certificates across Tameside — Ashton-under-Lyne, Hyde, Stalybridge, Denton and Droylsden.Starting from £50 fee, accredited assessor.',
  },
  trafford: {
    title: 'EPC Trafford from £50 | Altrincham, Sale, Stretford | Prime EPC',
    h1: 'EPC Trafford: Energy Performance Certificates from £50',
    description: 'Accredited EPC certificates across Trafford — Altrincham, Sale, Stretford, Urmston and Old Trafford.Starting from £50 domestic fee.',
  },
  wigan: {
    title: 'EPC Wigan from £50 | Leigh, Atherton, Hindley | Prime EPC',
    h1: 'EPC Wigan: Energy Performance Certificates from £50',
    description: 'EPC certificates across Wigan, Leigh, Atherton, Hindley and Ashton-in-Makerfield.Starting from £50 domestic fee, 24-48 hour turnaround.',
  },
  'st-helens': {
    title: 'EPC St Helens from £50 | Haydock, Prescot, Rainhill | Prime EPC',
    h1: 'EPC St Helens: Energy Performance Certificates from £50',
    description: 'Accredited EPC certificates across St Helens, Haydock, Prescot and Rainhill.Starting from £50 domestic fee, fast turnaround.',
  },
  chorley: {
    title: 'EPC Chorley from £50 | Leyland, Adlington, Euxton | Prime EPC',
    h1: 'EPC Chorley: Energy Performance Certificates from £50',
    description: 'EPC certificates across Chorley, Leyland, Adlington, Euxton and Buckshaw Village.Starting from £50 domestic fee, accredited assessor.',
  },
  rossendale: {
    title: 'EPC Rossendale from £50 | Rawtenstall, Bacup, Haslingden | Prime EPC',
    h1: 'EPC Rossendale: Energy Performance Certificates from £50',
    description: 'Accredited EPC certificates across Rossendale, Rawtenstall, Bacup and Haslingden.Starting from £50 domestic fee, 24-48 hour turnaround.',
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