var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({ storage: storage });

router.post('/api/upload', upload.single('file'), function(req, res, next) {
    console.log(req.file);
    console.log("kya chal rha hai...");
    if (!req.file) {
        res.status(500);
        return next(err);
    }

    res.json({ fileUrl: 'http://192.168.0.7:3000/images/' + req.file.filename, message: 'Kya chal rha hai..' });
})


module.exports = router;