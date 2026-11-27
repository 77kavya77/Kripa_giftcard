const $=s=>document.querySelector(s);
const ANSWER=44; // 16 + 30 - 2
const HINTS=["Her birthday is on the 16th 🎂 – that's your first number.","She's turning 30 ✨ – add it to 16.","Two sisters adore her (Kavya & Neha) 💕 – subtract 2."];

/* ---------- confetti ---------- */
const cv=$('#fx'),cx=cv.getContext('2d');let ps=[];
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener('resize',fit);
function burst(n=120,x=innerWidth/2,y=innerHeight/2){for(let i=0;i<n;i++){const a=Math.random()*6.28,v=4+Math.random()*9;ps.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-5,r:3+Math.random()*5,c:`hsl(${Math.random()*360},90%,65%)`,l:1,t:Math.random()*6})}}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);ps=ps.filter(p=>p.l>0);for(const p of ps){p.x+=p.vx;p.y+=p.vy;p.vy+=.25;p.vx*=.99;p.l-=.008;p.t+=.1;cx.save();cx.globalAlpha=Math.max(p.l,0);cx.translate(p.x,p.y);cx.rotate(p.t);cx.fillStyle=p.c;cx.fillRect(-p.r,-p.r/2,p.r*2,p.r);cx.restore()}requestAnimationFrame(loop)})();
const fire=()=>[0,600,1200,1900].forEach(d=>setTimeout(()=>burst(90,innerWidth*(.2+Math.random()*.6),innerHeight*.3),d));

/* ---------- lock screen ---------- */
let h=0;
$('#hint').onclick=()=>{$('#hints').insertAdjacentHTML('beforeend',`<span>💡 ${HINTS[h++]}</span>`);if(h>=HINTS.length)$('#hint').hidden=true};
$('#ans').addEventListener('input',e=>{const v=e.target.value.replace(/\D/g,'');if(v!==e.target.value)e.target.value=v});
$('#f').addEventListener('submit',e=>{e.preventDefault();check()});
function check(){
  if($('#ans').value.trim()===String(ANSWER)){
    const r=document.documentElement.requestFullscreen;if(r)try{r.call(document.documentElement).catch(()=>{})}catch(e){}
    unlock();
  }else{const b=$('#box');b.classList.remove('shake');void b.getBoundingClientRect();b.classList.add('shake');$('#msg').textContent='Not quite, try again 💫'}
}
function unlock(){
  const bx=$('#box'),sun=$('#sun'),ry=$('#rays2');started=1;stopMusic(1.8);if(!trackErr){TRACKON=true;trackPlay()}
  $('#msg').textContent='Yesss! 🎉';bx.classList.add('open');
  const r=bx.getBoundingClientRect(),cx0=r.left+r.width/2,cy0=r.top+r.height/2;
  sun.style.setProperty('--x',cx0+'px');sun.style.setProperty('--y',cy0+'px');
  burst(100,cx0,cy0);chime();
  setTimeout(()=>{sun.classList.add('go');ry.classList.add('go')},500);
  setTimeout(()=>{$('#lock').classList.remove('on');$('#story').classList.add('on');play(0,true);sun.classList.add('fade');ry.classList.add('fade')},2200);
}
$('#fs').onclick=()=>{const d=document;d.fullscreenElement?d.exitFullscreen():d.documentElement.requestFullscreen?.().catch(()=>{})};
if(!document.documentElement.requestFullscreen)$('#fs').hidden=true;

