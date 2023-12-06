import { Listing } from "../types/listing";

export function savedListingsListener(setSavedListings: React.Dispatch<React.SetStateAction<Listing[]>>) {
  return () => {
    const updatedSavedListings = () => {
      const updatedSavedListings = JSON.parse(localStorage.getItem("savedListings") ?? "[]");
      setSavedListings(updatedSavedListings);
    };

    window.addEventListener("storage", updatedSavedListings);

    return () => {
      window.removeEventListener("storage", updatedSavedListings);
    };
  };
}
