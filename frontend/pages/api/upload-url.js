import aws from "aws-sdk";

export default async function handler(req, res) {
  console.log(req);
  aws.config.update({
    accessKeyId: "AKIAI5EGKQZMS2RRCOHA",
    secretAccessKey: "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",
    region: "sa-east-1",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: "nextjszat",
    Fields: {
      key: req.query.file,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  });
  console.log(post);
  res.status(200).json(post);
}
