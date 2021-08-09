import aws from 'aws-sdk'
import crypto, { randomBytes } from 'crypto'
import { promisify } from 'util'
import dotenv from 'dotenv'

dotenv.config()
const region ="us-west-2"
const bucketName = "aimon-upload-files"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRETE_ACCESS_KEY


const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

export async function generateUploadURL() {

    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    const params = ({
        Bucket: bucketName, 
        Key:imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}