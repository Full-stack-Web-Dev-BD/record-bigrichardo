import { Button, Card, CardContent, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import RecordingAnimation from './RecordingAnimation'
import PublishIcon from '@material-ui/icons/Publish';
const Create = () => {

  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [line3, setLine3] = useState('')



  const [isStarted, setIsStarted] = useState(false)
  
  
  
  const startRecording = () => {
    document.getElementById('sronlyplay').click()
  }
  const submitHandler=(e)=>{
    e.preventDefault()
    setIsStarted(!isStarted)
  }

  return (
    <div className="row mt-5">
      <div className="col-md-10 offset-md-1">
        <Card>
          <CardContent>
            {
              !isStarted ?
                < form onSubmit={e=>{submitHandler(e)}} className="row">
                  <div className="col-md-8">
                    <img onClick={e => { startRecording() }} style={{ border: '1px solid gray', borderRadius: '10px', cursor: "pointer" }} src="./images/click.png" />
                  </div>
                  <div className="col-md-4 mt-5">
                    <h3 style={{ textTransform: 'capitalize' }}>Enter your head line here, <br />  Tow line of text is fine</h3>
                    <div className="mt-5">
                      <TextField
                        onChange={e=>{setLine1(e.target.value)}}
                        placeholder="Additional Information line one"
                        fullWidth
                        required
                      />
                      <TextField
                        placeholder="Additional Information line two"
                        className="mt-3"
                        fullWidth
                        onChange={e=>{setLine2(e.target.value)}}
                      />
                      <TextField
                        placeholder="Additional Information line three"
                        className="mt-3"
                        fullWidth
                        onChange={e=>{setLine3(e.target.value)}}
                      />
                      <div style={{marginTop:'70px'}}>
                        <Button color="inherit"  size="small" variant="contained" >Buy Now for $XX (normally  $XX)</Button>

                      </div>
                      <button id="sronlyplay" type="submit" className="sr-only" >sr only </button>

                    </div>
                  </div>
                </form> :
                <div className="text-center">
                  <h3>Recording ...</h3>
                  <RecordingAnimation />
                  <Button color="secondary" size="small" variant="contained">Save Draft</Button>
                  <Button color="secondary" size="small" variant="contained" className="ml-2"><PublishIcon /> Publish</Button>
                  <Button color="secondary" size="small" variant="contained" className="ml-2">Cancel</Button>
                </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Create
