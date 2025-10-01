import type { Petition, User } from './definitions';

export const MOCK_PETITIONS: Petition[] = [
  {
    id: 'p1',
    title: 'Stratejia ho an\'ny Tolona',
    description: 'Raha ny hevitrao, inona no tokony handresena amin\'ity tomlom-bahoaka ity ?',
    longDescription: 'The current state of public transportation in Antananarivo is a daily struggle for its citizens. Overcrowded buses, unpredictable schedules, and safety concerns are rampant. We, the undersigned, urge the local government to invest in modernizing the transport network, introducing more buses, implementing a fixed schedule system, and ensuring passenger safety to improve the quality of life for everyone.',
    signatures: 12534,
    imageId: 'public-transport',
    startDate: '30/09/2025 10:30',
    endDate: '02/09/2025 12:00',
  },
  {
    id: 'p2',
    title: 'Inona ny rafi-pitondrana hitanao fa mety kokoa ho an\'i Madagasikara ?',
    description: 'Ho an\ilay Madagasikara maharitra sy mandroso, inona ny rafitra tianao ho hita eto amin\'ny firenena ?',
    longDescription: 'Madagascar is a global biodiversity hotspot, with thousands of species found nowhere else on Earth. However, this natural heritage is under severe threat from deforestation, illegal logging, and the illicit wildlife trade. We call upon the government and international partners to enforce stricter environmental laws, empower local communities in conservation, and secure the future of our unique ecosystems.',
    signatures: 8745,
    imageId: 'biodiversity',
    startDate: '30/09/2025 10:30',
    endDate: '02/09/2025 12:00',
  },
  {
    id: 'p3',
    title: 'Iza no eritreretinao fa tokony ho tokony hitondra ny Tetezamita ?',
    description: 'Raha ianao dia iza no olona eritreretinao tokony hitantanan ny tetezamina ary inona no tokony ataony sy aminy fomba ahoana.',
    longDescription: 'Access to clean water is a fundamental human right, yet many rural communities in Madagascar lack this basic necessity. Waterborne diseases are a constant threat, particularly to children. This petition demands that the government prioritize and invest in building wells, water purification systems, and pipe networks to ensure every citizen has access to safe drinking water.',
    signatures: 21887,
    imageId: 'clean-water',
    startDate: '30/09/2025 10:30',
    endDate: '02/09/2025 12:00',
  },
];

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'Ravo B.',
        email: 'user@example.com',
        phone: '+261340000000',
    }
];
