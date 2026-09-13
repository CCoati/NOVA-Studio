/**
 * NOVA STUDIO — Contact Form & Interactive Selector
 * Handles service selection pills, form submission via FormSubmit AJAX and toast feedback.
 */

export function initContactForm() {
  const form = document.getElementById('projectInquiryForm');
  const pillOpts = document.querySelectorAll('.pill-opt');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const submitBtn = document.getElementById('submitBtn');

  let selectedService = "Sitio Web";

  // Pill Options Selection
  pillOpts.forEach(pill => {
    pill.addEventListener('click', () => {
      pillOpts.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedService = pill.getAttribute('data-value') || pill.textContent.trim();
    });
  });

  // Form Submit Handler
  if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('clientName');
      const businessEl = document.getElementById('clientBusiness');
      const emailEl = document.getElementById('clientEmail');
      const messageEl = document.getElementById('clientMessage');

      const name = nameEl ? nameEl.value.trim() : '';
      const business = businessEl ? businessEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const message = messageEl ? messageEl.value.trim() : '';

      if (!name || !business || !email || !message) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }

      // UI State: Sending
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Enviando consulta... <span class="btn-icon-arrow" style="display:inline-block; animation: spin 1s linear infinite;">⟳</span>`;
      submitBtn.style.opacity = '0.75';

      try {
        const response = await fetch("https://formsubmit.co/ajax/jiviera97@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "Nombre del Cliente": name,
            "Empresa o Marca": business,
            "Correo Electrónico": email,
            "Servicio Requerido": selectedService,
            "Detalles del Proyecto": message,
            "_subject": `🔥 Nueva Consulta de Proyecto: ${business} (${name})`,
            "_template": "table",
            "_captcha": "false"
          })
        });

        const data = await response.json();

        if (response.ok || data.success === "true" || data.success === true) {
          // Success State
          submitBtn.innerHTML = `¡Consulta Enviada! ✓`;
          submitBtn.style.background = '#00ff66';
          submitBtn.style.color = '#000000';
          submitBtn.style.borderColor = '#00ff66';
          submitBtn.style.opacity = '1';

          if (toast && toastMsg) {
            toastMsg.textContent = "¡Consulta recibida! Nos comunicaremos contigo en menos de 24 hs.";
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 6000);
          }

          // Reset Form
          setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = `Enviar consulta <span class="btn-icon-arrow">→</span>`;
            submitBtn.style.background = '#ffffff';
            submitBtn.style.color = '#000000';
            submitBtn.style.borderColor = '#ffffff';
          }, 4000);
        } else {
          throw new Error(data.message || "Error en el servicio de envío.");
        }
      } catch (error) {
        console.error("Error enviando formulario:", error);

        submitBtn.innerHTML = `Reintentar envío <span class="btn-icon-arrow">↺</span>`;
        submitBtn.style.background = '#ff3344';
        submitBtn.style.color = '#ffffff';
        submitBtn.style.borderColor = '#ff3344';
        submitBtn.style.opacity = '1';

        if (toast && toastMsg) {
          toastMsg.textContent = "Hubo un inconveniente al enviar. Puedes reintentar o escribir directamente por WhatsApp (+598 98025326).";
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 7000);
        }

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.background = '#ffffff';
          submitBtn.style.color = '#000000';
          submitBtn.style.borderColor = '#ffffff';
          submitBtn.innerHTML = `Enviar consulta <span class="btn-icon-arrow">→</span>`;
        }, 4500);
      }
    });
  }
}
