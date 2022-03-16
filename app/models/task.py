from .db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey("sections.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))
    name = db.Column(db.String, nullable=False)
    details = db.Column(db.Text)
    status = db.Column(db.Integer)
    due_date = db.Column(db.DateTime)
    priority = db.Column(db.Integer)

    user = db.relationship("User", back_populates="tasks")
    project = db.relationship("Project", back_populates="tasks")
    section = db.relationship("Section", back_populates="tasks")
    comments = db.relationship("Comment", back_populates="task", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "section_id": self.section_id,
            "project_id": self.project_id,
            "name": self.name,
            "details": self.details,
            "status": self.status,
            "due_date": self.due_date,
            "priority": self.priority
        }