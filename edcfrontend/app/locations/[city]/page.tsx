import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { targetLocations } from '@/lib/locationData';
import LocationLandingTemplate from '@/components/LocationLandingTemplate';
import JsonLd from '@/components/seo/JsonLd';
import { BUSINESS } from '@/lib/business';

interface Props {
  params: Promise<{ city: string }> | { city: string };
}

export const dynamicParams = false;

// Per-city title and H1 map — unique for every location
const cityMeta: Record<string, { title: string; h1: string; description: string }> = {
  bolton: {
    title: 'EPC Bolton from £50 | Same Day Local Survey, BL1-BL7',
    h1: 'EPC Bolton: Accredited Energy Performance Certificates from £50',
    description: 'Bolton-based accredited EPC assessor. Domestic EPCs from £50 (same day bookings available), commercial from £144, EICR from £110. Fast 24–48h report across BL1–BL7.',
  },
  bury: {
    title: 'EPC Bury from £50 | Same Day Survey, Radcliffe & Prestwich',
    h1: 'EPC Bury: Local Energy Assessor for Homes, Remortgages & Landlords',
    description: 'Accredited EPC certificates across Bury, Radcliffe, Whitefield, Prestwich, and Ramsbottom. Domestic EPCs from £50, same-day survey slots, and 24–48h lodgement.',
  },
  manchester: {
    title: 'EPC Manchester from £50 | Same Day Bookings, M1-M40',
    h1: 'EPC Manchester: Accredited Same-Day Energy Assessments from £50',
    description: 'Domestic EPCs in Manchester from £50, commercial from £144, EICR from £110. Book your EPC today for city centre flats, student HMOs, sales, and remortgages across M postcodes.',
  },
  oldham: {
    title: 'EPC Oldham from £50 | Chadderton, Royton & Saddleworth',
    h1: 'EPC Oldham: Local Energy Performance Certificates from £50',
    description: 'Book your domestic EPC in Oldham directly with an accredited assessor. Rates from £50 across OL1–OL9, M24, and M35. Same-day surveys and 24–48h GOV.UK lodgement.',
  },
  rochdale: {
    title: 'EPC Rochdale from £50 | Heywood, Middleton & Littleborough',
    h1: 'EPC Rochdale: Energy Performance Surveys for Sales, Lettings & Remortgages',
    description: 'Accredited EPC assessments in Rochdale, Heywood, Middleton, and Littleborough. Domestic rates from £50, same-day bookings, fast digital report delivery, zero agency mark-ups.',
  },
  salford: {
    title: 'EPC Salford from £50 | Eccles, Swinton, Worsley & Quays',
    h1: 'EPC Salford: Domestic & Commercial Energy Certificates from £50',
    description: 'Accredited EPC surveys across Salford, MediaCityUK, Salford Quays, Eccles, Swinton, and Worsley. Domestic EPCs from £50, urgent same-day slots, 24–48h certificate delivery.',
  },
  stockport: {
    title: 'EPC Stockport from £50 | Cheadle, Bramhall & SK1-SK8',
    h1: 'EPC Stockport: Accredited Energy Assessments from £50',
    description: 'Direct assessor booking across Stockport, Cheadle, Bramhall, Hazel Grove, and Marple. Domestic EPCs from £50, commercial from £144. Fast 24–48h turnaround for sellers and landlords.',
  },
  tameside: {
    title: 'EPC Tameside from £50 | Ashton, Hyde, Denton & Stalybridge',
    h1: 'EPC Tameside: Local Energy Performance Certificates from £50',
    description: 'Accredited domestic and commercial EPCs across Tameside. Residential rates from £50 with same-day bookings and 24–48h turnaround in Ashton-under-Lyne, Hyde, Stalybridge, and Denton.',
  },
  trafford: {
    title: 'EPC Trafford from £50 | Altrincham, Sale, Stretford & Urmston',
    h1: 'EPC Trafford: Domestic & Commercial Energy Certificates from £50',
    description: 'Accredited EPC certificates across Trafford including Altrincham, Sale, Stretford, Urmston, and Trafford Park. Domestic EPCs from £50, commercial from £144, fast 24–48h lodgement.',
  },
  wigan: {
    title: 'EPC Wigan & Leigh from £50 | Standish, Atherton & WN1-WN7',
    h1: 'EPC Wigan & Leigh: Fast Energy Performance Certificates from £50',
    description: 'Certified domestic and commercial EPCs across Wigan, Leigh, Atherton, Standish, and Hindley from £50. Same-day survey bookings and fast turnaround across WN1–WN7, M29, and M46.',
  },
  blackburn: {
    title: 'EPC Blackburn & Darwen from £50 | Accrington & BB1-BB6',
    h1: 'EPC Blackburn & Darwen: Direct Energy Assessments Across BB1–BB6',
    description: 'Accredited domestic and commercial EPCs across Blackburn, Darwen, Accrington, and Oswaldtwistle starting from £50. Fast 24–48h certificate lodgement for landlords and sellers.',
  },
  chorley: {
    title: 'EPC Chorley & Leyland from £50 | Buckshaw Village & PR6-PR26',
    h1: 'EPC Chorley & Leyland: Accredited Energy Assessor Across PR6–PR26',
    description: 'Local accredited EPC assessments across Chorley, Leyland, Adlington, Euxton, and Buckshaw Village. Domestic rates from £50 with same-day survey options and GOV.UK register lodgement.',
  },
  liverpool: {
    title: 'EPC Liverpool & Merseyside from £50 | Same Day Survey, L1-L38',
    h1: 'EPC Liverpool: Accredited Energy Assessments Across Merseyside (L1–L38)',
    description: 'Professional domestic and commercial EPCs across Liverpool and Merseyside (L1–L38). Domestic EPCs from £50, commercial from £144, bulk landlord discounts, and 24–48h turnaround.',
  },
  rossendale: {
    title: 'EPC Rossendale from £50 | Rawtenstall, Bacup & Haslingden',
    h1: 'EPC Rossendale: Energy Performance Certificates from £50',
    description: 'Local accredited energy assessments across Rossendale, Rawtenstall, Bacup, Haslingden, and Whitworth. Domestic rates from £50 with 24–48h GOV.UK certificate lodgement.',
  },
  'st-helens': {
    title: 'EPC St Helens from £50 | Haydock, Prescot & Rainhill',
    h1: 'EPC St Helens: Certified Energy Assessments for Sales, Lettings & Remortgages',
    description: 'Accredited EPC certificates across St Helens, Haydock, Prescot, Rainhill, and Newton-le-Willows. Domestic EPCs from £50 with same-day booking options and 24–48h digital lodgement.',
  },
  warrington: {
    title: 'EPC Warrington from £50 | Stockton Heath, Lymm & WA1-WA13',
    h1: 'EPC Warrington: Domestic & Commercial Energy Certificates from £50',
    description: 'Professional EPC surveys across Warrington, Lymm, Stockton Heath, Birchwood, and Culcheth. Domestic rates from £50, commercial from £144, fast lodgement, zero agency mark-ups.',
  },
  'cheshire-east': {
    title: 'EPC Cheshire East from £50 | Wilmslow, Knutsford, Macclesfield & Crewe',
    h1: 'EPC Cheshire East: Accredited Domestic & Commercial Energy Certificates',
    description: 'Accredited EPC certificates across Cheshire East including Wilmslow, Macclesfield, Knutsford, Alderley Edge, and Crewe. Domestic EPCs from £50, commercial from £144.',
  },
  'cheshire-west': {
    title: 'EPC Cheshire West & Chester from £50 | Chester, Northwich & Ellesmere Port',
    h1: 'EPC Cheshire West & Chester: Energy Performance Surveys from £50',
    description: 'Accredited domestic and commercial EPC surveys across Chester, Northwich, Ellesmere Port, Winsford, and Frodsham from £50. Fast 24–48h lodgement.',
  },
};

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
    title: `EPC ${location.name} from £50 | Same Day North West Bookings`,
    h1: `EPC ${location.name}: Accredited Energy Performance Certificates from £50`,
    description: `Accredited EPC certificates in ${location.name}. Domestic EPC from £50, 24–48 hour turnaround. Book online today.`,
  };

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
    openGraph: {
      url: `/locations/${location.slug}`,
      title: meta.title,
      description: meta.description,
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
    title: `EPC ${location.name} from £50 | Same Day North West Bookings`,
    h1: `EPC ${location.name}: Accredited Energy Performance Certificates from £50`,
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
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            minPrice: '50.00',
            priceCurrency: 'GBP',
            description: `Domestic EPC in ${location.name} from £50 (tiered by property size)`,
          },
          itemOffered: {
            '@type': 'Service',
            name: `Domestic EPC Assessment in ${location.name}`,
            url: `${BUSINESS.url}/locations/${location.slug}`,
          },
        },
      }} />

      <LocationLandingTemplate
        cityName={location.name}
        citySlug={location.slug}
        housingContext={location.description}
        postcodes={location.postcodes.split(', ')}
        h1={meta.h1}
        neighbourhoods={location.neighbourhoods}
        subAreas={location.subAreas}
        content={location.content}
        content2={location.content2}
      />
    </>
  );
}
