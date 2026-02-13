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
