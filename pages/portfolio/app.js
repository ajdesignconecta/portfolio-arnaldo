// Toggle claro/escuro
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', ()=>{
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });
})();

const projects = [
  {id:'fisioterapia',title:'Fisioterapia',category:'Saúde',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Fisioterapia.png',mobile:'https://webize.com.br/wp-content/uploads/2025/04/fisio.png'},
  {id:'nutricionista',title:'Nutricionista',category:'Saúde',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Vanessa-Nutri.png',mobile:'https://webize.com.br/wp-content/uploads/2025/04/Nutri.png'},
  {id:'escola',title:'Escola de Cursos',category:'Educação',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Grupo-apoio-condominio-1.jpg',mobile:'https://webize.com.br/wp-content/uploads/2025/04/Escola.png'},
  {id:'informatica',title:'Informática',category:'E-commerce',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Design-sem-nome-89.png',mobile:'https://webize.com.br/wp-content/uploads/2025/08/loja-virtual.png'},
  {id:'utilidades',title:'Utilidades',category:'E-commerce',desktop:'https://webize.com.br/wp-content/uploads/2025/08/screencapture-utileva-br-2025-08-26-10_02_05-scaled.png',mobile:'https://webize.com.br/wp-content/uploads/2025/08/Copia-de-Grupo-apoio-1.png'},
  {id:'condominio',title:'Segurança e Limpeza',category:'Serviços',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Grupo-apoio-condominio.jpg',mobile:'https://webize.com.br/wp-content/uploads/2025/04/Grupo-apoio.png'},
  {id:'marketing',title:'Marketing Digital',category:'Serviços',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Vocto-Digital.jpg',mobile:'https://webize.com.br/wp-content/uploads/2025/04/Design-sem-nome-3.png'},
  {id:'advogado',title:'Advogado',category:'Advogado',desktop:'https://webize.com.br/wp-content/uploads/2025/08/screencapture-rtorresadv-br-2025-08-26-10_00_59-scaled.png',mobile:'https://webize.com.br/wp-content/uploads/2025/08/Copia-de-Grupo-apoio-2.png'},
  {id:'contador',title:'Contador',category:'Contador',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Design-sem-nome-88.png',mobile:'https://webize.com.br/wp-content/uploads/2025/08/contabil-sistem.png'},
  {id:'buffet',title:'Buffet',category:'Restaurante',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Sabor-santo-Buffet.png',mobile:'https://webize.com.br/wp-content/uploads/2025/04/Grupo-apoio-1.png'},
  {id:'gamer',title:'Comunidade/Gamer',category:'Comunidade/Gamer',desktop:'https://webize.com.br/wp-content/uploads/2025/08/screencapture-lastwarpro-inicio-2025-08-26-10_02_41-scaled.png',mobile:'https://webize.com.br/wp-content/uploads/2025/08/Copia-de-Grupo-apoio.png'},
  {id:'vereador',title:'Vereador',category:'Outros',desktop:'https://webize.com.br/wp-content/uploads/2025/04/Pastora-Fran.png',mobile:'https://webize.com.br/wp-content/uploads/2025/08/loja-virtual-1.png'}
];
const categories = ['Todos','Saúde','Educação','E-commerce','Serviços','Advogado','Contador','Restaurante','Comunidade/Gamer','Outros'];
let currentFilter = 'Todos';

document.addEventListener('DOMContentLoaded', () => {
  createFilterButtons();
  renderProjects();
});

function createFilterButtons(){
  const container=document.getElementById('filterButtons');
  container.innerHTML='';
  categories.forEach(cat=>{
    const btn=document.createElement('button');
    btn.className=`filter-btn ${cat===currentFilter?'active':''}`;
    btn.textContent=cat;
    btn.onclick=()=>{currentFilter=cat;createFilterButtons();renderProjects();};
    container.appendChild(btn);
  });
}

function renderProjects(){
  const grid=document.getElementById('projectsGrid');
  grid.innerHTML='';
  let filtered=projects;
  if(currentFilter!=='Todos'){filtered=projects.filter(p=>p.category===currentFilter);}
  filtered.forEach(p=>{
    const card=document.createElement('div');
    card.className='project-card';
    card.innerHTML=`
      <div class="project-image"><img src="${p.desktop}" alt="${p.title}"></div>
      <div class="project-content">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-category">${p.category}</p>
        <div class="project-actions">
          <button class="btn-primary" onclick="openModal('${p.id}','desktop')">Desktop</button>
          <button class="btn-secondary" onclick="openModal('${p.id}','mobile')">Mobile</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

function openModal(id,variant){
  const p=projects.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('modalTitle').textContent=p.title+' • '+(variant==='mobile'?'Mobile':'Desktop');
  document.getElementById('modalImage').src=variant==='mobile'?p.mobile:p.desktop;
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow='';
}
function scrollToProjects(){document.getElementById('projects').scrollIntoView({behavior:'smooth'});}
