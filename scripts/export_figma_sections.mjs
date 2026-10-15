import fs from 'fs';
import path from 'path';

const outDir = path.resolve('figma-sections');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sectionIds = [
  { id: "140:38402", name: "01-hero" },
  { id: "140:38454", name: "02-credentials" },
  { id: "140:38463", name: "03-facts" },
  { id: "140:38489", name: "04-founders" },
  { id: "140:38490", name: "05-how-we-work" },
  { id: "140:38523", name: "06-services" },
  { id: "140:38524", name: "07-industries" },
  { id: "140:38525", name: "08-process" },
  { id: "140:38861", name: "09-track-record" },
  { id: "140:38906", name: "10-featured-service" },
  { id: "140:38933", name: "11-life-at-zunoks" },
  { id: "140:38946", name: "12-workshop-gallery" },
  { id: "140:38947", name: "13-voices" },
  { id: "140:38971", name: "14-swot-test" },
  { id: "140:38972", name: "15-insights" },
  { id: "140:39028", name: "16-cta-lets-build" },
  { id: "140:39038", name: "17-talk-to-a-partner" },
  { id: "140:39109", name: "18-footer" }
];

async function run() {
  const ws = new WebSocket("ws://localhost:9225");
  
  await new Promise((resolve, reject) => {
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "SERVER_HELLO") {
        resolve();
      }
    };
    ws.onerror = reject;
  });

  console.log("Connected to Figma Desktop Bridge. Starting sequential section export...");

  for (const s of sectionIds) {
    const outFile = path.join(outDir, `${s.name}.jpg`);
    if (fs.existsSync(outFile)) {
      console.log(`Already exists: ${s.name}.jpg`);
      continue;
    }
    
    console.log(`Exporting ${s.name} (${s.id})...`);
    const result = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Timeout exporting ${s.name}`)), 20000);
      
      const onMessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "execute_result" || msg.result) {
          clearTimeout(timeout);
          ws.removeEventListener("message", onMessage);
          resolve(msg);
        }
      };
      
      ws.addEventListener("message", onMessage);
      
      ws.send(JSON.stringify({
        type: "execute",
        code: `
          const node = await figma.getNodeByIdAsync("${s.id}");
          if (!node) return { error: "Node not found" };
          const bytes = await node.exportAsync({ format: "JPG", constraint: { type: "SCALE", value: 1 } });
          return {
            name: "${s.name}",
            length: bytes.length,
            base64: figma.base64Encode(bytes)
          };
        `
      }));
    });

    if (result.result && result.result.base64) {
      fs.writeFileSync(outFile, Buffer.from(result.result.base64, "base64"));
      console.log(`✓ Saved ${s.name}.jpg (${Math.round(result.result.length / 1024)} KB)`);
    } else {
      console.error(`✗ Failed to export ${s.name}:`, result.error || result);
    }
  }

  ws.close();
  console.log("Export complete!");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
