// ━━ カスタムスムーススクロール ━━
function smoothScrollTo(target, duration){
  const start = window.scrollY;
  const dist  = target - start;
  const startTime = performance.now();
  function ease(t){ return t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }
  function step(now){
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + dist * ease(progress));
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ━━ HAMBURGER ━━
const menuBtn     = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');

// menuBtn が存在しないページでは何もしない
if(menuBtn && menuOverlay){
  let menuOpen = false;

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    menuBtn.classList.toggle('open', menuOpen);
    menuOverlay.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mni').forEach(item => {
    item.addEventListener('click', () => {
      const sec = item.dataset.section;
      const targets = {
        fv:      0,
        works:   typeof cachedWorksTop   !== 'undefined' ? cachedWorksTop   : undefined,
        about:   typeof cachedAboutTop   !== 'undefined' ? cachedAboutTop   : undefined,
        contact: typeof cachedContactTop !== 'undefined' ? cachedContactTop : undefined,
      };
      menuOpen = false;
      menuBtn.classList.remove('open');
      menuOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if(targets[sec] !== undefined) smoothScrollTo(targets[sec], 700);
    });
  });

  // ━━ メニューボタンの色切替 ━━
  // main.js に依存せず、自分でDOMを取得して判定する
  function updateMenuColor(){
    // worksページなど .fv-wrap がない場合は常にダーク不要（白のまま）
    const fvWrapEl   = document.querySelector('.fv-wrap');
    const contactSWEl = document.getElementById('contactStickyWrap');

    if(!fvWrapEl){
      // worksページ：背景は常に黒なのでボタンは白のまま
      menuBtn.classList.remove('dark');
      return;
    }

    const sy  = scrollY;
    const fvH = fvWrapEl.offsetHeight;
    const cTop = (typeof cachedContactTop !== 'undefined') ? cachedContactTop : Infinity;
    const inLight = sy > fvH * 0.4 &&
                    (!contactSWEl || sy < cTop + contactSWEl.offsetHeight * 0.3);

    menuBtn.classList.toggle('dark', inLight && !menuOpen);
  }

  window.addEventListener('scroll', updateMenuColor, { passive: true });
  updateMenuColor();
}