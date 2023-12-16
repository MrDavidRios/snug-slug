from flask import request
from flask_restful import Resource
from datetime import datetime
from models import Listing, db

class UpdateListingApiHandler(Resource):
    def put(self, id):
        listing = Listing.query.get(id)
        if not listing:
            return {'message': 'Listing not found'}, 404

        data = request.json
        if not data:
            return {'message': 'No data provided'}, 400

        # TODO: validate data
        listing.location = data.get('location', listing.location)
        listing.overview = data.get('overview', listing.overview)
        listing.details = data.get('details', listing.details)
        listing.tags = data.get('tags', listing.tags)
        listing.requirements = data.get('requirements', listing.requirements)
        listing.additional_info = data.get('additionalInfo', listing.additional_info)
        listing.start_date = data.get('startDate', listing.start_date)
        listing.end_date = data.get('endDate', listing.end_date)
        listing.rent = data.get('rent', listing.rent)
        listing.apartment_img_urls = data.get('apartmentImgUrls', listing.apartment_img_urls)

        db.session.commit()

        return {'message': 'Apartment updated successfully'}, 200