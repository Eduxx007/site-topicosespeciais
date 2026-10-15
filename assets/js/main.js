// NORD — interações simples do site-base

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");
const menuLinks = document.querySelectorAll(".main-nav a");
const year = document.querySelector("#current-year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Interatividade do Quiz de Torras (produtos.html)
const quizForm = document.querySelector("#coffee-quiz");
if (quizForm) {
  const resultContainer = document.querySelector("#quiz-result");
  const resultTitle = document.querySelector("#result-title");
  const resultDescription = document.querySelector("#result-description");
  const btnVerTorra = document.querySelector("#btn-ver-torra");
  const btnSubmit = document.querySelector("#btn-quiz-result");
  const btnRefazer = document.querySelector("#btn-refazer-quiz");

  const quizRecommendations = {
    "suavidade-suavidade": {
      target: "torra-clara",
      title: "Torra Clara",
      description: "Você valoriza a suavidade e a riqueza de aromas delicados. A Torra Clara preserva os óleos essenciais, a acidez viva e as notas florais dos nossos grãos, perfeita para métodos filtrados e degustação com atenção a cada nuance."
    },
    "suavidade-equilibrio": {
      target: "torra-clara",
      title: "Torra Clara",
      description: "Você aprecia a suavidade aromática combinada com a facilidade do dia a dia. A Torra Clara entrega uma xícara límpida, aromática e muito agradável, destacando notas frutadas e florais."
    },
    "suavidade-intensidade": {
      target: "torra-media",
      title: "Torra Média",
      description: "Você deseja um ponto de encontro entre notas delicadas e presença marcante. A Torra Média é o equilíbrio ideal que entrega corpo redondo sem perder nuances aromáticas."
    },
    "equilibrio-suavidade": {
      target: "torra-media",
      title: "Torra Média",
      description: "Você valoriza harmonia com um toque suave. A Torra Média entrega uma bebida aveludada e equilibrada, destacando a doçura natural do grão em qualquer método de preparo."
    },
    "equilibrio-equilibrio": {
      target: "torra-media",
      title: "Torra Média",
      description: "Você busca harmonia e versatilidade em qualquer momento. A Torra Média reúne doçura natural com corpo aveludado, sendo a escolha perfeita tanto para a rotina diária quanto para pausas especiais."
    },
    "equilibrio-intensidade": {
      target: "torra-media",
      title: "Torra Média",
      description: "Você gosta de equilíbrio com um pouco mais de presença. A Torra Média oferece corpo sem amargor excessivo, funcionando perfeitamente puro ou com leite."
    },
    "intensidade-suavidade": {
      target: "torra-media",
      title: "Torra Média",
      description: "A combinação entre busca por intensidade e preparo cuidadoso encontra na Torra Média o balanço ideal: sabor presente com final limpo e equilibrado."
    },
    "intensidade-equilibrio": {
      target: "torra-intensa",
      title: "Torra Intensa",
      description: "Você gosta de café com presença marcante e notas tostadas envolventes. A Torra Intensa traz corpo consistente e presença marcante, mantendo ótima versatilidade para o dia a dia."
    },
    "intensidade-intensidade": {
      target: "torra-intensa",
      title: "Torra Intensa",
      description: "Você procura máxima presença, corpo denso e energia revigorante. A Torra Intensa desenvolve notas profundas de cacau e caramelo escuro, final prolongado e ótima extração para espresso ou bebidas com leite."
    }
  };

  function displayRecommendation(perfil, momento) {
    const key = `${perfil}-${momento}`;
    const match = quizRecommendations[key] || quizRecommendations["equilibrio-equilibrio"];

    if (resultTitle) resultTitle.textContent = match.title;
    if (resultDescription) resultDescription.textContent = match.description;
    if (btnVerTorra) {
      btnVerTorra.href = `#${match.target}`;
      btnVerTorra.setAttribute("data-target", match.target);
    }

    if (resultContainer) {
      resultContainer.hidden = false;
      resultContainer.classList.add("is-visible");
      resultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function handleSelectionChange() {
    const selectedPerfil = quizForm.querySelector('input[name="perfil"]:checked');
    const selectedMomento = quizForm.querySelector('input[name="momento"]:checked');

    quizForm.querySelectorAll(".quiz-option").forEach((label) => {
      const radio = label.querySelector("input");
      if (radio && radio.checked) {
        label.classList.add("is-selected");
      } else {
        label.classList.remove("is-selected");
      }
    });

    if (btnSubmit) {
      btnSubmit.disabled = !(selectedPerfil || selectedMomento);
    }

    if (selectedPerfil && selectedMomento) {
      displayRecommendation(selectedPerfil.value, selectedMomento.value);
    }
  }

  quizForm.addEventListener("change", handleSelectionChange);

  if (btnSubmit) {
    btnSubmit.addEventListener("click", () => {
      const selectedPerfil = quizForm.querySelector('input[name="perfil"]:checked');
      const selectedMomento = quizForm.querySelector('input[name="momento"]:checked');
      const p = selectedPerfil ? selectedPerfil.value : "equilibrio";
      const m = selectedMomento ? selectedMomento.value : "equilibrio";
      displayRecommendation(p, m);
    });
  }

  if (btnVerTorra) {
    btnVerTorra.addEventListener("click", (e) => {
      const targetId = btnVerTorra.getAttribute("data-target") || btnVerTorra.getAttribute("href")?.replace("#", "");
      if (targetId) {
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
          e.preventDefault();
          targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          targetCard.classList.remove("highlight-card");
          void targetCard.offsetWidth; // Força reflow para reiniciar animação
          targetCard.classList.add("highlight-card");
          setTimeout(() => {
            targetCard.classList.remove("highlight-card");
          }, 2500);
        }
      }
    });
  }

  if (btnRefazer) {
    btnRefazer.addEventListener("click", () => {
      quizForm.reset();
      quizForm.querySelectorAll(".quiz-option").forEach((opt) => opt.classList.remove("is-selected"));
      if (resultContainer) {
        resultContainer.hidden = true;
        resultContainer.classList.remove("is-visible");
      }
      if (btnSubmit) btnSubmit.disabled = true;
      quizForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

// Interatividade do Formulário de Pedidos (produtos.html)
const orderForm = document.querySelector("#order-form");
const orderSuccess = document.querySelector("#order-success");
const torraSelect = document.querySelector("#order-torra");
const orderSection = document.querySelector("#pedido");
const cardChoiceButtons = document.querySelectorAll(".btn-escolher-torra");
const btnNovoPedido = document.querySelector("#btn-novo-pedido");

// 1. Ação dos 3 botões dos cards com seleção automática da torra
if (cardChoiceButtons.length > 0 && torraSelect) {
  cardChoiceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const chosenTorra = button.getAttribute("data-torra");
      if (chosenTorra) {
        torraSelect.value = chosenTorra;
        const group = torraSelect.closest(".form-group");
        if (group) {
          group.classList.remove("has-error");
          torraSelect.classList.remove("is-invalid");
        }
        torraSelect.classList.remove("highlight-field");
        void torraSelect.offsetWidth;
        torraSelect.classList.add("highlight-field");
        setTimeout(() => torraSelect.classList.remove("highlight-field"), 1600);
      }
      if (orderSection) {
        e.preventDefault();
        orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
        const nameField = document.querySelector("#order-nome");
        if (nameField) {
          setTimeout(() => nameField.focus({ preventScroll: true }), 450);
        }
      }
    });
  });
}

// 2. Validação obrigatória e envio sem reload
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeInput = orderForm.querySelector("#order-nome");
    const whatsappInput = orderForm.querySelector("#order-whatsapp");
    const emailInput = orderForm.querySelector("#order-email");
    const torraInput = orderForm.querySelector("#order-torra");
    const quantidadeInput = orderForm.querySelector("#order-quantidade");
    const mensagemInput = orderForm.querySelector("#order-mensagem");

    let isValid = true;

    function validateField(input, condition, errorMsg) {
      const group = input.closest(".form-group");
      const errorSpan = group ? group.querySelector(".form-error-msg") : null;
      if (!condition) {
        isValid = false;
        input.classList.add("is-invalid");
        if (group) group.classList.add("has-error");
        if (errorSpan && errorMsg) errorSpan.textContent = errorMsg;
      } else {
        input.classList.remove("is-invalid");
        if (group) group.classList.remove("has-error");
      }
    }

    // Validações com trim para não aceitar espaços vazios
    validateField(nomeInput, nomeInput.value.trim().length > 0, "Por favor, informe seu nome.");
    validateField(whatsappInput, whatsappInput.value.trim().length >= 8, "Por favor, informe seu WhatsApp com DDD.");

    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(emailInput, emailVal.length > 0 && emailRegex.test(emailVal), "Por favor, informe um e-mail válido.");

    validateField(torraInput, torraInput.value.trim().length > 0, "Por favor, selecione uma opção de torra.");

    const qtdVal = parseInt(quantidadeInput.value, 10);
    validateField(quantidadeInput, !isNaN(qtdVal) && qtdVal > 0, "Por favor, informe uma quantidade válida (mínimo 1).");

    validateField(mensagemInput, mensagemInput.value.trim().length > 0, "Por favor, escreva uma mensagem.");

    if (!isValid) {
      const firstInvalid = orderForm.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Formulário preenchido corretamente: exibe sucesso sem recarregar a página
    orderForm.hidden = true;
    if (orderSuccess) {
      orderSuccess.hidden = false;
      orderSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // Limpa o estado de erro dinamicamente ao digitar/mudar campo
  orderForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("is-invalid");
      const group = field.closest(".form-group");
      if (group) group.classList.remove("has-error");
    });
    field.addEventListener("change", () => {
      field.classList.remove("is-invalid");
      const group = field.closest(".form-group");
      if (group) group.classList.remove("has-error");
    });
  });

  if (btnNovoPedido) {
    btnNovoPedido.addEventListener("click", () => {
      orderForm.reset();
      orderForm.hidden = false;
      if (orderSuccess) orderSuccess.hidden = true;
      orderForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}


