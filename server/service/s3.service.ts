import config from 'config';
import { get } from 'lodash';
import S3 from 'aws-sdk/clients/s3';
import fs, { unlink } from 'fs';
import sharp from 'sharp';
import path from 'path';

const bucketName = config.get('AWS_BUCKET_NAME') as string;
const region = config.get('AWS_BUCKET_REGION') as string;
const accessKeyId = config.get('AWS_ACCESS_KEY') as string;
const secretAccessKey = config.get('AWS_SECRET_KEY') as string;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadToS3 = async (file: Express.Multer.File) => {
  fs.access('./uploads', (error) => {
    if (error) {
      fs.mkdirSync('./uploads');
    }
  });

  const { buffer, originalname } = file;
  const timestamp = new Date().toISOString();
  const ref = `${timestamp}-${path.parse(originalname).name}.jpeg`;

  const compressedImage = await sharp(buffer).jpeg({ quality: 85 }).toBuffer();

  const uploadParams = {
    Bucket: bucketName,
    Body: compressedImage,
    Key: ref,
  };

  return s3.upload(uploadParams).promise();
};
