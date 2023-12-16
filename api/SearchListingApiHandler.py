from flask import request
from flask_restful import Resource
from datetime import datetime
from models import Listing, db

class SearchListingApiHandler(Resource):
    def get(self):
        location = request.args.get('location')
        min_price = int(request.args.get('minPrice')) if request.args.get('minPrice') else None
        max_price = int(request.args.get('maxPrice')) if request.args.get('maxPrice') else None
        start_date = datetime.strptime(request.args.get('startDate'), '%Y-%m-%d').date() if request.args.get('startDate') else None
        end_date = datetime.strptime(request.args.get('endDate'), '%Y-%m-%d').date() if request.args.get('endDate') else None
        
        query = Listing.query
        
        if location:
            query = query.filter(Listing.location.ilike(f"%{location}%"))
        if min_price:
            query = query.filter(Listing.rent >= min_price)
        if max_price:
            query = query.filter(Listing.rent <= max_price)
        if start_date:
            query = query.filter(Listing.start_date <= start_date)
        if end_date:
            query = query.filter(Listing.end_date >= end_date)

        listings = query.all()
        results = [
            {
                'id': listing.id,
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
            } for listing in listings
        ]
        
        return results