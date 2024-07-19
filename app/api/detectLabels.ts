import AWS from 'aws-sdk';
import { Buffer } from 'buffer';

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY
});

const rekognition = new AWS.Rekognition();

export const detectLabels = async (base64: any) => {
  const buffer = Buffer.from(base64, 'base64');

  const params = {
    Image: { Bytes: buffer },
    MaxLabels: 1,
    MinConfidence: 70,
  };

  return new Promise((resolve, reject) => {
    rekognition.detectLabels(params, (err, data) => {
      if (err) {
        console.error('Error detecting labels:', err);
        reject(err);
      } else {
        console.log('Labels detected:', data.Labels);
        resolve(data.Labels);
      }
    });
  });
};
