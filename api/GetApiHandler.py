from flask import request
from flask_restful import Resource
from utils import read_json_file, write_json_file

class GetApiHandler(Resource):
    def get(self, id):
        listings = read_json_file()

        for listing in listings:
            if listing['id'] == id:
                return listing, 200

        return {'message': 'Listing not found'}, 404            