class Util {
    static getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static dec2hex (dec) {
        return dec.toString(16).padStart(2, "0");
    }

    static getRandomString = (length) => {
        let array = new Uint8Array((length || 40) / 2);
        window.crypto.getRandomValues(array);
        return Array.from(array, Util.dec2hex).join('');
    }

    static isBrave = async() => {
        return navigator.brave && await navigator.brave.isBrave() || false;
    }

    static get_cookie = (name) => {
        let name_eq = name + "="
        const cookies = document.cookie.split(";")
        for (var i = 0; i < cookies.length; i++) {
          let c = cookies[i]
          while (c.charAt(0) == " ") c = c.substring(1, c.length)
          if (c.indexOf(name_eq) == 0) return c.substring(name_eq.length, c.length)
        }
        return null
    }

    static toFixed(x) {
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
    }
}