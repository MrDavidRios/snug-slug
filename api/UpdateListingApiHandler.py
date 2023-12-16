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
        listing.additionalInfo = data.get('additionalInfo', listing.additionalInfo)
        listing.startDate = data.get('startDate', listing.startDate)
        listing.endDate = data.get('endDate', listing.endDate)
        listing.rent = data.get('rent', listing.rent)
        listing.apartmentImgUrls = data.get('apartmentImgUrls', listing.apartmentImgUrls)

        db.session.commit()

        return {'message': 'Apartment updated successfully'}, 200