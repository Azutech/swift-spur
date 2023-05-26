import { Router } from 'express'
import upload from '../../middleware/multer'
import { uploadImage, address, kycUpdate, addNIN } from '../../services/kyc/identity'

export const kyc = Router()

kyc.post('/images/:id', upload.single('file'), uploadImage)
kyc.post('/address/:id', address)
kyc.post('/identificationNumber/:id', addNIN)
kyc.get('/kyc/:id', kycUpdate)
