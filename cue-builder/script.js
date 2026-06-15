/**
 * Parses a timestamp string (m:ss or h:mm:ss) into total seconds.
 * @param {string} ts - Timestamp string like "5:45" or "1:00:56"
 * @returns {number|null} Total seconds or null if parsing fails.
 */
function parseTimestamp(ts) {
    const parts = ts.trim().split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        if (isNaN(minutes) || isNaN(seconds)) return null;
        return minutes * 60 + seconds;
    } else if (parts.length === 3) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(parts[2], 10);
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null;
        return hours * 3600 + minutes * 60 + seconds;
    }
    return null;
}

/**
 * Converts total seconds to CUE MSF format string (MM:SS:FF).
 * Frames are at 75 per second, so fractional seconds map to frames.
 * @param {number} totalSeconds - Total seconds from start (may include decimals).
 * @returns {string} Formatted MSF string like "05:45:00".
 */
function secondsToMSF(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    // Calculate frames from fractional seconds (75 frames per second)
    const frames = Math.round((totalSeconds % 1) * 75);
    return String(minutes).padStart(2, '0') + ':' +
           String(seconds).padStart(2, '0') + ':' +
           String(frames).padStart(2, '0');
}

/**
 * Extracts timestamp and title from a single line.
 * Supports two formats:
 *   - Single timestamp: "5:45 Track Title"
 *   - Range timestamp: "0:00-5:37 Track Title" (only start timestamp is used)
 * @param {string} line - Input line
 * @returns {{timestamp: string, title: string}|null} Parsed result or null.
 */
function parseLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return null;

    // Try range format first: start-end Title
    const rangeMatch = trimmed.match(/^(\d+:\d+(?::\d+)?)-(\d+:\d+(?::\d+)?)\s+(.+)$/);
    if (rangeMatch) {
        return {
            timestamp: rangeMatch[1], // Only use the start timestamp
            title: rangeMatch[3].trim()
        };
    }

    // Fall back to single timestamp format: timestamp Title
    const match = trimmed.match(/^(\d+:\d+(?::\d+)?)\s+(.+)$/);
    if (!match) return null;

    return {
        timestamp: match[1],
        title: match[2].trim()
    };
}

/**
 * Escapes double quotes in a string for CUE file safety.
 * @param {string} str
 * @returns {string}
 */
function escapeCueString(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Generates a complete CUE sheet from an array of track entries and metadata.
 * @param {Array<{totalSeconds: number, title: string}>} tracks
 * @param {{performer: string, title: string, date: string, fileName: string}} metadata
 * @returns {string} Full CUE file content.
 */
function generateCue(tracks, metadata) {
    const lines = [];

    // Header
    lines.push('PERFORMER "' + escapeCueString(metadata.performer) + '"');
    lines.push('TITLE "' + escapeCueString(metadata.title) + '"');
    lines.push('REM DATE "' + metadata.date + '"');
    lines.push('');
    lines.push('FILE "' + metadata.fileName + '"');

    // Track entries
    tracks.forEach((track, index) => {
        const trackNum = String(index + 1).padStart(2, '0');
        const msf = secondsToMSF(track.totalSeconds);
        const safeTitle = escapeCueString(track.title);

        lines.push(`  TRACK ${trackNum} AUDIO`);
        lines.push(`    TITLE "${safeTitle}"`);
        lines.push(`    INDEX 01 ${msf}`);
    });

    return lines.join('\n') + '\n';
}

/**
 * Reads metadata from form inputs.
 * @returns {{performer: string, title: string, date: string, fileName: string}}
 */
function getMetadata() {
    return {
        performer: document.getElementById('performer-input').value || 'Unknown',
        title: document.getElementById('title-input').value || 'Mixed Album',
        date: document.getElementById('date-input').value || new Date().getFullYear(),
        fileName: document.getElementById('filename-input').value || 'audio.wav'
    };
}

/**
 * Main conversion function: reads input textarea, parses lines, generates CUE.
 */
function convert() {
    const inputTextarea = document.getElementById('input-textarea');
    const outputTextarea = document.getElementById('output-textarea');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');

    const metadata = getMetadata();
    const rawLines = inputTextarea.value.split('\n');
    const tracks = [];

    for (const line of rawLines) {
        const parsed = parseLine(line);
        if (!parsed) continue;

        const totalSeconds = parseTimestamp(parsed.timestamp);
        if (totalSeconds === null) continue;

        tracks.push({
            totalSeconds: totalSeconds,
            title: parsed.title
        });
    }

    if (tracks.length === 0) {
        outputTextarea.value = '';
        copyBtn.disabled = true;
        downloadBtn.disabled = true;
        return;
    }

    const cueContent = generateCue(tracks, metadata);
    outputTextarea.value = cueContent;
    copyBtn.disabled = false;
    downloadBtn.disabled = false;
}

/**
 * Provides visual feedback on a button: changes text and style temporarily.
 * @param {HTMLButtonElement} btn - The button element.
 * @param {string} successText - Text to show on success.
 */
function flashButton(btn, successText) {
    const originalText = btn.textContent;
    btn.textContent = successText;
    btn.classList.add('success-flash');
    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('success-flash');
    }, 1500);
}

/**
 * Copies the output CUE content to clipboard.
 */
async function copyToClipboard() {
    const outputTextarea = document.getElementById('output-textarea');
    const copyBtn = document.getElementById('copy-btn');
    try {
        await navigator.clipboard.writeText(outputTextarea.value);
        flashButton(copyBtn, 'Copied!');
    } catch (err) {
        // Fallback for older browsers
        outputTextarea.select();
        document.execCommand('copy');
        flashButton(copyBtn, 'Copied!');
    }
}

/**
 * Downloads the output CUE content as a .cue file.
 */
function downloadCue() {
    const outputTextarea = document.getElementById('output-textarea');
    const downloadBtn = document.getElementById('download-btn');
    const blob = new Blob([outputTextarea.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.cue';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    flashButton(downloadBtn, 'Downloaded!');
}

/**
 * Clears all input and output fields.
 */
function clearAll() {
    const inputTextarea = document.getElementById('input-textarea');
    const outputTextarea = document.getElementById('output-textarea');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');

    inputTextarea.value = '';
    outputTextarea.value = '';
    copyBtn.disabled = true;
    downloadBtn.disabled = true;
}

// DOM ready initialization
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('convert-btn').addEventListener('click', convert);
    document.getElementById('clear-btn').addEventListener('click', clearAll);
    document.getElementById('copy-btn').addEventListener('click', copyToClipboard);
    document.getElementById('download-btn').addEventListener('click', downloadCue);
});