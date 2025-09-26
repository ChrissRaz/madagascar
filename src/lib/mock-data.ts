import type { Petition, User } from './definitions';

export const MOCK_PETITIONS: Petition[] = [
  {
    id: 'p1',
    title: 'Improve Public Transportation in Antananarivo',
    description: 'Demand for a more reliable, safe, and efficient public transport system in the capital city.',
    longDescription: 'The current state of public transportation in Antananarivo is a daily struggle for its citizens. Overcrowded buses, unpredictable schedules, and safety concerns are rampant. We, the undersigned, urge the local government to invest in modernizing the transport network, introducing more buses, implementing a fixed schedule system, and ensuring passenger safety to improve the quality of life for everyone.',
    signatures: 12534,
    imageId: 'public-transport',
  },
  {
    id: 'p2',
    title: 'Protect Madagascar\'s Unique Biodiversity',
    description: 'A call to strengthen conservation efforts against deforestation and illegal wildlife trade.',
    longDescription: 'Madagascar is a global biodiversity hotspot, with thousands of species found nowhere else on Earth. However, this natural heritage is under severe threat from deforestation, illegal logging, and the illicit wildlife trade. We call upon the government and international partners to enforce stricter environmental laws, empower local communities in conservation, and secure the future of our unique ecosystems.',
    signatures: 8745,
    imageId: 'biodiversity',
  },
  {
    id: 'p3',
    title: 'Ensure Access to Clean Water for Rural Communities',
    description: 'Petition for investment in infrastructure to provide clean and safe drinking water across the nation.',
    longDescription: 'Access to clean water is a fundamental human right, yet many rural communities in Madagascar lack this basic necessity. Waterborne diseases are a constant threat, particularly to children. This petition demands that the government prioritize and invest in building wells, water purification systems, and pipe networks to ensure every citizen has access to safe drinking water.',
    signatures: 21887,
    imageId: 'clean-water',
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
