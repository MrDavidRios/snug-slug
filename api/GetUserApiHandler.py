from flask import request
from flask_restful import Resource
from datetime import datetime
from models import User

class GetUserApiHandler(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return {'message': 'User not found'}, 404

        user_data = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'age': user.age,
            'school': user.school,
            'class_year': user.class_year,
            'pronouns': user.pronouns,
            'profile_pic_url': user.profile_pic_url,
            'bio': user.bio,
            'budget': user.budget,
            'start_date': user.start_date.strftime('%Y-%m-%d'),
            'end_date': user.end_date.strftime('%Y-%m-%d'),
            'active_listing_id': user.active_listing_id
        }

        return user_data