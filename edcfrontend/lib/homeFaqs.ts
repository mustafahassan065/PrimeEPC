export interface FaqItem {
  question: string
  answer: string
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'How much does an EPC cost in Bolton, Manchester, and the North West?',
    answer: 'Domestic EPCs with Prime EPC & Design Consultants start from £50 for standard flats and terraced homes across Bolton, Greater Manchester, Merseyside, Lancashire, and Cheshire. Larger detached houses or homes with extensions are priced transparently by size. Commercial EPCs start from £144 and landlord EICRs start from £110, with zero estate agent commission mark-ups.'
  },
  {
    question: 'When is my 5-year landlord EICR electrical safety report due for renewal?',
    answer: 'Under the Electrical Safety Standards in the Private Rented Sector Regulations, private and social rented homes in England must have an EICR inspection renewed at least every 5 years by a BS 7671 18th Edition qualified inspector. Our landlord EICR renewals start from £110 and can be completed alongside a domestic EPC in a single visit.'
  },
  {
    question: 'Do I need a Commercial EPC for a shop, office, or warehouse lease renewal?',
    answer: 'Yes. A valid Non-Domestic Commercial EPC rated Band E or above is legally required under Commercial MEES rules whenever a commercial building is sold, let, or undergoes a lease renewal. Our accredited Level 3 and Level 4 SBEM commercial surveys start from £144.'
  },
  {
    question: 'Do you provide EPCs and floor plans for HMO and Selective Licensing applications?',
    answer: 'Yes. Local councils across Manchester, Salford, Bolton, Wigan, and Liverpool require a valid EPC and an accurate floor plan showing room dimensions in square metres for HMO and Selective Licensing applications. We complete your RdSAP 10 EPC, 5-year EICR, and RICS laser-measured floor plan in one coordinated visit.'
  },
  {
    question: 'Should I book a new EPC after installing a new boiler, loft insulation, or double glazing?',
    answer: 'Yes. If your existing EPC is expired or sits in Band D or E, booking a fresh RdSAP 10 assessment (starting from £50) after topping up loft insulation to 270mm, fitting thermostatic radiator valves (TRVs), or upgrading your boiler updates your official score on the GOV.UK register ahead of a sale, remortgage, or the 1 October 2030 EPC Band C rental deadline.'
  }
]
