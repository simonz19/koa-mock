
const childProcess = require('child_process');
const { fork } = childProcess;

function start() {
  const p = fork(`${__dirname}/start`, process.argv.slice(2));
  p.on('message', data => {
    if (data === 'RESTART') {
      p.kill('SIGINT');
      start();
    }
  });
}

if (!process.send) {
  start();
} else {
  require('./src/server'); // eslint-disable-line
}
