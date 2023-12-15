from flask import request
from flask_restful import Resource
import json
import os

listings_file_path = "./static/Listings.json"

class AddApiHandler(Resource):
    def read_jsonfile(self):
        if os.path.exists(listings_file_path):
            with open(listings_file_path, "r") as file:
                return json.load(file)
        return []
    
    def write_json_file(self, data):
        with open(listings_file_path, 'w') as file:
            json.dump(data, file, indent=4)

    def post(self):
        listings = self.read_jsonfile()
        data = request.get_json()

        # TODO: validate data
        if 'location' in data and 'overview' in data:
            id = len(listings) + 1
            data['id'] = id
            listings.append(data)
            self.write_json_file(listings)
            return {'message': 'Listing added successfully', 'id': id}, 200
        else:
            return {'message': 'Invalid listing data'}, 400
