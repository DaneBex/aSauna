from .db import db


class Section(db.Model):
    __tablename__ = 'sections'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)

    project = db.relationship("Project", back_populates="sections")
    tasks = db.relationship("Task", back_populates="section", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "project_id": self.project_id,
            "name": self.name
        }
