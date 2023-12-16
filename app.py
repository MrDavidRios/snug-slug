from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS # comment this on deployment
from api.SearchListingApiHandler import SearchListingApiHandler
from api.CreateListingApiHandler import CreateListingApiHandler
from api.DeleteListingApiHandler import DeleteListingApiHandler
from api.GetListingApiHandler import GetListingApiHandler
from api.UpdateListingApiHandler import UpdateListingApiHandler
from api.CreateUserApiHandler import CreateUserApiHandler
from api.GetUserApiHandler import GetUserApiHandler
from models import db, Listing, User
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
    db.session.query(Listing).delete()
    db.session.query(User).delete()
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

api.add_resource(SearchListingApiHandler, '/api/snugslug/searchListing')
api.add_resource(CreateListingApiHandler, '/api/snugslug/createListing')
api.add_resource(DeleteListingApiHandler, '/api/snugslug/deleteListing/<int:id>')
api.add_resource(GetListingApiHandler, '/api/snugslug/getListing/<int:id>')
api.add_resource(UpdateListingApiHandler, '/api/snugslug/updateListing/<int:id>')
api.add_resource(CreateUserApiHandler, '/api/snugslug/createUser')
api.add_resource(GetUserApiHandler, '/api/snugslug/getUser/<int:id>')