const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const ageGate = document.getElementById("ageGate");
const ageConfirm = document.getElementById("ageGateConfirm");

if (ageGate && ageConfirm) {
  const verified = localStorage.getItem("thanatos_age_verified") === "true";

  if (!verified) {
    ageGate.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  ageConfirm.addEventListener("click", () => {
    localStorage.setItem("thanatos_age_verified", "true");
    ageGate.classList.remove("active");
    document.body.style.overflow = "";
  });
}

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const zoomableImages = document.querySelectorAll(".zoomable");

if (lightbox && lightboxImage && lightboxClose && zoomableImages.length) {
  const openLightbox = (src, altText) => {
    lightboxImage.src = src;
    lightboxImage.alt = altText || "Fullscreen image";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };

  zoomableImages.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
