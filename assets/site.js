
function downloadCurrentPage(){
  const html = document.documentElement.outerHTML;
  const blob = new Blob([html], {type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  const name = (location.pathname.split('/').pop() || 'index.html').replace(/\?.*/, '') || 'index.html';
  a.download = name;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}
function escapeHTML(value){
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}
function filterTopics(inputId, wrapId){
  const input = document.getElementById(inputId);
  const wrap = document.getElementById(wrapId);
  if(!input || !wrap) return;
  const q = input.value.toLowerCase();
  wrap.querySelectorAll('details').forEach(d=>{
    d.style.display = d.innerText.toLowerCase().includes(q) ? 'block' : 'none';
  });
}
function renderGuestbook(){
  const box = document.getElementById('guestEntries');
  if(!box) return;
  const items = JSON.parse(localStorage.getItem('ctwGuestbook') || '[]');
  box.innerHTML = items.length ? items.map(item => `<div class="callout"><strong>${escapeHTML(item.name)}</strong><br>${escapeHTML(item.msg)}</div>`).join('') : '<div class="callout">No guestbook entries yet. Be the first to sign!</div>';
}
function signGuestbook(){
  const n = document.getElementById('guestName');
  const m = document.getElementById('guestMsg');
  if(!n || !m) return;
  const name = n.value.trim();
  const msg = m.value.trim();
  if(!name || !msg){ alert('Please enter both a name and a message.'); return; }
  const items = JSON.parse(localStorage.getItem('ctwGuestbook') || '[]');
  items.unshift({name, msg});
  localStorage.setItem('ctwGuestbook', JSON.stringify(items.slice(0,50)));
  n.value=''; m.value=''; renderGuestbook();
}
function filterExperiments(){
  const q = (document.getElementById('experimentSearch')?.value || '').toLowerCase();
  const difficulty = document.getElementById('difficultyFilter')?.value || 'all';
  const cards = document.querySelectorAll('.exp-card');
  let shown = 0;
  cards.forEach(card=>{
    const text = card.innerText.toLowerCase();
    const diff = card.getAttribute('data-difficulty') || '';
    const matchText = !q || text.includes(q);
    const matchDiff = difficulty === 'all' || diff === difficulty;
    const show = matchText && matchDiff;
    card.style.display = show ? '' : 'none';
    if(show) shown++;
  });
  const count = document.getElementById('experimentResultCount');
  if(count) count.textContent = `${shown} experiment${shown === 1 ? '' : 's'} showing`;
}
function resetExperimentFilters(){
  const search = document.getElementById('experimentSearch');
  const diff = document.getElementById('difficultyFilter');
  if(search) search.value = '';
  if(diff) diff.value = 'all';
  filterExperiments();
}
function randomExperiment(){
  const visible = Array.from(document.querySelectorAll('.exp-card')).filter(card => card.style.display !== 'none');
  const cards = visible.length ? visible : Array.from(document.querySelectorAll('.exp-card'));
  if(!cards.length) return;
  const pick = cards[Math.floor(Math.random() * cards.length)];
  const page = pick.querySelector('.exp-actions a[href]');
  if(page) location.href = page.getAttribute('href');
}
document.addEventListener('DOMContentLoaded', ()=>{ renderGuestbook(); updateVisitorCounter(); filterExperiments(); });

// Neocities-friendly online visitor counter.
// It uses HTTPS counter APIs and falls back to a local browser counter if external APIs are blocked.
async function updateVisitorCounter(){
  const el = document.getElementById('visitorCount');
  if(!el) return;

  const namespace = 'chris-tastic-world-neocities';
  const key = 'main-counter';

  function showCount(value){
    const n = Number(value);
    if(Number.isFinite(n)){
      el.textContent = String(Math.max(0, Math.floor(n))).padStart(6, '0');
    } else {
      el.textContent = '000000';
    }
  }
  async function fetchWithTimeout(url, ms=4000){
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), ms);
    try{
      return await fetch(url, {cache:'no-store', signal: controller.signal});
    } finally {
      clearTimeout(timer);
    }
  }

  const services = [
    { url: `https://api.counterapi.dev/v1/${namespace}/${key}/up`, read: data => data.count ?? data.value },
    { url: `https://api.countapi.xyz/hit/${namespace}/${key}`, read: data => data.value ?? data.count }
  ];

  for(const service of services){
    try{
      const res = await fetchWithTimeout(service.url);
      if(!res.ok) throw new Error('Counter service unavailable');
      const data = await res.json();
      const value = service.read(data);
      if(value !== undefined && value !== null){ showCount(value); return; }
    }catch(err){ /* Try the next service. */ }
  }

  const localKey = 'ctwLocalVisitorFallback';
  const localCount = Number(localStorage.getItem(localKey) || '0') + 1;
  localStorage.setItem(localKey, String(localCount));
  showCount(localCount);
}
