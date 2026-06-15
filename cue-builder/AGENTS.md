# AGENTS.md

## Project: CUE File Builder

A web application that converts timestamp lists into valid CUE sheet files.

### File Structure Constraints
- HTML, CSS, and JS must be in **separate files** (`index.html`, `style.css`, `script.js`).
- Examples are stored in the `examples/` directory.

### Styling Constraints
- Use **Catppuccin Mocha** color palette for all styling.
- No mention of "Catppuccin Mocha" should appear in the page footer or visible UI text.

### Input Parsing Constraints
- Must support **multiple timestamp formats**:
  - `m:ss` (e.g., `5:45`) — as seen in `examples/simple-example.txt`
  - `h:mm:ss` (e.g., `1:00:56`) — as seen in both examples
  - `start-end` range format (e.g., `0:00-5:37`) — as seen in `examples/range-example.txt` (only the start timestamp is used for the INDEX position)

### CUE Output Constraints
- Generate valid CUE sheet format with MSF (Minutes:Seconds:Frames) timestamps.
- MSF must use `:` as separator in `MM:SS:FF` format (e.g., `05:45:00`).
- Frames are calculated at **75 frames per second** (1 frame = 1/75 of a second).
- The CUE `FILE` line must only include the filename (with extension), **no file type keyword** appended (e.g., `FILE "audio.wav"` not `FILE "audio.wav" WAV`).
- Each parsed line becomes a single TRACK entry.

### Metadata Input Constraints
- User must be able to specify:
  - **PERFORMER** — text input, default "Unknown"
  - **TITLE** — text input, default "Mixed Album"
  - **DATE** — text input, defaults to current year
  - **FILE Name with Extension** — text input, default "audio.wav"
- **No FILE Type selector** — file type is not specified separately; the filename includes the extension.

### UI/UX Constraints
- Copy to Clipboard and Download buttons must provide **visual feedback** on action (text change + green flash, reverting after ~1.5 seconds).
- Responsive layout: metadata section full-width, input/output panels side-by-side on desktop (768px+), stacked on mobile.