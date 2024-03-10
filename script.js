const audioFileInput = document.getElementById('audio-file');
const uploadButton = document.getElementById('upload-button');
const uploadStatus = document.querySelector('.upload-status');
const transcription = document.querySelector('.transcription');

uploadButton.addEventListener('click', async () => {
    const file = audioFileInput.files[0];

    // Validate file type and size
    if (!isValidAudioFile(file)) {
        // Display error message
        return;
    }

    uploadStatus.textContent = 'Uploading...';

    const formData = new FormData();
    formData.append('audio', file);

    try {
        const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        transcription.textContent = data.transcription;
        uploadStatus.textContent = 'Transcription complete!';
    } catch (error) {
        console.error(error);
        uploadStatus.textContent = 'Error: ' + error.message;
    }
});

function isValidAudioFile(file) {
    const validTypes = ['audio/aac', 'audio/mp3', 'audio/wav', 'audio/flac'];
    return validTypes.includes(file.type);
}
