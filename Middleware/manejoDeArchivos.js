import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/Images')
    },
    filename: function (req, file, cb) {
        const typeArray = file.mimetype.split('/')
        const fileType = typeArray[1]
        cb(null, `${req.session.passport.user}.${fileType}`)
    }
})

const uploadFilter = function(req, file, cb){
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];
    if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
        cb(null, true);
    } else {
        cb('El archivo debe ser una imagen (JPG, JPEG o PNG)', false);
    }
}
const upload = multer({ storage: storage,
                        fileFilter: uploadFilter 
                    })


const middlewareImageUpload = upload.single('myFile')

export default middlewareImageUpload