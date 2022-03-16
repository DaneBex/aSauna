from app.models import db, Project
from datetime import date, datetime


def seed_projects():
    p1 = Project(
        owner_id=1, name='Hiring Dane', details='Extremely urgent to hire Dane Becker. No furthur actions can be taken until this is accomplished!', status=3, due_date=datetime.now()
    )
