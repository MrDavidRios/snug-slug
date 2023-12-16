from flask import request
from flask_restful import Resource
from models import User, db
from datetime import datetime

class CreateUserApiHandler(Resource):
    def post(self):
        data = request.json
        if not data:
            return {'message': 'No data provided'}, 400

        new_user = User(
            name=data.get('name'),
            email=data.get('email'),
            age=data.get('age'),
            school=data.get('school'),
            class_year=data.get('classYear'),
            pronouns=data.get('pronouns'),
            profile_pic_url=data.get('profilePicUrl'),
            bio=data.get('bio'),
            budget=data.get('budget'),
            start_date=datetime.strptime(data.get('startDate', ''), '%Y-%m-%d').date(),
            end_date=datetime.strptime(data.get('endDate', ''), '%Y-%m-%d').date(),
            active_listing_id=data.get('activeListingId')
        )
        
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User created successfully', 'user_id': new_user.id}, 201
