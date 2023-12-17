export type Listing = {
  id: number;
  ownerId: number;
  location: string;
  overview: string;
  details: string[];
  requirements: string[];
  additionalInfo: string[];
  tags: string[];

  /**
   * Start date; format is "YYYY-MM-DD"
   */
  startDate: string;

  /**
   * End date; format is "YYYY-MM-DD"
   */
  endDate: string;

  rent: number;
  apartmentImgUrls: string[];
};
