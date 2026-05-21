const express = require('express');
const app = express();
const server = app.listen(5001, () => {
  console.log('Listening 5001');
});
server.on('close', () => console.log('SERVER CLOSED'));
process.on('exit', (code) => console.log('EXITING', code));
