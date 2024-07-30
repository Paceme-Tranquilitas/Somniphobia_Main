self.onmessage = function(event) {
    const frame = event.data;
    const charMap = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];
    let asciiString = '';

    const width = frame.width;
    const height = frame.height;

    for (let y = 0; y < height; y += 8) {
        for (let x = 0; x < width; x += 4) {
            const offset = (y * width + x) * 4;
            const r = frame.data[offset];
            const g = frame.data[offset + 1];
            const b = frame.data[offset + 2];
            const brightness = (r + g + b) / 3;
            const charIndex = Math.floor((brightness / 255) * (charMap.length - 1));
            asciiString += charMap[charIndex];
        }
        asciiString += '\n';
    }

    // Optional: Adjust the scale of the ASCII art to fit better
    self.postMessage(asciiString.replace(/(.{80})/g, "$1\n"));
};
    