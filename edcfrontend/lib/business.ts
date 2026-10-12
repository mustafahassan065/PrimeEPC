export const BUSINESS = {
  name: 'Prime EPC & Design Consultants',
  legalName: 'Prime EPC & Design Consultant Ltd',
  companyNumber: '17307524',
  url: 'https://www.primeepcdesign.co.uk',
  phoneDisplay: '07308 658247',
  phoneIntl: '+447308658247',
  email: 'info@primeepcdesign.co.uk',
  street: '17 Bromwich Street',
  locality: 'Bolton',
  region: 'Greater Manchester',
  postcode: 'BL2 1JF',
  geo: { lat: 53.578, lng: -2.429 },
  prices: {
    domesticEpc: 50,
    commercialEpcFrom: 144,
    eicrFrom: 110,
  },
  hours: [
    { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '21:00' },
    { days: ['Saturday','Sunday'], opens: '10:00', closes: '18:00' },
  ],
  sameAs: [
    'https://uk.trustpilot.com/review/primeepcdesign.co.uk',
  ],
} as const