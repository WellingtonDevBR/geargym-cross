import AWS, { Rekognition } from 'aws-sdk';
import { Buffer } from 'buffer';

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY
});

const rekognition = new AWS.Rekognition();

export const detectCustomLabels = async (base64: any) => {
  const buffer = Buffer.from(base64, 'base64');

  const params: Rekognition.Types.DetectCustomLabelsRequest = {
    Image: { Bytes: buffer },
    ProjectVersionArn: String(process.env.EXPO_PUBLIC_AWS_CUSTOM_MODEL_ARN),
    MaxResults: 1,
    MinConfidence: 70,
  };

  return new Promise((resolve, reject) => {
    rekognition.detectCustomLabels(params, (err, data) => {
      if (err) {
        console.error('Error detecting custom labels:', err);
        reject(err);
      } else {
        console.log('Custom labels detected:', data.CustomLabels);
        resolve(data.CustomLabels);
      }
    });
  });
};
