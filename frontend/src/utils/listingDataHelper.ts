import { Listing } from "../types/listing";

/**
 * A listing type that can be used to create a new listing in the database
 */
export interface NewListing extends Omit<Listing, "id"> {}

export async function createListing(listing: NewListing) {
  const response = await fetch("http://127.0.0.1:8080/api/snugslug/createListing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listing),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getListing(id: number): Promise<Listing> {
  const response = await fetch(`http://127.0.0.1:8080/api/snugslug/getListing/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getActiveListing(ownerId: number): Promise<Listing> {
  const response = await fetch(`http://127.0.0.1:8080/api/snugslug/getActiveListing/${ownerId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function modifySavedListing(userId: number, listingId: number, remove = false) {
  const action = remove ? "delete" : "add";
  const response = await fetch(
    `http://127.0.0.1:8080/api/snugslug/${action}SavedListing?userId=${userId}&listingId=${listingId}`,
    {
      method: remove ? "DELETE" : "POST",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getSavedListings(userId: number): Promise<Listing[]> {
  const response = await fetch(`http://127.0.0.1:8080/api/snugslug/getSavedListings/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Listing[] = await response.json();
  return data;
}