/* ---------- story: comic panels using your real illustrations ---------- */
const WISH='<b>You are beautiful inside and out, and stronger than you know.</b> Love yourself a little louder, do what makes you happy, and explore everything new without anyone\'s judgement. Here\'s to more ☕ coffee, ✈️ adventures and 🍫 sweet surprises. Your biggest chapters are still ahead. 💖<br><small>With love, Kavya &amp; Neha</small>';
const FINAL='<div class="love">LOVE YOU UMMAHH! 💋</div><div id="act"><button id="cake">🎂 Make a wish</button><button id="again" class="ghost">🔁 Watch again</button></div>';
const SKY='<svg class="sky" viewBox="0 0 360 120" preserveAspectRatio="none"><path fill="#3a0d2a" opacity=".85" d="M0 120V70h30V50h20v20h24V30h12v40h30V10l6-10 6 10v110ZM200 120V60h30V40h18v80ZM270 120V70h28V45h22v45h40v30Z"/></svg>';
const hearts=[...Array(8)].map((_,i)=>['💖,🎈,✨,💗'.split(',')[i%4],6+i*12,86,28+i%3*8,'fl',i*.6]);
const S=[
{intro:1,bg:'linear-gradient(#ffb300,#ff7a00)',x:'<i class="rays"></i>',k:'★ A TRUE STORY ★',t:'KRIPA’S STORY',c:'Doubted by many. Defeated by none. 🎬',fn:()=>burst(120),s:[['🎬',8,10,56],['✨',86,12,52],['🎞️',10,75,48],['⭐',84,72,52]]},
{bg:'linear-gradient(#141a45,#3b2b6e)',f:'brightness(.8) saturate(.85)',t:'THEY DOUBTED HER…',c:'Everyone doubted her dream. She studied through sleepless nights and never gave up. 🌙',s:[['🌙',80,6,56],['📚',6,10,44],['💡',88,70,40]]},
{bg:'linear-gradient(#8fd3ff,#baf0a0)',t:'SHE FOUGHT BACK!',c:'She stood up for herself and landed her first job back home in Kerala. 🌴',z:1.15,s:[['🌴',4,12,70],['🌴',86,8,64],['☀️',46,3,44]]},
{bg:'linear-gradient(#ff8a5c,#ffd89b)',x:SKY,t:'DUBAI OR BUST!',c:'A 3-month visa, months of searching, and the clock was ticking… ⏳',s:[['✈️',0,8,48,'fly'],['⏳',84,10,48],['🧳',6,70,40]]},
{bg:'#e91e8c',x:'<i class="rays"></i>',face:1,t:"YOU'RE HIRED!",c:'Just as the 3 months were about to end… she got the job she wanted! 🎉',z:1.25,fn:()=>burst(160),s:[['🎉',6,8,50],['🎊',84,10,50],['✨',90,60,40],['✨',4,60,40]]},
{bg:'linear-gradient(#263238,#4a6572)',f:'brightness(.9) sepia(.2)',t:'GRIND MODE!',c:'1.5 years of long hours, little sleep and big lessons… but she grew stronger and made friends for life. 🤝',s:[['🕒',84,8,48,'spin'],['💻',5,12,44],['☕',88,66,38],['🤝',5,66,40]]},
{bg:'linear-gradient(#0f9b8e,#a8e063)',t:'LEVEL UP!',c:'Then she upgraded herself: a better role, a better salary and a peaceful mind. ⬆️',z:1.2,s:[['⬆️',84,10,50],['💰',6,12,44],['🧘',88,66,42]]},
{bg:'linear-gradient(#2a1458,#ff9f1c)',x:SKY,face:1,t:'UNSTOPPABLE!',c:'Today she is a Civil Engineer in Dubai. Beautiful. Confident. Unstoppable. ✨',o:'50% 22%',z:1.7,s:[['✨',6,10,44],['✨',88,12,48],['🏗️',5,64,44],['🇦🇪',88,66,40]]},
{bg:'linear-gradient(#ff9fcd,#ffd7a8)',img:'trio.jpg',alt:'Kripa with Kavya and Neha kissing her cheeks',t:'HAPPY BIRTHDAY KRIPA! 🎂',c:WISH,last:1,fn:()=>{setTimeout(fire,1900);birthday()},s:hearts}
];

