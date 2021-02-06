module.exports = {
  env: {
    SERVER_URL: "https://damp-wave-88141.herokuapp.com/ ",
    S3_BUCKET_URL: "https://nextjszat.s3-sa-east-1.amazonaws.com/",
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET: process.env.S3_SECRET,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  },
};
