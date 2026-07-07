
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
const wData=[
  {cat:'Web Design',   title:'小児科サイトリニューアル', title2:'小児科サイト<br>リニューアル',   desc:'初めての受診でも迷わない。保護者の行動観察から導線を再設計した小児科サイト。', link:'works/index.html'},
  {cat:'Web Design',   title:'飲食店コーポレート',       title2:'飲食店<br>コーポレート',         desc:'料理の魅力を静かに際立たせる、余白を活かしたコーポレートサイト。',           link:'works/project01.html'},
  {cat:'Graphic',      title:'タトゥースタジオロゴ',     title2:'タトゥースタジオ<br>ロゴデザイン', desc:'闇と美をモチーフに、鋭さと静けさを込めたスタジオのロゴマーク。',             link:'works/project02.html'},
  {cat:'Landing Page', title:'LPデザイン',               title2:'LP<br>デザイン',                 desc:'訴求を一直線に。行動につなげる構成にこだわったランディングページ。',         link:'works/project03.html'},
  {cat:'Illustration', title:'デッサン・グラフィック',   title2:'デッサン<br>グラフィック',       desc:'手で捉えた光と陰影。観察の積み重ねから生まれたグラフィック表現。',           link:'works/project04.html'},
];
let lastWorksIdx=-1;
function updateWorksInfo(idx){
  const panel=document.getElementById('worksInfo');
  const d=wData[idx];
  if(!panel||!d) return;
  panel.classList.add('swap');
  setTimeout(()=>{
    const cat=document.getElementById('wCat');
    const title=document.getElementById('wTitle');
    const desc=document.getElementById('wDesc');
    const link=document.getElementById('wLink');
    if(cat) cat.textContent=d.cat;
    if(title) title.innerHTML=d.title2;
    if(desc) desc.textContent=d.desc;
    if(link) link.setAttribute('href',d.link);
    panel.classList.remove('swap');
  },170);
}
const aboutSW=document.getElementById('aboutStickyWrap');
const aboutSticky=document.getElementById('aboutSticky');
const aboutLabel=document.getElementById('aboutLabel');
const aboutContent=document.getElementById('aboutContent');

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
      const cardH = isMobile ? 290 : 480;
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
      if(l) l.textContent=wData[idx].title;
      if(f) f.style.width=`${(idx+1)/TOTAL*100}%`;
      if(idx!==lastWorksIdx){ lastWorksIdx=idx; updateWorksInfo(idx); }
    }
  }
 
  // ── About ──
  if(aboutSW){
    const as=sy-cachedAboutTop;
    if(as>=0){
      const ar=cl(as/(aboutSW.offsetHeight-vh));
      const lI=ph(ar,0,0.20), lO=ph(ar,0.30,0.16);
      aboutLabel.style.opacity=String(lI*(1-lO));
      aboutLabel.style.transform=`translateY(${(1-lI)*20-lO*14}px)`;
      const cI=ph(ar,0.42,0.30);
      if(aboutContent){
        aboutContent.style.opacity=String(cI);
        aboutContent.style.transform=`translateY(${(1-cI)*26}px)`;
      }
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