const POR=()=>matchMedia('(orientation:portrait)').matches;
let tm,left=0,t0=0,paused=false,cur=0;
function play(n,first){
  clearTimeout(tm);cur=n;paused=false;$('#story').classList.remove('paused');const s=S[n],st=$('#stage'),d=document.createElement('div');
  d.className='sc'+(s.intro?' intro':'')+(s.last?' last':'')+(first?' first':'');d.style.background=s.bg;
  d.innerHTML=(s.x||'')+(s.s||[]).filter(e=>!POR()||e[2]<=40||e[4]==='fl').map(([e,l,t,z,c,dl])=>`<span class="stk ${c||'pulse'}" style="left:${l}%;top:${t}%;font-size:${z}px;animation-delay:${dl||0}s">${e}</span>`).join('')
   +(s.intro?'':`<div class="fr"><img class="pic" src="${s.img||'scene'+n+'.jpg'}" alt="${s.alt||'Kripa'}" data-f="contrast(1.05) sepia(.12) ${s.f||''}" data-face="${s.face?1:''}" style="--o:${s.o||'50% 40%'};--z:${s.z||1.1}" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='kripa.jpg';this.style.filter=this.dataset.f;if(this.dataset.face)this.parentNode.classList.add('face')}"></div>`)
   +`<div class="txt">${s.k?`<div class="kick">${s.k}</div>`:''}<div class="burst">${s.t}</div><p class="cap">${s.c}</p>${s.last?FINAL:''}</div>`;
  [...st.children].forEach(o=>{o.classList.add('out');setTimeout(()=>o.remove(),700)});
  st.append(d);
  const b=$('#bar');b.style.animation='none';void b.offsetWidth;b.style.animation='';b.hidden=!!s.last;
  s.fn&&s.fn();if(AC&&MAP[n]&&!TRACKON){startMusic(MAP[n])}
  if(!s.last){left=4800;t0=Date.now();tm=setTimeout(()=>play(n+1),left)}
}
document.addEventListener('click',e=>{
  if(e.target.closest('button')){initAudio();tap()}
  if(e.target.id==='again'){play(0);if(TRACKON){stopMusic(.9);trackPlay()}}
  if(e.target.id==='cake'){chime();burst(200);setTimeout(()=>burst(120,innerWidth*.2,innerHeight*.4),300);setTimeout(()=>burst(120,innerWidth*.8,innerHeight*.4),500)}
});

/* tap anywhere on the story to pause / play (no icon) */
$('#story').addEventListener('click',e=>{
  if(e.target.closest('button')||S[cur].last)return;
  const st=$('#story');
  if(!paused){paused=true;clearTimeout(tm);left-=Date.now()-t0;st.classList.add('paused');AC&&AC.suspend();TRACKON&&TRACK.pause()}
  else{paused=false;t0=Date.now();tm=setTimeout(()=>play(cur+1),left);st.classList.remove('paused');AC&&AC.resume();TRACKON&&TRACK.play().catch(()=>{})}
});

/* ---------- sound: everything is synthesized in the browser, no audio files ---------- */
let AC,master,bus,NB,mode='',musicOn=false,muted=false,started=0,nextT=0,bar=0,st,rt;
/* optional: put your own song at music.mp3 (same folder) and it plays for the whole story instead of the built-in music */
const TRACK=new Audio('music.mp3');TRACK.loop=true;TRACK.preload='auto';
let TRACKON=false,trackErr=false,tf;
TRACK.addEventListener('error',()=>{trackErr=true;if(TRACKON){TRACKON=false;if(AC&&$('#story').classList.contains('on'))startMusic(MAP[cur]||'joy')}});
function trackFade(to,ms){const from=TRACK.volume,t0=performance.now();clearInterval(tf);tf=setInterval(()=>{const k=Math.min(1,(performance.now()-t0)/ms);TRACK.volume=from+(to-from)*k;if(k>=1)clearInterval(tf)},50)}
function trackPlay(){TRACK.currentTime=0;TRACK.volume=0;TRACK.muted=muted;const p=TRACK.play();
  if(p)p.catch(e=>{if(e.name==='NotAllowedError'||e.name==='NotSupportedError'){TRACKON=false;if(AC)startMusic(MAP[cur]||'intro')}});
  setTimeout(()=>trackFade(.9,2500),1200)}
