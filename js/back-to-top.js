/* =========================================================
   back-to-top.js
   役割：
   - 「ページ上部へ戻る」ボタンの表示/非表示を制御する
   - 一定量スクロールした時だけボタンを見せる
   ========================================================= */

const backToTop = document.querySelector('.back-to-top');

/* 対象ボタンがある時だけ処理を動かす
   - 別ページでこの要素が無くてもエラーにならないようにする */
if (backToTop) {
  /* 現在のスクロール量に応じて表示状態を切り替える */
  const toggleBackToTop = () => {
    /* 300px を超えたら表示
       - 数値はデザインや使い勝手に応じて後で調整しやすい */
    if (window.scrollY > 300) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };

  /* スクロールのたびに表示状態を見直す */
  window.addEventListener('scroll', toggleBackToTop);

  /* 初期表示時にも一度実行
     - リロード位置が途中でも正しい状態にする */
  toggleBackToTop();
}
