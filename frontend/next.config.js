module.exports = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    S3_BUCKET_URL: process.env.S3_BUCKET_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};
