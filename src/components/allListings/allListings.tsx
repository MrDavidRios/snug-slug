// import { useState } from 'react';
import './allListings.scss';
import { ListingCard } from '../apartmentCard/ListingCard';

export const AllListings = ({listings}) => {
    return (
        <>
        {/* Create a 3-card wide grid */}
        <div className='listingGrid'>
            {listings.map((listing,index) =>(
                <ListingCard
                location={listing.location}
                description={listing.description}
                features={listing.features}
                dates={listing.dates}
                rent={listing.rent}
                apartmentImg={listing.apartmentImg}
                locationIndex={index+1}
                key={index+1}
                />
            ))}
        </div>
        </>)
}