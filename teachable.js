<!DOCTYPE html>
<html>
<head>
<title>Teachable Machine Integration</title>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@1.0.6/dist/teachablemachine-image.min.js"></script>
<style>
body { font-family: sans-serif; }
#container { width: 640px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
#button { padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
#results { margin-top: 20px; }
</style>
</head>
<body>
<div id="container">
  <h1>Teachable Machine Classifier</h1>
  <button id="button">Classify Image</button>
  <div id="results"></div>
</div>
<script>
// Teachable Machine 模型URL
const URL = "https://teachablemachine.withgoogle.com/models/8vcVSNyFs/";
let model, webcam;
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the credentials will be requested only when the model is being used, and kept in the browser local storage until the user clears it.
  model = await tmImage.load(modelURL, metadataURL);
  webcam = new tmImage.Webcam(640, 480);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update();
  const { width, height } = webcam.canvas;
  const img = webcam.canvas;
  const result = await model.predict(img);
  const prediction = result.map((p) => ({
    label: p.className,
    probability: p.probability
  }));
  document.getElementById("results").innerHTML = prediction.map(p => `<p>${p.label}: ${p.probability.toFixed(2)}</p>`).join("");
  window.requestAnimationFrame(loop);
}

document.getElementById("button").addEventListener('click', () => {
  console.log("Button Pressed!");
});

init();
</script>
</body>
</html>