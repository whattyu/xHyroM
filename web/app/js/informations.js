const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getMyAge = (obj, start, end, duration) => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      obj.innerHTML = Math.floor(progress * (end - start) + start);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }

      if(progress == 1) {
        getMyAge(obj, end, start, duration)
      }
    };

    window.requestAnimationFrame(step);
}

const getMyDiscordStatus = async() => {
    const res = (await (await fetch('https://api.lanyard.rest/v1/users/525316393768452098')).json()).data;
    const status = res.discord_status;

    document.getElementById('hero-image-pfp').src = `app/assets/hyro/${status}.gif`;

    setInterval(() => {
        getMyDiscordStatus();
    }, 10000);
}

const startCountdown = (countdownDate) =>{
    let x = setInterval(function() {
        let now = new Date().getTime();
      
        let distance = new Date(countdownDate.date).getTime() - now;
      
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        document.getElementById("countdown-text").classList.add("animated");
        document.getElementById("countdown-text").classList.add("bounceIn");
        document.getElementById("countdown-text").innerHTML = `${countdownDate.type} in ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            document.getElementById("countdown-text").innerText = `${countdownDate.type} 🎉`;

            clearInterval(x);

            setTimeout(() => {
                countdown();
            }, 10000)
        }
    }, 1000);
}

const countdown = () =>{
    let now = new Date();

    let dates = [
        {
            date: `Januar 1, ${now.getFullYear() + 1} 00:00:00`,
            type: 'New Year'
        },
        {
            date: `November 2, ${now.getFullYear()} 00:00:00`,
            type: 'Saints'
        },
        {
            date: `November 6, ${now.getFullYear()} 00:00:00`,
            type: 'Birthday'
        }, 
        {
            date: `December 25, ${now.getFullYear()} 00:00:00`,
            type: 'Christmas'
        }
    ];

    dates = dates.filter(d => new Date(d.date) > Date.now())
    let datesMap = dates.map(d => Math.abs(new Date() - new Date(d.date).getTime()));
    let date = dates[datesMap.indexOf(Math.min(...datesMap))];

    startCountdown(date)
}

document.addEventListener('DOMContentLoaded', () => {
    getMyAge(document.getElementById('age'), 0, getRandomInteger(16, 1000), 5000);
    countdown();
})

getMyDiscordStatus();