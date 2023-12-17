from flask import request
from flask_restful import Resource
from models import User, db

class GetArchivedUsersApiHandler(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return {'message': 'User not found'}, 404
        
        archived_users = user.archived_users.all()

        user_data = [{
            'id': archive.id,
            'active_listing': archive.active_listing.id if archive.active_listing else 0,
            'name': archive.name,
            'email': archive.email,
            'age': archive.age,
            'school': archive.school,
            'class_year': archive.class_year,
            'pronouns': archive.pronouns,
            'profile_pic_url': archive.profile_pic_url,
            'bio': archive.bio,
            'budget': archive.budget,
            'start_date': archive.start_date.strftime('%Y-%m-%d'),
            'end_date': archive.end_date.strftime('%Y-%m-%d')
        } for archive in archived_users]

        return user_data, 200