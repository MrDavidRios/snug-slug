export type Listing = {
  id: number;
  ownerId: number;
  location: string;
  overview: string;
  details: string[];
  requirements: string[];
  additionalInfo: string[];
  tags: string[];
  dates: string;
  rent: number;
  apartmentImgUrls: string[];
};
