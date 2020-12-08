const Video = require('../models/Video')

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/video')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname+'.mp4')
    }
})

const fileFilter = (req, file, cb) => {
    if (true) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})




const videoRouter=require('express').Router()
videoRouter.post('/create-video',upload.single('file'),(req,res)=>{
	let obj=req.body
	obj.video=req.file.filename
	new Video(obj)
	.save()
	.then(doc=>{
		return res.json(doc)
	})
	.catch(err=>{
		console.log(err);
		res.json(err)
	})
})
videoRouter.get('get-all-video',(req,res)=>{
	Video.find()
	.then(doc=>{
		return res.json(doc)
	})
	.catch(err=>{
		console.log(err);
		res.json(err)
	})
})
videoRouter.get('/get-user-video/:id',(req,res)=>{
	Video.find({uid:req.params.id})
	.then(doc=>{
		return res.json(doc)
	})
	.catch(err=>{
		console.log(err);
		res.json(err)
	})
})
videoRouter.get('/delete/:id',(req,res)=>{
	Video.findByIdAndDelete(req.params.id)
	.then(doc=>{
		return res.json(doc)
	})
	.catch(err=>{
		console.log(err);
		res.json(err)
	})
})

module.exports=videoRouter