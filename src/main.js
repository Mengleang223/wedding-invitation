import { wedding } from './data/wedding.js';
import './styles.css';
import { initMotion } from './motion.js';

const kit = '/starter-kit/elements/';
const t = (kh, en) => `<span class="kh">${kh}</span><span class="en">${en}</span>`;

document.querySelector('#app').innerHTML = `
  <div class="site-shell">
    <div class="grain"></div>
    <div class="envelope-screen" id="envelopeScreen" aria-label="Open wedding invitation">
      <div class="envelope-backdrop"></div>
      <div class="envelope-intro reveal-in">
        <div class="micro-label">THE WEDDING INVITATION</div>
        <h1>${t('សិរីសួស្តីអាពាហ៍ពិពាហ៍', 'A day held in gold')}</h1>
        <p class="intro-copy">${t('សូមបើកសំបុត្ររបស់យើង', 'Open our invitation')}</p>
      </div>
      <div class="envelope-stage" id="envelopeStage">
        <div class="envelope-shadow"></div>
        <div class="envelope-card-preview">
          <img src="${kit}crest.svg" alt="" />
          <p class="card-kicker">${t('សូមគោរពអញ្ជើញ', 'YOU ARE INVITED')}</p>
          <div class="card-names">ម៉េត វណ្ណី<br><i>&amp;</i><br>ស៉ីម សៀវម៉ី</div>
          <div class="card-date">19 · 12 · 2026</div>
        </div>
        <div class="envelope-pocket">
          <div class="pocket-left"></div><div class="pocket-right"></div><div class="pocket-bottom"></div>
        </div>
        <div class="envelope-flap" id="envelopeFlap">
          <div class="flap-lining"></div>
          <img class="flap-crest" src="${kit}crest.svg" alt="" />
          <div class="flap-names">ម៉េត វណ្ណី <span>&amp;</span> ស៉ីម សៀវម៉ី</div>
          <div class="flap-rule"></div>
        </div>
        <button class="wax-seal" id="openInvitation" aria-label="Open invitation"><img src="${kit}wax-seal.svg" alt="Open" /></button>
      </div>
      <p class="tap-note">TAP THE SEAL · <span>បើកសំបុត្រ</span></p>
    </div>

    <div class="invitation" id="invitation">
      <header class="topbar" id="topbar">
        <a class="mini-logo" href="#cover" aria-label="Back to cover"><span>V</span><b>&amp;</b><span>S</span></a>
        <div class="top-actions">
          <button class="text-button" id="langToggle" aria-label="Toggle language"><span>ខ្មែរ</span><em>/</em><i>EN</i></button>
          <button class="icon-button" id="musicToggle" aria-label="Toggle music"><span class="music-dot"></span>♫</button>
        </div>
      </header>

      <main>
        <section class="hero section-dark" id="cover">
          <img class="hero-image" src="/photos/temple-couple.JPG" alt="${wedding.groom.en} and ${wedding.bride.en}" />
          <div class="hero-shade"></div>
          <img class="corner corner-tl" src="${kit}corner.svg" alt="" /><img class="corner corner-br" src="${kit}corner.svg" alt="" />
          <div class="hero-content content-reveal">
            <img class="crest" src="${kit}crest.svg" alt="" />
            <p class="eyebrow">${t('សិរីសួស្តីអាពាហ៍ពិពាហ៍', 'THE WEDDING INVITATION')}</p>
            <p class="hero-script">The Wedding Invitation</p>
            <div class="hero-names"><span class="gold-text">ម៉េត វណ្ណី</span><small>&amp;</small><span class="gold-text">ស៉ីម សៀវម៉ី</span></div>
            <p class="names-en">METH VANNY &nbsp;·&nbsp; SIM SEAVMEY</p>
            <div class="hero-rule"></div>
            <p class="invite-line">${t('សូមគោរពអញ្ជើញ', 'WITH JOY IN OUR HEARTS')}</p>
            <div class="date-lockup"><span>ថ្ងៃ</span><b>១៩</b><span>ខែ</span><b>១២</b><span>ឆ្នាំ</span><b>២០២៦</b></div>
            <p class="lunar">${wedding.date.lunar}</p>
            <p class="hero-venue">${wedding.venue.name}</p>
          </div>
          <a class="scroll-cue" href="#words"><span></span>SCROLL TO DISCOVER</a>
        </section>

        <section class="words section-cream" id="words">
          <div class="paper-panel compact-center reveal-on-scroll">
            <img class="section-crest" src="${kit}crest.svg" alt="" />
            <p class="section-kicker">${t('ដោយក្តីសោមនស្សរីករាយ', 'WITH HEARTFELT JOY')}</p>
            <h2>${t('យើងខ្ញុំសូមគោរពអញ្ជើញ', 'We invite you to witness')}</h2>
            <p class="poem">${t('ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តីមង្គល<br>ក្នុងថ្ងៃដ៏មានន័យរបស់យើងខ្ញុំ', 'the beginning of a beautiful chapter<br>and the promise of a lifetime together.')}</p>
            <div class="parent-grid">
              <div><span class="parent-title">${t('មាតាបិតាកូនកំលោះ', "GROOM'S PARENTS")}</span><p>លោក គង់ សាម៉េត<br>និងលោកស្រី គ្រួច សឿន</p></div>
              <div><span class="parent-title">${t('មាតាបិតាកូនក្រមុំ', "BRIDE'S PARENTS")}</span><p>លោក សួន ភារ:<br>និងលោកស្រី ឡន ស៊ុនឡេង</p></div>
            </div>
            <img class="divider" src="${kit}divider.svg" alt="" />
          </div>
        </section>

        <section class="couple section-olive" id="couple">
          <div class="section-heading light reveal-on-scroll"><span class="eyebrow">TWO SOULS · ONE STORY</span><h2>${t('កូនកំលោះ & កូនក្រមុំ', 'The couple')}</h2></div>
          <div class="couple-stage">
            <div class="scallop-photo photo-groom reveal-on-scroll"><img src="/photos/temple-couple.JPG" alt="The couple in traditional attire" /><span class="photo-label">01 · របស់យើង</span></div>
            <div class="couple-copy reveal-on-scroll"><p class="script">Together, always</p><h3>ម៉េត វណ្ណី <i>&amp;</i><br>ស៉ីម សៀវម៉ី</h3><p>From the first hello to this forever,<br>thank you for being part of our story.</p></div>
            <div class="scallop-photo photo-bride reveal-on-scroll"><img src="/photos/pink-palace.JPG" alt="The couple in a floral room" /><span class="photo-label">02 · ស្នេហ៍</span></div>
          </div>
        </section>

        <section class="countdown section-dark" id="countdown">
          <img class="countdown-image" src="/photos/gala-couple.JPG" alt="" /><div class="countdown-overlay"></div>
          <div class="marquee">សិរីសួស្តី · មង្គលការ · សេចក្តីស្រឡាញ់ · សិរីសួស្តី · មង្គលការ · </div>
          <div class="countdown-content reveal-on-scroll"><img class="section-crest" src="${kit}crest.svg" alt="" /><p class="section-kicker">${t('រាប់ថយក្រោយទៅថ្ងៃរបស់យើង', 'COUNTING DOWN TO OUR DAY')}</p><h2 id="countdownTitle">៤៥ ថ្ងៃទៀត</h2><div class="timer" id="timer"><div><b>--</b><span>ថ្ងៃ</span></div><div><b>--</b><span>ម៉ោង</span></div><div><b>--</b><span>នាទី</span></div><div><b>--</b><span>វិនាទី</span></div></div></div>
        </section>

        <section class="programme section-cream" id="programme">
          <div class="programme-wrap"><div class="section-heading reveal-on-scroll"><span class="eyebrow">THE DAY WE BEGIN</span><h2>${t('កម្មវិធី', 'Programme')}</h2></div><div class="gold-thread"></div>
            <ol class="programme-list" id="programme-list">${wedding.programme.map((item, i) => `<li class="rite programme-item is-lit reveal-on-scroll" style="--rite-index:${i}"><div class="ritual-icon">${item.icon}</div><div><time>${item.time}<small>${item.enTime}</small></time><h3>${item.title}</h3><p>${item.note}<br><em>${item.en}</em></p></div></li>`).join('')}</ol>
          </div>
        </section>

        <section class="story section-olive" id="story">
          <div class="section-heading light reveal-on-scroll"><span class="eyebrow">A LITTLE LOVE NOTE</span><h2>${t('រឿងរ៉ាវរបស់យើង', 'Our story')}</h2></div>
          <div class="story-strip"><figure><img src="/photos/veil-kiss.JPG" alt="A quiet moment" /><figcaption>${t('ស្នេហ៍ចាប់ផ្តើមពីភាពសាមញ្ញ', 'Love begins in the quiet moments.')}</figcaption></figure><figure><img src="/photos/khmer-portrait.JPG" alt="A traditional portrait" /><figcaption>${t('ហើយរីកដុះដាលជារៀងរាល់ថ្ងៃ', 'And grows a little more every day.')}</figcaption></figure><figure><img src="/photos/candle-ritual.JPG" alt="A shared ritual" /><figcaption>${t('ជាមួយគ្នា គ្រប់រដូវកាល', 'Together, through every season.')}</figcaption></figure></div>
        </section>

        <section class="candle-section section-dark" id="candle"><img src="/photos/candle-ritual.JPG" alt="The couple holding lotus candles" /><div class="candle-shade"></div><div class="candle-copy reveal-on-scroll"><span class="eyebrow">A LIGHT WE SHARE</span><h2>${t('សូមអញ្ជើញអុជភ្លើងជាមួយយើង', 'A light we share')}</h2><p>${t('សូមឲ្យពន្លឺនៃសេចក្តីស្រឡាញ់ បំភ្លឺផ្លូវរបស់យើងជារៀងរហូត។', 'May the light of love guide every step we take together.')}</p></div><div class="ripples"></div></section>

        <section class="gallery section-cream" id="gallery"><div class="section-heading reveal-on-scroll"><span class="eyebrow">FRAMES OF US</span><h2>${t('វិចិត្រសាល', 'Gallery')}</h2></div><div class="gallery-grid">${wedding.photos.map((photo, i) => `<button class="gallery-item ${photo.className} reveal-on-scroll" data-index="${i}"><img loading="lazy" src="${photo.src}" alt="${photo.alt}" /><span>0${i + 1}</span></button>`).join('')}</div></section>

        <section class="venue section-olive" id="venue"><div class="venue-copy reveal-on-scroll"><img class="section-crest" src="${kit}crest.svg" alt="" /><span class="eyebrow">WHERE WE GATHER</span><h2>${t('ទីតាំងកម្មវិធី', 'The venue')}</h2><p class="venue-name">${wedding.venue.name}</p><p class="venue-en">${wedding.venue.en}</p><div class="venue-actions"><a href="${wedding.venue.maps}" target="_blank" rel="noreferrer">↗ ${t('បើកក្នុង Google Maps', 'Open Google Maps')}</a><button id="calendarButton">+ ${t('រក្សាទុកថ្ងៃនេះ', 'Save the date')}</button></div></div><div class="map-frame"><iframe title="Wedding venue map" loading="lazy" src="https://maps.google.com/maps?q=${wedding.venue.lat},${wedding.venue.lng}&z=15&output=embed"></iframe></div></section>

        <section class="gift section-cream" id="gift"><div class="gift-card reveal-on-scroll"><img class="section-crest" src="${kit}crest.svg" alt="" /><span class="eyebrow">WITH LOVE</span><h2>${t('ចំណងដៃ', 'Wedding gift')}</h2><p>${t('វត្តមានរបស់អ្នក គឺជាកាដូដ៏មានតម្លៃបំផុតរួចទៅហើយ។', 'Your presence is the greatest gift of all.')}</p><div class="qr-panel"><img class="qr-image" src="/photos/qr.jpg" alt="KHQR payment code for Seavmey Sim" /><a class="qr-download" href="/photos/qr.jpg" download="meth-vanny-sim-seavmey-khqr.jpg">↓ ${t('រក្សាទុក QR', 'Save QR')}</a></div></div></section>

        <section class="thankyou section-dark" id="thankyou"><img class="thankyou-image" src="/photos/pink-palace.JPG" alt="The couple in a pink floral room" /><div class="thankyou-shade"></div><div class="thankyou-copy reveal-on-scroll"><img class="section-crest" src="${kit}crest.svg" alt="" /><h2>${t('សូមអរគុណ', 'Thank you')}</h2><p>${t('ដែលបានចូលរួមនៅក្នុងរឿងរ៉ាវរបស់យើង', 'for being part of our story.')}</p><div class="share-actions"><button data-share="telegram">✈ Telegram</button><button data-share="facebook">f Facebook</button><button data-share="copy">⌘ ${t('ចម្លងតំណភ្ជាប់', 'Copy link')}</button></div><div class="final-logo"><span>ម៉េត វណ្ណី</span><b>&amp;</b><span>ស៉ីម សៀវម៉ី</span></div></div></section>
      </main>
      <footer><span>DESIGNED WITH LOVE</span><a href="https://mengleangly.me" target="_blank" rel="noreferrer">Design inspired by Mengleang Ly · mengleangly.me</a></footer>
    </div>
    <div class="lightbox" id="lightbox" aria-hidden="true"><button class="lightbox-close" id="lightboxClose" aria-label="Close full-screen photo">×</button><button class="lightbox-arrow prev" id="lightboxPrev" aria-label="Previous photo">‹</button><img id="lightboxImage" alt="" /><button class="lightbox-arrow next" id="lightboxNext" aria-label="Next photo">›</button><p id="lightboxCaption"></p></div>
    <audio id="bgMusic" data-src="/audio/wedding-song.mp3" loop preload="metadata" aria-hidden="true"></audio>
    <div class="toast" id="toast" role="status"></div>
  </div>
`;

