import express from 'express'
import { generateUploadURL} from './s3.js'

const app = express()

app.use(express.static('front'))

app.get('/s3Url', async (req,res) =>{
  const url = s3.generateUploadURL()
  res.send({url})
})

app.listen(8080, () => console.log("listening on port 8080"))