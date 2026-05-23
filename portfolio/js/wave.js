// ==========================================
// wave.js - 背景の波のキャンバスアニメーション
// ==========================================

(function(){
  const el = document.getElementById('waveCanvas');
  if(!el) return;
  const ctx = el.getContext('2d');
  let W, H, globalTime = 0, sv = 0, lsy = 0;

  // 要素の取得（main.jsに依存せず単独で動くように設定）
  const fvWrap = document.querySelector('.fv-wrap');
  const contactSW = document.getElementById('contactStickyWrap');
  function getTop(element){ 
    let t=0; while(element){t+=element.offsetTop;element=element.offsetParent;} return t; 
  }

  function resize(){
    const dpr = window.devicePixelRatio || 1;
    W = window.innerWidth; H = window.innerHeight;
    el.width = W*dpr; el.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('scroll', ()=>{ sv += Math.abs(scrollY-lsy)*0.08; lsy=scrollY; }, {passive:true});

  function wave(cx, wb, spd, amp, freq, r, g, b, a, tOff){
    ctx.beginPath();
    for(let y=0;y<=H;y+=2){
      const n = Math.sin(y*freq + globalTime*spd + tOff)*amp + Math.cos(y*freq*0.5 - globalTime*spd*0.7)*amp*0.5;
      const da = 1 + sv*0.04;
      const tx = cx + n*da;
      const th = wb + Math.sin(y*0.01 + globalTime*0.2)*4;
      y===0 ? ctx.moveTo(tx-th,y) : ctx.lineTo(tx-th,y);
    }
    for(let y=H;y>=0;y-=2){
      const n = Math.sin(y*freq + globalTime*spd + tOff)*amp + Math.cos(y*freq*0.5 - globalTime*spd*0.7)*amp*0.5;
      const da = 1 + sv*0.04;
      const tx = cx + n*da;
      const th = wb + Math.sin(y*0.01 + globalTime*0.2)*4;
      ctx.lineTo(tx+th,y);
    }
    ctx.closePath();
    const gr = ctx.createLinearGradient(cx-wb,0,cx+wb,0);
    gr.addColorStop(0,   `rgba(${r},${g},${b},0)`);
    gr.addColorStop(0.4, `rgba(${r},${g},${b},${(a*0.7).toFixed(3)})`);
    gr.addColorStop(0.5, `rgba(${r},${g},${b},${a.toFixed(3)})`);
    gr.addColorStop(0.6, `rgba(${r},${g},${b},${(a*0.5).toFixed(3)})`);
    gr.addColorStop(1,   `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gr;
    ctx.fill();
  }

  function loop(){
    sv *= 0.95;
    globalTime += 0.018 + sv*0.004;
    ctx.clearRect(0,0,W,H);
    const cx = W * 0.62;
    
    // FV(最初)とContact(最後)の暗いセクションにいるか判定
    const fvH2 = fvWrap ? fvWrap.offsetHeight : H*2.5;
    const contactTop = contactSW ? getTop(contactSW) : Infinity;
    const inDark = scrollY < fvH2*0.4 || scrollY >= contactTop;
    
    // 暗いセクションと明るいセクションで波の色と透明度を変える
    const r=inDark?195:155, g=inDark?190:150, b=inDark?183:143;
    const a=inDark?0.20:0.13;
    
    wave(cx,    32, 0.6, 22, 0.006, r,g,b, a,       0);
    wave(cx+5,  18, 0.9, 13, 0.012, r,g,b, a*0.6,   2);
    wave(cx-5,  25, 0.4, 18, 0.004, r,g,b, a*0.8,   4);
    requestAnimationFrame(loop);
  }
  loop();
})();