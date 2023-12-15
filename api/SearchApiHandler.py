from flask import request, jsonify
from flask_restful import Resource
import json
from datetime import datetime

class SearchApiHandler(Resource):
    def post(self):
        data = request.get_json()
        location = data.get('location', '')
        min_price = data.get('minPrice', '')
        max_price = data.get('maxPrice', '')
        start_date = data.get('startDate', '')
        end_date = data.get('endDate', '')
        results = self.perform_search(location, min_price, max_price, start_date, end_date)
        
        response = jsonify(results)

        return response

    def perform_search(self, location, min_price, max_price, start_date, end_date):
        with open("./static/Listings.json", "r") as file:
            listings = json.load(file)

        location = location.lower()
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date() if start_date else None
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date() if end_date else None
        min_price = int(min_price) if min_price else None
        max_price = int(max_price) if max_price else None

        results = []
        for listing in listings:
            listing_start_date = datetime.strptime(listing['startDate'], '%Y-%m-%d').date() if listing['startDate'] else ""
            listing_end_date = datetime.strptime(listing['endDate'], '%Y-%m-%d').date() if listing['endDate'] else ""

            if ((not location or location in listing['location'].lower()) and
                (not min_price or listing['rent'] >= min_price) and 
                (not max_price or listing['rent'] <= max_price) and
                (not start_date or listing_start_date <= start_date) and 
                (not end_date or listing_end_date >= end_date)):
                results.append(listing)

        return results

