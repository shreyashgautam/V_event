const cloudinary=require('cloudinary').v2;

const multer=require('multer');

cloudinary.config({
    cloud_name:'dbi8rkuyk',
    api_key:'191792365829353',
    api_secret:'dECMcDaEK21ncakWGzuMu0kBMEM'

});


const storage=new multer.memoryStorage();

async function imageUploadUtil(file){
    const result=await cloudinary.uploader.upload(file,{resourse_type:'auto'});

    return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };

