import styles from './Recording.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sendRecording } from '../../store/recording';



export function Recording() {
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();
  const mediaRecorder = useRef(null);

  const handleClick = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
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
            mediaRecorder.current = new MediaRecorder(stream);

            const stopRecording = () => {
              if (mediaRecorder.current.state === "recording") {
                mediaRecorder.current.stop();
              }
              stream.getTracks().forEach((track) => {
                track.stop();
            });
            }
            mediaRecorder.current.start();
            setTimeout(stopRecording, 5000);

            let chunks = [];
            mediaRecorder.current.ondataavailable = (e) => {
              chunks.push(e.data);
            };

            mediaRecorder.current.onstop = (e) => {
              const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
              chunks = [];
              const audioURL = window.URL.createObjectURL(blob);
              const audio = new Audio(audioURL);
              audio.play();
              dispatch(sendRecording(blob))
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
  }, [isRecording, dispatch]);





  return (
    <div className={styles.container} >
      <i className="fa-solid fa-microphone" onClick={handleClick}></i>
    </div>
  );
}
