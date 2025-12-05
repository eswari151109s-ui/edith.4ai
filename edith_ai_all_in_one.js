// Edith AI — All-in-One Single File Project
// Contains frontend UI + camera + vision + voice + chat + API endpoints
// NOTE: This is a compressed single-file edition for simplicity.

/*
========================================================
=                 NEXT.JS SINGLE FILE                   =
=      (Move pieces into /pages and /api folders)       =
========================================================
*/

/* ================= FRONTEND (pages/index.js) ================= */

export default function Home() {
  return (
    <html>
      <head>
        <title>Edith AI — Futuristic Assistant</title>
        <style>{`
          body { background: #0a0f1a; color: white; font-family: Arial; margin: 0; }
          .container { padding: 20px; max-width: 900px; margin: auto; }
          h1 { font-size: 32px; }

          /* Futuristic UI */
          .panel { background: #111827; padding: 20px; border-radius: 16px; margin-top: 20px; box-shadow: 0 0 20px #00eaff33; }
          .btn { padding: 12px 20px; background: #00eaff; color: #000; border-radius: 12px; border: none; cursor: pointer; }
          textarea, input { width: 100%; padding: 10px; border-radius: 10px; border: none; margin-top: 10px; }
          video, img { width: 100%; margin-top: 10px; border-radius: 10px; }
        `}</style>
      </head>

      <body>
        <div class="container">
          <h1>🤖 Edith AI — Futuristic Voice + Vision + Chat</h1>

          {/* ===== CHAT ===== */}
          <div class="panel">
            <h2>💬 Chat</h2>
            <textarea id="chatInput" placeholder="Ask me anything..."></textarea>
            <button class="btn" onclick="sendChat()">Send</button>
            <div id="chatBox" style="margin-top:20px;"></div>
          </div>

          {/* ===== IMAGE GENERATION ===== */}
          <div class="panel">
            <h2>🖼️ Image Generator</h2>
            <input id="imgPrompt" placeholder="Describe an image..." />
            <button class="btn" onclick="generateImage()">Generate</button>
            <img id="generatedImage" />
          </div>

          {/* ===== CAMERA VISION ===== */}
          <div class="panel">
            <h2>📷 Camera AI Vision</h2>
            <video id="cam" autoplay></video>
            <button class="btn" onclick="captureVision()">Analyze</button>
            <img id="snap" />
            <p id="visionResult"></p>
          </div>

          {/* ===== VOICE STREAMING ===== */}
          <div class="panel">
            <h2>🎤 Realtime Voice</h2>
            <button class="btn" onclick="startVoice()">Start Talking</button>
            <p id="voiceOut"></p>
          </div>
        </div>

        <script>

/* ================= CHAT API ================= */
async function sendChat() {
  let q = document.getElementById('chatInput').value;
  let res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: q })
  });
  let data = await res.json();
  document.getElementById('chatBox').innerHTML += `<p><b>You:</b> ${q}<br/><b>Edith:</b> ${data.reply}</p>`;
}

/* ================= IMAGE GEN ================= */
async function generateImage() {
  let prompt = document.getElementById('imgPrompt').value;
  let res = await fetch('/api/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  let data = await res.json();
  document.getElementById('generatedImage').src = data.url;
}

/* ================= CAMERA VISION ================= */
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  document.getElementById('cam').srcObject = stream;
});

function captureVision() {
  let video = document.getElementById('cam');
  let canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  let dataUrl = canvas.toDataURL();
  document.getElementById('snap').src = dataUrl;

  fetch('/api/vision', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: dataUrl })
  }).then(r => r.json()).then(data => {
    document.getElementById('visionResult').innerText = data.description;
  });
}

/* ================= VOICE STREAMING ================= */
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.onresult = e => {
    let text = e.results[0][0].transcript;
    document.getElementById('voiceOut').innerText = text;
  };
  recognition.start();
}

        </script>
      </body>
    </html>
  );
}

/* =========================== API FILES =========================== */

/* ===== /api/chat.js ===== */
export async function chatAPI(req, res) {
  const { message } = req.body;
  const reply = `You said: ${message}. (This would be OpenAI real response)`;
  res.json({ reply });
}

/* ===== /api/image.js ===== */
export async function imageAPI(req, res) {
  const { prompt } = req.body;
  res.json({ url: "https://picsum.photos/800?random=" + Math.random() });
}

/* ===== /api/vision.js ===== */
export async function visionAPI(req, res) {
  const { image } = req.body;
  res.json({ description: "This would be a vision analysis of the uploaded camera frame." });
}

/* ===== /api/voice.js ===== */
export async function voiceAPI(req, res) {
  res.json({ text: "Realtime voice processing placeholder." });
}