const VOL=2.2,BAR=2.07,TB=2.4,mf=m=>440*2**((m-69)/12);
const HB=[[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,2],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]];
/* story music: upbeat pop loop, 8 bars (C G Am F C G F G) with drums, bass, chord stabs and a hook */
const SC=[[48,[60,64,67]],[43,[59,62,67]],[45,[57,60,64]],[41,[57,60,65]],[48,[60,64,67]],[43,[59,62,67]],[41,[57,60,65]],[43,[59,62,67]]];
const LD=[[[0,76,2],[2,79,1],[3,76,1],[4,72,2],[6,74,2]],[[0,74,2],[2,71,1],[3,74,1],[4,79,2],[6,74,2]],[[0,72,2],[2,76,1],[3,81,1],[4,79,2],[6,76,2]],[[0,77,2],[2,76,1],[3,72,1],[4,74,3]],
[[0,76,1],[1,79,1],[2,84,2],[4,83,1],[5,79,1],[6,76,2]],[[0,74,1],[1,79,1],[2,83,2],[4,81,1],[5,79,1],[6,74,2]],[[0,77,2],[2,81,2],[4,79,1],[5,77,1],[6,76,2]],[[0,74,2],[2,79,2],[4,83,2],[6,86,2]]];
/* puzzle music: relaxed, playful "thinking" loop (Dm G C Am) */
const TK=[[38,[62,65,69]],[43,[59,62,65]],[36,[60,64,67]],[45,[57,60,64]]];
const TM=[[[0,74],[2,72],[4,69],[6,72],[7,74]],[[0,71],[2,74],[4,71],[6,67]],[[0,76],[2,72],[4,67],[5,72]],[[0,69],[1,72],[3,76],[5,72],[6,69]]];
/* scene moods: the music follows the story (doubt -> hope -> tension -> joy -> grind -> rise -> triumph) */
const LS=[[[0,76,3],[3,74,1],[4,72,4]],[[0,69,3],[3,67,1],[4,65,4]],[[0,67,4],[4,72,4]],[[0,71,3],[3,69,1],[4,67,4]]];
const MAP=Array(8).fill('intro'); // one continuous soundtrack (the "Kripa's Story" theme) for the whole story
const MD={
 intro:{bpm:84,ch:[[48,[60,64,67]],[45,[57,60,64]],[41,[57,60,65]],[43,[59,62,67]]],arp:[0,1,2,3,2,1,2,3],ao:24,av:.06,pad:.02,bs:'long',k:1},
 sad:{bpm:66,ch:[[45,[57,60,64]],[41,[57,60,65]],[48,[60,64,67]],[43,[59,62,67]]],arp:[0,-1,1,-1,2,-1,1,-1],ao:12,av:.07,pad:.02,bs:'long',k:0,ld:LS,lv:.06},
 warm:{bpm:80,ch:SC.slice(0,4),arp:[0,2,1,2,0,2,1,2],ao:12,av:.06,pad:.015,bs:'long',k:0},
 tense:{bpm:92,ch:[[45,[57,60,64]],[41,[57,60,65]],[38,[57,62,65]],[40,[56,59,64]]],arp:[0,1,2,1,0,1,2,1],ao:12,av:.05,pad:.02,bs:'pulse',k:1,tk:1},
 win:{bpm:104,ch:SC.slice(0,4),arp:[0,1,2,3,0,1,2,3],ao:24,av:.055,pad:.02,bs:'bounce',k:2,ld:LD.slice(0,4),lv:.065},
 grind:{bpm:100,ch:[[45,[57,60,64]],[41,[57,60,65]],[48,[60,64,67]],[43,[59,62,67]]],arp:[-1,1,-1,2,-1,1,-1,2],ao:12,av:.04,pad:.02,bs:'pulse',k:3},
 rise:{bpm:104,ch:[[41,[57,60,65]],[48,[60,64,67]],[43,[59,62,67]],[45,[57,60,64]]],arp:[0,1,2,3,2,3,2,1],ao:24,av:.05,pad:.022,bs:'bounce',k:2},
 epic:{bpm:108,ch:SC.slice(4),arp:[0,1,2,3,0,1,2,3],ao:24,av:.05,pad:.025,bs:'bounce',k:2,ld:LD.slice(4),lv:.075}
};
function pno(f,t,v,d){tone(f,t,1.3,'triangle',v,d);tone(f*2,t,.4,'sine',v*.25,d)}
function str(f,t,dur,v,d){const o=AC.createOscillator(),o2=AC.createOscillator(),fl=AC.createBiquadFilter(),g=AC.createGain();o.type=o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f*1.006;fl.type='lowpass';fl.frequency.value=900;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+Math.min(.5,dur/2));g.gain.linearRampToValueAtTime(0,t+dur+.2);o.connect(fl);o2.connect(fl);fl.connect(g);g.connect(d);o.start(t);o2.start(t);o.stop(t+dur+.3);o2.stop(t+dur+.3)}
function playMood(t,i,d,M){const [r,c]=M.ch[i%M.ch.length],L=240/M.bpm,e=L/8,ex=[c[0],c[1],c[2],c[0]+12];
  c.forEach(m=>str(mf(m-12),t,L,M.pad,d));
  M.arp.forEach((k,j)=>{if(k>=0)pno(mf(ex[k]+M.ao),t+j*e,M.av,d)});
  if(M.bs==='pulse')for(let s=0;s<8;s++)tone(mf(r),t+s*e,e*.9,'triangle',.1,d);
  else if(M.bs==='bounce')[[0,0],[3,12],[4,0],[6,7]].forEach(([s,o])=>tone(mf(r+o),t+s*e,e*1.5,'triangle',.12,d));
  else tone(mf(r),t,L,'triangle',.1,d);
  if(M.k===1)kick(t,d);
  if(M.k===2){kick(t,d);kick(t+L/2,d);nz(t+L/4,.13,'bandpass',1800,.09,d);nz(t+L*3/4,.13,'bandpass',1800,.09,d)}
  if(M.k===3)for(let b=0;b<4;b++)kick(t+b*L/4,d);
  if(M.k>=2)for(let s=1;s<8;s+=2)nz(t+s*e,.04,'highpass',7000,.04,d);
  if(M.tk)for(let b=0;b<4;b++)nz(t+b*L/4,.025,'bandpass',3000,.04,d);
  if(M.ld)M.ld[i%M.ld.length].forEach(([s,m,l])=>{tone(mf(m),t+s*e,l*e*.95,'triangle',M.lv,d);tone(mf(m)*2,t+s*e,l*e*.5,'sine',M.lv/3,d)})}
