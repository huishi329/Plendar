import { csrfFetch } from './csrf';

// const SENT_RECORDING = 'recording/sentRecording';

export const sendRecording = (recording) => async () => {
    const formData = new FormData();
    formData.append('recording', recording);
    const response = await csrfFetch('/api/recording', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    });
    const data = await response.json();
    // dispatch(setRecording(data));
    return data;
    };
