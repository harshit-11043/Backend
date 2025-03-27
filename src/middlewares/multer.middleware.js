import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'./public/temp')
    },
    filename: function(req,res,cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // + '-' + uniqueSuffix
        cb(null. file.fieldname )
    }
})

export const upload = multer({storage,})