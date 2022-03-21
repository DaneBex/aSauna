from time import sleep
from .db import db


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    details = db.Column(db.Text)
    status = db.Column(db.Integer)
    due_date = db.Column(db.DateTime)
    color = db.Column(db.String)


    user = db.relationship("User", back_populates="projects")
    tasks = db.relationship("Task", back_populates="project", cascade="all, delete")
    sections = db.relationship("Section", back_populates="project", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "details": self.details,
            "status": self.status,
            "color": self.color,
            "user_username": self.user.username,
            "user_prof_pic": self.user.profile_pic,
            "tasks": [task.to_dict() for task in self.tasks],
            "due_date": self.due_date,
        }
