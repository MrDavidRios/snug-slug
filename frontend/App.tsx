import { useState } from "react";
// import { Button } from "./components/button/Button";
// import { Hero } from "./components/hero/Hero";
import { ListingCard } from "./components/apartmentCard/ListingCard";
// import { ApartmentImg } from "./assets/apartment.png";


import { AllListings } from "./components/alllListings/allListings";

function App() {
  // const [count, setCount] = useState(0);
  
  const sampleListings = [
    {
      location:"76th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    },
    {
      location:"76th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    },
    {
      location:"76th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    },
    {
      location:"76th Street, Upper West Side",
      description:"1 Bedroom in a 3 Bedroom suite",
      features:["In-unit washer", "Dog friendly"],
      dates:"May 15 - Aug 31",
      rent:"$1500",
      apartmentImg: "src/assets/apartment.png"
    }
  ];

  return (
    <>
    <AllListings listings={sampleListings} />
      {/* <ListingCard 
            location="76th Street, Upper West Side"
            description="1 Bedroom in a 3 Bedroom suite"
            features={["In-unit washer", "Dog friendly"]}
            dates="May 15 - Aug 31"
            rent="$1500"
            apartmentImg= { "src/assets/apartment.png" }
            locationIndex= "1"
        /> */}
      {/* <Hero/> */}
      {/* <h1>Snug Slug</h1> */}
      {/* <div className="card">
        <p>{`Count is ${count}`}</p>
        <br />
        <Button onClick={() => setCount((count) => count + 1)} text="Click me!" />
      </div> */}
    </>
  );
}

export default App;
