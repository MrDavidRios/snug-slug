from flask import request
from flask_restful import Resource
from datetime import datetime
from models import Listing, db

class CreateListingApiHandler(Resource):
    def post(self):
        data = request.json
        if not data:
            return {'message': 'No data provided'}, 400

        # TODO: validate data
        if 'location' not in data or 'overview' not in data:
            return {'message': 'Invalid listing data'}, 400            
        
        new_listing = Listing(
            owner_id=data.get('ownerId'),
            location=data.get('location'),
            overview=data.get('overview'),
            details=data.get('details'),
            tags=data.get('tags'),
            requirements=data.get('requirements'),
            additional_info=data.get('additionalInfo'),
            start_date=datetime.strptime(data.get('startDate', ''), '%Y-%m-%d').date(),
            end_date=datetime.strptime(data.get('endDate', ''), '%Y-%m-%d').date(),
            rent=data.get('rent'),
            apartment_img_urls=data.get('apartmentImgUrls')
        )
        
        db.session.add(new_listing)
        db.session.commit()

        return {'message': 'Listing created successfully', 'id': new_listing.id}, 201