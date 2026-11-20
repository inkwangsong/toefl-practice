// app shell cache. GitHub Pages' CDN keeps index.html for ~10 minutes, so a tiny ver.txt (never cached) tells us when a new build is out;
// then index.html is fetched with that version in the query string, which the CDN has never seen, so it comes fresh.
const C='toefl-shell-beb523c83f5a',SHELL=['./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png','./pretendard.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
const isIndex=u=>u.pathname.endsWith('/')||u.pathname.endsWith('/index.html');
async function freshIndex(){const c=await caches.open(C);let ver='';try{const r=await fetch('./ver.txt?t='+Date.now(),{cache:'no-store'});if(r.ok)ver=(await r.text()).trim()}catch(e){}
  const have=await c.match('./index.html'),hv=have&&have.headers.get('x-ver');
  if(ver&&have&&hv===ver)return have;
  if(ver){try{const r=await fetch('./index.html?v='+ver,{cache:'no-store'});if(r.ok){const b=await r.blob();const res=new Response(b,{headers:{'content-type':'text/html; charset=utf-8','x-ver':ver}});await c.put('./index.html',res.clone());return res}}catch(e){}}
  if(have)return have;return fetch('./index.html')}
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(isIndex(u)){e.respondWith(freshIndex());return}
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
