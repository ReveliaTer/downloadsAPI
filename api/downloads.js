import axios from "axios"
import crypto from "node:crypto"
import * as cheerio from "cheerio"
import qs from "qs"

const instagram = async (url) => {
  const ts = () => Math.floor(Date.now() / 1000)
  const tt = (ts) => {
    return crypto.createHash('md5').update(ts + 'X-Fc-Pp-Ty-eZ').digest('hex')
  }

  const body = new URLSearchParams()
  body.append('id', url)
  body.append('locale', 'en')
  body.append('cf-turnstile-response', '')
  body.append('tt', tt(ts()))
  body.append('ts', ts())

  const res = await axios.post(
    'https://reelsvideo.io/reel/',
    body,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'hx-request': 'true',
        'hx-current-url': 'https://reelsvideo.io/',
        'hx-target': 'target',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://reelsvideo.io',
        'Referer': 'https://reelsvideo.io/'
      }
    }
  )

  const $ = cheerio.load(res.data)

  const username = $('.bg-white span.text-400-16-18').first().text().trim() || null
  const thumb = $('div[data-bg]').first().attr('data-bg') || null

  const videos = []
  $('a.type_videos').each((_, el) => {
    const href = $(el).attr('href')
    if (href) videos.push(href)
  })

  const images = []
  $('a.type_images').each((_, el) => {
    const href = $(el).attr('href')
    if (href) images.push(href)
  })

  const audios = []
  $('a.type_audio').each((_, el) => {
    const href = $(el).attr('href')
    const id = $(el).attr('data-id')
    if (href && id) audios.push({ id, url: href })
  })

  let type = 'unknown'
  if (videos.length && images.length) type = 'carousel'
  else if (videos.length) type = 'video'
  else if (images.length) type = 'photo'
  else if (audios.length) type = 'audio'

  return { type, username, thumb, videos, images, audios }
}

const tiktok = async (url) => {
  let data = qs.stringify({
    'id': url,
    'locale': 'en',
    'tt': crypto.randomBytes(8).toString('hex'),
  })

  let config = {
    method: 'POST',
    url: 'https://ssstik.io/abc?url=dl',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  }

  const response = await axios.request(config)
  const $ = cheerio.load(response.data)

  return {
    author: $('h2').first().text().trim(),
    description: $('.maintext').text().trim(),
    videoUrl: $('a[href*="tikcdn.io"]:not(#hd_download)').first().attr('href'),
    audioUrl: $('.download_link.music').attr('href'),
    hdVideo: $('#hd_download').attr('href')
  }
}

const pinterest = async (url) => {
  let data = JSON.stringify({
    "url": url
  })

  let config = {
    method: 'POST',
    url: 'https://fastvidl.com/api/lookup',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
      'Content-Type': 'application/json'
    },
    data: data
  }

  return (await axios.request(config)).data
}

const spotify = async (url) => {
   let data = JSON.stringify({
  "url": url
});

   let config = {
     method: 'POST',
     url: 'https://musicfab.io/api/spotify',
     headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; V2111 Build/SP1A.210812.003_NONFC) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.137 Mobile Safari/537.36',
    'Content-Type': 'application/json'
    },
   data: data
};

return (await axios.request(config)).data.data.metadata
}

export {
  instagram,
  tiktok,
  pinterest,
  spotify
}