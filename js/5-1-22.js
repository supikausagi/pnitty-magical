$(".openbtn").click(function () {
  $(this).toggleClass("active");
  $("#g-nav").toggleClass("panelactive");
  $(".circle-bg").toggleClass("circleactive");
});

$("#g-nav a").click(function () {
  $(".openbtn").removeClass("active");
  $("#g-nav").removeClass("panelactive");
  $(".circle-bg").removeClass("circleactive");
});

// ロード画面
$(window).on("load", function () {
  $(".splash").delay(1500).fadeOut("slow");
  $(".usagi").delay(1200).fadeOut("slow");
});

// 羽アニメーション
if (document.getElementById("particles-js")) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 20, density: { enable: true, value_area: 1000 } },
      color: { value: "#fff" },
      shape: {
        type: "image",
        stroke: { width: 0 },
        image: { src: "js/wing.png", width: 500, height: 500 }
      },
      opacity: { value: 0.06, random: true },
      size: { value: 30, random: true },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 7,
        direction: "bottom-right",
        out_mode: "out"
      }
    },
    interactivity: { events: { resize: true } },
    retina_detect: false
  });
}

// ========================
// モーダル切り替え
// ========================
const icons = document.querySelectorAll(".character-icon");
const modal = document.getElementById("character-modal");
const modalName = document.getElementById("modal-name");
const modalCatch = document.getElementById("modal-catch");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const closeButton = document.querySelector(".modal-close");
const nextButton = document.querySelector(".modal-next");
const prevButton = document.querySelector(".modal-prev");
const modalContent = document.querySelector(".character-modal-inner");

let currentIndex = 0;
let touchStartX = 0;

function showCharacter(index) {
  const icon = icons[index];
  modalName.textContent = icon.dataset.name;
  modalCatch.textContent = icon.dataset.catch;
  modalDescription.innerHTML = icon.dataset.description;
  modalImage.src = icon.dataset.image;
}

function changeCharacter(index, direction) {
  modalContent.classList.remove("slide-in-left", "slide-in-right");

  if (direction === "next") {
    modalContent.classList.add("slide-out-left");
  } else {
    modalContent.classList.add("slide-out-right");
  }

  setTimeout(() => {
    showCharacter(index);
    modalContent.classList.remove("slide-out-left", "slide-out-right");

    if (direction === "next") {
      modalContent.classList.add("slide-in-right");
    } else {
      modalContent.classList.add("slide-in-left");
    }
  }, 200);
}

function closeModal() {
  modal.classList.remove("active");
}

function showNextCharacter() {
  currentIndex = (currentIndex + 1) % icons.length;
  changeCharacter(currentIndex, "next");
}

function showPrevCharacter() {
  currentIndex = (currentIndex - 1 + icons.length) % icons.length;
  changeCharacter(currentIndex, "prev");
}

if (icons.length > 0 && modal && modalContent) {
  icons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      currentIndex = index;
      showCharacter(currentIndex);
      modal.classList.add("active");
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (nextButton) {
    nextButton.addEventListener("click", showNextCharacter);
  }

  if (prevButton) {
    prevButton.addEventListener("click", showPrevCharacter);
  }

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) < 50) return;

    if (diff < 0) {
      showNextCharacter();
    } else {
      showPrevCharacter();
    }
  });
}

// ========================
// ページの推移
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const transition = document.querySelector(".page-transition");

  // ページ読み込み時：ピンクからフェードイン
  if (transition) {
    transition.classList.add("start");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transition.classList.remove("start");
      });
    });
  }

  // ページ遷移時：ピンクへフェードアウト
  document.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // 無視するリンク
      if (
        !href ||
        href.startsWith("#") ||                  // 同ページ内アンカー
        href.startsWith("javascript:") ||
        link.target === "_blank" ||             // 新規タブ
        link.hasAttribute("download")
      ) {
        return;
      }

      // 外部リンクはそのまま開く
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      e.preventDefault();

      if (transition) {
        transition.classList.add("active");
        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      } else {
        window.location.href = link.href;
      }
    });
  });
});
