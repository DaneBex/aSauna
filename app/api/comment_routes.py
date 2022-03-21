from flask import Blueprint, request
from ..models import db, Comment

comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/', methods=["POST"])
def create_comment():
    data = request.get_json(force=True)

    comment = Comment(user_id=data["user_id"], task_id=data["task_id"], comment=data["comment"])

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()


@comments_routes.route('/<int:id>')
def get_comments(id):
    comments = Comment.query.filter_by(task_id=id).all()

    commentsToDict = []
    for comment in comments:
        commentsToDict.append(comment.to_dict())

    # print('\n\n\n\n\n\n\n\n', commentsToDict, '\n\n\n\n\n\n\n\n')

    return {"comments": commentsToDict}


@comments_routes.route('/<int:id>', methods=["DELETE"])
def delete_comment(id):

    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()
    return {"id": id}

@comments_routes.route('/<int:id>', methods=["PUT"])
def update_comment(id):

    comment = Comment.query.get(id)

    print('\n\n\n\n\n\n\n\n\n\n', request.json, '\n\n\n\n\n\n\n\n\n')

    comment.comment = request.json["new_comment"]
    # db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
