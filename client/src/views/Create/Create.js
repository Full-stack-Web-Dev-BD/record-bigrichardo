import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import RecordingAnimation from './RecordingAnimation'
import axios from 'axios'
import VideoPlay from './VideoPlay';
import About from 'views/Help/About';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import PageFooter from 'layouts/Main/components/Footer/PageFooter';


















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

        var videoObj = new FormData()
        videoObj.append('video', blob)
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
    <>
      <div className="row pt-3 pb-5 page-content">
        <div className="col-md-10 offset-md-1">
          <div>
            <h1>Record</h1>
            <p>Capture Video demos , tutorials , presentations  , game and edit them quickly</p>
          </div>
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
            <div className="col-md-6">
              {
                isStarted ?
                  <h2 className="text-center" >Recording ...</h2> :
                  <div style={{ position: 'relative', height: '450px', paddingBottom: '120px' }}>
                    {/* <div style={{ position: 'absolute' ,bottom:'-50px', zIndex: '999',borderRadius:'100%',transform:'translet(-50%)',left:'40%', position: 'absolute'}}>
                    <img src="/images/recordButton.jpg" style={{borderRadius:'50%'}}  />
                  </div> */}
                    <div style={{ position: 'absolute', cursor: 'pointer', bottom: '-100px', zIndex: '999', borderRadius: '100%', transform: 'translate(-50%)', left: '50%', position: 'absolute' }}>
                      <img id="captureBtn" src="/images/rc.jpg" />
                    </div>
                    <img id="" style={{ border: '1px solid gray', borderRadius: '10px', cursor: "pointer", position: 'absolute', width: '100%', height: '450px', zIndex: '9' }} src="/images/products/dummy.jpg" />

                  </div>
              }
            </div>
            <div className="col-md-4 mt-5">
              {
                true ?
                  <form>
                    <label className="label">Headline text </label>
                    <input className="form-control mb-3" placeholder="Enter your Headline text here " />
                    <label className="label">Additional text</label>
                    <textarea
                    placeholder="Enter your additonal text , use hyphen to add bullet points"
                    className="form-control mb-3"
                    rows="3"
                    />
                    <label className="label">Button Text</label>
                    <input className="form-control mb-3" placeholder="Enter your  Button text  here " />
                    <label className="label">Button Link </label>
                    <input className="form-control mb-3" placeholder="https://example.com " />
                  <div>
                    <button className="btn txt mr-3"> <DoneIcon/> Save</button>
                    <button className="btn txt mr-3"> <ClearIcon/> Cancel</button>
                  </div>
                    

                  </form> : <div>
                    <h2 style={{ textTransform: 'capitalize' }}>Your simple headline  text shows up here like this , you can idit it </h2>
                    <Typography style={{ fontSize: '20px', marginTop: '20px' }}>Additional text can  go  here . Use hyphen  to add bullet points like this how it shown below : </Typography>
                    <ul style={{ fontSize: '20px', padding: '0 20px ', margin: 0, fontsize: ' 20px' }}>
                      <li>Your point ont goes here </li>
                      <li>Your point ont goes here </li>
                    </ul>
                    <button className="btn  buy" style={{ marginTop: '50px' }}> BUY NOW AT 49$</button>
                    <div style={{ marginTop: '80px' }}>
                      <button className="btn " style={{ color: 'black', fontWeight: '500' }} > <EditIcon /> EDIT TEXT </button>
                    </div>
                  </div>
              }
            </div>
            <div className="col-md-2"></div>
          </form>
          <div className="text-center d-flex mt-5" style={isShow ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <VideoPlay />
          </div>
        </div>
      </div>
      <PageFooter/>
    </>
  )
}

export default Create
