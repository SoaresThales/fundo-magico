document.addEventListener("DOMContentLoaded", function () {

  // Interface - Controle do estado de carregamento
  function setLoading(isLoading) {
    const buttonSpan = document.querySelector(".btn-magic span");

    if (isLoading) {
      buttonSpan.innerHTML = "Gerando Background ...";
    } else {
      buttonSpan.innerHTML = "Gerar Background Mágico";
    }
  }

  // Visual - Aplicação do HTML e CSS gerados
  function applyGeneratedPreview(html, css) {
    const previousStyle = document.getElementById("dynamic-style");
    if (previousStyle) previousStyle.remove();

    if (css) {
      const styleElement = document.createElement("style");
      styleElement.id = "dynamic-style";
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }

    let bgContainer = document.getElementById("magic-bg-container");

    if (!bgContainer) {
      bgContainer = document.createElement("div");
      bgContainer.id = "magic-bg-container";
      
      bgContainer.style.position = "fixed";
      bgContainer.style.top = "0";
      bgContainer.style.left = "0";
      bgContainer.style.width = "100vw";
      bgContainer.style.height = "100vh";
      bgContainer.style.zIndex = "-1";
      bgContainer.style.pointerEvents = "none";

      document.body.prepend(bgContainer); 
    }

    bgContainer.innerHTML = html;

    const preview = document.getElementById("preview-section");
    if (preview) {
      preview.style.display = "none";
    }
  }

  // Evento - Captura e processamento do formulário
  const form = document.querySelector(".form-group");
  const textarea = document.getElementById("description");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const description = textarea.value.trim();

    if (!description) {
      return;
    }

    setLoading(true);

    try {
      // HTTP - Requisição POST para o n8n
      const response = await fetch(
        window.config.webhookUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        }
      );

      const data = await response.json();

      const htmlCode = document.getElementById("html-code");
      const cssCode = document.getElementById("css-code");

      htmlCode.textContent = data.html || "";
      cssCode.textContent = data.css || "";

      applyGeneratedPreview(data.html, data.css);
      
    } catch (error) {
      console.log("Erro ao gerar o fundo:", error);

      const htmlCode = document.getElementById("html-code");
      const cssCode = document.getElementById("css-code");
      const preview = document.getElementById("preview-section");

      if(htmlCode) htmlCode.textContent = "Não consegui gerar o HTML. Tente novamente.";
      if(cssCode) cssCode.textContent = "Não consegui gerar o CSS. Tente novamente.";
      if(preview) preview.innerHTML = "";
      
    } finally {
      setLoading(false);
    }
  });
});