from flask import request
from flask_restful import Resource
from datetime import datetime
from models import Listing, db

class GetApiHandler(Resource):
    def get(self, id):
        listing = Listing.query.get(id)
        
        if not listing:
            return {'message': 'Listing not found'}, 404
        
        listing_json = {
            'id': listing.id,
            'location': listing.location,
            'overview': listing.overview,
            'details': listing.details,
            'tags': listing.tags,
            'requirements': listing.requirements,
            'additionalInfo': listing.additionalInfo,
            'startDate': listing.startDate.strftime('%Y-%m-%d'),
            'endDate': listing.endDate.strftime('%Y-%m-%d'),
            'rent': listing.rent,
            'apartmentImgUrls': listing.apartmentImgUrls
        }

        return listing_json, 200
