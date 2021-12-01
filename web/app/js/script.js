document.onkeydown = (e) => {
  e = e || window.event;
  if (e.ctrlKey) {
      const c = e.which || e.keyCode;

      switch (c) {
        case 83:
        case 85:
        case 65:
        case 73:
        case 123:
          e.preventDefault();
          e.stopPropagation();
          break;
      }
  }
};

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('copirajt-jir').innerText = new Date().getFullYear();
})

document.getElementById('hero-music-text').addEventListener('click', () => {
  const audio = document.getElementById('hero-music');
  const element = document.getElementById('hero-music-text');

  if (element.classList.contains('alrplay')) {
      element.classList.remove('alrplay');
      audio.pause();
  } else {
      let music = ['afbhc','dl','christmas','iatd','levels','otherside','pigstep'];

      if(element.classList.contains('hero-music-otherpath')) document.getElementById('hero-music-source').src = `../app/assets/music/${music[Util.getRandomInteger(0, music.length)]}.mp3`;
      else document.getElementById('hero-music-source').src = `app/assets/music/${music[Util.getRandomInteger(0, music.length)]}.mp3`;

      audio.load();
      audio.volume = 0.2;

      element.classList.add('alrplay');
      audio.play();
  }
})