document.addEventListener("DOMContentLoaded", () => {

  /* Ano */
  const ano = document.getElementById("ano");

  if (ano) {
    ano.textContent = new Date().getFullYear();
  }


  /* Rolagem suave */
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* Máscara de WhatsApp */
  const whatsapp = document.getElementById("whatsapp");

  if (whatsapp) {

    whatsapp.addEventListener("input", event => {

      let value = event.target.value.replace(/\D/g, "");

      value = value.substring(0, 11);

      if (value.length <= 10) {

        value = value.replace(
          /^(\d{2})(\d{4})(\d{0,4}).*/,
          "($1) $2-$3"
        );

      } else {

        value = value.replace(
          /^(\d{2})(\d{5})(\d{0,4}).*/,
          "($1) $2-$3"
        );

      }

      event.target.value = value;

    });

  }


  /* Pequena animação de entrada */
  const elements = document.querySelectorAll(
    ".capture-benefit-card, .capture-step, .capture-product-card"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );


    elements.forEach(element => {

      element.style.opacity = "0";
      element.style.transform = "translateY(18px)";
      element.style.transition =
        "opacity .6s ease, transform .6s ease";

      observer.observe(element);

    });

  }

});
