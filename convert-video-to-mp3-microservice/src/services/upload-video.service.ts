import { generateUniqueId } from '../utils/generateUniqueId';
import { validateValidVideoFormat } from '../validators';
import { AwsS3Repo } from '../repositories/aws-s3.repo';
import { PassThrough, Readable } from 'stream';
import { path } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs/promises'


async function convertVideoToMp3(bufferVideo: any, videoName: string) {
    return new Promise((resolve, reject) => {
        const mp3Path = './mp3/' + videoName;
        const readableBufferVideo = Readable.from(bufferVideo)
        const command = ffmpeg();
        command.setFfmpegPath(path)
        command.input(readableBufferVideo);
        command.format('mp3')
        command.output(mp3Path)
        command.on('end', () => {
            return resolve(mp3Path);
        });
        command.on('start', (commandLine) => {
            console.log('ffmpeg started conversion', commandLine)
        })
        command.on('stderr', function (stderrLine) {
            console.error('Stderr output: ' + stderrLine)
        })
        command.on('error', (err: any) => {
            return reject(err)
        });

        command.run();
    });
}

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

            const videoName = generateUniqueId() + '.mp3'
            const mp3Path = await convertVideoToMp3(video.buffer, videoName) as string;
            const mp3File = await fs.readFile(mp3Path)
            const params = {
                Bucket: "mp3-dev-cristian",
                Key: videoName,
                Body: mp3File
            };

            await this.awsS3Repo.uploadFile(params)
            await fs.rm(mp3Path)

            return { success: true, message: "File Uploaded with Successfull", videoName };
        } catch (error) {
            return { success: false, message: "Unable to Upload the file", data: error };
        }
    }


}



