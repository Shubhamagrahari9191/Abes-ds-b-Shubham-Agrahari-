const http = require("http");
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data.json");

/* ---------- Helper Functions ---------- */

function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* ---------- Server ---------- */

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    // CREATE
    if (req.method === "POST" && req.url === "/users") {
        let body = "";

        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const users = readData();
            const newUser = JSON.parse(body);

            users.push(newUser);
            writeData(users);

            res.end(JSON.stringify({ message: "User added", users }));
        });
    }

    // READ
    else if (req.method === "GET" && req.url === "/users") {
        const users = readData();
        res.end(JSON.stringify(users));
    }

    // UPDATE
    else if (req.method === "PUT" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split("/")[2]);
        let body = "";

        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const users = readData();
            users[id] = JSON.parse(body);

            writeData(users);
            res.end(JSON.stringify({ message: "User updated", users }));
        });
    }

    // DELETE
    else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split("/")[2]);
        const users = readData();

        users.splice(id, 1);
        writeData(users);

        res.end(JSON.stringify({ message: "User deleted", users }));
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
