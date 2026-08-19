/* =========================================================
   MOMENTS PARIS
   JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ROLAGEM SUAVE
    ====================================================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
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


    /* =====================================================
       2. MÁSCARA DE WHATSAPP
    ====================================================== */

    const whatsappInput =
        document.querySelector("#whatsapp");

    if (whatsappInput) {

        whatsappInput.addEventListener("input", event => {

            let value = event.target.value;

            value = value.replace(/\D/g, "");

            if (value.length > 11) {
                value = value.substring(0, 11);
            }

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


    /* =====================================================
       3. FORMULÁRIO
    ====================================================== */

    const form =
        document.querySelector(".lead-form");

    if (form) {

        form.addEventListener("submit", event => {

            const name =
                document.querySelector("#nome");

            const whatsapp =
                document.querySelector("#whatsapp");

            const email =
                document.querySelector("#email");


            /* ---------------------------------------------
               VERIFICA NOME
            --------------------------------------------- */

            if (
                !name ||
                name.value.trim().length < 2
            ) {

                event.preventDefault();

                alert(
                    "Por favor, informe seu nome."
                );

                if (name) {
                    name.focus();
                }

                return;
            }


            /* ---------------------------------------------
               VERIFICA WHATSAPP
            --------------------------------------------- */

            if (whatsapp) {

                const phoneNumbers =
                    whatsapp.value.replace(/\D/g, "");

                if (
                    phoneNumbers.length < 10
                ) {

                    event.preventDefault();

                    alert(
                        "Informe um número de WhatsApp válido."
                    );

                    whatsapp.focus();

                    return;
                }

            }


            /* ---------------------------------------------
               VERIFICA E-MAIL
            --------------------------------------------- */

            if (email) {

                const emailValue =
                    email.value.trim();

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailRegex.test(emailValue)
                ) {

                    event.preventDefault();

                    alert(
                        "Informe um e-mail válido."
                    );

                    email.focus();

                    return;
                }

            }


            /* ---------------------------------------------
               EVITA CLIQUES DUPLICADOS
            --------------------------------------------- */

            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "ENVIANDO...";

            }

        });

    }


    /* =====================================================
       4. ANIMAÇÃO DOS ELEMENTOS AO ENTRAR NA TELA
    ====================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".benefit-card, .product-card, .team-card"
        );

    if (
        "IntersectionObserver" in window &&
        animatedElements.length > 0
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            element.classList.add(
                "js-animation"
            );

            observer.observe(element);

        });

    }


    /* =====================================================
       5. ANO AUTOMÁTICO DO FOOTER
    ====================================================== */

    const footerText =
        document.querySelector(".footer-copy p");

    if (footerText) {

        footerText.innerHTML =
            `© ${new Date().getFullYear()} Moments Paris.
            Todos os direitos reservados.`;

    }


    /* =====================================================
       6. BOTÃO WHATSAPP
       
       Por enquanto ele leva para o formulário.
       Depois podemos colocar o número real.
    ====================================================== */

    const whatsappButton =
        document.querySelector(".whatsapp-button");

    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            event => {

                const capture =
                    document.querySelector("#captura");

                if (capture) {

                    event.preventDefault();

                    capture.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       7. PROTEÇÃO CONTRA ERROS DE IMAGEM
    ====================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Imagem não encontrada:",
                    image.src
                );

                image.style.opacity = "0.4";

            }
        );

    });


    /* =====================================================
       8. LOG DE TESTE
    ====================================================== */

    console.log(
        "Moments Paris - página carregada corretamente."
    );

});
