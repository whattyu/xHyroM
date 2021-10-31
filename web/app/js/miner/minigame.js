let minerSystem;
let coins;

(async() => {
    coins = Util.get_cookie("coins");

    coins = Number(coins);
    if(!coins) coins = 0.0000000000000000000;
    document.getElementById('game-coins').textContent = `Máš ${Util.toFixed(coins)} ッ`;
})();

async function miner() {
    minerSystem = setInterval(() => {
        for (let i = 0; i < 500; i++) {
            (async() => new Promise((resolve, reject) => {
                let string = Util.getRandomString(1000);

                string = crypto.subtle.digest('SHA-512', new TextEncoder('utf-8').encode(string)).then(buf => {
                    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
                });
                string = crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(string)).then(buf => {
                    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
                });
                string = crypto.subtle.digest('SHA-512', new TextEncoder('utf-8').encode(string)).then(buf => {
                    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
                });
                
                resolve('y')
            }))();
        }

        if(!document.hidden) {
            coins += 0.0000000000000000001;
            document.getElementById('game-coins').textContent = `Máš ${Util.toFixed(coins)} ッ`;
            document.cookie = `coins=${coins}; Path=/`;
        }
    }, 2000)
}

function stopmining() {
    clearInterval(minerSystem);

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
    miner();

    let button = document.getElementById('miningbutton');
    let title = document.getElementById('hero-music-text');

    button.classList.add('animate__animated', 'animate__rubberBand');
    button.classList.replace('button-green', 'button-red');
    button.onclick = stopmining;
    button.textContent = 'Horí mi počítač!';

    title.classList.add('animate__animated', 'animate__rubberBand');
    title.textContent = 'Už ťažím...';

    button.addEventListener('animationend', () => {
        button.classList.remove('animate__animated', 'animate__rubberBand');
    })

    title.addEventListener('animationend', () => {
        title.classList.remove('animate__animated', 'animate__rubberBand');
    })
}