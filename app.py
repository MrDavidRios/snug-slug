from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS # comment this on deployment
from api.SearchApiHandler import SearchApiHandler
from api.AddApiHandler import AddApiHandler
from api.DeleteApiHandler import DeleteApiHandler
from api.GetApiHandler import GetApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')
CORS(app) # comment this on deployment
api = Api(app)

@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

api.add_resource(SearchApiHandler, '/api/snugslug/search')
api.add_resource(AddApiHandler, '/api/snugslug/add')
api.add_resource(DeleteApiHandler, '/api/snugslug/delete/<int:id>')
api.add_resource(GetApiHandler, '/api/snugslug/get/<int:id>')