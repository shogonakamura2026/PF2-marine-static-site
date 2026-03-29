/* =========================================================
   gallery-modal.js
   役割：
   - ギャラリー画像の拡大モーダルを開閉する
   - 押された画像に応じて modal 内の画像を差し替える
   ========================================================= */

const galleryTriggers = document.querySelectorAll('.gallery__trigger');
const galleryModal = document.querySelector('.gallery-modal');
const galleryModalImage = document.querySelector('.gallery-modal__image');
const galleryModalOverlay = document.querySelector('.gallery-modal__overlay');
const galleryModalClose = document.querySelector('.gallery-modal__close');

/* 必要要素が揃っている時だけ有効化
   - ギャラリー未設置ページでも安全に読み込めるようにする */
if (
  galleryTriggers.length > 0 &&
  galleryModal &&
  galleryModalImage &&
  galleryModalOverlay &&
  galleryModalClose
) {
  /* モーダルを開く
     - data 属性から受け取った画像パスと alt を反映する */
  const openGalleryModal = (imageSrc, imageAlt) => {
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');

    galleryModalImage.src = imageSrc;
    galleryModalImage.alt = imageAlt;

    /* 背景スクロールを止めるため body に状態 class を付与 */
    document.body.classList.add('is-modal-open');
  };

  /* モーダルを閉じる */
  const closeGalleryModal = () => {
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');

    /* 閉じた後に前の画像情報を残さない */
    galleryModalImage.src = '';
    galleryModalImage.alt = '';

    document.body.classList.remove('is-modal-open');
  };

  /* 各サムネイルにクリック処理を付与 */
  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const imageSrc = trigger.dataset.modalImage;
      const imageAlt = trigger.dataset.modalAlt || '';

      openGalleryModal(imageSrc, imageAlt);
    });
  });

  /* 背景クリック、×ボタンで閉じる */
  galleryModalOverlay.addEventListener('click', closeGalleryModal);
  galleryModalClose.addEventListener('click', closeGalleryModal);

  /* Escape キーでも閉じられるようにする */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && galleryModal.classList.contains('is-open')) {
      closeGalleryModal();
    }
  });
}
