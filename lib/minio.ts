import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
});

// Ensure bucket exists once on server start
const BUCKET_NAME = "student-docs";

(async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
      console.log(`✅ MinIO bucket "${BUCKET_NAME}" created.`);
    } else {
      console.log(`ℹ️ MinIO bucket "${BUCKET_NAME}" already exists.`);
    }
  } catch (err) {
    console.error("❌ Error checking/creating MinIO bucket:", err);
  }
})();
