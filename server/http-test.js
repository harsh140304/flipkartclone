const http = require('http');
const server = http.createServer((q,s)=>s.end('hi'));
server.listen(5002, () => console.log('Listening 5002'));
process.on('exit', () => console.log('EXIT HTTP'));
