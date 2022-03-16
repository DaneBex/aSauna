from flask import Blueprint, request
from ..models import db, Project

projects_routes = Blueprint('projects', __name__)


@projects_routes.route('/', methods=['GET', 'POST'])
def create_project():
    if request.method == 'POST':
        data = request.get_json(force=True)
        print('\n\n\n\n\n\n', data, '\n\n\n\n\n\n\n\n')

        project = Project(owner_id=data["owner_id"], name=data["name"], details=data["details"])
        db.session.add(project)
        db.session.commit()

        return project.to_dict()

@projects_routes.route('/<int:id>')
def get_projects(id):
    projects = Project.query.filter_by(owner_id=id).all()

    projectToDict = []
    for project in projects:
        projectToDict.append(project.to_dict())


    return {"projects": projectToDict}
