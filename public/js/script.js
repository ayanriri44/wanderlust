// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// document.querySelectorAll(".nav-tabs-row .filter").forEach((tab) => {
//   tab.addEventListener("click", () => {
//     document
//       .querySelectorAll(".nav-tabs-row .filter")
//       .forEach((t) => t.classList.remove("active"));
//     tab.classList.add("active");
//   });
// });

const tabs = document.querySelectorAll(".nav-tabs-row .filter");

function setActive(tab) {
  tabs.forEach((t) => t.classList.remove("active"));
  if (tab) tab.classList.add("active");
}

// click: scroll if the section is on this page, else follow the link
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const section = document.getElementById(tab.dataset.target);
    if (!section) return; // other page → normal navigation
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#" + tab.dataset.target);
    setActive(tab);
  });
});

// scroll spy: the active tab follows the scrollbar
const sections = [...tabs]
  .map((t) => document.getElementById(t.dataset.target))
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(
            document.querySelector(`.filter[data-target="${entry.target.id}"]`),
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => observer.observe(s));
}
