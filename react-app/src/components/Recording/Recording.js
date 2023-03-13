import styles from './Recording.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sendRecording } from '../../store/recording';
import { setRecordingTranscript } from '../../store/sessionData';

export function Recording() {
  const [isRecording, setIsRecording] = useState(false);
  const [inputField, setInputField] = useState('');
  const dispatch = useDispatch();
  const recordRef = useRef(null);
  const mediaRecorder = useRef(null);

  const handleClick = (e) => {
    for (const node of e.nativeEvent.composedPath()) {
      if (node.className.includes("title")) {
        if (inputField !== "title") setInputField("title");
        break;
      } else if (node.className.includes("description")) {
        if (inputField !== "description") setInputField("description");
        break;
      }
    }
    if (isRecording) mediaRecorder.current.stop();
    setIsRecording(!isRecording);
  }


  useEffect(() => {
    if (isRecording) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
        navigator.mediaDevices
          .getUserMedia(
            // constraints - only audio needed for this app
            {
              audio: true,
            }
          )
          // Success callback
          .then((stream) => {
            mediaRecorder.current = new MediaRecorder(stream);

            const stopRecording = () => {
              if (mediaRecorder.current.state === "recording") {
                mediaRecorder.current.stop();
              }
            }
            mediaRecorder.current.start();
            setTimeout(stopRecording, 10000);

            let chunks = [];
            mediaRecorder.current.ondataavailable = (e) => {
              chunks.push(e.data);
            };

            mediaRecorder.current.onstop = (e) => {
              // for setTimout case
              if (isRecording) setIsRecording(false);

              stream.getTracks().forEach((track) => {
                track.stop();
              });
              const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
              chunks = [];
              // for debugging
              const audioURL = window.URL.createObjectURL(blob);
              const audio = new Audio(audioURL);
              audio.play();
              dispatch(sendRecording(blob))
              .then((data) => {
                if (data.transcript.length > 0 && inputField.length > 0) {
                  dispatch(setRecordingTranscript(inputField, data.transcript))
                }
              })
            }
          })

          // Error callback
          .catch((err) => {
            console.error(`The following getUserMedia error occurred: ${err}`);
          });
      } else {
        console.log("getUserMedia not supported on your browser!");
      }
    }
  }, [isRecording, dispatch, inputField]);


  return (
    <div className={`${styles.container} ${isRecording && styles.blink}`} ref={recordRef}>
      <i className="fa-solid fa-microphone" onClick={handleClick}></i>
    </div>
  );
}
