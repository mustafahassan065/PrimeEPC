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
    description: 'Bolton-based accredited EPC assessor. Fixed £50 domestic fee, commercial from £144, EICR from £110. Fast same-day and 24–48h delivery across all BL postcodes.',
  },
  bury: {
    title: 'EPC Bury from £50 | Ramsbottom, Radcliffe | Prime EPC',
    h1: 'EPC Bury: Local Energy Assessor for Homes & Landlords',
    description: 'Accredited EPC certificates across Bury, Radcliffe, Whitefield, and Ramsbottom. Fixed £50 domestic fee, 24–48h lodgement. Direct assessor booking.',
  },
  manchester: {
    title: 'EPC Manchester from £50 | Accredited Assessor | Prime EPC',
    h1: 'EPC Manchester: Accredited Energy Assessments Across Greater Manchester',
    description: 'Domestic EPC in Manchester for £50, commercial from £144. Fast assessments for city centre flats, student HMOs, and residential sales across M postcodes.',
  },
  oldham: {
    title: 'EPC Oldham from £50 | Chadderton, Royton, Shaw | Prime EPC',
    h1: 'EPC Oldham: Local Energy Performance Certificates',
    description: 'Book your domestic EPC in Oldham directly with an accredited assessor. Fixed £50 rate across OL1-OL9. 24–48 hour official national lodgement guaranteed.',
  },
  rochdale: {
    title: 'EPC Rochdale from £50 | Heywood, Middleton | Prime EPC',
    h1: 'EPC Rochdale: Energy Performance Surveys for Sales & Lettings',
    description: 'Accredited EPC assessments in Rochdale, Heywood, and Middleton. Fixed £50 domestic fee, fast digital certificate delivery, zero agency commissions.',
  },
  salford: {
    title: 'EPC Salford from £50 | Eccles, Swinton, Quays | Prime EPC',
    h1: 'EPC Salford: Energy Certificates for Homes and Businesses',
    description: 'Accredited EPC surveys across Salford, MediaCityUK, Eccles, and Swinton. Fixed £50 domestic fee, fast appointments, 24–48h certificate delivery.',
  },
  stockport: {
    title: 'EPC Stockport from £50 | SK1-SK8 | Prime EPC',
    h1: 'EPC Stockport: Certified Energy Assessments for Landlords & Sellers',
    description: 'Direct assessor booking across Stockport. Fixed £50 domestic EPC fee, commercial from £144. 24–48 hour turnaround for sellers and letting agents.',
  },
  tameside: {
    title: 'EPC Tameside from £50 | Ashton, Hyde, Stalybridge | Prime EPC',
    h1: 'EPC Tameside: Local Energy Performance Certificates from £50',
    description: 'Accredited domestic and commercial EPCs across Tameside. Fixed £50 residential rate, fast 24–48h turnaround in Ashton-under-Lyne, Hyde, and Denton.',
  },
  trafford: {
    title: 'EPC Trafford from £50 | Altrincham, Sale, Stretford | Prime EPC',
    h1: 'EPC Trafford: Energy Certificates for Homes & Commercial Buildings',
    description: 'Accredited EPC certificates across Trafford including Altrincham, Sale, Stretford, and Urmston. Fixed £50 domestic fee, fast 24–48h register lodgement.',
  },
  wigan: {
    title: 'EPC Wigan from £50 | Standish, Leigh, Orrell | Prime EPC',
    h1: 'EPC Wigan: Fast Energy Performance Certificates from £50',
    description: 'Certified domestic and commercial EPCs in Wigan from £50. Quick turnaround across WN1 to WN7 for home sellers and rental landlords.',
  },
  blackburn: {
    title: 'EPC Blackburn from £50 | Darwen, Accrington | Prime EPC',
    h1: 'EPC Blackburn: Direct Energy Assessments Across BB Postcodes',
    description: 'Accredited domestic EPCs across Blackburn and Darwen for a fixed £50 fee. Fast 24–48h certificate lodgement for landlords and private home sellers.',
  },
  chorley: {
    title: 'EPC Chorley from £50 | Adlington, Buckshaw | Prime EPC',
    h1: 'EPC Chorley: Accredited Energy Assessor Across PR6 & PR7',
    description: 'Local accredited EPC assessments in Chorley, Adlington, and Buckshaw Village. Fixed £50 fee with official national register lodgement.',
  },
  liverpool: {
    title: 'EPC Liverpool from £50 | Merseyside Energy Certificates | Prime EPC',
    h1: 'EPC Liverpool: Accredited Energy Assessments Across Merseyside',
    description: 'Professional domestic and commercial EPCs across Liverpool and Merseyside. Fixed £50 domestic fee, fast 24–48h turnaround for landlords and sellers.',
  },
  rossendale: {
    title: 'EPC Rossendale from £50 | Rawtenstall, Bacup, Haslingden | Prime EPC',
    h1: 'EPC Rossendale: Energy Performance Certificates from £50',
    description: 'Local accredited energy assessments across the Rossendale Valley. Fixed £50 domestic rate, 24–48h certificate lodgement in Rawtenstall and Bacup.',
  },
  'st-helens': {
    title: 'EPC St Helens from £50 | Haydock, Prescot, Rainhill | Prime EPC',
    h1: 'EPC St Helens: Certified Energy Assessments for Sales & Lettings',
    description: 'Accredited EPC certificates across St Helens, Haydock, Prescot, and Rainhill. Fixed £50 domestic fee with prompt 24–48h digital lodgement.',
  },
  warrington: {
    title: 'EPC Warrington from £50 | Stockton Heath, Lymm | Prime EPC',
    h1: 'EPC Warrington: Energy Performance Certificates from £50',
    description: 'Professional EPC surveys across Warrington, Stockton Heath, Lymm, and Culcheth. Fixed £50 residential fee, fast lodgement, no agency mark-ups.',
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
        neighbourhoods={location.neighbourhoods}
        content={location.content}
        content2={location.content2}
      />
    </>
  );
}