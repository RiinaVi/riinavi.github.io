window.addEventListener("load", () => {
  document.getElementById('btnSwitch').addEventListener('click',() => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  });
});
