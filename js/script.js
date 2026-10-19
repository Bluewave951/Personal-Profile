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

// ===== Render skills =====
document.getElementById('skillsGrid').innerHTML = skills.map(s=>`
  <div class="skill-card"><h3>${s.group}</h3>
  ${s.items.map(([n,v])=>`<div class="bar"><div class="bar-label"><span>${n}</span><span>${v}%</span></div>
  <div class="bar-track"><div class="bar-fill" data-w="${v}"></div></div></div>`).join('')}</div>`).join('');

// ===== Render projects + filter =====
const grid=document.getElementById('projectsGrid');
function renderProjects(f){
  grid.innerHTML = projects.filter(p=>f==='all'||p.cat===f).map(p=>`
    <div class="project"><div class="icon">${p.icon}</div><h3>${p.title}</h3><p>${p.desc}</p>
    <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>`).join('');
}
renderProjects('all');
document.getElementById('filters').addEventListener('click',e=>{
  if(!e.target.dataset.f) return;
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active'); renderProjects(e.target.dataset.f);
});

// ===== Scroll reveal + skill bars + counters =====
const io=new IntersectionObserver(entries=>entries.forEach(en=>{
  if(!en.isIntersecting) return;
  en.target.classList.add('show');
  en.target.querySelectorAll('.bar-fill').forEach(b=>b.style.width=b.dataset.w+'%');
  en.target.querySelectorAll('[data-count]').forEach(el=>{
    let n=0,t=+el.dataset.count; const iv=setInterval(()=>{el.textContent=++n+'+'; if(n>=t)clearInterval(iv)},80);
  });
  io.unobserve(en.target);
}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ===== Active nav link =====
const links=document.querySelectorAll('nav ul a');
window.addEventListener('scroll',()=>{
  let cur=''; document.querySelectorAll('section').forEach(s=>{ if(scrollY>=s.offsetTop-120) cur=s.id; });
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// ===== Mobile menu =====
const nav=document.getElementById('navLinks');
document.getElementById('menuBtn').onclick=()=>nav.classList.toggle('open');
links.forEach(a=>a.onclick=()=>nav.classList.remove('open'));

// ===== Contact form (demo) =====
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formMsg').textContent=`ขอบคุณค่ะ คุณ${document.getElementById('name').value} ได้รับข้อความแล้ว ✔`;
  e.target.reset();
});
document.getElementById('year').textContent=new Date().getFullYear();
