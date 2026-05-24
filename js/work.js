/* ==========================================
   PORTFOLIO — work.js
   カーソル制御は cursor.js に完全委譲
   ========================================== */

const WORKS = [
  {
    num:    '001',
    title:  'Beauty in the Abyss.',
    tag:    'DARK FANTASY',
    desc:   'Where elegance meets the void.\n異形の美と装飾の狭間に宿る静寂を捉えた作品。',
    tags:   ['DARK FANTASY', 'GRAPHIC', 'SNS POST'],
    thumb:  'images/work01.jpg',
    detail: null,
  },
  {
    num:    '002',
    title:  'White Sanctity × Black Aberration',
    tag:    'GRAPHIC',
    desc:   '白の聖性と黒の逸脱。相反するものが一体に宿る矛盾の美学。',
    tags:   ['GRAPHIC', 'CONCEPTUAL', 'SNS POST'],
    thumb:  'images/work02.jpg',
    detail: null,
  },
  {
    num:    '003',
    title:  'They walk in silence.\nI walk in blood.',
    tag:    'PHOTO POSTER',
    desc:   '赤と白の対比が語る孤立と覚悟。群衆の中の唯一性。',
    tags:   ['PHOTO POSTER', 'COPYWRITING'],
    thumb:  'images/work03.jpg',
    detail: null,
  },
  {
    num:    '004',
    title:  "I'd cross the blue dark world just to reach you.",
    tag:    'FANTASY',
    desc:   '青に沈む世界を越えてでも。到達への意志を光と花で表現した。',
    tags:   ['FANTASY', 'GRAPHIC'],
    thumb:  'images/work04.jpg',
    detail: null,
  },
  {
    num:    '005',
    title:  'NIGHT — SILENCE —',
    tag:    'TYPOGRAPHY',
    desc:   '建築の幾何学と縦組み文字が溶け合う。都市の静けさに潜む構造美。',
    tags:   ['TYPOGRAPHY', 'PHOTOGRAPHY'],
    thumb:  'images/work05.png',
    detail: null,
  },
  {
    num:    '006',
    title:  'VOID',
    tag:    'MINIMAL',
    desc:   '無の中に存在する光。一語と一円が宇宙を作る。',
    tags:   ['MINIMAL', 'TYPOGRAPHY'],
    thumb:  'images/work06.png',
    detail: null,
  },
  {
    num:    '007',
    title:  'Echoes of Yesterday',
    tag:    'RETRO',
    desc:   '過去の記憶が静かに響き渡る。ノスタルジックな世界観の構築。',
    tags:   ['RETRO', 'GRAPHIC'],
    thumb:  'images/work01.png',
    detail: null,
  },
  {
    num:    '008',
    title:  'Neon Genesis',
    tag:    'CYBER',
    desc:   '夜の光が交錯するサイバーパンクな都市の断片。',
    tags:   ['CYBER', 'PHOTOGRAPHY'],
    thumb:  'images/work02.jpeg',
    detail: null,
  },
  {
    num:    '009',
    title:  'Liquid Modernity',
    tag:    'ABSTRACT',
    desc:   '流動する形と融解する境界。現代の不確実性を表現。',
    tags:   ['ABSTRACT', '3D ART'],
    thumb:  'images/work03.png',
    detail: null,
  },
  {
    num:    '010',
    title:  'Silent Whisper',
    tag:    'MINIMAL',
    desc:   '静寂な空間に漂う、目に見えないかすかな気配。',
    tags:   ['MINIMAL', 'GRAPHIC'],
    thumb:  'images/work04.png',
    detail: null,
  },
  {
    num:    '011',
    title:  'The Edge of Light',
    tag:    'FANTASY',
    desc:   '光と影が境界線で踊る。幻想的な夜明けの風景。',
    tags:   ['FANTASY', 'PHOTO POSTER'],
    thumb:  'images/work05.png',
    detail: null,
  },
  {
    num:    '012',
    title:  'Absolute Zero',
    tag:    'DARK FANTASY',
    desc:   'すべての熱量が失われた、凍てつく世界の中心。',
    tags:   ['DARK FANTASY', 'CONCEPTUAL'],
    thumb:  'images/work06.png',
    detail: null,
  },
];

