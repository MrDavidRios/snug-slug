import { Slug } from "./slug";

export type Listing = {
  id: number;
  owner: Slug;
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
