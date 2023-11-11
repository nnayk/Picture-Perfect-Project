// pages/api/generateURL.js
import { exec } from "child_process";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const inputValue = req.body.inputValue;

  exec(
    `python3 ../Backend/generate_url.py "${inputValue}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res
          .status(500)
          .json({ error: "Failed to execute python script." });
      }

      res.json({ url: stdout });
    }
  );
}
