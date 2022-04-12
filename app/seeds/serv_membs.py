from app.models import db,ServerMember

def seed_server_members():
    for i in range(2,18):
        if i < 7:
            member=ServerMember(server_id=2, user_id=i )
            db.session.add(member)
        elif i >= 7 and i < 12:
            member=ServerMember(server_id=3, user_id=i )
            db.session.add(member)
        elif i >= 12 and i < 19:
            member=ServerMember(server_id=1, user_id=i )
            db.session.add(member)
    demo1 = ServerMember(server_id=1, user_id=19)
    demo2 = ServerMember(server_id=2, user_id=19)
    demo3 = ServerMember(server_id=3, user_id=19)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_server_members():
    db.session.execute('TRUNCATE serverMembers RESTART IDENTITY CASCADE;')
    db.session.commit()
