const express = require('express');
const dotenv = require('dotenv');
const Core = require('@alicloud/pop-core');

dotenv.config();

const router = express.Router();

const BUCKET = process.env.OSS_BUCKET || 'guijunqiao';
const REGION = process.env.OSS_REGION || 'oss-cn-beijing';
const ROLE_ARN = process.env.OSS_STS_ROLE_ARN; // acs:ram::ACCOUNT_ID:role/YourRole
const ACCESS_KEY_ID = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
const ACCESS_KEY_SECRET = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
const DURATION_SECONDS = parseInt(process.env.OSS_STS_DURATION || '900', 10);
const DIR = process.env.OSS_DIR_PREFIX || 'images/';

function createClient() {
  return new Core({
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    endpoint: 'https://sts.aliyuncs.com',
    apiVersion: '2015-04-01'
  });
}

router.get('/', async (req, res) => {
  try {
    if (!ACCESS_KEY_ID || !ACCESS_KEY_SECRET || !ROLE_ARN) {
      return res.status(500).json({
        msg: 'error',
        error: 'Missing env: ALIBABA_CLOUD_ACCESS_KEY_ID/ALIBABA_CLOUD_ACCESS_KEY_SECRET/OSS_STS_ROLE_ARN'
      });
    }

    const client = createClient();
    const policy = JSON.stringify({
      Version: '1',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['oss:PutObject', 'oss:AbortMultipartUpload', 'oss:ListParts'],
          Resource: [
            `acs:oss:*:*:${BUCKET}`,
            `acs:oss:*:*:${BUCKET}/${DIR}*`
          ]
        }
      ]
    });

    const params = {
      Action: 'AssumeRole',
      RoleArn: ROLE_ARN,
      RoleSessionName: 'web-upload',
      DurationSeconds: DURATION_SECONDS,
      Policy: policy
    };

    const resp = await client.request('AssumeRole', params, { method: 'POST' });
    const creds = resp.Credentials;

    res.json({
      msg: 'ok',
      Credentials: {
        AccessKeyId: creds.AccessKeyId,
        AccessKeySecret: creds.AccessKeySecret,
        SecurityToken: creds.SecurityToken,
        Expiration: creds.Expiration
      },
      Bucket: BUCKET,
      Region: REGION,
      Dir: DIR,
      Host: `https://${BUCKET}.${REGION}.aliyuncs.com`
    });
  } catch (e) {
    res.status(500).json({ msg: 'error', error: e.message });
  }
});

module.exports = router;


