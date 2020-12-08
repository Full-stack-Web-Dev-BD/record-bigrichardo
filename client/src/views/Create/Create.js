import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoPlay from './VideoPlay';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import PageFooter from 'layouts/Main/components/Footer/PageFooter';
import PublishIcon from '@material-ui/icons/Publish';
import jwtDecoder from 'jwt-decode'
import Axios from 'axios';
import BackupIcon from '@material-ui/icons/Backup';


const Create = () => {  
  const [headlineText, setHeadlineText] = useState('')
  const [additionalText, setAdditionalText] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const [isFinishRecord, setIsFinishRecord] = useState(false)
  const [srcObject, setSrcObject] = useState(null)
  const [recordedVideo, setRecordedVideo] = useState()
  const [videoDesError, setVideoDesError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isShow, setIsShow] = useState(false)

  const [editable, setEditable] = useState(false)


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

        // var videoObj = new FormData()
        // videoObj.append('video', blob)

        // uploadVideo(videoObj)
        // Axios.post('/api/video/create-video', videoObj)

        setRecordedVideo(blob)
      };

      startBtn.click()
      setIsStarted(true)
    };
    download.onclick = () => {
    }
    startBtn.onclick = async () => {
      rec.start();
      setIsShow(true)
    };

    stopBtn.onclick = () => {
      if (!rec) {
        return
      }
      rec.stop();
      stream.getTracks().forEach(s => s.stop())
      stream = null;
      setIsFinishRecord(true)
      setIsStarted(false)
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

  const uploadVideo = () => {
    if (!headlineText || !additionalText || !buttonText || !buttonLink) {
      return setVideoDesError('Please click on edit and  give us Headline Text , Additional Text , Button Text and Button Link for your video !!!')
    }

    if (localStorage.jwtToken) {
      let ext = jwtDecoder(localStorage.jwtToken)
      console.log(ext);
      let x=new Date()
      let j =x.toString()
      let y=j.split(' ')
      let createTime=`${y[0]} ${y[1]} ${y[2]}`
      var videoObj = new FormData()
      videoObj.append('file', recordedVideo)
      videoObj.append('uid', ext.id)
      videoObj.append('headlineText', headlineText)
      videoObj.append('additionalText', additionalText)
      videoObj.append('buttonText', buttonText)
      videoObj.append('buttonLink', buttonLink)
      videoObj.append('date', createTime)
      setLoading(true)
      Axios.post('/api/video/create-video', videoObj)
      .then(res=>{
        window.location.href='/library'
      })
      .catch(err=>{
        console.log(err);
      })
    }
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
            <div className="btnHolder d-none d-flex " style={{ visibility: 'hidden' }}>
              {/* <button className="btn btn-success  ml-3" id="captureBtn">captureBtn </button> */}
              <button className="btn btn-success  ml-3" id="startBtn">sStart </button>
              <button className="btn btn-danger  ml-3" id='stopBtn' >Stop </button>
              <button className="btn btn-primary  ml-3" id="puseBtn">puse </button>
              <button className="btn btn-warning  ml-3" id="resumeBtn"> resume </button>
              <a id="download" href="#" style={{ display: 'none' }}>
                <button>Download</button>
              </a>
            </div>
          </div>
          < form onSubmit={e => { submitHandler(e) }} className="row">
            <div className="col-md-6">
              <div style={{ position: 'relative', height: '450px', paddingBottom: '120px' }}>
              <div style={isFinishRecord ? {visibility:'hidden'}:{}} >
                <div style={{ position: 'absolute', cursor: 'pointer', bottom: '-100px', zIndex: '999', borderRadius: '100%', transform: 'translate(-50%)', left: '50%', position: 'absolute' }}>
                  <img id="captureBtn" style={isStarted ? { visibility: 'hidden' } : {}} src='/images/rc.jpg' />
                  {
                    isStarted ?
                      <h2 style={!isStarted ? { visibility: 'hidden' } : {}} >Recording...</h2> : ''
                  }
                </div>
                </div>
                {
                  isFinishRecord ?
                    <div>
                      <video controls autoPlay style={{ width: '100%', height: 'auto' }} id="videoElement" ></video>
                      <Button color="secondary" size="small" onClick={e => uploadVideo()} variant="contained" className="ml-2"><PublishIcon /> Publish</Button>
                      {
                        loading?
                      <button  className="txt btn ml-4"> <BackupIcon/> Uploading ... </button>:''
                      }
                    </div> :
                    <img id="" style={{ border: '1px solid gray', borderRadius: '10px', cursor: "pointer", position: 'absolute', width: '100%', height: '450px', zIndex: '9' }} src="/images/products/dummyThumb.jpg" />
                }
              </div>
            </div>
            <div className="col-md-4 mt-5">
              {
                editable ?
                  <form onSubmit={e => submitHandler(e)}>
                    <label className="label">Headline text </label>
                    <input onChange={e => { setHeadlineText(e.target.value) }} className="form-control mb-3" placeholder="Enter your Headline text here " />
                    <label className="label">Additional text</label>
                    <textarea
                      placeholder="Enter your additonal text , use hyphen to add bullet points"
                      className="form-control mb-3"
                      rows="3"
                      onChange={e => { setAdditionalText(e.target.value) }}
                    />
                    <label className="label">Button Text</label>
                    <input onChange={e => { setButtonText(e.target.value) }} className="form-control mb-3" placeholder="Enter your  Button text  here " />
                    <label className="label">Button Link </label>
                    <input onChange={e => { setButtonLink(e.target.value) }} className="form-control mb-3" placeholder="https://example.com " />
                    <div>
                      <button className="btn txt mr-3" onClick={e => setEditable(!editable)} type='submit'> <DoneIcon /> Save</button>
                      <button className="btn txt mr-3" onClick={e => setEditable(!editable)}> <ClearIcon /> Cancel</button>
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
                      <button className="btn " style={{ color: 'black', fontWeight: '500' }} onClick={e => setEditable(!editable)} > <EditIcon /> EDIT TEXT </button>
                    </div>
                  </div>
              }
            </div>
            <div className="col-md-2"></div>
          </form>
          {/* <div className="text-center d-flex mt-5" style={isShow ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <VideoPlay />
          </div> */}
        </div>
      </div>
      {
        videoDesError ?
          <p className="txt text-danger text-center"> {videoDesError} </p> : ''
      }
      <div className="page-footer">
        <button className="btn  draft-style" >SAVE DRAFT</button>
        <button disabled={isFinishRecord?true:false} className="btn save-style" onClick={e => { document.getElementById('stopBtn').click() }} >PUBLISH</button>
      </div>
    </>
  )
}

export default Create
