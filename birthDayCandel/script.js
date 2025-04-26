let isBlowing = false;
let audioContext;
let analyser;
let microphone;

async function startDetection() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        
        microphone.connect(analyser);
        analyser.fftSize = 256;
        
        detectBlow();
        document.querySelector('button').disabled = true;
    } catch (error) {
        console.error('Microphone access denied:', error);
    }
}

function detectBlow() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function analyze() {
        analyser.getByteFrequencyData(dataArray);
        let total = 0;
        let highFreq = 0;
        for (let i = 0; i < bufferLength; i++) {
            total += dataArray[i];
            if (i > bufferLength/2) highFreq += dataArray[i];
        }
        const avg = total / bufferLength;
        const hfRatio = highFreq / total;

        if (avg > 50 && hfRatio > 0.4 && !isBlowing) {
            blowOutCandle();
        }
        
        requestAnimationFrame(analyze);
    }

    analyze();
}

function blowOutCandle() {
    isBlowing = true;
    const flame = document.getElementById('flame');
    flame.classList.add('blowing');
    
    setTimeout(() => {
        flame.style.display = 'none';
        isBlowing = false;
    }, 500);
}
