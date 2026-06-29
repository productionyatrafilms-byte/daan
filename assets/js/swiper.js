const prevBtn = document.querySelector(".custom-prev");
const nextBtn = document.querySelector(".custom-next");

const textSwiper = new Swiper(".text-swiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  speed: 1200,
  allowTouchMove: false,
});

const imageSwiper = new Swiper(".image-swiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  speed: 1200,
  allowTouchMove: false,
  navigation: {
    prevEl: ".custom-prev",
    nextEl: ".custom-next",
  },
  controller: {
    control: textSwiper,
  },
});

textSwiper.controller.control = imageSwiper;

function updateNavButtons(swiper) {
  if (swiper.isBeginning) {
    prevBtn?.classList.add("hidden");
  } else {
    prevBtn?.classList.remove("hidden");
  }

  if (swiper.isEnd) {
    nextBtn?.classList.add("hidden");
  } else {
    nextBtn?.classList.remove("hidden");
  }
}

updateNavButtons(imageSwiper);

imageSwiper.on("slideChange", function () {
  updateNavButtons(imageSwiper);
});