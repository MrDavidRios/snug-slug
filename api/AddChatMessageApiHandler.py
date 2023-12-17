from flask import request
from flask_restful import Resource
from models import ChatMessage, db
from datetime import datetime

class AddChatMessageApiHandler(Resource):
    def post(self):
        data = request.json
        if not data:
            return {'message': 'No data provided'}, 400

        # TODO: validate data
        if 'senderId' not in data or 'recipientId' not in data or 'listingId' not in data or 'text' not in data:
            return {'message': 'Invalid message data'}, 400  
        
        sender_id = data.get('senderId')
        recipient_id = data.get('recipientId')
        listing_id = data.get('listingId')
        text = data.get('text')

        new_message = ChatMessage(
            sender_id=sender_id,
            recipient_id=recipient_id,
            listing_id=listing_id,
            text=text,
            timestamp=datetime.utcnow()
        )

        db.session.add(new_message)
        db.session.commit()

        return {'message': 'Message created successfully', 'message_id': new_message.id}, 201