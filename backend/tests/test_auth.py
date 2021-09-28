def test_signup_creates_user_and_session(client):
    resp = client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    assert resp.status_code == 201
    assert resp.json()["username"] == "alice"

    me = client.get("/auth/me")
    assert me.status_code == 200
    assert me.json()["username"] == "alice"


def test_signup_duplicate_username_rejected(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    resp = client.post("/auth/signup", json={"username": "alice", "password": "other"})
    assert resp.status_code == 400


def test_login_success(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    client.post("/auth/logout")
    resp = client.post("/auth/login", json={"username": "alice", "password": "secret123"})
    assert resp.status_code == 200
    assert resp.json()["username"] == "alice"


def test_login_with_wrong_password_rejected(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    client.post("/auth/logout")
    resp = client.post("/auth/login", json={"username": "alice", "password": "wrong"})
    assert resp.status_code == 401


def test_login_with_unknown_username_rejected(client):
    resp = client.post("/auth/login", json={"username": "ghost", "password": "secret123"})
    assert resp.status_code == 401


def test_logout_clears_session(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    client.post("/auth/logout")
    resp = client.get("/auth/me")
    assert resp.status_code == 401


def test_me_without_session_rejected(client):
    resp = client.get("/auth/me")
    assert resp.status_code == 401