const body = document.body;
const envelopeScreen = document.querySelector('#envelopeScreen');
const invitation = document.querySelector('#invitation');
const envelopeStage = document.querySelector('#envelopeStage');
let opened = false;

document.querySelector('#openInvitation').addEventListener('click', () => {
  if (opened) return;
  opened = true;
  envelopeStage.classList.add('is-opening');
  body.classList.add('opening');
  window.setTimeout(() => { envelopeScreen.classList.add('is-gone'); invitation.classList.add('is-visible'); window.scrollTo(0, 0); }, 3600);
});

const showToast = (message) => { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600); };

document.querySelector('#langToggle').addEventListener('click', () => { body.classList.toggle('english-mode'); showToast(body.classList.contains('english-mode') ? 'English mode' : 'ភាសាខ្មែរ'); });
const bgMusic = document.querySelector('#bgMusic');
const musicButton = document.querySelector('#musicToggle');
async function startWeddingMusic() {
  if (!bgMusic.src) bgMusic.src = bgMusic.dataset.src;
  try {
    await bgMusic.play();
    musicButton.classList.add('active');
  } catch {
    musicButton.classList.remove('active');
    showToast('Add your MP3 at public/audio/wedding-song.mp3');
  }
}
window.startWeddingMusic = startWeddingMusic;
musicButton.addEventListener('click', () => {
  if (bgMusic.paused) startWeddingMusic();
  else { bgMusic.pause(); musicButton.classList.remove('active'); showToast('Music paused'); }
});

