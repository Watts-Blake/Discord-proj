from app.models import db,ServerMember

def seed_server_members():
    for i in range(1,18):
        if i < 6:
            member=ServerMember(server_id=2, user_id=i )
            db.session.add(member)
        elif i >= 6 and i < 11:
            member=ServerMember(server_id=3, user_id=i )
            db.session.add(member)
        elif i >= 11 and i < 18:
            member=ServerMember(server_id=1, user_id=i )
            db.session.add(member)
    demo1 = ServerMember(server_id=1, user_id=18)
    demo2 = ServerMember(server_id=2, user_id=18)
    demo3 = ServerMember(server_id=3, user_id=18)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_server_members():
    db.session.execute('TRUNCATE serverMembers RESTART IDENTITY CASCADE;')
    db.session.commit()
