import { generateUniqueId } from '../utils/generateUniqueId';
import { validateValidVideoFormat } from '../validators';
import { extractVideoType } from '../utils/extractVideoType';
import { AwsS3Repo } from '../repositories/aws-s3.repo';

export class UploadVideoService {
    private static instance: UploadVideoService;
    private awsS3Repo: AwsS3Repo;

    private constructor() {
        this.awsS3Repo = new AwsS3Repo();
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

            const videoName = generateUniqueId() + '.' + extractVideoType(video.mimetype)
            const params = {
                Bucket: "videos-dev-cristian",
                Key: videoName,
                Body: video.buffer
            };

            try {
                await this.awsS3Repo.uploadFile(params)

                return { success: true, message: "File Uploaded with Successfull", videoName };
            } catch (error) {
                return { success: false, message: "Unable to Upload the file", data: error };
            }

        } catch (error) {
            return { success: false, message: "Unalbe to access this file", data: {} };
        }
    }


}



