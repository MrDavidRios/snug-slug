from flask import request
from flask_restful import Resource
from datetime import datetime
from models import Listing, User, db

class GetListingApiHandler(Resource):
    def get(self, id):
        listing = Listing.query.get(id)
        
        if not listing:
            return {'message': 'Listing not found'}, 404
        
        listing_json = {
            'id': listing.id,
            'ownerId': listing.owner.id if listing.owner else None,
            'location': listing.location,
            'overview': listing.overview,
            'details': listing.details,
            'tags': listing.tags,
            'requirements': listing.requirements,
            'additionalInfo': listing.additional_info,
            'startDate': listing.start_date.strftime('%Y-%m-%d'),
            'endDate': listing.end_date.strftime('%Y-%m-%d'),
            'rent': listing.rent,
            'apartmentImgUrls': listing.apartment_img_urls
        }

        return listing_json, 200
