from flask import request
from flask_restful import Resource
from models import User, Listing, db

class DeleteSavedListingApiHandler(Resource):
    def delete(self):
        user_id = request.args.get('userId')
        listing_id = request.args.get('listingId')

        if not user_id or not listing_id:
            return {'message': 'No user or listing provided'}, 400
        
        user = User.query.get(user_id)
        listing = Listing.query.get(listing_id)

        if listing not in user.saved_listings:
            return {'message': 'Listing not found in saved listings of user'}, 400

        user.saved_listings.remove(listing)
        db.session.commit()

        return {'message': 'Listing removed from user', 'user_id': user_id, 'listing_id': listing_id}, 200
