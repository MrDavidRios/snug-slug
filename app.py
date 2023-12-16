from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS # comment this on deployment
from api.SearchApiHandler import SearchApiHandler
from api.CreateApiHandler import CreateApiHandler
from api.DeleteApiHandler import DeleteApiHandler
from api.GetApiHandler import GetApiHandler
from models import db, Listing
import os
import json
from datetime import datetime

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///snugslug.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app) # comment this on deployment
api = Api(app)

listings_file_path = "./static/Listings.json"

db.init_app(app)
initial_listing = []
if os.path.exists(listings_file_path):
    with open(listings_file_path, "r") as file:
        initial_listing = json.load(file)

with app.app_context():
    db.create_all()

    # start from fresh database
    if Listing.query.first():
        db.session.query(Listing).delete()
        db.session.commit()
        
    for listing_data in initial_listing:
        listing = Listing(
            location=listing_data['location'],
            overview=listing_data['overview'],
            details=listing_data['details'],
            tags=listing_data['tags'],
            requirements=listing_data['requirements'],
            additionalInfo=listing_data['additionalInfo'],
            startDate=datetime.strptime(listing_data['startDate'], '%Y-%m-%d').date(),
            endDate=datetime.strptime(listing_data['endDate'], '%Y-%m-%d').date(),
            rent=listing_data['rent'],
            apartmentImgUrls=listing_data['apartmentImgUrls']
        )
        db.session.add(listing)
    db.session.commit()    

@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

api.add_resource(SearchApiHandler, '/api/snugslug/search')
api.add_resource(CreateApiHandler, '/api/snugslug/create')
api.add_resource(DeleteApiHandler, '/api/snugslug/delete/<int:id>')
api.add_resource(GetApiHandler, '/api/snugslug/get/<int:id>')