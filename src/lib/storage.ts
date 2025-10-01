import { Storage } from "@google-cloud/storage";

const gcpKey = JSON.parse(process.env.GCP_KEY_JSON as string);


const storage = new Storage({
  credentials: gcpKey,
  projectId: gcpKey.project_id,
});


const bucketName = "demokracy-file";

export const bucket = storage.bucket(bucketName);
