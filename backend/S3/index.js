const S3 = require("aws-sdk/clients/s3");
const awsS3Config = require("../config/aws.config");
const { Buffer } = require("buffer");

const bucketName = awsS3Config.AWS_BUCKET_NAME;
const region = awsS3Config.AWS_BUCKET_REGION;
const accessKeyId = awsS3Config.AWS_ACCESS_KEY_ID;
const secretAccessKey = awsS3Config.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function getImgBuffer(base64) {
  const base64str = base64.replace(/^data:image\/image\/\w+;base64,/, "");
  return Buffer.from(base64str, "base64");
}

// uploads a file to s3
function uploadFile(file, base64Image) {
  // filename is the name that is created by multer
  const uploadParams = {
    Key: file.originalname,
    Bucket: bucketName,
    Body: getImgBuffer(base64Image),
    ContentEncoding: "base64",
    ContentType: "image/*",
  };

  return s3.upload(uploadParams).promise();
}

// downloads a from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

// delete s3 a file from s3
function deleteFile(fileKey) {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.deleteObject(deleteParams).promise();
}
module.exports = {
  getImgBuffer,
  uploadFile,
  getFileStream,
  deleteFile,
};
