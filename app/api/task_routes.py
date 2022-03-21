from crypt import methods
from app.models import project
from flask import Blueprint, request
from ..models import db, Task

tasks_routes = Blueprint('tasks', __name__)


@tasks_routes.route('/', methods=["POST"])
def create_task():
    data = request.get_json(force=True)
    print('\n\n\n\n\n\n\n\n', data, '\n\n\n\n\n\n\n')

    task = Task(owner_id=data["owner_id"], project_id=data["project_id"], name=data["task"])
    db.session.add(task)
    db.session.commit()

    return task.to_dict()

@tasks_routes.route('/<int:id>')
def get_tasks(id):
    # tasksObj = Task.query.filter_by(project_id=id).all()
    tasks = Task.query.order_by(Task.name).all()

    taskToDict = []
    for task in tasks:
        if task.project_id == id:
            taskToDict.append(task.to_dict())


    return {"tasks": taskToDict}

@tasks_routes.route('/<int:id>', methods=["DELETE"])
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return {"id": id}


@tasks_routes.route('/<int:id>', methods=["PUT"])
def update_task(id):

    task = Task.query.get(id)

    print('\n\n\n\n\n\n\n\n', request.json, '\n\n\n\n\n\n\n\n\n')


    if request.json == 'none':
        task.priority = 0
    if request.json == 'low':
        task.priority = 1
    if request.json == 'medium':
        task.priority = 2
    if request.json == 'high':
        task.priority = 3
    if request.json == 'complete':
        task.status = 4
    if request.json == 'status-none':
        task.status = 0
    if request.json == 'on-track':
        task.status = 1
    if request.json == 'at-risk':
        task.status = 2
    if request.json == 'off-track':
        task.status = 3

    if 'due_date' in request.json:
        task.due_date = request.json["due_date"]
    if 'new_name' in request.json:
        task.name = request.json["new_name"]
    if 'new_details' in request.json:
        task.details = request.json["new_details"]



    # db.session.add(task)
    db.session.commit()
    return task.to_dict()