function initAudio(){
  if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();NB=null;master=AC.createGain();master.gain.value=muted?0:VOL;master.connect(AC.destination)}catch(e){AC=null;return}}
  if(AC.state==='suspended'&&!paused)AC.resume();
}
function tone(f,t,d,type,v,dest){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dest||master);o.start(t);o.stop(t+d+.05)}
const bell=(f,t,d)=>{tone(f,t,1.1,'sine',.08,d);tone(f*2,t,.5,'sine',.025,d)};
function nz(t,d,type,fr,v,dest){if(!NB){NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const x=NB.getChannelData(0);for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1}
  const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;f.type=type;f.frequency.value=fr;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(dest);s.start(t);s.stop(t+d+.02)}
function kick(t,d){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(48,t+.12);g.gain.setValueAtTime(.2,t);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.connect(g);g.connect(d);o.start(t);o.stop(t+.3)}
function tap(){if(!AC)return;const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(880,t);o.frequency.exponentialRampToValueAtTime(380,t+.07);g.gain.setValueAtTime(.25,t);g.gain.exponentialRampToValueAtTime(.001,t+.1);o.connect(g);g.connect(master);o.start(t);o.stop(t+.12)}
function chime(){if(!AC)return;const t=AC.currentTime;[72,76,79,84,88].forEach((m,i)=>bell(mf(m),t+i*.09))}
function newBus(fi=.9){bus=AC.createGain();bus.gain.setValueAtTime(0,AC.currentTime);bus.gain.linearRampToValueAtTime(1,AC.currentTime+fi);bus.connect(master);return bus}
function stopMusic(fade=.4){musicOn=false;mode='';clearTimeout(st);clearTimeout(rt);if(AC&&bus){const b=bus;b.gain.cancelScheduledValues(AC.currentTime);b.gain.setValueAtTime(b.gain.value,AC.currentTime);b.gain.linearRampToValueAtTime(0,AC.currentTime+fade);setTimeout(()=>b.disconnect(),fade*1000+200);bus=null}}
function playStory(t,i,d){const k=i%8,[r,c]=SC[k],e=BAR/8;
  c.forEach(m=>tone(mf(m-12),t,BAR,'sine',.03,d));
  [[0,0],[3,12],[4,0],[6,7]].forEach(([s,o])=>tone(mf(r+o),t+s*e,e*1.5,'triangle',.13,d));
  [0,3,6].forEach(s=>c.forEach(m=>tone(mf(m),t+s*e,e*1.2,'triangle',.03,d)));
  kick(t,d);kick(t+BAR/2,d);
  nz(t+BAR/4,.13,'bandpass',1800,.09,d);nz(t+BAR*3/4,.13,'bandpass',1800,.09,d);
  for(let s=1;s<8;s+=2)nz(t+s*e,.04,'highpass',7000,.04,d);
  LD[k].forEach(([s,m,l])=>{tone(mf(m),t+s*e,l*e*.95,'triangle',.07,d);tone(mf(m)*2,t+s*e,l*e*.5,'sine',.02,d)})}
