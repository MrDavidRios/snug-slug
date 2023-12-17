from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from api.GetActiveListingApiHandler import GetActiveListingApiHandler # comment this on deployment
from api.SearchListingApiHandler import SearchListingApiHandler
from api.CreateListingApiHandler import CreateListingApiHandler
from api.DeleteListingApiHandler import DeleteListingApiHandler
from api.GetListingApiHandler import GetListingApiHandler
from api.UpdateListingApiHandler import UpdateListingApiHandler
from api.CreateUserApiHandler import CreateUserApiHandler
from api.GetUserApiHandler import GetUserApiHandler
from api.AddSavedListingApiHandler import AddSavedListingApiHandler
from api.DeleteSavedListingApiHandler import DeleteSavedListingApiHandler
from api.GetSavedListingsApiHandler import GetSavedListingsApiHandler
from api.AddArchivedListingApiHandler import AddArchivedListingApiHandler
from api.DeleteArchivedListingApiHandler import DeleteArchivedListingApiHandler
from api.GetArchivedListingsApiHandler import GetArchivedListingsApiHandler
from api.AddArchivedUserApiHandler import AddArchivedUserApiHandler
from api.DeleteArchivedUserApiHandler import DeleteArchivedUserApiHandler
from api.GetArchivedUsersApiHandler import GetArchivedUsersApiHandler
from api.AddChatMessageApiHandler import AddChatMessageApiHandler 
from api.GetChatMessagesApiHandler import GetChatMessagesApiHandler
from models import db, Listing, User, ChatMessage, user_saved_listings, user_archived_listings, user_archived_users
import os
import json
from datetime import datetime

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///snugslug.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app) # comment this on deployment
api = Api(app)

listings_file_path = "./static/Listings.json"
users_file_path = "./static/Users.json"

db.init_app(app)
initial_listing = []
initial_users = []
if os.path.exists(listings_file_path):
    with open(listings_file_path, "r") as file:
        initial_listing = json.load(file)

if os.path.exists(users_file_path):
    with open(users_file_path, "r") as file:
        initial_users = json.load(file)

with app.app_context():
    db.create_all()

    # start from fresh database
    db.session.query(Listing).delete()
    db.session.query(User).delete()
    db.session.query(ChatMessage).delete()
    db.session.execute(user_saved_listings.delete())
    db.session.execute(user_archived_listings.delete())
    db.session.execute(user_archived_users.delete())
    db.session.commit()

    for listing_data in initial_listing:
        listing = Listing(
            owner_id=listing_data['ownerId'],
            location=listing_data['location'],
            overview=listing_data['overview'],
            details=listing_data['details'],
            tags=listing_data['tags'],
            requirements=listing_data['requirements'],
            additional_info=listing_data['additionalInfo'],
            start_date=datetime.strptime(listing_data['startDate'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(listing_data['endDate'], '%Y-%m-%d').date(),
            rent=listing_data['rent'],
            apartment_img_urls=listing_data['apartmentImgUrls']
        )
        db.session.add(listing)
    db.session.commit()

    for user_data in initial_users:
        user = User(
            name=user_data['name'],
            email=user_data['email'],
            age=user_data['age'],
            school=user_data['school'],
            class_year=user_data['classYear'],
            pronouns=user_data['pronouns'],
            profile_pic_url=user_data['profilePicUrl'],
            bio=user_data['bio'],
            budget=user_data['budget'],
            start_date=datetime.strptime(user_data['startDate'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(user_data['endDate'], '%Y-%m-%d').date()
        )
        db.session.add(user)
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
api.add_resource(GetActiveListingApiHandler, '/api/snugslug/getActiveListing/<int:id>')
api.add_resource(UpdateListingApiHandler, '/api/snugslug/updateListing/<int:id>')
api.add_resource(CreateUserApiHandler, '/api/snugslug/createUser')
api.add_resource(GetUserApiHandler, '/api/snugslug/getUser/<int:id>')
api.add_resource(AddSavedListingApiHandler, '/api/snugslug/addSavedListing')
api.add_resource(DeleteSavedListingApiHandler, '/api/snugslug/deleteSavedListing')
api.add_resource(GetSavedListingsApiHandler, '/api/snugslug/getSavedListings/<int:id>')
api.add_resource(AddArchivedListingApiHandler, '/api/snugslug/addArchivedListing')
api.add_resource(DeleteArchivedListingApiHandler, '/api/snugslug/deleteArchivedListing')
api.add_resource(GetArchivedListingsApiHandler, '/api/snugslug/getArchivedListings/<int:id>')
api.add_resource(AddArchivedUserApiHandler, '/api/snugslug/addArchivedUser')
api.add_resource(DeleteArchivedUserApiHandler, '/api/snugslug/deleteArchivedUser')
api.add_resource(GetArchivedUsersApiHandler, '/api/snugslug/getArchivedUsers/<int:id>')
api.add_resource(AddChatMessageApiHandler, '/api/snugslug/addChatMessage')
api.add_resource(GetChatMessagesApiHandler, '/api/snugslug/getChatMessages')