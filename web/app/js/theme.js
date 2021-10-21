const get_cookie = (name) => {
  let name_eq = name + "="
  const cookies = document.cookie.split(";")
  for (var i = 0; i < cookies.length; i++) {
    let c = cookies[i]
    while (c.charAt(0) == " ") c = c.substring(1, c.length)
    if (c.indexOf(name_eq) == 0) return c.substring(name_eq.length, c.length)
  }
  return null
}

const darklight = () => {
  const theme = get_cookie("theme")
  let cookie_theme = "";

  const element = document.body;
  const switcher = document.getElementById('light-dark-switcher');

  if (!theme || theme == "dark") {
    cookie_theme = "theme=light; Path=/";
    element.classList.toggle("white-mode");
    switcher.classList.remove('fa-moon');
    switcher.classList.add('fa-sun');
  } else {
    cookie_theme = "theme=dark; Path=/";
    element.classList.toggle("white-mode");
    switcher.classList.remove('fa-sun');
    switcher.classList.add('fa-moon');
  }

  document.cookie = cookie_theme;
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.body;
  const switcher = document.getElementById('light-dark-switcher');

  const theme = get_cookie("theme")
  if(theme === "light") {
    element.classList.add("white-mode");
    switcher.classList.remove('fa-moon');
    switcher.classList.add('fa-sun');
  } else {
    element.classList.remove("white-mode");
    switcher.classList.remove('fa-sun');
    switcher.classList.add('fa-moon');
  }
})