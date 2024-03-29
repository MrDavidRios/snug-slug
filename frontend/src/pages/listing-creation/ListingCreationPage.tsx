import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../../components/UserContext";
import { Button } from "../../components/button/Button";
import { DatePickerDropdown } from "../../components/datePickerDropdown/DatePickerDropdown";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Input } from "../../components/input/Input";
import { TextArea } from "../../components/textArea/TextArea";
import { getYMDString } from "../../utils/datefunctions";
import { NewListing, createListing } from "../../utils/listingDataHelper";

export const ListingCreationPage: React.FC = () => {
  const { slug } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  // price
  const [price, setPrice] = useState("");
  // Function to generate price options
  const generatePriceOptions = () => {
    const options = [];
    for (let i = 100; i <= 5001; i += 100) {
      // Change 100 to your desired increment
      options.push(`$${i}`);
    }
    return options;
  };
  const priceOptions = generatePriceOptions();
  const handlePriceChange = (selectedOption: string) => {
    setPrice(selectedOption);
  };

  // apartmentType
  const [apartmentType, setApartmentType] = useState<string>("");
  const generateApartmentTypeOptions = () => {
    const options = ["Studio", "Apartment", "Townhouse", "Other"];
    return options;
  };

  const apartmentTypeOptions = generateApartmentTypeOptions();
  // Functions to handle input change
  const handleApartmentTypeChange = (selectedOption: string) => {
    setApartmentType(selectedOption);
  };

  // utilitiesIncluded
  const [utilitiesIncluded, setUtilitiesIncluded] = useState("");
  const utilitiesIncludedOptions = ["All Utilities Included", "Utilities Partially Included", "No Utilities Included"];
  const handleUtilitiesIncluded = (selectedOption: string) => {
    setUtilitiesIncluded(selectedOption);
  };

  // dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // shared
  const [shared, setShared] = useState("");
  const sharedOptions = ["Private", "1 Roommate", "2 Roommates", "3 Roommates", "4+ Roommates"];
  const handleSharedChange = (selectedOption: string) => {
    setShared(selectedOption);
  };

  // furnished
  const [furnished, setFurnished] = useState("");
  const furnishedOptions = ["Fully Furnished", "Partially Furnished", "Not Furnished"];
  const handleFurnishedChange = (selectedOption: string) => {
    setFurnished(selectedOption);
  };

  // neighborhood
  const [neighborhood, setNeighborhood] = useState("");
  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeighborhood(e.target.value);
  };

  // neighborhood
  const [streetAddress, setStreetAddress] = useState("");
  const handleStreetAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetAddress(e.target.value);
  };

  // shortDescription
  const [shortDescription, setShortDescription] = useState("");
  const handleShortDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShortDescription(e.target.value);
  };

  // interview
  const [interview, setInterview] = useState("");
  const interviewOptions = [
    "Interview and Background Check Required",
    "Background Check Required",
    "Interview Required",
    "Other Verification Required",
    "No Background Check and Interview Required",
  ];
  const handleInterviewChange = (selectedOption: string) => {
    setInterview(selectedOption);
  };

  // deposit
  const [deposit, setDeposit] = useState("");
  const depositOptions = ["Security Deposit", "First/Last Month's Rent", "Other Deposit", "No Deposit"];
  const handleDepositChange = (selectedOption: string) => {
    setDeposit(selectedOption);
  };

  // gender
  const [gender, setGender] = useState("");
  const genderOptions = [
    "No Preference for Gender",
    "Women and Gender Diverse Only",
    "Women Only",
    "Men Only",
    "Other",
  ];
  const handleGenderChange = (selectedOption: string) => {
    setGender(selectedOption);
  };

  // otherPreferences
  const [otherPreferences, setOtherPreferences] = useState("");
  const handleOtherPreferencesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOtherPreferences(e.target.value);
  };

  // pet
  const [pet, setPet] = useState("");
  const petOptions = [
    "Sorry, no pets allowed.",
    "Pets are welcome!",
    "Depends - let's discuss on a case-by-case basis.",
  ];
  const handlePetChange = (selectedOption: string) => {
    setPet(selectedOption);
  };

  // pet
  const [laundry, setLaundry] = useState("");
  const laundryOptions = ["There's laundry in-unit.", "There's laundry in the building.", "No laundry in building."];
  const handleLaundryChange = (selectedOption: string) => {
    setLaundry(selectedOption);
  };

  // gym
  const [gym, setGym] = useState("");
  const gymOptions = [
    "There's a full gym in-building!",
    "There's limited fitness facilities in-building",
    "There's no gym in the building.",
  ];
  const handleGymChange = (selectedOption: string) => {
    setGym(selectedOption);
  };

  // otherAmenities
  const [otherAmenities, setOtherAmenities] = useState("");
  const hanldeOtherAmenitites = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOtherAmenities(e.target.value);
  };

  const handleSubmit = async () => {
    if (!slug) {
      console.error("Can't submit a listing without being logged in!");
    }

    const requirements = [interview, deposit, gender, otherPreferences].filter((value) => value !== "");
    const additionalInfo = [pet, laundry, gym, otherAmenities].filter((value) => value !== "");

    const listing: NewListing = {
      ownerId: slug!.id,
      location: `${streetAddress}, ${neighborhood}`,
      overview: shortDescription,
      details: [apartmentType, shared, furnished, utilitiesIncluded],
      requirements: requirements,
      additionalInfo: additionalInfo,
      tags: [furnished, gym],
      startDate: startDate,
      endDate: endDate,
      rent: parseInt(price.replace("$", "")),
      apartmentImgUrls: ["images/apartment.png"], // Placeholder
    };

    await createListing(listing);

    navigate("/listing");
  };

  return (
    <div id="listingCreationPageWrapper">
      <div id="title">
        <h1>New Listing</h1>
      </div>

      <div id="section">
        <h3>Share some information about your place!</h3>

        <div id="entry">
          <Dropdown
            options={priceOptions}
            style={{ width: 220 }}
            placeholder="Monthly Rent"
            onChange={handlePriceChange}
          />
        </div>

        <div id="entry">
          <Dropdown
            options={utilitiesIncludedOptions}
            style={{ width: 220 }}
            placeholder="Utilities Included"
            onChange={handleUtilitiesIncluded}
          />
        </div>

        <div id="entry">
          <DatePickerDropdown
            startDate={startDate === "" ? null : new Date(startDate)}
            endDate={endDate === "" ? null : new Date(endDate)}
            placeholder="Select Date Availabiity"
            onChange={(e) => {
              setStartDate(getYMDString(e.startDate));
              setEndDate(getYMDString(e.endDate));
            }}
          />
        </div>

        <div id="entry">
          <Dropdown
            options={apartmentTypeOptions}
            style={{ width: 220 }}
            placeholder="Apartment Type"
            onChange={handleApartmentTypeChange}
          />
        </div>

        <div id="entry">
          <Dropdown
            options={sharedOptions}
            style={{ width: 220 }}
            placeholder="Shared?"
            onChange={handleSharedChange}
          />
        </div>

        <div id="entry">
          <Dropdown
            options={furnishedOptions}
            style={{ width: 220 }}
            placeholder="Furnished?"
            onChange={handleFurnishedChange}
          />
        </div>

        <div id="entry">
          <Input value={neighborhood} onChange={handleNeighborhoodChange} placeholder="Neighborhood" />
        </div>

        <div id="entry">
          <Input value={streetAddress} onChange={handleStreetAddressChange} placeholder="Street Address" />
        </div>

        <div id="entry">
          <TextArea
            value={shortDescription}
            onChange={handleShortDescriptionChange}
            placeholder="Short Description"
            style={{ height: 100 }}
          />
        </div>
      </div>

      <div id="section">
        <h3>Who are you looking for to sublease your space?</h3>

        <div id="entry">
          <Dropdown
            options={interviewOptions}
            placeholder="Interview, Background Check etc."
            style={{ width: 360 }}
            onChange={handleInterviewChange}
          />
        </div>

        <div id="entry">
          <Dropdown options={depositOptions} placeholder="Security Deposit" onChange={handleDepositChange} />
        </div>

        <div id="entry">
          <Dropdown
            options={genderOptions}
            style={{ width: 300 }}
            placeholder="Gender of Sublessee"
            onChange={handleGenderChange}
          />
        </div>

        <div id="entry">
          <TextArea
            value={otherPreferences}
            onChange={handleOtherPreferencesChange}
            placeholder="Do you have other preferences for sublessees?"
            style={{ height: "50px" }}
          />
        </div>
      </div>

      <div id="section">
        <h3>A few more questions about your place!</h3>

        <div id="entry">
          <Dropdown
            options={petOptions}
            style={{ width: 360 }}
            placeholder="Is your space pet-friendly?"
            onChange={handlePetChange}
          />
        </div>

        <div id="entry">
          <Dropdown
            options={laundryOptions}
            style={{ width: 260 }}
            placeholder="What's the laundry situation?"
            onChange={handleLaundryChange}
          />
        </div>

        <div id="entry">
          <Dropdown
            options={gymOptions}
            style={{ width: 360 }}
            placeholder="Does your building have a gym?"
            onChange={handleGymChange}
          />
        </div>

        <div id="entry">
          <TextArea
            value={otherAmenities}
            onChange={hanldeOtherAmenitites}
            placeholder="What are other things to know about your building and space?"
            style={{ height: "50px" }}
          />
        </div>
      </div>

      <div id="section">
        <h3>Show off your space with images and videos!</h3>

        <div id="mediaSection">
          <div id="image">
            {" "}
            <em>Bedroom</em>{" "}
          </div>
          <div id="image">
            {" "}
            <em>Living Space</em>{" "}
          </div>
          <div id="image">
            {" "}
            <em>Bathroom</em>
          </div>
        </div>
      </div>
      <br />
      <Button onClick={handleSubmit} text="All done! Share my listing." className="action" />
    </div>
  );
};
