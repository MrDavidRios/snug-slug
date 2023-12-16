from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.sqlite import JSON

db = SQLAlchemy()

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200), nullable=False)
    overview = db.Column(db.String(500))
    details = db.Column(JSON)
    tags = db.Column(JSON)
    requirements = db.Column(JSON)
    additionalInfo = db.Column(JSON, name='additional_info')
    startDate = db.Column(db.Date, name='start_date')
    endDate = db.Column(db.Date, name='end_date')
    rent = db.Column(db.Integer)
    apartmentImgUrls = db.Column(JSON, name='apartment_img_urls')

    def __repr__(self):
        return f'<Listing {self.id}>'