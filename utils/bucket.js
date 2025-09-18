import AWS from 'aws-sdk'
import {
  BUCKET_HOST,
  BUCKET_NAME,
  BUCKET_ACCESS_KEY,
  BUCKET_SECRET_KEY
} from './urls'

const s3 = new AWS.S3({
  accessKeyId: BUCKET_ACCESS_KEY,
  secretAccessKey: BUCKET_SECRET_KEY,
  endpoint: BUCKET_HOST,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
  sslEnabled: true
})

const composeParams = (data = {}) => {
  return {
    Bucket: BUCKET_NAME,
    ...data
  }
}

const getS3Files = async (prefix, maxKeys = 3) => {
  const data = await s3.listObjectsV2(composeParams({ Prefix: prefix })).promise()

  return data.Contents
    .filter(item => {
      const { Key } = item
      const isImage = /\.(png|jpe?g|gif)$/i.test(Key)
      const isNotNested = !Key.replace(`${prefix}/`, '').includes('/')
      return isImage && isNotNested
    })
    .sort()
    .slice(0, maxKeys)
    .map(item => {
      return s3.getSignedUrl('getObject', composeParams({
        Key: item.Key,
        Expires: 60 * 5
      }))
    })
}

export default s3
export { composeParams, getS3Files }
