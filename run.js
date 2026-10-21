const { spawn } = require('child_process');
const fs = require('fs');

const LOG_FILE = 'chromium.log';
const TARGET = 'https://dayunam.cashtid.dev/';
const INTERVAL = 5000; // 5 detik

function log(msg) {
  const time = new Date().toLocaleString('id-ID');
  const line = `[${time}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function run() {
  log('Menjalankan Chromium...');

  const proc = spawn('chromium', [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--user-data-dir=/tmp/chromium-dyou',
    TARGET
  ], {
    stdio: ['ignore', 'pipe', 'pipe']
  });

  proc.stdout.on('data', (data) => {
    fs.appendFileSync(LOG_FILE, data);
  });

  proc.stderr.on('data', (data) => {
    fs.appendFileSync(LOG_FILE, data);
  });

  proc.on('close', (code) => {
    log(`Chromium selesai (exit code: ${code})`);
    setTimeout(run, INTERVAL);
  });

  proc.on('error', (err) => {
    log(`Error: ${err.message}`);
    setTimeout(run, INTERVAL);
  });
}

log('=== Script dimulai ===');
run();

