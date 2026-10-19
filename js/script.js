// ===== Data (แก้ไขข้อมูลของคุณตรงนี้) =====
const skills = [
  { group:'🐧 OS & Infra', items:[['Linux',75],['Windows Server',85],['Networking',80]] },
  { group:'🐳 Containers', items:[['Docker',65],['Kubernetes',40],['Docker Compose',60]] },
  { group:'⚙️ CI/CD & IaC', items:[['Git / GitHub',70],['GitHub Actions',55],['Terraform',35]] },
  { group:'☁️ Cloud & Tools', items:[['Microsoft 365',85],['AWS / Azure',45],['Bash / Python',60]] },
];
const projects = [
  { icon:'🚀', cat:'devops', title:'CI/CD Pipeline', desc:'ตั้งค่า GitHub Actions ให้ build, test และ deploy เว็บอัตโนมัติเมื่อ push code', tags:['GitHub Actions','Docker'] },
  { icon:'🐳', cat:'devops', title:'Dockerized Web App', desc:'นำแอปมาทำเป็น container พร้อม docker-compose สำหรับ app + database', tags:['Docker','Compose','MySQL'] },
  { icon:'🎫', cat:'web', title:'Helpdesk Ticket System', desc:'ระบบ CRUD สำหรับบันทึกและติดตาม ticket แจ้งปัญหาไอที พร้อม export ข้อมูล', tags:['CRUD','Web','Export'] },
  { icon:'⛽', cat:'web', title:'Refuel Manage App', desc:'แอปบันทึกค่าน้ำมัน คำนวณอัตราสิ้นเปลือง และสรุปค่าใช้จ่ายรายเดือน', tags:['JavaScript','Chart'] },
  { icon:'🤖', cat:'automation', title:'LINE Bot ผู้ช่วยจดเงิน', desc:'บอทบน Google Apps Script บันทึกรายจ่ายและรูปสลิปลง Google Sheets / Drive', tags:['Apps Script','LINE API'] },
  { icon:'📊', cat:'automation', title:'Power BI Helpdesk Report', desc:'Dashboard สรุปสถิติ ticket จาก semantic model บน Power BI Service', tags:['Power BI','DAX'] },
];

// ===== Typing effect =====
const words = ['System Engineer','Aspiring DevOps Engineer','Automation Lover','Lifelong Learner'];
let wi=0, ci=0, del=false; const typedEl=document.getElementById('typed');
(function type(){
  const w=words[wi]; typedEl.textContent=w.slice(0,ci);
  if(!del && ci<w.length) ci++; else if(del && ci>0) ci--;
  else { del=!del; if(!del) wi=(wi+1)%words.length; }
  setTimeout(type, del?40:(ci===w.length?1600:90));
})();

// ===== Render skills (article + list) =====
document.getElementById('skillsGrid').innerHTML = skills.map(s=>`
  <article class="skill-card">
    <h3>${s.group}</h3>
    <ul>
      ${s.items.map(([n,v])=>`
      <li class="bar">
        <div class="bar-label"><span>${n}</span><span>${v}%</span></div>
        <div class="bar-track" role="progressbar" aria-label="${n}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}">
          <div class="bar-fill" data-w="${v}"></div>
        </div>
      </li>`).join('')}
    </ul>
  </article>`).join('');

// ===== Render projects (li > article) + filter =====
const grid=document.getElementById('projectsGrid');
function renderProjects(f){
  grid.innerHTML = projects.filter(p=>f==='all'||p.cat===f).map(p=>`
    <li>
      <article class="project">
        <span class="icon" aria-hidden="true">${p.icon}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <ul class="tags" aria-label="เทคโนโลยีที่ใช้">${p.tags.map(t=>`<li class="tag">${t}</li>`).join('')}</ul>
      </article>
    </li>`).join('');
}
renderProjects('all');
document.getElementById('filters').addEventListener('click',e=>{
  const btn=e.target.closest('.filter'); if(!btn) return;
  document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});
  btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
  renderProjects(btn.dataset.f);
});

// ===== Scroll reveal + skill bars + counters =====
const io=new IntersectionObserver(entries=>entries.forEach(en=>{
  if(!en.isIntersecting) return;
  en.target.classList.add('show');
  en.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.w+'%');
  en.target.querySelectorAll('[data-count]').forEach(el=>{
    let n=0; const t=+el.dataset.count;
    const iv=setInterval(()=>{el.textContent=++n+'+'; if(n>=t) clearInterval(iv);},80);
  });
  io.unobserve(en.target);
}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ===== Active nav link =====
const links=document.querySelectorAll('.nav-links a');
const sections=document.querySelectorAll('main section');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{ if(scrollY>=s.offsetTop-120) cur=s.id; });
  links.forEach(a=>{
    const on=a.getAttribute('href')==='#'+cur;
    a.classList.toggle('active',on);
    on ? a.setAttribute('aria-current','true') : a.removeAttribute('aria-current');
  });
},{passive:true});

// ===== Mobile menu =====
const nav=document.getElementById('navLinks');
const menuBtn=document.getElementById('menuBtn');
function setMenu(open){
  nav.classList.toggle('open',open);
  menuBtn.setAttribute('aria-expanded',open);
  menuBtn.setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');
  menuBtn.textContent=open?'✕':'☰';
}
menuBtn.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
links.forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{ if(e.key==='Escape') setMenu(false); });

// ===== Contact form (demo) =====
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.target, msg=document.getElementById('formMsg');
  if(!form.checkValidity()){ msg.style.color='#f85149'; msg.textContent='กรุณากรอกข้อมูลให้ครบและอีเมลให้ถูกต้อง'; return; }
  msg.style.color='';
  msg.textContent=`ขอบคุณครับ คุณ${form.name.value} ได้รับข้อความแล้ว ✔`;
  form.reset();
});

// ===== Footer year =====
const y=document.getElementById('year');
y.textContent=new Date().getFullYear(); y.dateTime=y.textContent;
