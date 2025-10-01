export interface Petition {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  signatures: number;
  imageId: string; 
  startDate: string,
  endDate: string,
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}


export interface StatisticsTheme {
  _id: string;
  title: string;
  total: number;
  ageStats: { range: string; count: number }[];
  regionStats: { region: string; count: number }[];
  aiSummary: string;
}