import { Router } from "express";
import upload from "../../middleware/multer";
import { uploadImage , address} from "../../services/kyc/identity";


export const kyc = Router()


kyc.post('/images/:id', upload.single('file'), uploadImage)
kyc.post ('/address/:id', address)
kyc.post('')