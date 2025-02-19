import { PutObjectCommand, S3Client, DeleteObjectCommand, S3ServiceException, ObjectCannedACL, S3ClientConfig } from '@aws-sdk/client-s3';

type S3Config = Required<Pick<S3ClientConfig, 'credentials' | 'region'>>;

interface UploadedFile {
  originalname: string;
  buffer: Buffer;
  mimetype?: string;
}

type S3UploadParams = {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ACL: ObjectCannedACL;
  ContentType?: string;
}

type S3DeleteParams = {
  Bucket: string;
  Key: string;
}

const getS3Config = (): S3Config => {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region) {
    throw new Error('AWS_REGION environment variable is not configured');
  }
  if (!accessKeyId) {
    throw new Error('AWS_ACCESS_KEY_ID environment variable is not configured');
  }
  if (!secretAccessKey) {
    throw new Error('AWS_SECRET_ACCESS_KEY environment variable is not configured');
  }

  return {
    credentials: {
      accessKeyId,
      secretAccessKey
    },
    region
  };
};

const getBucketName = (): string => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('AWS_BUCKET_NAME is not configured');
  }
  return bucketName;
};

const getRegion = (): string => {
  const region = process.env.AWS_REGION;
  if (!region) {
    throw new Error('AWS_REGION is not configured');
  }
  return region;
};

let s3Client: S3Client | null = null;

const getS3Client = (): S3Client => {
  if (!s3Client) {
    const config = getS3Config();
    s3Client = new S3Client(config);
  }
  return s3Client;
};

export const uploadFile = async (
  file: Express.Multer.File | UploadedFile,
  folder: string = 'myfiles',
  name: string = ''
): Promise<string> => {
  if (!file.buffer || !file.originalname) {
    throw new Error('Invalid file object provided');
  }

  try {
    const bucketName = getBucketName();
    const region = getRegion();
    const client = getS3Client();
    
    const fileName = name
      ? `${name}.${file.originalname.split('.').pop()}`
      : file.originalname;

    const params: S3UploadParams = {
      Bucket: bucketName,
      Key: `live/${folder}/${fileName}`,
      Body: file.buffer,
      ACL: 'public-read' as ObjectCannedACL
    };

    const command = new PutObjectCommand(params);
    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error(`Upload failed with status code: ${response.$metadata.httpStatusCode}`);
    }

    return `https://${bucketName}.s3.${region}.amazonaws.com/live/${folder}/${fileName}`;
  } catch (error) {
    if (error instanceof S3ServiceException) {
      throw new Error(`AWS S3 Error: ${error.message}`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred during file upload');
  }
};

export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    const bucketName = getBucketName();
    const region = getRegion();
    const client = getS3Client();
    
    const key = fileUrl.replace(
      `https://${bucketName}.s3.${region}.amazonaws.com/`,
      ''
    );

    const params: S3DeleteParams = {
      Bucket: bucketName,
      Key: key
    };

    const command = new DeleteObjectCommand(params);
    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 204) {
      throw new Error(`Delete failed with status code: ${response.$metadata.httpStatusCode}`);
    }
  } catch (error) {
    if (error instanceof S3ServiceException) {
      throw new Error(`AWS S3 Error: ${error.message}`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred during file deletion');
  }
};