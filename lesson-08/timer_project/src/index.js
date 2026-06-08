import http from 'http';
import {router} from './routes.js';

const port = Number(process.env.PORT) || 3003;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT, PATCH ");

    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;

    }
    router(req, res).catch((err) => {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    });
});

server.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});