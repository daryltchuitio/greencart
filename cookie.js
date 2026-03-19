
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const okBtn = document.getElementById("cookie-ok");

  if (!banner || !okBtn) return;

  // Si déjà accepté, on ne l’affiche pas
  if (localStorage.getItem("greencart_cookie_ok") === "true") {
    banner.style.display = "none";
  }

  okBtn.addEventListener("click", () => {
    localStorage.setItem("greencart_cookie_ok", "true");
    banner.style.display = "none";
  });
});
