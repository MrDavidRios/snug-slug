import { ListingView } from "./components/listingsView/listingsView";
import { ListingCard } from "./components/apartmentCard/ListingCard";
import { PersonCard } from "./components/personCard/PersonCard";

function App() {
  // const [count, setCount] = useState(0);
  
  const sampleListings = [
    {
      location:"123i1923iu1293th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    },
    {
      location:"7!@#!@#N6th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    },
    {
      location:"KEVIN GRANT LI6th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    },
    {
      location:"912312876th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    }
  ];

  const myListing = { 
    location:"76th Street, Upper West Side",
    description:"1 Bedroom in a 3 Bedroom suite",
    features:["In-unit washer", "Dog friendly"],
    dates:"May 15 - Aug 31",
    rent:"$1500",
    apartmentImg:"src/assets/apartment.png",
    locationIndex:"1"}

  const myPerson = {

    firstName: "Jenny",
    lastName: "Myles",
    pronouns: "she/her", 
    age: "22",
    affiliation: "Columbia College",
    classYear: "2025",
    bio: "I am a junior studying CS. I have an internship in NYC this summer, and I am looking to sublease! I am friendly, responsible, and outgoing!",
    personImg: "src/assets/jennymyles.jpeg",
    email: "jm1234@columbia.edu",
    budget: "$1250 - 1750",
    dates: "May 5 - Aug 15",
  }

  return (
    // <>
    // <ListingView listings={sampleListings} />
    // </>

    // <ListingCard listing={myListing} />

    <PersonCard person={myPerson} /> 
  );
}


export default App;
