import express, {Express} from 'express';
import VideoRouter from './routes/routes';
import multer from "multer"
import config from './config/config';


const app: Express = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.urlencoded({extended:true}))
app.use("/video",upload.single('video'), VideoRouter)


app.listen(config.BACK_PORT, () => {
  console.log(
    `server running : http://${config.BACK_HOST}:${config.BACK_PORT}`
  );
});