const toKhmer = (value) => String(value).replace(/0/g, '០').replace(/1/g, '១').replace(/2/g, '២').replace(/3/g, '៣').replace(/4/g, '៤').replace(/5/g, '៥').replace(/6/g, '៦').replace(/7/g, '៧').replace(/8/g, '៨').replace(/9/g, '៩');
function updateCountdown() { const diff = Math.max(0, new Date(wedding.date.iso).getTime() - Date.now()); const days = Math.floor(diff / 86400000); const hours = Math.floor(diff / 3600000) % 24; const minutes = Math.floor(diff / 60000) % 60; const seconds = Math.floor(diff / 1000) % 60; const values = [days, hours, minutes, seconds]; document.querySelectorAll('#timer b').forEach((el, i) => { el.textContent = toKhmer(String(values[i]).padStart(2, '0')); }); document.querySelector('#countdownTitle').textContent = `${toKhmer(days)} ថ្ងៃទៀត`; }
updateCountdown(); setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold: 0.14 });
document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
window.addEventListener('scroll', () => document.querySelector('#topbar').classList.toggle('scrolled', window.scrollY > 40), { passive: true });

document.querySelector('#calendarButton').addEventListener('click', () => { const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', 'DTSTART:20261219T000000Z', 'DTEND:20261219T100000Z', 'SUMMARY:Meth Vanny & Sim Seavmey · Wedding', 'LOCATION:Anlong Chrey, Kampong Cham', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n'); const blob = new Blob([ics], { type: 'text/calendar' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'meth-vanny-sim-seavmey-wedding.ics'; link.click(); URL.revokeObjectURL(url); showToast('Calendar file saved'); });

let galleryIndex = 0;
const lightbox = document.querySelector('#lightbox'); const lightboxImage = document.querySelector('#lightboxImage'); const lightboxCaption = document.querySelector('#lightboxCaption');
function renderLightbox() { const photo = wedding.photos[galleryIndex]; lightboxImage.src = photo.src; lightboxImage.alt = photo.alt; lightboxCaption.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / 06 · ${photo.alt}`; }
function openLightbox(index) { galleryIndex = index; renderLightbox(); lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); }
document.querySelectorAll('.gallery-item').forEach((el) => el.addEventListener('click', () => openLightbox(Number(el.dataset.index))));
document.querySelector('#lightboxClose').addEventListener('click', () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); });
document.querySelector('#lightboxPrev').addEventListener('click', () => { galleryIndex = (galleryIndex + wedding.photos.length - 1) % wedding.photos.length; renderLightbox(); });
document.querySelector('#lightboxNext').addEventListener('click', () => { galleryIndex = (galleryIndex + 1) % wedding.photos.length; renderLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') lightbox.classList.remove('open'); if (event.key === 'ArrowRight') document.querySelector('#lightboxNext').click(); if (event.key === 'ArrowLeft') document.querySelector('#lightboxPrev').click(); });

document.querySelectorAll('[data-share]').forEach((button) => button.addEventListener('click', async () => { const url = window.location.href; const message = 'ម៉េត វណ្ណី & ស៉ីម សៀវម៉ី · 19/12/2026'; if (button.dataset.share === 'telegram') window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`, '_blank'); else if (button.dataset.share === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'); else { try { await navigator.clipboard.writeText(url); showToast('Link copied'); } catch { showToast(url); } } }));

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) body.classList.add('reduced-motion');

initMotion();
