// ==========================================
// main.js - サイト全体のUI・スクロールアニメーション
// ==========================================

const isTouch = window.matchMedia('(pointer:coarse)').matches;
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (!isTouch && cur) {
  let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my;
  document.addEventListener('mousemove', e=>{mx=e.clientX;my=e.clientY;});
  (function l(){ cur.style.left=mx+'px'; cur.style.top=my+'px';
    rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(l); })();
}
 
function eio(t){ return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2; }
function eo(t){ return 1-Math.pow(1-t,3); }
function lerp(a,b,t){ return a+(b-a)*t; }
function rgb(c){ return `rgb(${c.map(Math.round).join(',')})`; }
function mix(a,b,t){ return [lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)]; }
function cl(v){ return Math.min(Math.max(v,0),1); }
function ph(r,s,l){ return eo(cl((r-s)/l)); }
function getTop(el){ let t=0; while(el){t+=el.offsetTop;el=el.offsetParent;} return t; }
 
const C={
  bgD:[10,10,10],bgL:[240,237,232],
  tiD:[232,228,223],tiL:[30,28,26],
  suD:[140,130,118],suL:[100,96,92],
  dvD:[70,64,58],dvL:[160,152,144],
  lnD:[255,255,255],lnL:[20,18,16],
  cuD:[160,160,160],cuL:[80,80,80],
};
 
const fv=document.getElementById('fv');
const fvWrap=document.querySelector('.fv-wrap');
const worksSW=document.getElementById('worksStickyWrap');
const cardsTrack=document.getElementById('cardsTrack');
const wCards=Array.from(document.querySelectorAll('.w-card'));

const TOTAL=wCards.length;
const wLabels=['小児科サイトリニューアル','飲食店コーポレート','タトゥースタジオロゴ','LPデザイン','デッサン・グラフィック'];
const aboutSW=document.getElementById('aboutStickyWrap');
const aboutSticky=document.getElementById('aboutSticky');
const aboutLabel=document.getElementById('aboutLabel');
const aboutImg=document.getElementById('aboutImgArea');
const aboutTxt=document.getElementById('aboutTextArea');
const contactSW=document.getElementById('contactStickyWrap');
const contactSt=document.getElementById('contactSticky');
const contactIn=document.getElementById('contactInner');
 
let fvPrev=-1;
let cachedWorksTop=0, cachedAboutTop=0, cachedContactTop=0;
 
function updateTops(){
  cachedWorksTop  = worksSW  ? getTop(worksSW)  : 0;
  cachedAboutTop  = aboutSW  ? getTop(aboutSW)  : 0;
  cachedContactTop= contactSW? getTop(contactSW): 0;
}
window.addEventListener('resize', updateTops);
document.addEventListener('DOMContentLoaded', updateTops);
setTimeout(updateTops, 300);
 
function tick(){
  const sy=scrollY, vh=innerHeight;
  const fvH=fvWrap.offsetHeight;
 
  // ── FV ──
  const rawF=cl(sy/(fvH-vh)/0.55);
  const t=eio(rawF);
  if(Math.abs(t-fvPrev)>=0.0005){
    fvPrev=t;
    fv.style.backgroundColor=rgb(mix(C.bgD,C.bgL,t));
    const tc=rgb(mix(C.tiD,C.tiL,t));
    const sc=rgb(mix(C.suD,C.suL,t));
    const dc=rgb(mix(C.dvD,C.dvL,t));
    const ln=mix(C.lnD,C.lnL,t);
    document.getElementById('fvTitle').style.color=tc;
    ['fvName','fvLoc','fvYear','scrollTxt'].forEach(id=>{
      const e=document.getElementById(id); if(e) e.style.color=sc;
    });
    document.getElementById('fvSub').style.color=sc;
    ['fvDivTop','fvDivBot'].forEach(id=>{
      const e=document.getElementById(id); if(e) e.style.background=dc;
    });
    const sb=document.getElementById('scrollBar');
    if(sb) sb.style.background=`rgba(${ln.map(Math.round).join(',')},0.15)`;
    const sh=document.getElementById('scrollHint');
    if(sh) sh.style.opacity=Math.max(0,1-rawF*5).toString();
    if(!isTouch&&cur){
      const cc=rgb(mix(C.cuD,C.cuL,t));
      cur.style.background=ring.style.borderColor=cc;
    }
  }
 
  // ── Works ──
  if(worksSW){
    const ws=sy-cachedWorksTop;
    if(ws>=0){
      const wr=cl(ws/(worksSW.offsetHeight-vh));
      
      const isMobile = window.innerWidth <= 767;
      const cardH = isMobile ? 380 : 400;
      const cardGap = isMobile ? 16 : 40;
      const stepY = cardH + cardGap;
      
      const baseOffsetY = -(cardH / 2);
      const currentY = baseOffsetY - (wr * stepY * (TOTAL - 1));
      
      cardsTrack.style.transform=`translate(-50%, ${currentY}px)`;

      const idx=Math.min(Math.round(wr*(TOTAL-1)),TOTAL-1);
      wCards.forEach((c,i)=>c.classList.toggle('active',i===idx));
      const n=document.getElementById('currentNum');
      const l=document.getElementById('progressLabel');
      const f=document.getElementById('progressFill');
      if(n) n.textContent=String(idx+1).padStart(2,'0');
      if(l) l.textContent=wLabels[idx];
      if(f) f.style.width=`${(idx+1)/TOTAL*100}%`;
    }
  }
 
  // ── About ──
  if(aboutSW){
    const as=sy-cachedAboutTop;
    if(as>=0){
      const ar=cl(as/(aboutSW.offsetHeight-vh));
 
      const lI=ph(ar,0,0.20), lO=ph(ar,0.25,0.20);
      aboutLabel.style.opacity=String(lI*(1-lO));
      aboutLabel.style.transform=`translateY(${(1-lI)*20-lO*12}px)`;
 
      const imgI=ph(ar,0.30,0.25), imgO=ph(ar,0.60,0.20);
      aboutImg.style.opacity=String(imgI*(1-imgO));
      aboutImg.style.transform=`translateY(${(1-imgI)*-30-imgO*20}px)`;
 
      const txtI=ph(ar,0.65,0.25), txtO=ph(ar,0.90,0.10);
      aboutTxt.style.opacity=String(txtI*(1-txtO));
      aboutTxt.style.transform=`translateY(${(1-txtI)*30-txtO*20}px)`;
    }
  }
 
  // ── Contact ──
  if(contactSW){
    const cs=sy-cachedContactTop;
    if(cs>=0){
      const cIn=document.getElementById('contactInner');
      if(cIn){ cIn.style.opacity='1'; cIn.style.transform='none'; }
    }
  }
}
 
window.addEventListener('scroll',tick,{passive:true});
tick();