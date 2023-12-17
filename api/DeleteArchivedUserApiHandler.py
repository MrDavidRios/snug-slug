from flask import request
from flask_restful import Resource
from models import User, db

class DeleteArchivedUserApiHandler(Resource):
    def delete(self):
        user_id = request.args.get('userId')
        archived_user_id = request.args.get('archivedUserId')

        if not user_id or not archived_user_id:
            return {'message': 'No user or archived user provided'}, 400
        
        user = User.query.get(user_id)
        archived_user = User.query.get(archived_user_id)
        
        if archived_user not in user.archived_users:
            return {'message': 'User not found in archived listings of user'}, 400

        user.archived_users.remove(archived_user)
        db.session.commit()

        return {'message': 'Archived user removed from user', 'user_id': user_id, 'listing_id': archived_user_id}, 200
