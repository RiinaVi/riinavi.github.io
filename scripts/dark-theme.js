const THEMES = {
  dark: 'dark',
  light: 'light',
};

window.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  
  switch (storedTheme) {
    case THEMES.dark:
      document.body.classList.add(THEMES.dark);
      return;
    case THEMES.light:
    default:
      document.body.classList.remove(THEMES.dark);
      return;
  }
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnSwitch').addEventListener('click',() => {
    if (document.body.classList.contains(THEMES.dark)) {
      document.body.classList.remove(THEMES.dark);
      localStorage.setItem('theme', THEMES.light);
    } else {
      document.body.classList.add(THEMES.dark);
      localStorage.setItem('theme', THEMES.dark);
    }
  });
});
