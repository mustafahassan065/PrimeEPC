export interface LocationData {
  slug: string;
  name: string;
  postcodes: string;
  description: string;
  neighbourhoods: string;
  content: string;
  content2?: string;
  geo?: { lat: number; lng: number };
}

export const targetLocations: LocationData[] = [
  // Greater Manchester
  {
    slug: 'bolton', name: 'Bolton',
    postcodes: 'BL1, BL2, BL3, BL4, BL5, BL6, BL7',
    neighbourhoods: 'Town Centre, Breightmet, Tonge Moor, Harwood, Bromley Cross, Egerton, Halliwell, Heaton, Lostock, Deane, Daubhill, Great Lever, Farnworth, Horwich, Westhoughton',
    description: 'Bolton-based accredited EPC assessor. Domestic EPC from £50, commercial from £144, EICR from £110. Fast same-day and 24-48h delivery across all BL postcodes.',
    content: 'Our home office is located at 17 Bromwich Street in Bolton (BL2), so this borough is our primary service area. If you are selling an older stone terrace in Daubhill, letting an apartment near the town centre, or signing off an extension in Horwich, you are dealing directly with your local accredited surveyor. We offer appointments across BL1 to BL7 at domestic rates starting from £50 with no travel surcharges.',
    content2: 'A significant portion of Bolton housing stock consists of pre-1919 solid-brick and stone terraced homes, particularly around Daubhill, Tonge Moor, Deane, and Halliwell. Without cavity wall insulation, these homes typically achieve baseline EPC ratings of D or E. For older solid-wall properties in BL1 and BL2, the most cost-effective upgrades to ensure compliance with the upcoming 2030 Band C private rental standard are topping up loft insulation to 270mm, installing thermostatic radiator valves (TRVs), and replacing dated non-condensing boilers.',
    geo: { lat: 53.578, lng: -2.429 },
  },
  {
    slug: 'bury', name: 'Bury',
    postcodes: 'BL0, BL8, BL9, M25, M26, M45',
    neighbourhoods: 'Bury Town Centre, Ramsbottom, Tottington, Radcliffe, Whitefield, Prestwich, Walmersley, Greenmount',
    description: 'Accredited EPC certificates across Bury, Radcliffe, Whitefield, and Ramsbottom. Domestic EPC from £50, 24-48h lodgement. Direct assessor booking.',
    content: 'Located just east of our Bolton office via the A58, we conduct residential and commercial EPC surveys across the entire Metropolitan Borough of Bury daily. Whether you manage rental portfolios in Radcliffe, sell a family home in Tottington, or let an apartment in Prestwich, our team delivers independent energy assessments with fast digital lodgement.',
    content2: 'Bury residential landscape features older stone mill-workers cottages along the Irwell Valley in Ramsbottom, pre-war terraced streets throughout Radcliffe (M26), and mid-century semi-detached housing across Whitefield and Prestwich. We regularly show local homeowners how zoned heating systems, secondary glazing, and modern LED retrofits make a measurable difference in keeping their homes warm while avoiding costly compliance failures.',
    geo: { lat: 53.593, lng: -2.299 },
  },
  {
    slug: 'manchester', name: 'Manchester',
    postcodes: 'M1, M2, M3, M4, M8, M9, M11, M12, M13, M14, M15, M16, M18, M19, M20, M21, M22, M23, M40',
    neighbourhoods: 'City Centre, Ancoats, Castlefield, Hulme, Chorlton, Didsbury, Withington, Fallowfield, Levenshulme, Rusholme, Moss Side, Gorton, Cheetham Hill, Wythenshawe',
    description: 'Domestic EPC in Manchester for £50, commercial from £144. Fast assessments for city centre flats, student HMOs, and residential sales across M postcodes.',
    content: 'From high-rise apartment complexes in Ancoats, Castlefield, and Deansgate to expansive Victorian conversions in Didsbury and Chorlton, we provide direct energy certification throughout central and suburban Manchester. Booking your survey directly through our assessors bypasses high-street agency fees, giving you an official certificate registered within 24 to 48 hours with rates starting from £50.',
    content2: 'Manchester housing stock ranges widely: central apartments often benefit from compact thermal footprints and modern double glazing, scoring solid B or C ratings, though unprogrammed electric panel heaters can drag scores down. In popular rental corridors like Fallowfield, Withington, and Rusholme, large multi-storey Victorian homes converted into Houses in Multiple Occupation (HMOs) present complex heating demands. We work closely with Manchester landlords and property agents to survey single tenancies or complete multi-unit block audits on the same day.',
    geo: { lat: 53.480, lng: -2.242 },
  },
  {
    slug: 'oldham', name: 'Oldham',
    postcodes: 'OL1, OL2, OL3, OL4, OL8, OL9, M24, M35',
    neighbourhoods: 'Oldham Town Centre, Chadderton, Royton, Shaw, Crompton, Lees, Springhead, Saddleworth, Uppermill, Delph, Failsworth',
    description: 'Book your domestic EPC in Oldham directly with an accredited assessor. Domestic rates from £50 across OL1-OL9. 24-48 hour official national lodgement guaranteed.',
    content: 'Covering traditional mill towns across Chadderton and Royton alongside stone village cottages in Saddleworth, Prime EPC provides energy and electrical certification across the Oldham borough. We assist residential sellers and private landlords looking for quick turnaround times without middleman booking costs.',
    content2: 'Sitting against the western slopes of the Pennines, properties in Oldham experience higher wind-driven rain exposure and colder baseline external temperatures. In areas like Uppermill, Delph, and Greenfield, thick, uninsulated solid gritstone walls present significant thermal heat loss. Our on-site surveys evaluate these construction quirks accurately under RdSAP 10 standards to ensure your property receives the fairest score possible.',
    geo: { lat: 53.540, lng: -2.112 },
  },
  {
    slug: 'rochdale', name: 'Rochdale',
    postcodes: 'OL10, OL11, OL12, OL15, OL16, M24',
    neighbourhoods: 'Rochdale Town Centre, Castleton, Bamford, Norden, Healey, Wardleworth, Heywood, Middleton, Milnrow, Littleborough',
    description: 'Accredited EPC assessments in Rochdale, Heywood, and Middleton. Domestic EPC from £50, fast digital certificate delivery, zero agency commissions.',
    content: 'We deliver certified domestic and commercial energy surveys across Rochdale, Middleton, Heywood, and Milnrow. Whether selling a home near Hollingworth Lake or managing terraced investments in Castleton, our accredited assessors offer responsive call-outs and clear pricing.',
    content2: 'Rochdale properties range from Victorian brick textile housing in Wardleworth to semi-detached suburban developments in Bamford and Norden. We provide straightforward advice on how low-cost improvements, such as draught-proofing and high-retention storage heaters, can protect your rental income ahead of incoming regulatory deadlines.',
    geo: { lat: 53.613, lng: -2.158 },
  },
  {
    slug: 'salford', name: 'Salford',
    postcodes: 'M3, M5, M6, M7, M27, M28, M30, M38, M44, M50',
    neighbourhoods: 'Salford Quays, MediaCityUK, Eccles, Swinton, Walkden, Worsley, Pendlebury, Claremont, Irlam, Cadishead',
    description: 'Accredited EPC surveys across Salford, MediaCityUK, Eccles, and Swinton. Domestic EPC from £50, fast appointments, 24-48h certificate delivery.',
    content: 'Conveniently situated along the M60 corridor from our Bolton base, we provide rapid energy certification across Salford, MediaCityUK, Eccles, Swinton, and Walkden. We regularly work with landlords letting modern apartments and homeowners completing property sales in established neighbourhoods.',
    content2: 'Salford is a tale of two housing markets. Modern waterfront developments across Salford Quays (M50) and Blackfriars feature airtight cavity construction and integrated heat recovery systems. Conversely, established communities in Eccles, Swinton, and Little Hulton feature traditional post-war and Edwardian brick homes. Our assessors accurately record boiler efficiency, cylinder insulation jackets, and window glazing specs to deliver an accurate certificate for letting or selling.',
    geo: { lat: 53.483, lng: -2.270 },
  },
  {
    slug: 'stockport', name: 'Stockport',
    postcodes: 'SK1, SK2, SK3, SK4, SK5, SK6, SK7, SK8',
    neighbourhoods: 'Stockport Town Centre, Edgeley, Cheadle, Cheadle Hulme, Bramhall, Hazel Grove, Marple, Heaton Moor, Heaton Mersey, Reddish',
    description: 'Direct assessor booking across Stockport. Domestic EPC from £50, commercial from £144. 24-48 hour turnaround for sellers and letting agents.',
    content: 'From the Heatons down to Bramhall and Hazel Grove, Prime EPC provides domestic and commercial energy surveys throughout Stockport. We help homeowners, letting agents, and commercial landlords obtain valid compliance certificates without paying inflated estate agency margins.',
    content2: 'Stockport has a high concentration of 1930s bay-fronted semi-detached houses alongside handsome Victorian brick properties in Heaton Moor and Heaton Mersey. Introducing retrofitted cavity wall insulation, installing modern TRVs, and upgrading older gas boilers are the most reliable ways to move a D-rated family home into the energy-efficient C band.',
    geo: { lat: 53.410, lng: -2.157 },
  },
  {
    slug: 'tameside', name: 'Tameside',
    postcodes: 'OL5, OL6, OL7, M34, M43, SK14, SK15, SK16',
    neighbourhoods: 'Ashton-under-Lyne, Hyde, Stalybridge, Denton, Droylsden, Mossley, Dukinfield, Audenshaw',
    description: 'Accredited domestic and commercial EPCs across Tameside. Domestic EPC from £50, fast 24-48h turnaround in Ashton-under-Lyne, Hyde, and Denton.',
    content: 'We provide energy assessments throughout Tameside, covering Ashton-under-Lyne, Hyde, Denton, Stalybridge, and Droylsden. Whether you are letting a terraced investment or selling a family semi, we offer straightforward, fast booking directly with your surveyor.',
    content2: 'Tameside property stock includes dense rows of Victorian brick terraces in Ashton and Denton, mid-century residential estates in Droylsden, and stone-built hillside dwellings in Stalybridge and Mossley. For properties in older mining and mill areas, addressing uninsulated attic spaces and drafty suspended floors provides an immediate boost to your SAP energy efficiency rating.',
    geo: { lat: 53.489, lng: -2.091 },
  },
  {
    slug: 'trafford', name: 'Trafford',
    postcodes: 'M16, M17, M31, M32, M33, M41, WA13, WA14, WA15',
    neighbourhoods: 'Altrincham, Sale, Stretford, Urmston, Old Trafford, Hale, Bowdon, Timperley, Partington',
    description: 'Accredited EPC certificates across Trafford including Altrincham, Sale, Stretford, and Urmston. Domestic EPC from £50, fast 24-48h register lodgement.',
    content: 'Serving both residential and commercial clients across Trafford from retail units in Altrincham to family houses in Sale, Stretford, and Urmston, Prime EPC provides reliable energy certification with no third-party booking fees.',
    content2: 'Trafford features some of the North West most substantial Victorian and Edwardian properties in Hale, Bowdon, and Timperley, alongside extensive inter-war semi-detached avenues in Sale and Urmston. We evaluate these historic homes accurately to reflect your property real performance while identifying sensible energy-saving measures.',
    geo: { lat: 53.447, lng: -2.316 },
  },
  {
    slug: 'wigan', name: 'Wigan',
    postcodes: 'M29, M46, WA3, WA11, WN1, WN2, WN3, WN4, WN5, WN6, WN7',
    neighbourhoods: 'Wigan Town Centre, Standish, Leigh, Atherton, Hindley, Ashton-in-Makerfield, Orrell, Pemberton, Ince',
    description: 'Certified domestic and commercial EPCs in Wigan from £50. Quick turnaround across WN1 to WN7 for home sellers and rental landlords.',
    content: 'Just a short drive west down the A58 from our Bolton base, we carry out daily domestic and commercial EPC surveys across the Wigan Metropolitan Borough, including Leigh, Standish, Atherton, and Hindley.',
    content2: 'Wigan features a mix of coal-mining heritage terraces, inter-war social housing developments, and newer detached residential estates in Standish and Orrell. For private landlords managing terraced rentals in WN1, WN2, and WN7, completing an EPC alongside a mandatory landlord EICR in a single visit is the most cost-effective way to remain fully compliant with tenancy laws.',
    geo: { lat: 53.545, lng: -2.632 },
  },
  // Outside Greater Manchester
  {
    slug: 'blackburn', name: 'Blackburn',
    postcodes: 'BB1, BB2, BB3, BB4, BB5, BB6',
    neighbourhoods: 'Blackburn, Darwen, Accrington, Oswaldtwistle, Rishton, Great Harwood',
    description: 'Accredited domestic EPCs across Blackburn and Darwen from £50. Fast 24-48h certificate lodgement for landlords and private home sellers.',
    content: 'Covering Blackburn, Darwen, and Accrington, Prime EPC delivers independent energy certifications for residential sales, rental portfolios, and commercial units.',
    content2: 'Blackburn residential stock is heavily shaped by Victorian stone and brick terraced rows around Bastwell, Ewood, and Darwen. These uninsulated solid-wall properties often test near the minimum rental boundary (Band E). We explain practical, cost-effective adjustments such as modern condensing boiler installations, 270mm loft insulation, and smart programmer controls that raise properties into compliance without unnecessary expense.',
    geo: { lat: 53.748, lng: -2.482 },
  },
  {
    slug: 'chorley', name: 'Chorley',
    postcodes: 'PR6, PR7, PR25, PR26',
    neighbourhoods: 'Chorley Town Centre, Adlington, Euxton, Buckshaw Village, Coppull, Clayton-le-Woods, Leyland',
    description: 'Local accredited EPC assessments in Chorley, Adlington, and Buckshaw Village. Domestic EPC from £50 with official national register lodgement.',
    content: 'Directly bordering northern Bolton along the A6 corridor, Chorley is one of our most frequent survey locations. We conduct domestic and commercial energy surveys across Chorley town centre, Adlington, Euxton, and Buckshaw Village.',
    content2: 'Chorley offers an interesting contrast: traditional stone cottages and brick terraces in Adlington and Coppull sit alongside sustainable, modern timber-frame housing in Buckshaw Village. While new builds in PR7 typically secure strong B ratings, older period homes require precise evaluation of wall thicknesses and roof insulation depths to avoid unfair score penalties.',
    geo: { lat: 53.653, lng: -2.632 },
  },
  {
    slug: 'liverpool', name: 'Liverpool',
    postcodes: 'L1 - L38',
    neighbourhoods: 'City Centre, Baltic Triangle, Waterfront, Toxteth, Wavertree, Allerton, Aigburth, Crosby, Bootle, Kirkby',
    description: 'Professional domestic and commercial EPCs across Liverpool and Merseyside. Domestic EPC from £50, fast 24-48h turnaround for landlords and sellers.',
    content: 'We provide full regional coverage across Liverpool and Merseyside, carrying out energy surveys for private home sales, city-centre apartment lettings, student housing conversions, and commercial premises across all L postcodes.',
    content2: 'Liverpool urban landscape includes historic dockland and warehouse apartment conversions, extensive Victorian and Edwardian terraced rows in Wavertree and Toxteth, and suburban family semis in Allerton and Crosby. We routinely coordinate multi-property landlord inspections and estate agent key handovers to make obtaining your energy certificate seamless.',
    geo: { lat: 53.408, lng: -2.991 },
  },
  {
    slug: 'rossendale', name: 'Rossendale',
    postcodes: 'BB4, OL12, OL13',
    neighbourhoods: 'Rawtenstall, Bacup, Haslingden, Whitworth, Waterfoot, Crawshawbooth',
    description: 'Local accredited energy assessments across the Rossendale Valley. Domestic EPC from £50, 24-48h certificate lodgement in Rawtenstall and Bacup.',
    content: 'Serving the communities of the Rossendale Valley including Rawtenstall, Bacup, Haslingden, and Whitworth, Prime EPC delivers prompt energy performance surveys for property owners and local letting agents.',
    content2: 'Rossendale valley architecture is defined by quarry-stone cottages, elevated hillside terraces, and converted textile mills. Solid-stone construction combined with higher wind exposure means uninsulated properties often lose heat rapidly through exterior walls and roof pitches. Our qualified surveyors provide detailed assessments that accurately capture your building fabric and provide realistic upgrade steps.',
    geo: { lat: 53.700, lng: -2.285 },
  },
  {
    slug: 'st-helens', name: 'St Helens',
    postcodes: 'L34, L35, WA9, WA10, WA11',
    neighbourhoods: 'St Helens Town Centre, Haydock, Rainford, Rainhill, Prescot, Newton-le-Willows, Thatto Heath',
    description: 'Accredited EPC certificates across St Helens, Haydock, Prescot, and Rainhill. Domestic EPC from £50 with prompt 24-48h digital lodgement.',
    content: 'Operating across St Helens, Haydock, Rainhill, and Prescot, Prime EPC provides accredited domestic energy assessments, commercial SBEM surveys, and landlord compliance packages throughout WA and L postcodes.',
    content2: 'St Helens contains a solid mix of inter-war semi-detached properties, traditional industrial brick terraces, and modern commuter developments around Rainhill and Rainford. We help sellers and landlords secure valid certification quickly, ensuring all certificates are officially registered on the national database within 24 to 48 hours of our visit.',
    geo: { lat: 53.454, lng: -2.738 },
  },
  {
    slug: 'warrington', name: 'Warrington',
    postcodes: 'WA1, WA2, WA3, WA4, WA5, WA13',
    neighbourhoods: 'Warrington Town Centre, Stockton Heath, Lymm, Culcheth, Great Sankey, Birchwood, Appleton, Penketh',
    description: 'Professional EPC surveys across Warrington, Stockton Heath, Lymm, and Culcheth. Domestic EPC from £50, fast lodgement, no agency mark-ups.',
    content: 'Covering Warrington town centre, Stockton Heath, Lymm, Great Sankey, and Birchwood, Prime EPC delivers accredited residential and commercial energy assessments across Cheshire and the M62 corridor.',
    content2: 'Warrington features a diverse cross-section of properties: Victorian townhouses and terraces near the centre, leafy period homes and village cottages in Lymm and Stockton Heath, and modern developments in Great Sankey and Chapelford. We work directly with private sellers, local landlords, and commercial operators to provide accurate surveys with fast digital turnaround.',
    geo: { lat: 53.390, lng: -2.597 },
  },
];

