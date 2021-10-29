const Util = require('./utils');

const getMyAge = (obj, start, end, duration) => {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        obj.innerHTML = Math.floor(progress * (end - start) + start);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }

        if (progress == 1) {
            getMyAge(obj, end, start, duration)
        }
    };

    window.requestAnimationFrame(step);
}

const getMyDiscordStatus = async () => {
    lanyard({
        userId: ['525316393768452098'],
        socket: true,
        onPresenceUpdate: (res) => {
            const status = res['525316393768452098'] ? res['525316393768452098'].discord_status : res.discord_status;
            const element = document.getElementById('hero-image-pfp');

            if (element.src.split('/').slice(-1)[0].split('.')[0] !== status) {
                element.classList.add('animate__animated', 'animate__tada');
                element.src = `app/assets/hyro/${status}.gif`;

                element.addEventListener('animationend', () => {
                    element.classList.remove('animate__animated', 'animate__tada');
                })
            }
        }
    })
}

const startCountdown = (countdownDate) => {
    let x = setInterval(function () {
        let now = new Date().getTime();

        let distance = new Date(countdownDate.date).getTime() - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const element = document.getElementById('countdown-text');

        element.innerHTML = `${countdownDate.type} in ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            element.classList.add('animate__animated', 'animate__bounceIn');
            element.innerText = `${countdownDate.type} 🎉`;
            element.addEventListener('animationend', () => {
                element.classList.remove('animate__animated', 'animate__bounceIn');
            })

            clearInterval(x);

            setTimeout(() => {
                countdown();
            }, 10000)
        }
    }, 1000);
}

const countdown = () => {
    let now = new Date();

    let dates = [
        {
            date: `Januar 1, ${now.getFullYear() + 1} 00:00:00`,
            dateDone: `Januar 1, ${now.getFullYear() + 1} 23:59:60`,
            type: 'New Year'
        },
        {
            date: `November 2, ${now.getFullYear()} 00:00:00`,
            dateDone: `November 2, ${now.getFullYear()} 23:59:60`,
            type: 'Saints'
        },
        {
            date: `November 6, ${now.getFullYear()} 00:00:00`,
            dateDone: `November 6, ${now.getFullYear()} 23:59:60`,
            type: 'Birthday'
        },
        {
            date: `December 25, ${now.getFullYear()} 00:00:00`,
            dateDone: `December 25, ${now.getFullYear()} 23:59:60`,
            type: 'Christmas'
        }
    ];

    dates = dates.filter(d => (new Date(d.date) > Date.now() || new Date(d.dateDone) > Date.now()));
    let datesMap = dates.map(d => Math.abs(new Date() - new Date(d.date).getTime()));
    let date = dates[datesMap.indexOf(Math.min(...datesMap))];

    startCountdown(date)
}

document.addEventListener('DOMContentLoaded', () => {
    getMyAge(document.getElementById('age'), 0, Util.getRandomInteger(16, 1000), 5000);
    countdown();
})

getMyDiscordStatus();