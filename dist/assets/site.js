const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
function closeMenu(){toggle?.setAttribute('aria-expanded','false');menu?.classList.remove('open');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
const form=document.querySelector('#quote');
if(form){
 const labels={'remocao-de-caminhoes':'Remoção de caminhão','transporte-de-maquinas':'Transporte de máquinas e tratores','carreta-prancha':'Carreta prancha e cargas especiais'};
 const contexts={'remocao-de-caminhoes':'Para remoção: descreva a situação e o local do caminhão. Se precisa falar agora, ligue para a equipe.','transporte-de-maquinas':'Para máquinas: informe o modelo, as medidas e o peso, se souber. Fotos podem ser enviadas depois, pelo WhatsApp.','carreta-prancha':'Para cargas especiais: medidas, peso e condições de embarque ajudam a avaliar o transporte.'};
 const preset=new URLSearchParams(location.search).get('servico');
 if(labels[preset])form.querySelector(`input[value="${preset}"]`).checked=true;
 const routeParams=new URLSearchParams(location.search);
 for(const name of ['origem','destino']){const value=routeParams.get(name);if(value)form.elements[name].value=value.slice(0,160);}
 const updateContext=()=>{document.querySelector('#form-context').textContent=contexts[new FormData(form).get('servico')];};
 updateContext();
 const review=document.querySelector('#review');
 form.addEventListener('input',()=>{review.hidden=true;});
 form.addEventListener('change',()=>{updateContext();review.hidden=true;});
 form.addEventListener('submit',event=>{
  event.preventDefault();const data=new FormData(form);
  const date=data.get('data');const formatted=date?date.split('-').reverse().join('/'):'A combinar';
  const message=`Olá! Meu nome é ${String(data.get('nome')).trim()}. Gostaria de solicitar um orçamento.\n\nServiço: ${labels[data.get('servico')]}\nOrigem: ${String(data.get('origem')).trim()}\nDestino: ${String(data.get('destino')).trim()||'A definir'}\nVeículo / carga: ${String(data.get('carga')).trim()||'A informar na conversa'}\nData desejada: ${formatted}`;
  document.querySelector('#review-text').textContent=message;
  document.querySelector('#send-quote').href='https://wa.me/5516981894297?text='+encodeURIComponent(message);
  review.hidden=false;document.querySelector('#review-title').focus();review.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
 });
 document.querySelector('#edit-quote').addEventListener('click',()=>{review.hidden=true;form.querySelector('input[name=nome]').focus();});
}

// Schematic route animation. It does not represent live tracking or travel time.
document.querySelectorAll('.route-experience').forEach(experience=>{
 const origin='Araraquara / SP';
 let selectedCity='sp';
 const simulator=experience.querySelector('.route-simulator');
 const cities={ribeirao:'Ribeirão Preto / SP',brasilia:'Brasília / DF',bh:'Belo Horizonte / MG',rio:'Rio de Janeiro / RJ',sp:'São Paulo / SP',curitiba:'Curitiba / PR'};
 const play=simulator.querySelector('.sim-play');
 const playLabel=simulator.querySelector('.sim-play-label');
 const state=simulator.querySelector('.sim-state');
 const meter=simulator.querySelector('.simulation-meter');
 const progressPath=simulator.querySelector('.network-progress');
 const vehicle=simulator.querySelector('.sim-vehicle');
 let progress=0,running=false,frame=0,lastTime=0,path,length;
 const render=()=>{
  const percent=Math.round(progress*100);
  simulator.querySelector('.simulation-percent').textContent=percent+'%';
  meter.setAttribute('aria-valuenow',String(percent));meter.firstElementChild.style.width=percent+'%';
  progressPath.style.strokeDasharray=String(length);progressPath.style.strokeDashoffset=String(length*(1-progress));
  const point=path.getPointAtLength(length*progress);vehicle.setAttribute('transform',`translate(${point.x} ${point.y})`);
 };
 const pause=()=>{running=false;cancelAnimationFrame(frame);lastTime=0;play.firstElementChild.textContent='▶';playLabel.textContent=progress>0&&progress<1?'Continuar simulação':'Simular trajeto';};
 const reset=()=>{pause();progress=0;render();playLabel.textContent='Simular trajeto';state.textContent='Pronto para simular';};
 const update=()=>{
  const key=selectedCity;
  simulator.querySelectorAll('.network-city[data-city]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.city===key)));
  simulator.querySelectorAll('.network-paths path').forEach(item=>item.classList.toggle('selected',item.dataset.city===key));
  path=simulator.querySelector(`.network-paths path[data-city="${key}"]`);length=path.getTotalLength();progressPath.setAttribute('d',path.getAttribute('d'));
  simulator.querySelector('.network-origin strong').textContent=origin;
  const arrow=document.createElement('span');arrow.textContent='→';
  simulator.querySelector('.simulation-route-label').replaceChildren(document.createTextNode(origin),arrow,document.createTextNode(cities[selectedCity]));
  reset();
 };
 const animate=time=>{
  if(!running)return;
  if(lastTime)progress=Math.min(1,progress+(time-lastTime)/8000);
  lastTime=time;render();
  if(progress>=1){pause();playLabel.textContent='Simular novamente';state.textContent='Simulação concluída';return;}
  frame=requestAnimationFrame(animate);
 };
 play.addEventListener('click',()=>{
  if(running){pause();state.textContent='Simulação pausada';return;}
  if(progress>=1)progress=0;
  running=true;lastTime=0;play.firstElementChild.textContent='Ⅱ';playLabel.textContent='Pausar simulação';state.textContent='Simulação em andamento';frame=requestAnimationFrame(animate);
 });
 simulator.querySelector('.sim-reset').addEventListener('click',reset);
 simulator.querySelectorAll('button[data-city]').forEach(button=>button.addEventListener('click',()=>{
  selectedCity=button.dataset.city;update();
  state.textContent='Destino selecionado: '+cities[button.dataset.city];
 }));
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&running){pause();state.textContent='Simulação pausada';}});
 update();
});
