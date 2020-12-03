import { Button, Card, CardContent, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import RecordingAnimation from './RecordingAnimation'
import axios from 'axios'
import VideoPlay from './VideoPlay';
const Create = () => {
  const [showVideo, setShowVideo] = useState(false)
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [line3, setLine3] = useState('')
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {


    const link = document.getElementById('link');
    const uploaded_link = document.getElementById('uploaded_link');
    const st = document.getElementById('st');

    
    
    const uploadVideo = (videoObj) => {
      axios.post('https://test.sparkdatabox.com/host.php', videoObj)
        .then(res => {
        })
    }


    const captureBtn = document.getElementById('captureBtn');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const download = document.getElementById('download');
    const puseBtn = document.getElementById('puseBtn')
    const resumeBtn = document.getElementById('resumeBtn')

    // if ('getDisplayMedia' in navigator.mediaDevices) warningEl.style.display = 'none';

    let blobs;
    let blob;
    let rec;
    let stream;
    let voiceStream;
    let desktopStream;

    const mergeAudioStreams = (desktopStream, voiceStream) => {
      const context = new AudioContext();
      const destination = context.createMediaStreamDestination();
      let hasDesktop = false;
      let hasVoice = false;
      if (desktopStream && desktopStream.getAudioTracks().length > 0) {
        // If you don't want to share Audio from the desktop it should still work with just the voice.
        const source1 = context.createMediaStreamSource(desktopStream);
        const desktopGain = context.createGain();
        desktopGain.gain.value = 0.7;
        source1.connect(desktopGain).connect(destination);
        hasDesktop = true;
      }

      if (voiceStream && voiceStream.getAudioTracks().length > 0) {
        const source2 = context.createMediaStreamSource(voiceStream);
        const voiceGain = context.createGain();
        voiceGain.gain.value = 0.7;
        source2.connect(voiceGain).connect(destination);
        hasVoice = true;
      }

      return (hasDesktop || hasVoice) ? destination.stream.getAudioTracks() : [];
    };

    captureBtn.onclick = async () => {
      setIsStarted(true)
      download.style.display = 'none';
      const audio = true
      const mic = true
      // const audio = audioConfig.speakerAudio
      // const mic = audioConfig.microphoneAudio

      desktopStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: audio });

      if (mic === true) {
        voiceStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: mic });
      }

      const tracks = [
        ...desktopStream.getVideoTracks(),
        ...mergeAudioStreams(desktopStream, voiceStream)
      ];

      stream = new MediaStream(tracks);
      console.log('Stream', stream)

      blobs = [];

      rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8,opus' });
      rec.ondataavailable = (e) => blobs.push(e.data);
      rec.onstop = async () => {
        setShowVideo(true)
        //blobs.push(MediaRecorder.requestData());
        let videoelement = document.getElementById('videoElement')

        blob = new Blob(blobs, { type: 'video/mp4' });
        let url = window.URL.createObjectURL(blob);
        videoelement.src = URL.createObjectURL(blob);

        var  videoObj=new FormData()
        videoObj.append('video',blob)
        uploadVideo(videoObj)
      };

      startBtn.click()
    };
    download.onclick = () => {
    }
    startBtn.onclick = async () => {
      rec.start();
      setIsShow(true)
    };

    stopBtn.onclick = () => {
      rec.stop();
      stream.getTracks().forEach(s => s.stop())
      stream = null;
    };
    puseBtn.onclick = () => {
      rec.pause();
    }
    resumeBtn.onclick = () => {
      rec.resume()
    }
  }, [])


  const [isStarted, setIsStarted] = useState(false)



  const submitHandler = (e) => {
    e.preventDefault()
    setIsStarted(!isStarted)
  }

  return (
    <div className="row mt-5">
      <div className="col-md-10 offset-md-1">
        <Card>
          <CardContent>
            <div >
              <div className="btnHolder d-none d-flex">
                <button className="btn btn-success  ml-3" style={{ display: 'none' }} id="startBtn">sStart </button>
                <button className="btn btn-danger  ml-3" style={{ display: 'none' }} disabled>Stop </button>
                <button className="btn btn-primary  ml-3" style={{ display: 'none' }} id="puseBtn">puse </button>
                <button className="btn btn-warning  ml-3" style={{ display: 'none' }} id="resumeBtn"> resume </button>
                <a id="download" href="#" style={{ display: 'none' }}>
                  <button>Download</button>
                </a>
              </div>
            </div>
            < form onSubmit={e => { submitHandler(e) }} className="row">
              <div className="col-md-8">
                {
                  isStarted ?
                  <h2 className="text-center" >Recording ...</h2>:
                    <img id="captureBtn" style={{ border: '1px solid gray', borderRadius: '10px', cursor: "pointer" }} src="./images/click.png" />
                }
              </div>
              <div className="col-md-4 mt-5">
                <h3 style={{ textTransform: 'capitalize' }}>Enter your head line here, <br />  Tow line of text is fine</h3>
                <div className="mt-5">
                  <TextField
                    onChange={e => { setLine1(e.target.value) }}
                    placeholder="Headline Text"
                    fullWidth
                    required
                  />
                  <TextField
                    placeholder="Additional  Text"
                    className="mt-3"
                    fullWidth
                    onChange={e => { setLine2(e.target.value) }}
                  />
                  {/* <TextField
                        placeholder="Additional Information line three"
                        className="mt-3"
                        fullWidth
                        onChange={e => { setLine3(e.target.value) }}
                      /> */}
                  <div style={{ marginTop: '70px' }}>
                    <Button color="inherit" size="small" variant="contained" >Buy Now for $XX (normally  $XX)</Button>
                  </div>
                  <button id="sronlyplay" type="submit" className="sr-only" >sr only </button>
                </div>
              </div>
            </form>
            <div className="text-center d-flex mt-5" style={isShow?{visibility:'visible'}:{visibility:'hidden'}}>
              <VideoPlay/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Create
