const getMyAge = () => {
    let date = new Date("2005-11-06").getTime()
    let today = new Date().getTime()
    let diff = (today - date);
    return (diff / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);
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
    document.getElementById('age').innerText = getMyAge();
    countdown();
})