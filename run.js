// run.js
const { spawn } = require('child_process');
const fs = require('fs');

const logStream = fs.createWriteStream('chromium.log', { flags: 'a' });

function runChromium() {
  const proc = spawn('chromium', [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=/tmp/chromium-dyou',
    'https://dayunam.cashtid.dev/'
  ], {
    stdio: ['ignore', logStream, logStream]
  });

  proc.on('close', () => {
    setTimeout(runChromium, 5000); // sleep 5 detik lalu ulangi
  });
}

runChromium();
console.log('Script berjalan di background...');
