/* =========================================================
   MY MOMENTS PARIS
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANO AUTOMÁTICO DO RODAPÉ
    ====================================================== */

    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }


    /* =====================================================
       ROLAGEM SUAVE DOS LINKS INTERNOS
    ====================================================== */

    const linksInternos = document.querySelectorAll(
        'a[href^="#"]'
    );

    linksInternos.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destino = link.getAttribute("href");

            if (
                !destino ||
                destino === "#" ||
                destino.length <= 1
            ) {
                return;
            }

            const elemento = document.querySelector(destino);

            if (!elemento) {
                return;
            }

            event.preventDefault();

            elemento.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       MÁSCARA DE WHATSAPP
    ====================================================== */

    const campoWhatsApp = document.getElementById("whatsapp");

    if (campoWhatsApp) {

        campoWhatsApp.addEventListener("input", (event) => {

            let valor = event.target.value;

            valor = valor.replace(/\D/g, "");

            if (valor.length > 11) {
                valor = valor.substring(0, 11);
            }


            if (valor.length <= 10) {

                valor = valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );

            } else {

                valor = valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );

            }

            event.target.value = valor;

        });

    }


    /* =====================================================
       FORMULÁRIO
       
       IMPORTANTE:
       O formulário continua sendo enviado diretamente
       para o Formspree.
       
       Não vamos interceptar o submit.
    ====================================================== */

    const formulario = document.querySelector(".lead-form");

    if (formulario) {

        formulario.addEventListener("submit", () => {

            const botao = formulario.querySelector(
                'button[type="submit"]'
            );

            if (botao) {

                botao.disabled = true;

                botao.dataset.textoOriginal =
                    botao.textContent;

                botao.textContent =
                    "ENVIANDO...";

            }

        });

    }


    /* =====================================================
       ANIMAÇÃO DOS ELEMENTOS AO ENTRAREM NA TELA
    ====================================================== */

    const elementosAnimados = document.querySelectorAll(
        ".benefit-card, " +
        ".product-card, " +
        ".team-card, " +
        ".section-header, " +
        ".about-content, " +
        ".opportunity-content"
    );


    if (
        "IntersectionObserver" in window &&
        elementosAnimados.length > 0
    ) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
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


        elementosAnimados.forEach((elemento) => {

            elemento.classList.add(
                "animate-on-scroll"
            );

            observer.observe(elemento);

        });

    }


    /* =====================================================
       HEADER AO ROLAR A PÁGINA
    ====================================================== */

    const header = document.querySelector(".header");

    if (header) {

        const atualizarHeader = () => {

            if (window.scrollY > 50) {

                header.classList.add(
                    "header-scrolled"
                );

            } else {

                header.classList.remove(
                    "header-scrolled"
                );

            }

        };


        window.addEventListener(
            "scroll",
            atualizarHeader,
            {
                passive: true
            }
        );


        atualizarHeader();

    }


    /* =====================================================
       BOTÃO WHATSAPP FLUTUANTE
       
       NÃO ALTERAMOS O HREF.
       NÃO INTERCEPTAMOS O CLIQUE.
       
       O próprio HTML abre:
       
       https://wa.me/554992756194
    ====================================================== */

    const whatsappButton = document.querySelector(
        ".whatsapp-button"
    );

    if (whatsappButton) {

        whatsappButton.setAttribute(
            "target",
            "_blank"
        );

        whatsappButton.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    }


    /* =====================================================
       BOTÕES EXTERNOS DE CADASTRO
       
       Não bloqueamos os links do patrocinador.
    ====================================================== */

    const linksCadastro = document.querySelectorAll(
        'a[href*="office.momentsparis.com.br"]'
    );

    linksCadastro.forEach((link) => {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       PROTEÇÃO CONTRA CLIQUE DUPLO NO FORMULÁRIO
    ====================================================== */

    if (formulario) {

        formulario.addEventListener(
            "submit",
            () => {

                formulario.classList.add(
                    "form-sending"
                );

            },
            {
                once: false
            }
        );

    }


    /* =====================================================
       FINALIZAÇÃO
    ====================================================== */

    console.log(
        "My Moments Paris - JavaScript carregado."
    );

});
