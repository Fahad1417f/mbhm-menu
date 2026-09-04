const shell=document.querySelector('.menu-shell');
const home=document.querySelector('.home-art');
const pages=[...document.querySelectorAll('.menu-section')];
const tabs=[...document.querySelectorAll('.menu-tabs a')];

function showHome(){
  shell.classList.remove('active');
  home.style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}
function showPage(name, smooth=true){
  const page=pages.find(p=>p.dataset.page===name)||pages[0];
  shell.classList.add('active');
  home.style.display='none';
  pages.forEach(p=>p.classList.toggle('active',p===page));
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.route===page.dataset.page));
  if(smooth) window.scrollTo({top:0,behavior:'smooth'});
}
function route(){
  const hash=(location.hash||'').replace('#','');
  if(['hot','cold','desserts'].includes(hash)) showPage(hash,false);
  else if(['hours','reviews','contact','location'].includes(hash)){
    shell.classList.add('active'); home.style.display='none';
    pages.forEach(p=>p.classList.remove('active'));
    tabs.forEach(t=>t.classList.remove('active'));
    document.getElementById(hash)?.scrollIntoView({block:'start'});
  } else showHome();
}
document.querySelector('.back-home')?.addEventListener('click',e=>{e.preventDefault();history.pushState({},'',location.pathname);showHome()});
tabs.forEach(t=>t.addEventListener('click',e=>{e.preventDefault();const name=t.dataset.route;history.pushState({},'',location.pathname+'#'+name);showPage(name)}));
window.addEventListener('popstate',route);
window.addEventListener('hashchange',route);
route();