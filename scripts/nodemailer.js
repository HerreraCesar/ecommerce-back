import config from "../config.js";
import { createTransport } from "nodemailer";

export const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });