// Respeito a acessibilidade
const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGSAP = typeof gsap !== "undefined";

// ===== HERO =====
(function hero(){
  if (!hasGSAP){
    // Sem GSAP: garante visibilidade do conteúdo
    ["#headline","#lead","#cta","#badges"].forEach(sel=>{
      const el = document.querySelector(sel);
      if (el){ el.style.opacity="1"; el.style.transform="none"; }
    });
    return;
  }
  if (prefersReduced){
    gsap.globalTimeline.clear();
    ["#headline","#lead","#cta","#badges"].forEach(sel=>{
      const el = document.querySelector(sel);
      if (el){ el.style.opacity="1"; el.style.transform="none"; }
    });
    return;
  }

  gsap.set(["#headline", "#lead", "#cta", "#badges"], {opacity:0, y:20});
  gsap.timeline({defaults:{ease:"power3.out"}})
    .from("#topbar", {y:-20, opacity:0, duration:.5})
    .from("#eyebrow", {y:10, opacity:0, duration:.5}, "-=0.2")
    .to("#headline", {y:0, opacity:1, duration:.7})
    .to("#lead",     {y:0, opacity:1, duration:.6}, "-=0.2")
    .to("#cta",      {y:0, opacity:1, duration:.6}, "-=0.25")
    .to("#badges",   {y:0, opacity:1, duration:.6}, "-=0.35");

  // orbs
  gsap.to(".hero .orb.one",   {x:30, y:10,  duration:6,  yoyo:true, repeat:-1, ease:"sine.inOut"});
  gsap.to(".hero .orb.two",   {x:-40,y:20,  duration:7,  yoyo:true, repeat:-1, ease:"sine.inOut"});
  gsap.to(".hero .orb.three", {x:18, y:-24, duration:5.5,yoyo:true, repeat:-1, ease:"sine.inOut"});
})();

// ===== QUEM SOU EU =====
(function about(){
  if (!hasGSAP) return;
  gsap.set(["#aboutd-title","#aboutd-lead","#aboutd-text","#aboutd-badges"], {opacity:0, y:16});
  gsap.timeline({defaults:{ease:"power3.out"}})
    .from("#aboutd-eyebrow", {y:10, opacity:0, duration:.45})
    .to("#aboutd-title", {y:0, opacity:1, duration:.55})
    .to("#aboutd-lead",  {y:0, opacity:1, duration:.5}, "-=0.2")
    .to("#aboutd-text",  {y:0, opacity:1, duration:.5}, "-=0.25")
    .to("#aboutd-badges",{y:0, opacity:1, duration:.45}, "-=0.25");

  // parallax leve no desktop
  const fig = document.getElementById('aboutd-figure');
  const mq = window.matchMedia("(min-width: 981px)");
  if (fig && mq.matches && !prefersReduced){
    fig.addEventListener('mousemove', (e)=>{
      const r = fig.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      gsap.to('.aboutd__img', {duration:.35, x:x*6, y:y*6});
    });
    fig.addEventListener('mouseleave', ()=> gsap.to('.aboutd__img', {duration:.35, x:0, y:0}));
  }
})();

// ===== GITHUB CARD =====
(function gh(){
  if (!hasGSAP) return;
  gsap.from(".gh-card", {y:18, opacity:0, duration:.6, ease:"power3.out"});
  gsap.from([".gh-top img",".eyebrow",".title",".sub",".badges",".cta .btn",".meta"], {
    y:10, opacity:0, duration:.45, ease:"power2.out", stagger:.06, delay:.15
  });
  if (prefersReduced){ gsap.globalTimeline.timeScale(0); }
})();

// ===== WEBIZE =====
(function webize(){
  if (!hasGSAP) return;
  const tl = gsap.timeline({defaults:{ease:"power3.out"}});
  tl.from(".chip",{y:-8, opacity:0, duration:.4})
    .from(".webize-epic .title",{y:8, opacity:0, duration:.5}, "-=0.1")
    .from(".webize-epic .lead",{y:8, opacity:0, duration:.45})
    .from(".bullets .row",{y:12, opacity:0, duration:.42, stagger:.05}, "-=0.1")
    .from(".webize-epic .btn",{y:10, opacity:0, duration:.4}, "-=0.05");

  gsap.from(".founder .role",{scale:.9, opacity:0, duration:.35, ease:"back.out(1.8)", delay:.2});
  gsap.from([".founder .name-wrap",".founder .tagline",".founder .mile"],{
    y:12, opacity:0, duration:.45, stagger:.06, delay:.25
  });
})();
