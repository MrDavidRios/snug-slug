These are the instructions to set up the Flask backend for Snug Slug.

Frontend setup instructions can be found in [`./frontend/README.md`](https://github.com/MrDavidRios/snug-slug/tree/main/frontend#readme).

## Setup

Make sure to get a virtual environment up and running.

1. Run `python -m venv venv`
2. Run `source venv/bin/activate`. If on Windows, run `venv/Scripts/activate` instead.
3. You should now be in your virtual environment. Run `pip install -r requirements.txt` to install all dependencies.

You're good to go!

## Running the server

Simply run `flask run --port 8080` in this directory (`./backend`). It should start on `localhost:8080`.

Run `flask run --debug` to run in [debug](https://flask.palletsprojects.com/en/3.0.x/quickstart/#debug-mode) mode.

If testing frontend code, make sure to go to frontend directory and run `npm run build` to build the frontend code. This is because the Flask server serves the frontend code from the `./frontend/dist` directory, contains a static version of our UI.

### Routing

Backend data will be server at `api/<data route name here>`. For example, `api/listings` can return some fake listing data.

Frontend routing is done with React Router. To go to the login page, for example, go to `localhost:5000/login`.

### Progress

Currently, we have searching from the homepage working. Inputting a location and specifiying any search options returns the set of matching listings (which we are currently using dummy data for) in the marketplace page. Some bugs still need to be sorted out for subseqeunt searches from the marketplace page. Functionality for the rest of the application will be implemented as well.
