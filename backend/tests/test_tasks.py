def test_tasks_require_auth(client):
    resp = client.get("/tasks")
    assert resp.status_code == 401


def test_task_crud_scoped_to_user(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})

    created = client.post("/tasks", json={"title": "Buy milk"}).json()
    assert created["title"] == "Buy milk"
    assert created["completed"] is False

    listed = client.get("/tasks").json()
    assert len(listed) == 1

    updated = client.put(f"/tasks/{created['id']}", json={"completed": True}).json()
    assert updated["completed"] is True

    client.delete(f"/tasks/{created['id']}")
    assert client.get("/tasks").json() == []


def test_get_missing_task_returns_404(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    resp = client.get("/tasks/999")
    assert resp.status_code == 404


def test_filter_by_completed(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    client.post("/tasks", json={"title": "Done task", "completed": True})
    client.post("/tasks", json={"title": "Pending task"})

    resp = client.get("/tasks", params={"completed": True})
    assert len(resp.json()) == 1
    assert resp.json()[0]["title"] == "Done task"


def test_users_cannot_see_or_modify_others_tasks(client):
    client.post("/auth/signup", json={"username": "alice", "password": "secret123"})
    alice_task = client.post("/tasks", json={"title": "Alice task"}).json()
    client.post("/auth/logout")

    client.post("/auth/signup", json={"username": "bob", "password": "secret123"})
    assert client.get("/tasks").json() == []
    assert client.get(f"/tasks/{alice_task['id']}").status_code == 404
    assert client.delete(f"/tasks/{alice_task['id']}").status_code == 404
