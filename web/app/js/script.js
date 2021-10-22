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