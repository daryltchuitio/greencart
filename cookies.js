document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const okBtn = document.getElementById("cookie-ok");

  if (!banner || !okBtn) return;

  const COOKIE_KEY = "greencart_cookie_consent";
  const EXPIRATION_DAYS = 1;
  const POLICY_VERSION = "v1";

  function hasValidConsent() {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) return false;

    try {
      const consent = JSON.parse(saved);
      if (!consent.accepted || !consent.date) return false;
      if (consent.version !== POLICY_VERSION) return false;

      const acceptedTime = new Date(consent.date).getTime();
      const now = Date.now();
      const maxAge = EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

      return now - acceptedTime < maxAge;
    } catch {
      return false;
    }
  }

  banner.style.display = hasValidConsent() ? "none" : "block";

  okBtn.addEventListener("click", () => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({
        accepted: true,
        date: new Date().toISOString(),
        version: POLICY_VERSION
      })
    );

    banner.style.display = "none";
  });
});