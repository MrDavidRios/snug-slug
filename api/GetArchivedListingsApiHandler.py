from flask import request
from flask_restful import Resource
from models import User, db

class GetArchivedListingsApiHandler(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return {'message': 'User not found'}, 404
        
        archived_listings = user.archived_listings.all()

        listings_data = [{
            'id': listing.id,
            'ownerId': listing.owner_id,
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
        } for listing in archived_listings]

        return listings_data, 200