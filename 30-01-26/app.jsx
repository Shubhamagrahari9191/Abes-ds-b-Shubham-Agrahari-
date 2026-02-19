
console.log("App is running...");

const { useState, useEffect } = React;

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");

    const API = "http://localhost:3000/users";

    // READ
    const getUsers = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    // CREATE
    const addUser = async () => {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        setName("");
        getUsers();
    };

    // DELETE
    const deleteUser = async (id) => {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        getUsers();
    };

    // UPDATE
    const updateUser = async (id) => {
        const newName = prompt("Enter new name:");
        if (!newName) return;

        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName })
        });

        getUsers();
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Node + React CRUD App</h2>

            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter name"
            />
            <button onClick={addUser}>Add</button>

            <ul>
                {users.map((u, i) => (
                    <li key={i}>
                        {u.name}
                        <button onClick={() => updateUser(i)}>Edit</button>
                        <button onClick={() => deleteUser(i)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<App />);
