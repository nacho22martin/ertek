const header = document.querySelector("[data-header]");
const revealNodes = document.querySelectorAll(".reveal");
const form = document.querySelector("[data-form]");
const feedback = document.querySelector("[data-feedback]");
const yearTarget = document.querySelector("[data-year]");

const requiredFields = form
  ? Array.from(form.querySelectorAll("input[required]"))
  : [];

const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealNodes.forEach((node) => revealObserver.observe(node));

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

const isEmailValid = (value) => /\S+@\S+\.\S+/.test(value);

const setFeedback = (message, status) => {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.remove("is-success", "is-error");
  if (status) feedback.classList.add(status);
};

const validateField = (field) => {
  const value = field.value.trim();
  const isEmail = field.type === "email";
  const valid = value !== "" && (!isEmail || isEmailValid(value));
  field.dataset.invalid = String(!valid);
  return valid;
};

requiredFields.forEach((field) => {
  field.addEventListener("input", () => {
    validateField(field);
    if (feedback?.textContent) setFeedback("", "");
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const allValid = requiredFields.every(validateField);

    if (!allValid) {
      setFeedback(
        "Revisá los campos obligatorios antes de enviar el formulario.",
        "is-error"
      );
      return;
    }

    const company = form.querySelector("#company")?.value.trim() || "tu empresa";
    setFeedback(
      `Gracias. Ya dejamos listo el pedido de evaluación para ${company}.`,
      "is-success"
    );
    form.reset();
    requiredFields.forEach((field) => {
      field.dataset.invalid = "false";
    });
  });
}
