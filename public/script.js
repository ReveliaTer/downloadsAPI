// ****** variables (copy code) *****
const copy           = document.querySelector("#copy");
const code           = document.querySelector("#text_code pre code");
// ****** variables (platform selection) ******
const instagram      = document.querySelector("#instagram");
const pinterest      = document.querySelector("#pinterest");
const tiktok         = document.querySelector("#tiktok");
const spotify        = document.querySelector("#spotify");
// ****** variables (download) ******
const download_input = document.querySelector("#download_input");
const download_btn   = document.querySelector("#download_button");


// ************ Coby ***********
const original_SVG = copy.innerHTML;
copy.onclick = function() {
  navigator.clipboard.writeText(code.textContent);
  copy.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 6L9 17L4 12" stroke="black" stroke-width="2"/></svg>`;
  setTimeout(function() {
    copy.innerHTML = original_SVG;
  }, 2000);
};

// ************ Platforms ***********
let platform_type = "instagram";
instagram.onclick = function() { 
  platform_type = "instagram";
  code.innerHTML = `
import axios from 'axios';

conat instagram = async (url) => {
  const response = await axios.get(\`https://reveliater-api.vercel.app/api/instagram?url={url}\`);
  return console.log(response.data);
}
instagram("URL")`;
}
pinterest.onclick = function() { 
  platform_type = "pinterest";
  code.innerHTML = `
import axios from 'axios';

conat pinterest = async (url) => {
  const response = await axios.get(\`https://reveliater-api.vercel.app/api/pinterest?url={url}\`);
  return console.log(response.data);
}
pinterest("URL")`;
}
tiktok.onclick = function() {
  platform_type = "tiktok";
  code.innerHTML = `
import axios from 'axios';

conat tiktok = async (url) => {
  const response = await axios.get(\`https://reveliater-api.vercel.app/api/tiktok?url={url}\`);
  return console.log(response.data);
}
tiktok("URL")`;
}
spotify.onclick = function() {
  platform_type = "spotify";
  code.innerHTML = `
import axios from 'axios';

conat spotify = async (url) => {
  const response = await axios.get(\`https://reveliater-api.vercel.app/api/spotify?url={url}\`);
  return console.log(response.data);
}
spotify("URL")`;
}

// ************ Download ***********
download_btn.onclick = function() {
 
  download_input.value = ""
  if (platform_type === "instagram") {

  window.location.href = `https://reveliater-api.vercel.app/api/instagram?url=${download_input.value}`
  } else if (platform_type === "pinterest") {
  window.location.href = `https://reveliater-api.vercel.app/api/pinterest?url=${download_input.value}`
  } else if (platform_type === "tiktok") {
  window.location.href = `https://reveliater-api.vercel.app/api/tiktok?url=${download_input.value}`
  } else if (platform_type === "spotify") {
  window.location.href = `https://reveliater-api.vercel.app/api/spotify?url=${download_input.value}`
  } else {
  location.reload();
  }
}



if (window.innerWidth > 768) {
  document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: radial-gradient(ellipse at center, #002126, #000000); color: #00D2FF; font-family: 'Crafty Girls', cursive; text-align: center; padding: 20px; flex-direction: column;">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" stroke-width="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" stroke="#00D2FF"/>
                <line x1="12" y1="18" x2="12" y2="18" stroke="#00D2FF" stroke-width="3"/>
                <circle cx="9" cy="6" r="1" fill="#00D2FF"/>
                <circle cx="15" cy="6" r="1" fill="#00D2FF"/>
            </svg>
            <h1 style="font-size: 4rem; font-family: 'Eater', serif; margin: 30px 0 15px;">Sorry!</h1>
            <p style="font-size: 1.8rem; max-width: 600px; color: #a8d8ea;">This site works only on mobile devices</p>
            <p style="color: #4a7a8a; font-size: 1.2rem; margin-top: 10px;">Please open from your phone</p>
            <p style="color: #4a7a8a; font-size: 1rem; margin-top: 30px; opacity: 0.6;">(The reason is that I'm too lazy to make the site responsive)</p>
        </div>
    `;
  document.body.style.margin = "0";
}