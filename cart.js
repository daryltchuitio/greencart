const CART_KEY = "greencart_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
}

function updateCartCount() {
  const count = getCartCount();

  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;

    if (count <= 0) {
      el.style.display = "none";
    } else {
      el.style.display = "inline-flex";
    }
  });
}

/**
 * Déclenche un événement personnalisé quand le panier change
 */
function notifyCartChanged() {
  window.dispatchEvent(new Event("cartUpdated"));
}

/**
 * Intercepte les modifications de localStorage pour détecter
 * les changements du panier dans le même onglet
 */
(function () {
  const originalSetItem = localStorage.setItem;
  const originalRemoveItem = localStorage.removeItem;
  const originalClear = localStorage.clear;

  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);

    if (key === CART_KEY) {
      notifyCartChanged();
    }
  };

  localStorage.removeItem = function (key) {
    originalRemoveItem.apply(this, arguments);

    if (key === CART_KEY) {
      notifyCartChanged();
    }
  };

  localStorage.clear = function () {
    originalClear.apply(this, arguments);
    notifyCartChanged();
  };
})();

// Mise à jour au chargement
document.addEventListener("DOMContentLoaded", updateCartCount);

// Mise à jour si un autre onglet modifie le panier
window.addEventListener("storage", (event) => {
  if (!event.key || event.key === CART_KEY) {
    updateCartCount();
  }
});

// Mise à jour immédiate dans le même onglet
window.addEventListener("cartUpdated", updateCartCount);