function playThink(t,i,d){const k=i%4,[r,c]=TK[k],e=TB/8;
  [0,2,4,6].forEach((s,j)=>tone(mf(r+12+(j%2?7:0)),t+s*e,e*1.8,'triangle',.12,d));
  c.forEach(m=>tone(mf(m-12),t,TB,'sine',.03,d));
  TM[k].forEach(([s,m])=>{tone(mf(m),t+s*e,.35,'triangle',.08,d);tone(mf(m)*2,t+s*e,.12,'sine',.025,d)});
  nz(t+2*e,.03,'bandpass',2500,.03,d);nz(t+6*e,.03,'bandpass',2500,.03,d)}
function startMusic(kind='joy',fi=.9){
  if(!AC||(musicOn&&mode===kind))return;stopMusic(.9);
  musicOn=true;mode=kind;const b=newBus(fi),M=MD[kind],len=M?240/M.bpm:kind==='think'?TB:BAR,fn=M?((t,i,d)=>playMood(t,i,d,M)):kind==='think'?playThink:playStory;nextT=AC.currentTime+.15;bar=0;
  (function s(){if(!musicOn||bus!==b)return;while(nextT<AC.currentTime+1.6){fn(nextT,bar++,b);nextT+=len}st=setTimeout(s,300)})();
}
function birthday(){ // final scene: story music fades out slowly, only the "Happy Birthday" melody plays (fading in), then it stays quiet
  if(TRACKON){trackFade(0,3500);setTimeout(()=>{if(cur===S.length-1)TRACK.pause()},3700)}
  if(!AC)return;stopMusic(3.5);const b=newBus(4);let t=AC.currentTime+.8;
  HB.forEach(([m,d])=>{bell(mf(m),t,b);tone(mf(m-12),t,d*.6,'triangle',.05,b);t+=d*.6});
}
/* puzzle music starts on her first tap or key press (browsers don't allow sound before that) */
function firstGesture(){
  if(started)return;initAudio();if(!AC)return;
  AC.resume().then(()=>{if(!started&&AC.state==='running'){started=1;startMusic('think');['pointerdown','keydown','touchend','click'].forEach(ev=>removeEventListener(ev,firstGesture))}}).catch(()=>{});
}
['pointerdown','keydown','touchend','click'].forEach(ev=>addEventListener(ev,firstGesture));
$('#mu').onclick=()=>{muted=!muted;TRACK.muted=muted;if(master)master.gain.value=muted?0:VOL;$('#mu').textContent=muted?'🔇':'🔊'};
document.addEventListener('visibilitychange',()=>{if(TRACKON)document.hidden?TRACK.pause():(!paused&&TRACK.play().catch(()=>{}));if(!AC)return;document.hidden?AC.suspend():(!paused&&AC.resume())});