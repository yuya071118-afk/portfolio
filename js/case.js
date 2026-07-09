/* ==========================================
   case.js — 作品詳細ページ共通スクリプト
   ハンバーガーメニュー開閉 + スクロールリビール
   ========================================== */
(function(){
  // ── カスタムカーソル（TOPページと同サイズ: dot 7px / ring 34px） ──
  const isTouch = matchMedia('(pointer:coarse)').matches;
  const cur  = document.getElementById('caseCur');
  const ring = document.getElementById('caseCurR');
  if(!isTouch && cur && ring){
    let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my;
    addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
    (function loop(){
      cur.style.left=mx+'px'; cur.style.top=my+'px';
      rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(loop);
    })();
  }

  // ── ハンバーガー ──
  const btn = document.getElementById('menuBtn');
  const overlay = document.getElementById('menuOverlay');
  if(btn && overlay){
    let open = false;
    function prevent(e){ e.preventDefault(); }
    btn.addEventListener('click', ()=>{
      open = !open;
      btn.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      if(open) document.addEventListener('touchmove', prevent, {passive:false});
      else document.removeEventListener('touchmove', prevent);
    });
    // メニュー内リンクは通常遷移。閉じる処理だけ添える
    overlay.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        open = false;
        btn.classList.remove('open');
        overlay.classList.remove('open');
        document.removeEventListener('touchmove', prevent);
      });
    });
  }

  // ── スクロールリビール ──
  const items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && items.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    items.forEach(el=>io.observe(el));
  } else {
    items.forEach(el=>el.classList.add('in'));
  }
})();
