import 'dotenv/config';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

interface ISendMailData {
  to: string[];
  subject: string;
  body: string;
  sender: string;
}

export class AWSProvider {
  static sendMail = async ({ to, subject, body, sender }: ISendMailData) => {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: sender,
    });

    sesClient
      .send(command)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.log('Failed sending email: ', error);
      });
  };
}
