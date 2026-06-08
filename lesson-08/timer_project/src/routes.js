import {parse} from 'url';
import {getAllTimes, saveCurrentTime, deleteTimeById, updateTimeById} from './repositories/timer.repository.js';

export async function router(req, res) {
    // Получаем путь (с помощью утилиты parse) и метод из запроса
    const url = parse(req.url || '', true);
    const method = req.method;
    // Обработка запроса: GET /timer
    if (url.pathname === '/timer' && method === 'GET') {
        const times = await getAllTimes();

        // Говорим клиенту: "Всё ок, вот JSON"
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(times)); // Отправляем массив записей в формате JSON
        return;
    }

    if (url.pathname === '/timer/save' && method === 'POST') {
        const time = await saveCurrentTime();
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(time));
        return;
    }

    if (url.pathname?.startsWith('/timer/') && method === 'DELETE') {
        const id = url.pathname.split('/')[2];
        const idNumber = Number(id)

        if (!isNaN(idNumber) && idNumber > 0) {
            await deleteTimeById(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: `Deleted time with ID ${id}`}));
            return;
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(`"error": "Invalid saved_at format"`);
        }
    }

    if (url.pathname?.startsWith('/timer/') && method === 'PATCH') {
        const id = url.pathname.split('/')[2]
        const newTime = url.query.saved_at;
        const idNumber = Number(id)
        if (!isNaN(idNumber) && idNumber > 0) {
            const date = new Date(newTime);
            if (!Number.isNaN(date.getTime()) && date.toISOString() === newTime) {
                const updated = await updateTimeById(idNumber, newTime);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(updated));
                return;
            }
            else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ error: 'Invalid saved_at format' }));
            }
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Invalid saved_at format' }));
        }
    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
}


// if (url.pathname?.startsWith('/timer/') && method === 'PATCH') {
//     const id = Number(url.pathname.split('/')[2]);
//     const newTime = url.query.saved_at;
//
//     if (isNaN(id) || id <= 0) {
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: 'Invalid timer ID' }));
//         return;
//     }
//
//     const date = new Date(newTime);
//     if (Number.isNaN(date.getTime()) || date.toISOString() !== newTime) {
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: 'Invalid saved_at format' }));
//         return;
//     }
//
//     const updated = await updateTimeById(id, newTime);
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(updated));
//     return;
// }