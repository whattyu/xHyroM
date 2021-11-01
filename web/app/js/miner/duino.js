(async() => {
    let isBrave = await Util.isBrave();
    if(isBrave) {
        alert('NOOB BRAVE IS BAD!!!!!!!')
    }

    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('start')) startmining();
})();

function stopmining() {
    let element = document.getElementById('miningiframe')
    element.src = '';

    let button = document.getElementById('miningbutton');
    let title = document.getElementById('hero-music-text');

    button.classList.add('animate__animated', 'animate__rubberBand');
    button.classList.replace('button-red', 'button-green');
    button.onclick = startmining;
    button.textContent = 'Zapni ťaženie!';

    title.classList.add('animate__animated', 'animate__rubberBand');
    title.textContent = 'Neťažím...';

    button.addEventListener('animationend', () => {
        button.classList.remove('animate__animated', 'animate__rubberBand');
    })

    title.addEventListener('animationend', () => {
        title.classList.remove('animate__animated', 'animate__rubberBand');
    })
}

function startmining() {
    let element = document.getElementById('miningiframe')
    element.src = 'https://server.duinocoin.com/webminer.html?username=xHyroM&threads=5&rigid=WebsiteMiner';

    let button = document.getElementById('miningbutton');
    let title = document.getElementById('hero-music-text');

    button.classList.add('animate__animated', 'animate__rubberBand');
    button.classList.replace('button-green', 'button-red');
    button.onclick = stopmining;
    button.textContent = 'Horí mi počítač!';

    title.classList.add('animate__animated', 'animate__rubberBand');
    title.textContent = 'Už ťažím... Mrkni TaskManager';

    button.addEventListener('animationend', () => {
        button.classList.remove('animate__animated', 'animate__rubberBand');
    })

    title.addEventListener('animationend', () => {
        title.classList.remove('animate__animated', 'animate__rubberBand');
    })
}