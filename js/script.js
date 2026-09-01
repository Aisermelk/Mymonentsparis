/* =========================================================
   MY MOMENTS PARIS
   JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ANO AUTOMÁTICO
    ===================================================== */

    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }


    /* =====================================================
       02. ROLAGEM SUAVE
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const destino = this.getAttribute("href");

            if (!destino || destino === "#") {
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
       03. MÁSCARA WHATSAPP
    ===================================================== */

    const whatsapp = document.getElementById("whatsapp");

    if (whatsapp) {

        whatsapp.addEventListener("input", function () {

            let valor = this.value.replace(/\D/g, "");

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

            this.value = valor;

        });

    }


    /* =====================================================
       04. FORMULÁRIO
    ===================================================== */

    const form = document.querySelector(".lead-form");

    if (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();


            const botao = form.querySelector(
                'button[type="submit"]'
            );


            const nome = document.getElementById("nome");
            const telefone = document.getElementById("whatsapp");
            const email = document.getElementById("email");


            /* =============================================
               VALIDAÇÃO
            ============================================= */

            if (!nome || !telefone || !email) {
                mostrarMensagem(
                    "Não foi possível localizar todos os campos do formulário.",
                    "erro"
                );
                return;
            }


            if (nome.value.trim().length < 2) {

                mostrarMensagem(
                    "Digite seu nome completo.",
                    "erro"
                );

                nome.focus();

                return;
            }


            const telefoneNumeros =
                telefone.value.replace(/\D/g, "");


            if (telefoneNumeros.length < 10) {

                mostrarMensagem(
                    "Digite um WhatsApp válido.",
                    "erro"
                );

                telefone.focus();

                return;
            }


            if (!email.validity.valid) {

                mostrarMensagem(
                    "Digite um e-mail válido.",
                    "erro"
                );

                email.focus();

                return;
            }


            /* =============================================
               BLOQUEIA DUPLO ENVIO
            ============================================= */

            if (botao) {

                botao.disabled = true;

                botao.dataset.textoOriginal =
                    botao.textContent;

                botao.textContent =
                    "ENVIANDO...";

            }


            /* =============================================
               ENVIO FORMSPREE
            ============================================= */

            try {

                const dados = new FormData(form);

                const resposta = await fetch(
                    form.action,
                    {
                        method: "POST",
                        body: dados,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (resposta.ok) {

                    mostrarObrigado();

                    form.reset();

                } else {

                    let mensagem =
                        "Não foi possível enviar seus dados.";

                    try {

                        const resultado =
                            await resposta.json();

                        if (
                            resultado &&
                            resultado.errors &&
                            resultado.errors.length
                        ) {

                            mensagem =
                                resultado.errors
                                    .map(error => error.message)
                                    .join(" ");

                        }

                    } catch (erro) {
                        /* resposta sem JSON */
                    }


                    mostrarMensagem(
                        mensagem,
                        "erro"
                    );

                }

            } catch (erro) {

                console.error(
                    "Erro ao enviar formulário:",
                    erro
                );

                mostrarMensagem(
                    "Verifique sua conexão com a internet e tente novamente.",
                    "erro"
                );

            }


            /* =============================================
               RESTAURA BOTÃO
            ============================================= */

            if (botao) {

                botao.disabled = false;

                botao.textContent =
                    botao.dataset.textoOriginal ||
                    "QUERO RECEBER INFORMAÇÕES";

            }

        });

    }


    /* =====================================================
       05. MENSAGEM DE ERRO / AVISO
    ===================================================== */

    function mostrarMensagem(texto, tipo = "erro") {

        let mensagem =
            document.getElementById("form-message");


        if (!mensagem) {

            mensagem =
                document.createElement("div");

            mensagem.id =
                "form-message";

            mensagem.setAttribute(
                "role",
                "alert"
            );

            if (form) {
                form.prepend(mensagem);
            }

        }


        mensagem.className =
            `form-message ${tipo}`;

        mensagem.textContent =
            texto;


        mensagem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =====================================================
       06. TELA DE OBRIGADO
    ===================================================== */

    function mostrarObrigado() {

        const captura =
            document.getElementById("captura");


        if (!captura) {
            return;
        }


        const container =
            captura.querySelector(
                ".capture-container"
            );


        if (!container) {
            return;
        }


        container.innerHTML = `

            <div class="thank-you-message">

                <div class="thank-you-icon">
                    ✓
                </div>

                <span class="section-label">
                    MY MOMENTS PARIS
                </span>

                <h2>
                    Obrigado!
                </h2>

                <p>
                    Seus dados foram enviados
                    com sucesso.
                </p>

                <p>
                    Em breve entraremos em contato
                    com você pelo WhatsApp.
                </p>

                <a
                    href="#inicio"
                    class="primary-button"
                >
                    VOLTAR AO INÍCIO
                </a>

            </div>

        `;


        captura.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================================
       07. ANIMAÇÃO AO ENTRAR NA TELA
    ===================================================== */

    const elementosAnimados =
        document.querySelectorAll(
            ".benefit-card, .product-card, .team-card"
        );


    if (
        "IntersectionObserver" in window &&
        elementosAnimados.length
    ) {

        const observer =
            new IntersectionObserver(
                (entradas, observador) => {

                    entradas.forEach(entrada => {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add(
                                "visible"
                            );

                            observador.unobserve(
                                entrada.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        elementosAnimados.forEach(elemento => {

            elemento.classList.add(
                "scroll-animation"
            );

            observer.observe(elemento);

        });

    }


    /* =====================================================
       08. LOGO
    ===================================================== */

    const logo =
        document.querySelector(".logo");


    if (logo) {

        logo.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       09. PREVENÇÃO DE ERRO NO WHATSAPP
    ===================================================== */

    const whatsappButton =
        document.querySelector(
            ".whatsapp-button"
        );


    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            () => {

                console.log(
                    "WhatsApp aberto."
                );

            }
        );

    }


    /* =====================================================
       10. CONSOLE
    ===================================================== */

    console.log(
        "My Moments Paris carregado com sucesso."
    );

});
