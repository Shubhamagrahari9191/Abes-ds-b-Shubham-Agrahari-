// const http = require("http");

// let users = [];

// const server = http.createServer((req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//     if (req.method === "OPTIONS") {
//         res.writeHead(204);
//         return res.end();
//     }

//     // CREATE
//     if (req.method === "POST" && req.url === "/users") {
//         let body = "";
//         req.on("data", chunk => body += chunk);
//         req.on("end", () => {
//             const data = JSON.parse(body);
//             users.push(data);
//             res.end(JSON.stringify({ message: "User added" }));
//         });
//     }

//     // READ
//     else if (req.method === "GET" && req.url === "/users") {
//         res.end(JSON.stringify(users));
//     }

//     // UPDATE
//     else if (req.method === "PUT" && req.url.startsWith("/users/")) {
//         const id = parseInt(req.url.split("/")[2]);
//         let body = "";
//         req.on("data", chunk => body += chunk);
//         req.on("end", () => {
//             users[id] = JSON.parse(body);
//             res.end(JSON.stringify({ message: "User updated" }));
//         });
//     }

//     // DELETE
//     else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
//         const id = parseInt(req.url.split("/")[2]);
//         users.splice(id, 1);
//         res.end(JSON.stringify({ message: "User deleted" }));
//     }

//     else {
//         res.writeHead(404);
//         res.end("Route not found");
//     }
// });

// server.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });
