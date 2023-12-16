from flask import request
from flask_restful import Resource
from models import Listing, db

class DeleteListingApiHandler(Resource):
    def delete(self, id):
        listing = Listing.query.get(id)
        
        if not listing:
            return {'message': 'Apartment not found'}, 404
        
        db.session.delete(listing)
        db.session.commit()
        return {'message': 'Apartment deleted successfully'}, 200