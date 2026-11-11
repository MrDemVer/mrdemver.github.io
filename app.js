(function () {
  var root = document.documentElement;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var lang = get("lang") || ((navigator.language || "ru").toLowerCase().indexOf("ru") === 0 ? "ru" : "en");
  root.setAttribute("data-lang", lang);
  root.setAttribute("lang", lang);
  var theme = get("theme");
  if (theme) root.setAttribute("data-theme", theme);

  document.addEventListener("DOMContentLoaded", function () {
    var lb = document.getElementById("lang-btn");
    var tb = document.getElementById("theme-btn");
    function paint() {
      if (lb) lb.textContent = root.getAttribute("data-lang") === "ru" ? "EN" : "RU";
    }
    paint();
    if (lb) lb.addEventListener("click", function () {
      var l = root.getAttribute("data-lang") === "ru" ? "en" : "ru";
      root.setAttribute("data-lang", l); root.setAttribute("lang", l); set("lang", l); paint();
    });
    if (tb) tb.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme");
      if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var t = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", t); set("theme", t);
    });
  });
})();
