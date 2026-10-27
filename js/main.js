const R=document.body.dataset.root||'',F=location.protocol==='file:'?'index.html':'';
const W='https://static.wixstatic.com/media/7c541c_';
const IMG=[R+'assets/img/hero1.jpg',W+'3268f981bfb0455eb50759554c6ebfbb~mv2.jpg',W+'f1809693186147ed9744cd2405c43041~mv2.jpg',W+'f2b40410da274213bbb567527dd5e80e~mv2.jpg',W+'5714aa23c4bb422392b1b8d15cea75a5~mv2.jpg',W+'77945df932f044fdb1157a82c3ffb709~mv2.jpg',W+'2359f5ab114c4d128512cc07efaa836d~mv2.jpg'];
const pages=[['','Home'],['about/','About'],['officers/','Officers'],['past-officers/','Past Officers'],['what-we-do/','What We Do'],['events/','Events'],['contact/','Contact']];
const cur=location.pathname.replace(/index\.html$/,'').split('/').filter(Boolean).pop()||'';
const hr=p=>(R+p+F)||'./',on=p=>p===''?!document.body.dataset.root:cur===p.replace('/','');
document.body.insertAdjacentHTML('afterbegin',`<header><div class="wrap nav"><a class="brand" href="${hr('')}"><img src="${R}assets/logo.jpg" alt="MMI logo"><span>Mboho Mkparawa Ibibio<small>LAGOS CHAPTER</small></span></a><nav><button class="burger" aria-label="Menu"><span></span><span></span><span></span></button><ul>${pages.map(p=>`<li><a href="${hr(p[0])}" class="${on(p[0])?'on':''}">${p[1]}</a></li>`).join('')}</ul></nav></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap g"><div><h4>Mboho Mkparawa Ibibio · Lagos Chapter</h4><p>Oneness for Service. A socio-cultural organisation of Ibibio young adults, founded in Calabar on 1st August 1987.</p></div><div><h4>Pages</h4><ul>${pages.map(p=>`<li><a href="${hr(p[0])}">${p[1]}</a></li>`).join('')}</ul></div><div><h4>Parent body</h4><ul><li><a href="https://www.mmiinternational.org" target="_blank" rel="noopener">MMI International</a></li><li>lagos@your-domain.org</li></ul></div></div><p class="copy">© ${new Date().getFullYear()} Mboho Mkparawa Ibibio, Lagos Chapter</p></footer><div class="toast" id="toast"></div>`);
document.querySelector('.burger').onclick=()=>document.querySelector('nav').classList.toggle('open');
requestAnimationFrame(()=>document.body.classList.add('ready'));
addEventListener('pageshow',()=>document.body.classList.remove('leave'));
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||a.target||!a.getAttribute('href')||a.getAttribute('href').startsWith('#')||a.origin!==location.origin)return;e.preventDefault();document.body.classList.add('leave');setTimeout(()=>location.href=a.href,280)});
// images by data-i index, with graceful fallback
document.querySelectorAll('[data-i]').forEach(el=>{const s=IMG[+el.dataset.i];if(el.tagName==='IMG'){el.src=s;el.onerror=()=>el.style.visibility='hidden'}else el.style.backgroundImage=`url(${s})`});
// sliding hero backgrounds
document.querySelectorAll('.hero[data-s]').forEach(h=>{
 const ids=h.dataset.s.split(',');const sl=ids.map((n,k)=>{const d=document.createElement('div');d.className='sl'+(k?'':' cur');d.innerHTML=`<i data-i="${n}" style="background-image:url(${IMG[+n]})"></i>`;h.prepend(d);return d}).reverse();
 const dots=document.createElement('div');dots.className='dots';dots.innerHTML='<button class="arr" aria-label="Previous">‹</button>'+ids.map((_,k)=>`<button aria-label="Slide ${k+1}" class="${k?'':'on'}"></button>`).join('')+'<button class="arr" aria-label="Next">›</button>';h.append(dots);
 const db=[...dots.querySelectorAll('button:not(.arr)')];let i=0,t;
 const go=(n,dir=1)=>{n=(n+ids.length)%ids.length;if(n===i)return;const a=sl[i],b=sl[n];b.classList.remove('mv','cur','prev');b.style.transform=`translateX(${100*dir}%)`;b.offsetWidth;[a,b].forEach(x=>x.classList.add('mv'));a.classList.remove('cur');a.style.transform=`translateX(${-100*dir}%)`;b.style.transform='none';b.classList.add('cur');db[i].classList.remove('on');db[n].classList.add('on');i=n;rs()};
 const rs=()=>{clearInterval(t);if(ids.length>1)t=setInterval(()=>go(i+1),6000)};
 dots.querySelectorAll('.arr')[0].onclick=()=>go(i-1,-1);dots.querySelectorAll('.arr')[1].onclick=()=>go(i+1);db.forEach((b,k)=>b.onclick=()=>go(k,k>i?1:-1));rs();
 if(ids.length<2)dots.hidden=true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*100+'ms';io.observe(el)});
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.n,s=el.dataset.s||'';let n=0;const st=()=>{n+=Math.ceil(t/50);if(n>=t)n=t;el.textContent=n+s;if(n<t)requestAnimationFrame(st)};st();co.unobserve(el)}),{threshold:.6});
document.querySelectorAll('[data-n]').forEach(el=>co.observe(el));
document.querySelectorAll('form').forEach(f=>f.onsubmit=e=>{e.preventDefault();const t=document.getElementById('toast');t.textContent='Thank you! We will be in touch soon.';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500);f.reset()});
const D=window.MMI_DATA,oc=document.getElementById('officers'),pt=document.getElementById('past');
if(D&&oc){oc.innerHTML=D.current.map(x=>`<div class="card ofc rv"><div class="av">${x.name.split(' ').filter(w=>/^[A-Z]/.test(w)).map(w=>w[0]).slice(0,2).join('')||'?'}</div><small>${x.office}</small><h3>${x.name}</h3></div>`).join('');oc.querySelectorAll('.rv').forEach(el=>io.observe(el))}
if(D&&pt){const draw=q=>pt.innerHTML=D.past.filter(r=>Object.values(r).join(' ').toLowerCase().includes(q)).map(r=>`<tr><td>${r.term}</td><td>${r.office}</td><td>${r.name}</td></tr>`).join('')||'<tr><td colspan=3>No match found.</td></tr>';draw('');document.getElementById('q').oninput=e=>draw(e.target.value.toLowerCase())}
