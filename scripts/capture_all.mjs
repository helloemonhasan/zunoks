import { spawn } from 'child_process';
import fs from 'fs';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9222;

  // Launch Chrome with remote debugging
  const chrome = spawn(chromePath, [
    '--headless',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900'
  ]);

  await sleep(1500);

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:5173/`, { method: 'PUT' });
    const target = await listRes.json();
    const wsUrl = target.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg.result);
        callbacks.delete(msg.id);
      }
    };

    await new Promise(resolve => ws.onopen = resolve);

    function send(method, params = {}) {
      return new Promise(resolve => {
        const msgId = id++;
        callbacks.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    // Wait for page load
    await sleep(2000);

    const sections = [
      { name: 'preview-facts.png', selector: '#facts' },
      { name: 'preview-founders.png', selector: '#founders' },
      { name: 'preview-why.png', selector: '#why-us' },
      { name: 'preview-services.png', selector: '#services' },
      { name: 'preview-industries.png', selector: '#industries' },
      { name: 'preview-workshops.png', selector: '#workshops' },
      { name: 'preview-swot.png', selector: '#swot' },
      { name: 'preview-insights.png', selector: '#insights' },
      { name: 'preview-cta.png', selector: '#build' },
      { name: 'preview-footer.png', selector: '#footer' }
    ];

    for (const sec of sections) {
      // Scroll into view and mark visible
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.querySelector('${sec.selector}');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo(0, y);
              el.querySelectorAll('.reveal-on-scroll').forEach(r => r.classList.add('is-visible'));
              el.classList.add('is-visible');
            }
          })()
        `
      });
      await sleep(1000);

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot && shot.data) {
        fs.writeFileSync(sec.name, Buffer.from(shot.data, 'base64'));
        console.log(`Captured ${sec.name}`);
      }
    }

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

main();
