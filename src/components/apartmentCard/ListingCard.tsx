import './listingCard.scss'
import { useState } from 'react';

export const ListingCard = ({ location, description, features, dates, rent, apartmentImg}) => {

    const [isLiked, setIsLiked] = useState(false);

    const heartColor = isLiked ? "#FF0000" : "#BDBDBD";

    return (
      <>
        <div className="listingCard">
          <div className="imageContainer">
                <img src={apartmentImg} alt="Apartment"/>
          </div>

          <div className="text">
            <div className="locationText">{location}</div>
            <hr/>
            <div className="description">{description}</div>

            <div className="allTags">
              {features.map((feature, index) => (
                <div key={index} className='tag'>{feature}</div>
              ))}
            </div>

            <div className="bottomRow">
                <div className="datesRent">
                  {dates}
                  <br/> {rent}/month
                </div>
              <div className="heart" onClick={ () => setIsLiked(!isLiked)}>
                {/* Heart icon */}
                <svg width="40" height="40" viewBox="0 0 55 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9055 13.3268L27.5493 27.9707L42.1932 13.3268" stroke={heartColor} strokeWidth="25.4675" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
        </div>
        </div>
      </>
    );
  };



