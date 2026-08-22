const fs = require('fs');
const path = require('path');
const https = require('https');

const assets = [
  { url: 'https://asha-jyothi-3d.vercel.app/videos/hero.mp4', dest: 'public/videos/hero.mp4' },
  { url: 'https://asha-jyothi-3d.vercel.app/videos/lab.mp4', dest: 'public/videos/lab.mp4' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/hero-poster.jpg', dest: 'public/images/hero-poster.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/lab-poster.jpg', dest: 'public/images/lab-poster.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/pathology.jpg', dest: 'public/images/pathology.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/thyroid.jpg', dest: 'public/images/thyroid.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/urine.jpg', dest: 'public/images/urine.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/fever.jpg', dest: 'public/images/fever.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/jaundice.jpg', dest: 'public/images/jaundice.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/ultrasound.jpg', dest: 'public/images/ultrasound.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/ecg.jpg', dest: 'public/images/ecg.jpg' },
  { url: 'https://asha-jyothi-3d.vercel.app/images/xray.jpg', dest: 'public/images/xray.jpg' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, '../../', dest);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    const file = fs.createWriteStream(fullPath);

    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`[Downloaded] ${dest}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlink(fullPath, () => {});
        console.warn(`[Skip] ${dest} - HTTP ${res.statusCode}`);
        resolve();
      }
    }).on('error', (err) => {
      fs.unlink(fullPath, () => {});
      console.error(`[Error] ${dest}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  console.log('Downloading media assets from reference site...');
  for (const item of assets) {
    await download(item.url, item.dest);
  }
  console.log('All media assets processed!');
}

run();
