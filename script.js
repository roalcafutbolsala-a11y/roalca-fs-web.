const D=window.ROALCA_DATA;let team="A",position="Todos",agendaTeam="A",agendaMode="roalca",stat="goals";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function renderPlayers(){
  const list = D.teams[team].players.filter(
    p => position === "Todos" || p.position === position
  );

  $("#rosterCount").textContent = list.length + " JUGADORES";

  $("#playersGrid").innerHTML = list.map(p => `
    <article class="player">
      ${p.photo
        ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">`
        : `<div class="avatar">${p.number}</div>`
      }
      <div class="playerInfo">
        <small>#${String(p.number).padStart(2,"0")} · ${p.position.toUpperCase()}</small>
        <h3>${p.name}</h3>
        <div class="playerStats">
  <div><span>PJ</span><strong>${p.stats?.pj ?? 0}</strong></div>
  <div><span>GOL</span><strong>${p.stats?.gol ?? 0}</strong></div>
  <div><span>AST</span><strong>${p.stats?.ast ?? 0}</strong></div>
  <div><span>TA</span><strong>${p.stats?.ta ?? 0}</strong></div>
  <div><span>TR</span><strong>${p.stats?.tr ?? 0}</strong></div>
</div>
      </div>
    </article>
  `).join("") || '<div class="empty">Todavía no hay jugadores cargados.</div>';

  // Mostrar los filtros en ambos equipos
  $("#positionFilters").style.display = "flex";
}
function shortName(name){return name.replace('WWW.ROALCAFUTBOLSALA.COM "B"','ROALCA B').replace('WWW.ROALCAFUTBOLSALA.COM','ROALCA A').replace(/\b(F\.S\.|F\.C\.|FS|FC|F\.S|F\.C)\b/gi,'').replace(/\s+/g,' ').trim()}
function initials(name){let n=shortName(name).replace(/[^A-ZÁÉÍÓÚÜÑ0-9 ]/gi,' ').trim().split(/\s+/).filter(Boolean);return (n.length>1?n[0][0]+n[1][0]:n[0]?.slice(0,2)||'??').toUpperCase()}
function isRoalca(name){return name.includes('WWW.ROALCAFUTBOLSALA.COM')}
function crestPath(name){
  const n=name.toLowerCase();

  if(isRoalca(name)) return "escudo-roalca.png";

  const escudos=[
    // ROALCA A
    ["devil","cde-devils.png"],
    ["charnals","charnals-fc.png"],
    ["independiente","club-independiente-fs.png"],
    ["eurocoslada","eurocoslada-fs.png"],
    ["bordaleta","la-bordaleta.png"],
    ["perlitas","perlitas-united.png"],
    ["rocket","rocket-fc.png"],
    ["seresant","seresant-fs.png"],
    ["gago","union-fs-coslada-gagos.png"],
    ["impala","union-fs-coslada-gagos.png"],

    // ROALCA B
    ["castilla","01 Castillo 2.0 escudo.png"],
    ["centollos","02 Centollos Furiosos escudo.png"],
    ["cubatasaray","03 Cubatasaray F.C.png"],
    ["desde cero","04 Desde Cero F.C Escudo.png"],
    ["crekis","04 Los Crekis escudo.png"],
    ["rousillon","06 Rousillon Escudo.png"],
    ["sparta","06 Saparta Calatrava escudo.png"],
    ["talleres lijai","08 Talleres Lijai escudo.png"],
    ["tois","10 Los Tois Futsal escudo.png"],
    ["pplu","11 Team Pplu escudo.png"],
    ["sordos","11 CD Sordos escudo.jpg"]
  ];

  const encontrado=escudos.find(e=>n.includes(e[0]));
  return encontrado ? "assets/escudos/"+encontrado[1] : "";
}
function crestHtml(name){const path=crestPath(name);return path?`<img src="${path}" alt="${shortName(name)}">`:initials(name)}
function renderFixtures(){const sel=$('#roundFilter'),all=agendaTeam==='A'?D.fixturesA:D.fixturesB;let rounds=all||[];let previous=sel.value;sel.innerHTML=rounds.map(f=>`<option value="${f.round}">Jornada ${f.round}</option>`).join('');sel.value=rounds.some(f=>String(f.round)===previous)?previous:(rounds.length?'1':'');let chosen=sel.value;let round=rounds.find(f=>String(f.round)===chosen);let matches=round?round.matches.filter(m=>agendaMode==='todos'||isRoalca(m.home)||isRoalca(m.away)):[];$('#fixtures').innerHTML=matches.length?`<div class="fixtureRoundHead"><b>JORNADA ${round.round}</b><span>${round.date}</span></div>`+matches.map(m=>{let home=isRoalca(m.home),away=isRoalca(m.away);let score=m.homeScore!==null&&m.homeScore!==undefined?`${m.homeScore} - ${m.awayScore}`:'VS';return `<article class="fixture"><div class="fixtureTeam ${home?'roalcaTeam':''}"><span class="teamCrest">${crestHtml(m.home)}</span><b>${shortName(m.home)}</b></div><div class="fixtureScore">${score}</div><div class="fixtureTeam away ${away?'roalcaTeam':''}"><b>${shortName(m.away)}</b><span class="teamCrest">${crestHtml(m.away)}</span></div></article>`}).join(''):'<div class="empty">No hay partidos para esta jornada.</div>'}
function renderResults(){if(team==="A")$("#results").innerHTML=`<div><small>ROALCA FS A</small><strong>ROALCA</strong></div><div class="score">8 – 1</div><div><small>JORNADA 1 · 17/10/2026</small><strong>CHARNALS FC</strong></div><div class="scorerLine"><small>GOLEADORES ROALCA</small><p>Juanjo (2) · Fran (2) · Perona · D. Jiménez · Pablo · Thito</p></div>`;else $("#results").innerHTML='<div class="empty">Todavía no hay resultados de Roalca B cargados en el archivo de datos.</div>'}
function renderStats(){let rows=stat==="goals"?D.scorersA:stat==="assists"?D.assistsA:D.cardsA;$("#statsTable").innerHTML=rows.length?`<table class="statTable"><thead><tr><th>#</th><th>JUGADOR</th><th>${stat==="goals"?"GOLES":stat==="assists"?"ASISTENCIAS":"TARJETAS"}</th></tr></thead><tbody>${rows.map((p,i)=>`<tr><td class="rank">${i+1}</td><td>${p.name} <small style="color:var(--muted)">#${p.number}</small></td><td>${stat==="goals"?p.goals:p.value??0}</td></tr>`).join("")}</tbody></table>`:'<div class="empty">Esta estadística todavía no tiene datos confirmados para publicar.</div>';$("#statsNote").textContent=team==="A"?D.statsNote:"Estadísticas de Roalca B pendientes de recibir."}
function setTeam(t){team=t;$$("[data-team]").forEach(b=>b.classList.toggle("active",b.dataset.team===t));position="Todos";$$("[data-position]").forEach(b=>b.classList.toggle("active",b.dataset.position==="Todos"));renderPlayers();renderResults();renderStats()}
$$("[data-team]").forEach(b=>b.onclick=()=>setTeam(b.dataset.team));$$("[data-position]").forEach(b=>b.onclick=()=>{position=b.dataset.position;$$("[data-position]").forEach(x=>x.classList.toggle("active",x===b));renderPlayers()});$$("[data-agenda]").forEach(b=>b.onclick=()=>{agendaTeam=b.dataset.agenda;$$("[data-agenda]").forEach(x=>x.classList.toggle("active",x===b));renderFixtures()});$$("[data-mode]").forEach(b=>b.onclick=()=>{agendaMode=b.dataset.mode;$$ ("[data-mode]").forEach(x=>x.classList.toggle("active",x===b));renderFixtures()});$$("[data-stat]").forEach(b=>b.onclick=()=>{stat=b.dataset.stat;$$("[data-stat]").forEach(x=>x.classList.toggle("active",x===b));renderStats()});$("#roundFilter").onchange=renderFixtures;$("#themeBtn").onclick=()=>document.body.classList.toggle("light");$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");$$("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));$("#year").textContent=new Date().getFullYear();renderPlayers();renderFixtures();renderResults();renderStats();
