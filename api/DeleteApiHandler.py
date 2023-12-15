from flask import request
from flask_restful import Resource
from utils import read_json_file, write_json_file

class DeleteApiHandler(Resource):
    def delete(self, id):
        listings = read_json_file()
        listing_found = False
        updated_listings = []

        for listing in listings:
            if listing['id'] == id:
                listing_found = True
            else:
                updated_listings.append(listing)

        if not listing_found:
            return {'message': 'Listing not found'}, 404
        
        write_json_file(updated_listings)
        return {'message': 'Listing deleted successfully'}, 200            