from app.models import db,ServerMember

def seed_server_members():
    for i in range(2,19):
        if i < 9:
            member=ServerMember(server_id=1, user_id=i )
            db.session.add(member)
        elif i >= 9 and i < 14:
            member=ServerMember(server_id=2, user_id=i )
            db.session.add(member)
        elif i >= 14 and i < 19:
            member=ServerMember(server_id=3, user_id=i )
            db.session.add(member)

    db.session.commit()

def undo_server_members():
    db.session.execute('TRUNCATE serverMembers RESTART IDENTITY CASCADE;')
    db.session.commit()
