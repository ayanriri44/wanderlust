(() => {
  "use strict";

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

const tabs = document.querySelectorAll(".nav-tabs-row .filter");

function setActive(tab) {
  tabs.forEach((t) => t.classList.remove("active"));
  if (tab) tab.classList.add("active");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const section = document.getElementById(tab.dataset.target);
    if (!section) return;
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#" + tab.dataset.target);
    setActive(tab);
  });
});

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
