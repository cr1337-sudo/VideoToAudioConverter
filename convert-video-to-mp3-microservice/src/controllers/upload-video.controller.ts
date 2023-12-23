import { Request, Response } from "express";
import { IUploadVideoController } from "./types/IUploadVideoController";
import { UploadVideoService } from "../services/upload-video.service";


export class UploadVideoController implements IUploadVideoController {
    
    async uploadVideo(req: Request, res: Response) {
        const video = req.file;
        const uploadVideoService = UploadVideoService.getInstance()
        try {
            const response = await uploadVideoService.uploadVideo(video)
            res.json(response)
        } catch (error) {
            throw error;
        }
    }

}
