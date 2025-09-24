import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const templatePath = path.resolve("firebase/firebase-sw.template.js");
const outputPath = path.resolve("public/firebase-messaging-sw.js");

let template = fs.readFileSync(templatePath, "utf-8");

template = template
  .replace("__API_KEY__", process.env.VITE_FIREBASE_API_KEY)
  .replace("__AUTH_DOMAIN__", process.env.VITE_FIREBASE_AUTH_DOMAIN)
  .replace("__PROJECT_ID__", process.env.VITE_FIREBASE_PROJECT_ID)
  .replace(
    "__MESSAGING_SENDER_ID__",
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID
  )
  .replace("__APP_ID__", process.env.VITE_FIREBASE_APP_ID);

fs.writeFileSync(outputPath, template);
console.log("✅ firebase-messaging-sw.js 생성 완료");
