const THEMES = {
  dark: 'dark',
  light: 'light',
};

const switchTheme = (newTheme) => {
  switch (newTheme) {
    case THEMES.dark:
      document.body.classList.add(THEMES.dark);
      return;
    case THEMES.light:
    default:
      document.body.classList.remove(THEMES.dark);
      return;
  }
};

const handleSystemThemeChange = () => {
  const isDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const systemTheme = isDark ? THEMES.dark : THEMES.light;
  
  switchTheme(systemTheme);
  localStorage.setItem('theme', systemTheme);
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);

window.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('theme');
  
  if (storedTheme) {
    switchTheme(storedTheme);
  } else {
    handleSystemThemeChange();
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
