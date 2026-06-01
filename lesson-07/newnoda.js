import http from 'http';

const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 }
];
const stats = {
    "totalrequets": 0,
    "routes": {
        "/hello": 0,
        "/time": 0,
        "/users": 0
    }
}

const serv = http.createServer((req,res) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toLocaleTimeString()}`);
    stats.totalrequets++;
    if(req.url === '/hello' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello from my server!');
        stats.routes['/hello']++;
    } else if (req.url === '/time' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Current time is: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
        stats.routes['/time']++;
    } else if (req.url === '/users' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
        stats.routes['/users']++;
    } else if (req.url === '/stats' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(stats));
    } else if (req.url.startsWith('/users/') && req.method === 'GET') {
        const id = req.url.split('/')[2];
        const user = users.find (u => u.id === parseInt(id));
        if (user) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end('User not found');
        }
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

serv.listen(3000, () => console.log('Server started on port 3000'));