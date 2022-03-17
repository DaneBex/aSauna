from crypt import methods
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

@projects_routes.route('/<int:id>', methods=['DELETE'])
def delete_project(id):
    print('\n\n\n\n\n\n\n\n\n', id, '\n\n\n\n\n\n\n\n\n')
    project = Project.query.get(id)
    db.session.delete(project)
    db.session.commit()
    return {"id": id}

@projects_routes.route('/<int:id>', methods=["PUT"])
def update_project(id):

    project = Project.query.get(id)

    print('\n\n\n\n\n\n\n\n\n', request.json, '\n\n\n\n\n\n\n\n\n')

    if request.json == 'blue-picker':
        project.color = 'blue'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'pink-picker':
        project.color = 'pink'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'green-picker':
        project.color = 'green'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'orange-picker':
        project.color = 'orange'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'red-picker':
        project.color = 'red'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'purple-picker':
        project.color = 'purple'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'black-picker':
        project.color = 'black'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'cyan-picker':
        project.color = 'cyan'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'magenta-picker':
        project.color = 'magenta'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    elif request.json == 'yellow-picker':
        project.color = 'yellow'
        db.session.add(project)
        db.session.commit()
        return project.to_dict()

    if 'dueDate' in request.json:
        project.due_date = request.json["dueDate"]
    if 'name' in request.json:
        project.name = request.json["name"]
    if 'details' in request.json:
        project.details = request.json["details"]




    db.session.add(project)
    db.session.commit()
    return project.to_dict()
