export interface LocationData {
  slug: string;
  name: string;
  postcodes: string;
  description: string;
}

export const targetLocations: LocationData[] = [
  { slug: 'bolton', name: 'Bolton', postcodes: 'BL1 - BL7', description: 'Fast 24-48h certificates for landlords & sellers in Bolton.' },
  { slug: 'manchester', name: 'Manchester', postcodes: 'M1 - M60', description: 'Official EPC certificates across Greater Manchester.' },
  { slug: 'salford', name: 'Salford', postcodes: 'M3, M5, M6, M50', description: 'Accredited EPCs across Salford and Salford Quays.' },
  { slug: 'oldham', name: 'Oldham', postcodes: 'OL1 - OL9', description: 'Direct assessor booking in Oldham.' },
  { slug: 'blackburn', name: 'Blackburn', postcodes: 'BB1 - BB12', description: 'Fixed £50 pricing and MEES compliance in Blackburn.' },
  { slug: 'stockport', name: 'Stockport', postcodes: 'SK1 - SK7', description: 'Domestic and commercial EPC certificates in Stockport.' },
  { slug: 'rochdale', name: 'Rochdale', postcodes: 'OL11 - OL16', description: '£50 fixed fee and official 24-48 hour turnaround in Rochdale.' },
  { slug: 'warrington', name: 'Warrington', postcodes: 'WA1 - WA5', description: 'Professional EPC surveys in Warrington and Cheshire.' },
  { slug: 'liverpool', name: 'Liverpool', postcodes: 'L1 - L38', description: 'Full regional coverage across Liverpool and Merseyside.' }
];
