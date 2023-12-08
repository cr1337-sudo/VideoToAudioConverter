import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import config from '../config/config';
import { generateUniqueId } from '../utils/generateUniqueId';
import { validateValidVideoFormat } from '../validators';
import { extractVideoType } from '../utils/extractVideoType';


export class UploadVideoService {
    private static instance: UploadVideoService;
    private s3Config = {}
    private s3Client: S3Client;
    private constructor() {
        this.s3Config = {
            region: 'us-east-1',
            credentials: {
                accessKeyId: config.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: config.AWS_SECRET_ACCESS_KEY as string
            }
        }
        this.s3Client = new S3Client(this.s3Config);
    }
    public static getInstance(): UploadVideoService {
        if (!UploadVideoService.instance) {
            UploadVideoService.instance = new UploadVideoService();
        }

        return UploadVideoService.instance;
    }

    public async uploadVideo(video: any) {
        try {

            if (!validateValidVideoFormat(video.mimetype)) {
                return { success: false, message: "Unable to Upload the file", data: 'Invalid video format' };
            }

            const videoName =  generateUniqueId()+ '.' +extractVideoType(video.mimetype) 
            const params = {
                Bucket: "videos-dev-cristian",
                Key: videoName,
                Body: video.buffer
            };

            try {
                const command = new PutObjectCommand(params);
                const res = await this.s3Client.send(command);

                return { success: true, message: "File Uploaded with Successfull", videoName };
            } catch (error) {
                return { success: false, message: "Unable to Upload the file", data: error };
            }

        } catch (error) {
            return { success: false, message: "Unalbe to access this file", data: {} };
        }
    }


}



