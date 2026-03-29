/* =========================================================
   header.js
   役割：
   - ヘッダーのハンバーガーメニュー開閉を管理する
   - 開閉状態に応じて class / aria / 文言 を切り替える
   ========================================================= */

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.site-header__toggle');
const toggleText = document.querySelector('.site-header__toggle-text');
const overlay = document.querySelector('.site-header__overlay');
const menuLinks = document.querySelectorAll('.site-header__nav a');

/* 必要な要素が揃っている時だけメニュー制御を有効にする
   - 要素不足のページで JS エラーを出さないため */
if (header && toggle && toggleText && overlay) {
  /* メニューを開く */
  const openMenu = () => {
    header.classList.add('is-menu-open');
    document.body.classList.add('is-menu-open');

    /* 支援技術向けに開閉状態も更新する */
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'メニューを閉じる');

    /* ボタン下の表示文言も開状態に合わせる */
    toggleText.textContent = 'とじる';
  };

  /* メニューを閉じる */
  const closeMenu = () => {
    header.classList.remove('is-menu-open');
    document.body.classList.remove('is-menu-open');

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');

    toggleText.textContent = 'Menu';
  };

  /* 現在の状態を見て開閉を切り替える */
  const toggleMenu = () => {
    const isOpen = header.classList.contains('is-menu-open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  /* ハンバーガーボタン押下で開閉 */
  toggle.addEventListener('click', toggleMenu);

  /* 背景 overlay を押した時は閉じる */
  overlay.addEventListener('click', closeMenu);

  /* メニュー内リンクを押した後も閉じる
     - 1ページ内リンクで移動した後、SPメニューが残らないようにする */
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}
