export interface LocationData {
  slug: string;
  name: string;
  postcodes: string;
  description: string;
}

export const targetLocations: LocationData[] = [
  // Greater Manchester
  { slug: 'bolton',      name: 'Bolton',      postcodes: 'BL1, BL2, BL3, BL4, BL5, BL6, BL7',                    description: 'Fast 24-48h EPC certificates for landlords & sellers across Bolton, Horwich, Farnworth, Westhoughton and surrounding areas.' },
  { slug: 'bury',        name: 'Bury',        postcodes: 'BL0, BL8, BL9, M25, M26, M45',                          description: 'Accredited EPC certificates across Bury, Radcliffe, Whitefield, Prestwich, Ramsbottom and surrounding areas.' },
  { slug: 'manchester',  name: 'Manchester',  postcodes: 'M1, M2, M3, M4, M8, M9, M11, M12, M13, M14, M15, M16, M18, M19, M20, M21, M22, M23, M40', description: 'Official EPC certificates across Greater Manchester city centre and all surrounding districts.' },
  { slug: 'oldham',      name: 'Oldham',      postcodes: 'OL1, OL2, OL3, OL4, OL8, OL9, M24, M35',               description: 'Direct assessor booking in Oldham, Chadderton, Royton, Shaw, Saddleworth and surrounding areas.' },
  { slug: 'rochdale',    name: 'Rochdale',    postcodes: 'OL10, OL11, OL12, OL15, OL16, M24',                     description: 'Starting from £50 fee EPC certificates across Rochdale, Heywood, Middleton, Littleborough and surrounding areas.' },
  { slug: 'salford',     name: 'Salford',     postcodes: 'M3, M5, M6, M7, M27, M28, M30, M38, M44, M50',         description: 'Accredited EPCs across Salford, Eccles, Swinton, Worsley, Walkden and Salford Quays.' },
  { slug: 'stockport',   name: 'Stockport',   postcodes: 'SK1, SK2, SK3, SK4, SK5, SK6, SK7, SK8',                description: 'Domestic and commercial EPC certificates across Stockport, Cheadle, Bramhall, Marple and surrounding areas.' },
  { slug: 'tameside',    name: 'Tameside',    postcodes: 'OL5, OL6, OL7, M34, M43, SK14, SK15, SK16',             description: 'EPC certificates across Tameside including Ashton-under-Lyne, Hyde, Stalybridge, Denton and Droylsden.' },
  { slug: 'trafford',    name: 'Trafford',    postcodes: 'M16, M17, M31, M32, M33, M41, WA13, WA14, WA15',       description: 'Accredited EPC certificates across Trafford including Altrincham, Sale, Stretford, Urmston and Old Trafford.' },
  { slug: 'wigan',       name: 'Wigan',       postcodes: 'M29, M46, WA3, WA11, WN1, WN2, WN3, WN4, WN5, WN6, WN7', description: 'EPC certificates across Wigan, Leigh, Atherton, Hindley, Ashton-in-Makerfield and surrounding areas.' },
  // Outside Greater Manchester
  { slug: 'blackburn',   name: 'Blackburn',   postcodes: 'BB1, BB2, BB3, BB4, BB5, BB6',                          description: 'Starting from £50 EPC pricing across Blackburn, Darwen, Accrington, Oswaldtwistle and surrounding areas.' },
  { slug: 'chorley',     name: 'Chorley',     postcodes: 'PR6, PR7, PR25, PR26',                                  description: 'EPC certificates across Chorley, Leyland, Adlington, Euxton, Buckshaw Village and surrounding areas.' },
  { slug: 'liverpool',   name: 'Liverpool',   postcodes: 'L1 - L38',                                              description: 'Full regional coverage across Liverpool and Merseyside.' },
  { slug: 'rossendale',  name: 'Rossendale',  postcodes: 'BB4, OL12, OL13',                                       description: 'EPC certificates across Rossendale, Rawtenstall, Bacup, Haslingden and Whitworth.' },
  { slug: 'st-helens',   name: 'St Helens',   postcodes: 'L34, L35, WA9, WA10, WA11',                            description: 'Accredited EPC certificates across St Helens, Haydock, Prescot, Rainhill and surrounding areas.' },
  { slug: 'warrington',  name: 'Warrington',  postcodes: 'WA1, WA2, WA3, WA4, WA5, WA13',                       description: 'Professional EPC surveys across Warrington, Lymm, Stockton Heath, Culcheth and surrounding areas.' },
];