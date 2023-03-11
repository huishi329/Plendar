import styles from './Recording.module.css';
import { useState, useEffect } from 'react';


export function Recording() {
  const [isRecording, setIsRecording] = useState(false);
  let mediaRecorder = null;

  const handleClick = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(!isRecording);
    }
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
            mediaRecorder = new MediaRecorder(stream);

            const stopRecording = () => {
              if (mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                stream.getTracks().forEach((track) => {
                  track.stop();
                });
              }
            }
            mediaRecorder.start();
            setTimeout(stopRecording, 5000);

            let chunks = [];
            mediaRecorder.ondataavailable = (e) => {
              chunks.push(e.data);
            };

            mediaRecorder.onstop = (e) => {
              const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
              chunks = [];
              const audioURL = window.URL.createObjectURL(blob);
              const audio = new Audio(audioURL);
              audio.play();
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
  }, [isRecording]);





  return (
    <div className={styles.container} onClick={handleClick}>
      <i className="fa-solid fa-microphone"></i>
    </div>
  );
}
