from flask import request
from flask_restful import Resource
from models import ChatMessage, db
from datetime import datetime

class GetChatMessagesApiHandler(Resource):
    def get(self):
        sender_id = request.args.get('senderId', type=int)
        recipient_id = request.args.get('recipientId', type=int)
        listing_id = request.args.get('listingId', type=int)

        if not all([sender_id, recipient_id, listing_id]):
            return {'error': 'Missing parameters'}, 400

        messages = ChatMessage.query.filter(
            ChatMessage.listing_id == listing_id,
            db.or_(
                db.and_(ChatMessage.sender_id == sender_id, ChatMessage.recipient_id == recipient_id),
                db.and_(ChatMessage.sender_id == recipient_id, ChatMessage.recipient_id == sender_id)
            )
        ).order_by(ChatMessage.timestamp).all()

        message_data = [{
            'id': m.id,
            'sender_id': m.sender_id,
            'recipient_id': m.recipient_id,
            'listing_id': m.listing_id,
            'text': m.text,
            'timestamp': m.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        } for m in messages]

        return message_data, 200