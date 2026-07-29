import { 
   instagram, 
   tiktok,
   pinterest,
   spotify
} from "./api/downloads.js";
import express from 'express';
import path from 'path';

const app = express()
const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/instagram', async (req, res) => {
  const { url }  =   req.query
  if (!url) {
  return res.status(400).json({ 
       success: false,
       error: "[400] URL parameter is required, example: ?url=https://..",
   });
  };
  const results  =   await instagram(url)
  res.json(results)
})

app.get('/api/tiktok', async (req, res) => {
  const { url }  =   req.query
  if (!url) {
  return res.status(400).json({ 
       success: false,
       error: "[400] URL parameter is required, example: ?url=https://..",
   });
  };
  const results  =   await tiktok(url)
  res.json(results)
})

app.get('/api/pinterest', async (req, res) => {
  const { url }  =   req.query
  if (!url) {
  return res.status(400).json({ 
       success: false,
       error: "[400] URL parameter is required, example: ?url=https://..",
   });
  };
  const results  =   await pinterest(url)
  res.json(results)
})

app.get('/api/spotify', async (req, res) => {
  const { url }  =   req.query
  if (!url) {
  return res.status(400).json({ 
       success: false,
       error: "[400] URL parameter is required, example: ?url=https://..",
   });
  };
  const results  =   await spotify(url)
  res.json(results)
})

export default app