export function findLocationByQuery(query: string): LocationData | null {
  if (!query || typeof query !== 'string') return null;
  const q = query.trim().toLowerCase();
  if (!q) return null;

  // 1. Exact or prefix match on slug / name
  const exact = targetLocations.find(
    (loc) => loc.slug === q || loc.name.toLowerCase() === q
  );
  if (exact) return exact;

  // 2. Query contains city name or city name contains query (length >= 3)
  const nameMatch = targetLocations.find(
    (loc) => q.includes(loc.name.toLowerCase()) || (q.length >= 3 && loc.name.toLowerCase().includes(q))
  );
  if (nameMatch) return nameMatch;

  // 3. Postcode match (e.g. "bl", "bl1", "bl2", "m", "m14", "ol", "wn", "sk")
  const cleanQ = q.replace(/[\s,]+/g, '');
  const postcodeMatch = targetLocations.find((loc) => {
    const pcs = loc.postcodes.toLowerCase().split(',').map((p) => p.trim().replace(/\s+/g, ''));
    return pcs.some((pc) => {
      // Extract prefix like "bl1" or "bl"
      return cleanQ.startsWith(pc) || pc.startsWith(cleanQ);
    });
  });
  if (postcodeMatch) return postcodeMatch;

  // 4. Neighbourhood match
  const neighMatch = targetLocations.find((loc) =>
    loc.neighbourhoods.toLowerCase().split(',').some((n) => {
      const trimmed = n.trim();
      return trimmed.length >= 3 && (q.includes(trimmed) || (q.length >= 4 && trimmed.includes(q)));
    })
  );
  if (neighMatch) return neighMatch;

  return null;
}

