// =========================================================
// smooth-scroll.js
// - ページ内アンカーをなめらかにスクロール
// - sticky header 分だけ少し上に余白を取る
// - URL末尾に #id を残さない
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector(".site-header");

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop =
        window.scrollY +
        targetElement.getBoundingClientRect().top -
        headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      history.replaceState(null, "", window.location.pathname);
    });
  });
});