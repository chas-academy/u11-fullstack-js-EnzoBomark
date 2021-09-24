import config from 'config';
import S3 from 'aws-sdk/clients/s3';
import crypto, { randomBytes } from 'crypto';
import { random } from 'lodash';

const bucketName =
  process.env.AWS_BUCKET_NAME || (config.get('AWS_BUCKET_NAME') as string);
const region =
  process.env.AWS_BUCKET_REGION || (config.get('AWS_BUCKET_REGION') as string);
const accessKeyId =
  process.env.AWS_ACCESS_KEY || (config.get('AWS_ACCESS_KEY') as string);
const secretAccessKey =
  process.env.AWS_SECRET_KEY || (config.get('AWS_SECRET_KEY') as string);

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const generateUploadUrl = async () => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return uploadUrl;
};
