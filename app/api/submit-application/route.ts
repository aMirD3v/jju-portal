// pages/api/submit.ts
import { submitForm } from "../../actions/submitForm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const result = await submitForm(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error("Submit failed:", err);
    res.status(500).json({ success: false, message: "Submission error" });
  }
}
