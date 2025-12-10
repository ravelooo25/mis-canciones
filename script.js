document.addEventListener('DOMContentLoaded', function(){

  const canvasMusical = document.getElementById('canvas-notas');
  const ctxN = canvasMusical.getContext('2d');

  const pantallaInicio = document.getElementById('pantalla-inicio');
  const pantallaWrapped = document.getElementById('pantalla-wrapped');
  const pantallaCanciones = document.getElementById('pantalla-canciones');
  const pantallaReproductor = document.getElementById('pantalla-reproductor');
  const pantallaFinal = document.getElementById('pantalla-final');

  const btnIniciar = document.getElementById('btn-iniciar');
  const btnWrappedSiguiente = document.getElementById('btn-wrapped-siguiente');
  const btnFinal = document.getElementById('btn-final');
  const btnRepetir = document.getElementById('btn-repetir');
  const btnVolver = document.getElementById('btn-volver');

  const grid = document.getElementById('grid-canciones');
  const videoPlayer = document.getElementById('video-player');
  const playerTitle = document.getElementById('player-title');
  const playerReason = document.getElementById('player-reason');

  const songs = [
    { title: "My Kind Of Woman", artist: "Mac DeMarco", img: "imagenes/MyKindOfWoman.jpg", video: "mp4/MyKindOfWoman.mp4", reason: "Me recuerda a vos porque sos mi tipo ideal" },
    { title: "Boy With Luv", artist: "BTS", img: "imagenes/BoyWithLuv.jpg", video: "mp4/BoyWithLuv.mp4", reason: "Porque estoy completamente enamorado de vos" },
    { title: "A La Vez", artist: "Conociendo Rusia", img: "imagenes/ALaVez.jpg", video: "mp4/ALaVez.mp4", reason: "Porque -soy particularmente solitario, vos pintás con color el diario-" },
    { title: "Adore You", artist: "Harry Styles", img: "imagenes/AdoreYou.jpg", video: "mp4/AdoreYou.mp4", reason: "Porque te adoro con todo mi corazón" },
    { title: "Those Eyes", artist: "New West", img: "imagenes/ThoseEyes.jpg", video: "mp4/ThoseEyes.mp4", reason: "Porque tus ojos me tienen completamente hipnotizado" },
    { title: "Cicuta Remix", artist: "Peces Raros y Trueno", img: "imagenes/CicutaRemix.jpg", video: "mp4/CicutaRemix.mp4", reason: "Porque vivo necesitandote" },
    { title: "I Wanna Be Yours", artist: "Arctic Monkeys", img: "imagenes/IWannaBeYours.jpg", video: "mp4/IWannaBeYours.mp4", reason: "Porque soy tuyo" },
    { title: "After Last Night", artist: "Bruno Mars", img: "imagenes/AfterLastNight.jpg", video: "mp4/AfterLastNight.mp4", reason: "Porque después de esa noche me dejaste enamorado" },
    { title: "Every Breath You Take", artist: "The Police", img:"imagenes/EveryBreathYouTake.jpg",video:"mp4/EveryBreathYouTake.mp4",reason:"Porque ahí voy a estar en cada momento"},
    { title: "How Deep Is Your Love", artist:"Bee Gees", img:"imagenes/HowDeepIsYourLove.jpg",video:"mp4/HowDeepIsYourLove.mp4",reason:"Porque conoces la puerta a mi alma"},
    { title: "Will You Still Love Me?", artist:"Chicago",img:"imagenes/WillYouStillLoveMe.jpg",video:"mp4/WillYouStillLoveMe.mp4",reason:"Porque no puedo seguir sin vos"},
    { title: "Nothing's Gonna Change My Love For You",artist:"Glenn Medeiros", img:"imagenes/NothingsGonnaChangeMyLoveForYou.jpg",video:"mp4/NothingsGonnaChangeMyLoveForYou.mp4",reason:"Nada va a cambiar mi amor por vos"},
    { title: "I Want To Know What Love Is", artist:"Foreigner", img:"imagenes/IWantToKnowWhatLoveIs.jpg",video:"mp4/IWantToKnowWhatLoveIs.mp4",reason:"Porque me encanta que me muestres tu amor"},
    { title: "Can't Take My Eyes off You", artist:"Frankie Valli", img:"imagenes/CantTakeMyEyesoffYou.jpg",video:"mp4/CantTakeMyEyesoffYou.mp4",reason:"Porque no puedo dejar de mirarte"},
    { title: "Lovely Day", artist:"Bill Withers", img:"imagenes/LovelyDay.jpg",video:"mp4/LovelyDay.mp4",reason:"Porque transformas mis días en buenos"}
    ];

  function resizeCanvas(){
    canvasMusical.width = window.innerWidth;
    canvasMusical.height = window.innerHeight;
    if(notas.length){
      notas.forEach(n=>{
        n.x = Math.random()*canvasMusical.width;
        n.y = Math.random()*canvasMusical.height;
      });
    }
  }

  window.addEventListener('load', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);

  function renderGrid(){
    grid.innerHTML='';
    songs.forEach((s,i)=>{
      const card=document.createElement('div');
      card.className='card';
      card.dataset.index=i;
      card.innerHTML=`
        <div class="cover"><img src="${s.img}" alt="${s.title}"></div>
        <div class="meta"><h4>${s.title}</h4><p>${s.artist}</p></div>
      `;
      card.addEventListener('click',()=>openPlayer(i));
      grid.appendChild(card);
    });
  }

  renderGrid();

  let pantallaActivaParaNotas = null;

  function showScreen(screen){
    [pantallaInicio,pantallaWrapped,pantallaCanciones,pantallaReproductor,pantallaFinal].forEach(p=>p&&p.classList.remove('pantalla-activa'));
    if(screen) screen.classList.add('pantalla-activa');

    if(screen===pantallaWrapped || screen===pantallaCanciones){
      canvasMusical.style.display='block';
      pantallaActivaParaNotas = screen;
    } else {
      canvasMusical.style.display='none';
      pantallaActivaParaNotas = null;
    }

    if(screen===pantallaCanciones){
      const cards = grid.querySelectorAll('.card');
      cards.forEach((card,i)=>{
        card.classList.remove('show');
        setTimeout(()=>card.classList.add('show'), Math.min(i*250,1000));
      });
    }
  }

  btnIniciar && btnIniciar.addEventListener('click',()=>showScreen(pantallaWrapped));
  btnWrappedSiguiente && btnWrappedSiguiente.addEventListener('click',()=>showScreen(pantallaCanciones));
  btnFinal && btnFinal.addEventListener('click',()=>showScreen(pantallaFinal));
  btnRepetir && btnRepetir.addEventListener('click',()=>showScreen(pantallaCanciones));

  function openPlayer(index){
  const s = songs[index];
  if(!s) return;
  videoPlayer.src = s.video;            // se asigna el video
  videoPlayer.poster = s.img;            // poster de la tarjeta
  videoPlayer.currentTime = 0;
  videoPlayer.play().catch(()=>{});
  playerTitle.textContent = s.title;
  playerReason.textContent = s.reason;
  showScreen(pantallaReproductor);
}

  btnVolver && btnVolver.addEventListener('click', ()=>{
    try{ videoPlayer.pause(); }catch(e){}
    videoPlayer.src='';
    showScreen(pantallaCanciones);
  });

  window.addEventListener('keydown',(e)=>{
    if(e.key==='Escape' && pantallaReproductor.classList.contains('pantalla-activa')){
      btnVolver && btnVolver.click();
    }
  });

  // ----------------------------
  // Partículas: ♫
  // ----------------------------
  const notas = [];
  const sizeNota = 24;
  const fuente = "20px Arial";
  function initNotas(){
    notas.length = 0;
    for(let i=0;i<40;i++){
      notas.push({
        x: Math.random()*canvasMusical.width,
        y: Math.random()*canvasMusical.height,
        speed: Math.random()*0.5+0.2
      });
    }
  }

  initNotas();

  function animarNotas(){
    ctxN.clearRect(0,0,canvasMusical.width,canvasMusical.height);

    if(pantallaActivaParaNotas){
      ctxN.fillStyle="white";
      ctxN.font=fuente;
      notas.forEach(n=>{
        n.y -= n.speed;
        if(n.y < -sizeNota) n.y = canvasMusical.height;
        ctxN.fillText("♫", n.x, n.y);
      });
    }

    requestAnimationFrame(animarNotas);
  }

  animarNotas();

});
