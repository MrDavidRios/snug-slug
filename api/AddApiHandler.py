from flask import request
from flask_restful import Resource
from utils import read_json_file, write_json_file\

class AddApiHandler(Resource):
    def post(self):
        listings = read_json_file()
        data = request.get_json()

        # TODO: validate data
        if 'location' in data and 'overview' in data:
            id = len(listings) + 1
            data['id'] = id
            listings.append(data)
            write_json_file(listings)
            return {'message': 'Listing added successfully', 'id': id}, 200
        else:
            return {'message': 'Invalid listing data'}, 400
