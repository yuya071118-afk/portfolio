/* ==========================================
   cursor.js — カーソルとホバー制御の共通モジュール
   ========================================== */
(function() {
  const isTouch = window.matchMedia('(pointer:coarse)').matches;
  if (isTouch) return; // スマホでは実行しない

  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-r');
  
  if (!cur || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  // マウス座標更新
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // カーソルアニメーション
  function animate() {
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
    
    rx += (mx - rx) * 0.15; // 追従速度
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    
    requestAnimationFrame(animate);
  }
  animate();

  // ホバー用共通関数
  window.addHover = function(el) {
    if (!el) return;
    el.addEventListener('mouseenter', () => {
      cur.classList.add('h');
      ring.classList.add('h');
    });
    el.addEventListener('mouseleave', () => {
      cur.classList.remove('h');
      ring.classList.remove('h');
    });
  };
})();