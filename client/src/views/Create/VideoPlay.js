import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PublishIcon from '@material-ui/icons/Publish';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CancelIcon from '@material-ui/icons/Cancel';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function VideoPlay({ srcObject }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button id="stopBtn" color="secondary" size="small" onClick={handleClickOpen} variant="contained" className="ml-2"><PublishIcon /> Publish</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <h3>Play your video and publish</h3>
                    <DialogContentText style={{ visibility: 'hidden' }} id="alert-dialog-slide-description">Let Google help apps determine location. This means sending anonymous location .</DialogContentText>
                    <video controls autoPlay src={srcObject} style={{ width: '450px', height: '300px' }} id="videoElement" ></video>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" size="small" variant="contained"> <AddPhotoAlternateIcon /> Save Draft</Button>
                    <Button color="secondary" size="small" variant="contained" className="ml-2"> <CloudUploadIcon /> Publish</Button>
                    <Button color="secondary" size="small" variant="contained" className="ml-2" onClick={e=>{window.location.reload()}}> <CancelIcon/> Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
