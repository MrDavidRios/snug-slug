import React from "react";
import { ListingCard } from "../../components/apartmentCard/ListingCard";
import { Carousel } from "../../components/carousel/Carousel";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Modal } from "../../components/modal/Modal";
import { Listing } from "../../types/listing";

const testListing: Listing = {
  location: "1234 Test Street",
  overview: "This is a test listing",
  details: ["This is a test listing"],
  requirements: ["This is a test listing"],
  additionalInfo: ["This is a test listing"],
  tags: ["tag1", "tag2", "tag3"],
  dates: "01/01/2021 - 01/01/2022",
  rent: 1000,
  apartmentImgUrls: [
    "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU",
  ],
};

/* Carousel Test Code */
const testApartmentImgUrls = [
  "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU",
  "https://cdn.vox-cdn.com/thumbor/zVuv0s-NzoqRQef_zb91-X8sT88=/0x0:1800x1168/1200x800/filters:focal(733x429:1021x717)/cdn.vox-cdn.com/uploads/chorus_image/image/63048549/logan_apartments.6.jpg",
  "https://www.interiorzine.com/wp-content/uploads/2017/11/50-ways-to-make-a-small-space-more-livable.jpg",
];

export const Test: React.FC = () => {
  const [showModal, setShowModal] = React.useState(true);

  return (
    <div>
      <Carousel imgUrls={testApartmentImgUrls} />
      <Dropdown options={["Option 1", "Option 2", "Option 3"]} placeholder="Select an Option" />
      <ListingCard listing={testListing} locationIndex={0} />
      {showModal && (
        <Modal title="Test" onClose={() => setShowModal(false)}>
          Hey there!
        </Modal>
      )}
    </div>
  );
};