/* ==========================================
   ギャラリー生成・詳細ページ
   カーソル・addHover は cursor.js が担当
   ========================================== */

const gallery = document.getElementById('gallery');

WORKS.forEach((w, i) => {
  const imgSrc = '../' + w.thumb;
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img class="card-bg" src="${imgSrc}" alt="${w.title}" loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='block';this.nextElementSibling.style.background='linear-gradient(160deg,#111,#1c1c1c 40%,#080808)'">
    <div class="card-bg-fallback card-bg" style="display:none"></div>
    <div class="card-num">${w.num}</div>
    <div class="card-over">
      <div class="card-tag">${w.tag}</div>
      <div class="card-title">${w.title}</div>
    </div>
  `;
  card.addEventListener('click', () => openDetail(i));
  if(typeof window.addHover === 'function') window.addHover(card);
  if(gallery) gallery.appendChild(card);
});

window.addEventListener('load', () => {
  document.querySelectorAll('.card').forEach((c, i) => {
    setTimeout(() => c.classList.add('vis'), 120 + i * 80);
  });
});

// ---- 詳細ページ ----
const curtain  = document.getElementById('curtain');
const detail   = document.getElementById('detail');
const dImg     = document.getElementById('d-img-inner');
const dEyebrow = document.getElementById('d-eyebrow');
const dTitle   = document.getElementById('d-title');
const dDesc    = document.getElementById('d-desc');
const dTags    = document.getElementById('d-tags');
const backBtn  = document.getElementById('back');

if(backBtn && typeof window.addHover === 'function') window.addHover(backBtn);

function openDetail(i) {
  const w = WORKS[i];
  const imgSrc = '../' + (w.detail || w.thumb);

  if(curtain) curtain.className = 'curtain closing';

  setTimeout(() => {
    if(dEyebrow) dEyebrow.textContent = w.num;
    if(dTitle)   dTitle.textContent   = w.title;
    if(dDesc)    dDesc.textContent    = w.desc;

    if(dImg) {
      dImg.innerHTML = `
        <img src="${imgSrc}" alt="${w.title}"
             style="width:100%;height:100%;object-fit:cover;"
             onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(160deg,#111,#1c1c1c 40%,#080808)'">
      `;
    }

    if(dTags) {
      dTags.innerHTML = w.tags.map(t => `<span class="d-tag">${t}</span>`).join('');
    }

    if(detail) detail.style.display = 'flex';
    document.body.classList.add('detail-open');

    setTimeout(() => {
      if(curtain) curtain.className = 'curtain opening';
      setTimeout(() => {
        if(curtain) curtain.className = 'curtain';
        if(detail)  detail.classList.add('show');
        if(dImg)    dImg.classList.add('in');
        if(backBtn) backBtn.classList.add('show');
      }, 560);
    }, 60);

  }, 510);
}

function closeDetail() {
  if(curtain) curtain.className = 'curtain closing';
  if(backBtn) backBtn.classList.remove('show');
  if(detail)  detail.classList.remove('show');
  if(dImg)    dImg.classList.remove('in');

  setTimeout(() => {
    if(detail)  detail.style.display = 'none';
    document.body.classList.remove('detail-open');
    if(curtain) curtain.className = 'curtain opening';
    setTimeout(() => { if(curtain) curtain.className = 'curtain'; }, 560);
  }, 510);
}

window.closeDetail = closeDetail;

// ==========================================
// ロゴ下線 ホバーアニメーション
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  if(!logo) return;

  logo.style.position = 'relative';
  logo.style.display  = 'inline-block';

  const line = document.createElement('span');
  line.style.cssText = [
    'display:block',
    'position:absolute',
    'left:0',
    'bottom:-3px',
    'width:100%',
    'height:1px',
    'background:#ece8e0',
    'transform:scaleX(0)',
    'transform-origin:left',
    'transition:transform 0.5s cubic-bezier(0.16,1,0.3,1)',
    'pointer-events:none',
  ].join(';');

  logo.appendChild(line);

  // ホバーで表示・非表示
  logo.addEventListener('mouseenter', () => {
    line.style.transform = 'scaleX(1)';
  });
  logo.addEventListener('mouseleave', () => {
    line.style.transform = 'scaleX(0)';
  });
});