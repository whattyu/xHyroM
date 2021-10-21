const getMyAge = () => {
    let date = new Date("2005-11-06").getTime()
    let today = new Date().getTime()
    let diff = (today - date);
    return (diff / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('age').innerText = getMyAge();
})