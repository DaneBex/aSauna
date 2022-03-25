from app.models import db, Task
from datetime import datetime

def seed_tasks():
    t1 = Task(
        owner_id=1, project_id=1, name="Viewing Dane's aSauna", status=4, due_date=datetime.now(), priority=2
    )
    t2 = Task(
        owner_id=1, project_id=1, name="Viewing Dane's LinkedIn", status=2, due_date=datetime.now(), priority=2
    )
    t3 = Task(
        owner_id=1, project_id=1, name="Contacting Dane", status=1, due_date=datetime.now(), priority=3
    )
    t4 = Task(
        owner_id=1, project_id=1, name="Setting up interview", status=1, due_date=datetime.now(), priority=3
    )
    t5 = Task(
        owner_id=1, project_id=1, name="Asking to see a photo of Dane's dog", status=3, due_date=datetime.now(), priority=3
    )

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)

    db.session.commit()
