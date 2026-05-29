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

if(menuBtn && menuOverlay){
  let menuOpen = false;

  // タッチ端末のみスクロール防止（PCはoverflowを触らない）
  function preventScroll(e){ e.preventDefault(); }

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    menuBtn.classList.toggle('open', menuOpen);
    menuOverlay.classList.toggle('open', menuOpen);

    if(menuOpen){
      // タッチスクロールだけ止める（PCのスクロールバーはそのまま）
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.removeEventListener('touchmove', preventScroll);
    }
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
      document.removeEventListener('touchmove', preventScroll);
      if(targets[sec] !== undefined) smoothScrollTo(targets[sec], 700);
    });
  });

  // ━━ メニューボタンの色切替 ━━
  function updateMenuColor(){
    const fvWrapEl    = document.querySelector('.fv-wrap');
    const contactSWEl = document.getElementById('contactStickyWrap');

    if(!fvWrapEl){
      menuBtn.classList.remove('dark');
      return;
    }

    const sy   = scrollY;
    const fvH  = fvWrapEl.offsetHeight;
    const cTop = (typeof cachedContactTop !== 'undefined') ? cachedContactTop : Infinity;
    const inLight = sy > fvH * 0.4 &&
                    (!contactSWEl || sy < cTop + contactSWEl.offsetHeight * 0.3);

    menuBtn.classList.toggle('dark', inLight && !menuOpen);
  }

  window.addEventListener('scroll', updateMenuColor, { passive: true });
  updateMenuColor();
}