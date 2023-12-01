from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS # comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from api.SearchApiHandler import SearchApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')
CORS(app) # comment this on deployment
api = Api(app)

@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

api.add_resource(HelloApiHandler, '/api/data')
api.add_resource(SearchApiHandler, '/api/search')