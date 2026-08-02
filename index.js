import { instagram, tiktok, pinterest, spotify } from "./api/downloads.js";
import express from 'express';

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "API is working!" });
});

router.get('/instagram', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      success: false,
      error: "[400] URL parameter is required, example: ?url=https://..",
    });
  }
  const results = await instagram(url);
  res.json(results);
});

router.get('/tiktok', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      success: false,
      error: "[400] URL parameter is required, example: ?url=https://..",
    });
  }
  const results = await tiktok(url);
  res.json(results);
});

router.get('/pinterest', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      success: false,
      error: "[400] URL parameter is required, example: ?url=https://..",
    });
  }
  const results = await pinterest(url);
  res.json(results);
});

router.get('/spotify', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      success: false,
      error: "[400] URL parameter is required, example: ?url=https://..",
    });
  }
  const results = await spotify(url);
  res.json(results);
});

app.use('/.netlify/functions/api', router);

export default app;
