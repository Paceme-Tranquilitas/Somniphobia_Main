document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const asciiContainer = document.getElementById('ascii');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const charMap = ['@', '#', '%', '?', '*', '+', ';', ':', ' ', '.'];

    video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    video.addEventListener('play', () => {
        const frameRate = 60; // Frames per second
        setInterval(() => {
            if (!video.paused && !video.ended) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const asciiString = convertFrameToASCII(frame);
                asciiContainer.textContent = asciiString;
            }
        }, 80 / frameRate);
    });

    function convertFrameToASCII(frame) {
        let asciiString = '';
        const charMapLength = charMap.length;
        const scaleFactor = 8; 

        for (let y = 0; y < frame.height; y += scaleFactor) {
            for (let x = 0; x < frame.width; x += scaleFactor / 2) { 
                const offset = (y * frame.width + x) * 4;
                const r = frame.data[offset];
                const g = frame.data[offset + 1];
                const b = frame.data[offset + 2];
                const brightness = (r + g + b) / 3;
                const invertedBrightness = 255 - brightness;
                const charIndex = Math.floor((invertedBrightness / 255) * (charMapLength - 1));
                asciiString += charMap[charIndex];
            }
            asciiString += '\n';
        }
        return asciiString;
    }
});
//Thank you Acerola!