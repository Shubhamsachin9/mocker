// import type { Config } from "drizzle-kit";
/** @type { import("drizzle-kit").Config } */
export default {
  schema:"./utils/schema.js",
  dialect: "postgresql",
   dbCredentials:{
    url:"postgresql://neondb_owner:LnBpRS8GXfH2@ep-noisy-mud-a51b4onh.us-east-2.aws.neon.tech/ai-interview-mock?sslmode=require",
   },
};