export function isNearMeQuery(query: string): boolean {
  if (!query) return false;
  const q = query.trim().toLowerCase();
  return (
    q.includes('near me') ||
    q.includes('nearby') ||
    q.includes('near') ||
    q.includes('closest') ||
    q.includes('local assessor') ||
    q.includes('local epc') ||
    q === 'here'
  );
}

export function isGeneralEpcQuery(query: string): boolean {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  return q === 'epc' || q === 'epcs' || q === 'energy performance certificate' || q === 'epc certificate';
}

export interface ServiceIntent {
  title: string;
  badge: string;
  lead: string;
  href: string;
  price: string;
  label: string;
}

export function findServiceByQuery(query: string): ServiceIntent | null {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  if (q.includes('commercial') || q.includes('sbem') || q.includes('business')) {
    return {
      title: 'Commercial EPC Assessments in Greater Manchester | From £144',
      badge: '🏢 Non-Domestic Energy Assessors — Level 3 & 4 Certified',
      lead: 'Accredited commercial EPC assessments across Greater Manchester and a 50-mile radius. Ensure legal MEES compliance (Band E minimum) for office, retail, and industrial premises.',
      href: '/commercial-epc',
      price: 'From £144',
      label: 'Commercial EPC Assessment',
    };
  }
  if (q.includes('eicr') || q.includes('electrical') || q.includes('wiring') || q.includes('safety check')) {
    return {
      title: 'Landlord EICR Electrical Safety Reports | From £110',
      badge: '⚡ Certified Electrical Installation Condition Reports',
      lead: 'Mandatory 5-year landlord electrical inspections across Greater Manchester. Qualified electricians, full digital PDF reports for tenants and councils within 24–48 hours.',
      href: '/eicr',
      price: 'From £110',
      label: 'Landlord EICR Electrical Report',
    };
  }
  if (q.includes('landlord') || q.includes('bundle') || q.includes('package') || q.includes('both')) {
    return {
      title: 'Landlord Compliance Package: Combined EPC & EICR in 1 Visit',
      badge: '⚡ All-in-One Landlord Compliance — Save Time & Call-Outs',
      lead: 'Combine your Domestic EPC and statutory 5-year Landlord EICR into a single coordinated visit. 1 appointment, 1 invoice, complete 100% rental legal compliance.',
      href: '/landlord-certificates',
      price: 'From £160',
      label: 'Landlord Compliance Package',
    };
  }
  if (q.includes('floor plan') || q.includes('cad') || q.includes('drafting') || q.includes('lease plan')) {
    return {
      title: 'CAD Floor Plans & Lease Plans in Greater Manchester',
      badge: '📐 Architectural Precision for Agents, Landlords & Conveyancers',
      lead: 'Professional 2D and 3D layout floor plans and Land Registry-compliant lease plans drafted across Greater Manchester with rapid 24h digital turnaround.',
      href: '/floor-plans-drafting',
      price: 'Quote on Request',
      label: 'CAD Floor Plans & Lease Plans',
    };
  }
  if (q.includes('bulk') || q.includes('portfolio') || q.includes('multiple') || q.includes('blocks')) {
    return {
      title: 'Bulk EPC Orders for Landlords & Property Portfolios',
      badge: '📦 Multi-Property Volume Discounts Across Greater Manchester',
      lead: 'Discounted volume rates for letting agents, social housing providers, and private landlords managing multiple residential or commercial units.',
      href: '/bulk-epc',
      price: 'Volume Rates',
      label: 'Bulk EPC Orders',
    };
  }
  return null;
}

export function findNearestLocation(lat: number, lng: number): LocationData {
  let closest = targetLocations[0];
  let minDistance = Infinity;

  for (const loc of targetLocations) {
    if (!loc.geo) continue;
    const dLat = ((loc.geo.lat - lat) * Math.PI) / 180;
    const dLng = ((loc.geo.lng - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((loc.geo.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = 6371 * c; // Earth radius in km
    if (d < minDistance) {
      minDistance = d;
      closest = loc;
    }
  }

  return closest;
}