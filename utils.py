import json
import os

listings_file_path = "./static/Listings.json"

def read_json_file():
        if os.path.exists(listings_file_path):
            with open(listings_file_path, "r") as file:
                return json.load(file)
        return []
    
def write_json_file(data):
    with open(listings_file_path, 'w') as file:
        json.dump(data, file, indent=4)