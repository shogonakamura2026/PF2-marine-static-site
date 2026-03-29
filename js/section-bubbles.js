/* =========================================================
   section-bubbles.js
   役割：
   - 対象セクションに泡アニメーションを発生させる
   - 画面に入った時だけ 1 回再生し、離れたら再度再生可能にする
   ========================================================= */

const bubbleSections = document.querySelectorAll('.js-bubble-section');

/* 対象セクションがある時だけ処理を実行 */
if (bubbleSections.length > 0) {
  /* 泡を入れるレイヤーを section 内に用意する
     - すでに存在する時は使い回す */
  const createBubbleLayer = (section) => {
    let layer = section.querySelector('.section-bubbles');

    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'section-bubbles';
      section.appendChild(layer);
    }

    return layer;
  };

  /* 1セクション分の泡を生成する */
  const spawnBubbles = (section) => {
    const layer = createBubbleLayer(section);
    const bubbleCount = 9;

    for (let i = 0; i < bubbleCount; i += 1) {
      const bubble = document.createElement('span');
      bubble.className = 'section-bubble';

      /* 少しランダムにして毎回同じ見え方になりすぎないようにする */
      const size = 14 + Math.random() * 30;
      const left = 6 + Math.random() * 88;
      const top = 52 + Math.random() * 28;
      const delay = Math.random() * 0.65;
      const duration = 2.4 + Math.random() * 1.1;

      /* 見た目差分は JS で個別に渡し、アニメ本体は CSS に任せる */
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.top = `${top}%`;
      bubble.style.animationDelay = `${delay}s`;
      bubble.style.animationDuration = `${duration}s`;

      layer.appendChild(bubble);

      /* アニメ終了後は不要になるので DOM から削除する */
      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    }
  };

  /* セクションが画面に入ったかどうかを監視する */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;

        if (entry.isIntersecting) {
          /* 入った時、まだ未再生なら泡を出す */
          if (section.dataset.bubblePlayed !== 'true') {
            spawnBubbles(section);
            section.dataset.bubblePlayed = 'true';
          }
        } else {
          /* 画面外へ出たら再生フラグを戻す
             - 再度入り直した時にもう一度出せるようにする */
          section.dataset.bubblePlayed = 'false';
        }
      });
    },
    {
      threshold: 0.28,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  /* 初期状態を入れてから各 section を監視対象にする */
  bubbleSections.forEach((section) => {
    section.dataset.bubblePlayed = 'false';
    observer.observe(section);
  });
}
