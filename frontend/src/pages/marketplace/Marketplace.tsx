import { useState } from "react";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";

export const Marketplace: React.FC = () => {
  const [showDetailedListing, setShowDetailedListing] = useState(false);

  return <div id="marketplacePageWrapper">{showDetailedListing && <DetailedListing />}</div>;
};
