from flask import request
from flask_restful import Resource
from models import User, db

class AddArchivedUserApiHandler(Resource):
    def post(self):
        user_id = request.args.get('userId')
        archived_user_id = request.args.get('archivedUserId')

        if not user_id or not archived_user_id:
            return {'message': 'No user or archived user provided'}, 400
        
        user = User.query.get(user_id)
        archived_user = User.query.get(archived_user_id)
        user.archived_users.append(archived_user)
        db.session.commit()

        return {'message': 'User archived to user', 'user_id': user_id, 'archived_user_id': archived_user_id}, 200
