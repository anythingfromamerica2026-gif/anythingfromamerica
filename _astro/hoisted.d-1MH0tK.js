const e=document.getElementById("nav-toggle"),n=document.getElementById("nav-links");e?.addEventListener("click",()=>{const t=n?.classList.toggle("open");e.setAttribute("aria-expanded",String(t))});
