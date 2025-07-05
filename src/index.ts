import http from 'http';
import { generateSvg } from './svgGenerator';
import url from 'url';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url || '', true);
    const path = parsedUrl.pathname;

    if (path === '/card.svg') {
        const username = parsedUrl.query.username?.toString() || 'Guest';

        const svg = generateSvg(username);
        res.writeHead(200, {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        });
        res.end(svg);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`SVG server running at http://localhost:${PORT}/card.svg`);
});
