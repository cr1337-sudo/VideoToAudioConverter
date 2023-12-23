import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import config from '../config/config'

interface UploadFileParams {
  Bucket: string
  Key: string
  Body: any
}

export class AwsS3Repo {
  private readonly s3ConfigObject = {
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    }
  }

  private readonly s3Client: S3Client

  constructor () {
    this.s3Client = new S3Client(this.s3ConfigObject)
  }

  async uploadFile (params: UploadFileParams) {
    const command = new PutObjectCommand(params)
    const res = await this.s3Client.send(command)
  }
}
