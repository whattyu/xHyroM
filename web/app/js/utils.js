class Util {
    static getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static isBrave = async() => {
        return navigator.brave && await navigator.brave.isBrave() || false;
    }
}