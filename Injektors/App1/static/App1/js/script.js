//document.cookie = '_ga=GA1.3.382794677.1620453401; SameSite=None; Secure';
//document.cookie = 'G_ENABLED_IDPS=google; SameSite=None; Secure';
//document.cookie = '_gid=GA1.3.1023269948.1621446865; SameSite=None; Secure';


// original -----> teachable machines .js
// the link to your model provided by Teachable Machine export panel
//const URL = '{{https://teachablemachine.withgoogle.com/models/Fuk84KzSt/}}';
let model, webcam, ctx, labelContainer, maxPredictions;
const demosSection = document.getElementById('demos');

// Check if webcam access is supported.
/*function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}*/




async function init() {
    const modelURL = 'https://teachablemachine.withgoogle.com/models/Fuk84KzSt/model.json';
    const metadataURL ='https://teachablemachine.withgoogle.com/models/Fuk84KzSt/metadata.json';
    
    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
   
 

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById('canvas');
    canvas.width = 200; canvas.height = 200;
    ctx = canvas.getContext('2d');
    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement('div'));
    }
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
}