export interface Petition {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  signatures: number;
  imageId: string; // references id in placeholder-images.json
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
