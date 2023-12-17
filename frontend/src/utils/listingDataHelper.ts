import { Listing } from "../types/listing";

export async function createListing(listing: Listing) {
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
