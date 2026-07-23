document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");
  const guestsField = document.getElementById("guestsField");
  const guestCount = document.getElementById("guestCount");
  
  if (!form || !guestsField || !guestCount) {
    return;
  }
  const mensajeYaEnviado = document.getElementById("mensajeYaEnviado");
  
  const mensajeYaEnviado = document.getElementById("mensajeYaEnviado");
  
      // Verificar si existe la bandera en localStorage
      if (localStorage.getItem("rsvp_enviado") === "true") {
          if (form) form.style.display = "none";
          
          // Ocultar elementos de la tarjeta original
          const castleFrame = document.querySelector(".castle-frame");
          const eventHeader = document.querySelector(".event-header");
          if (castleFrame) castleFrame.style.display = "none";
          if (eventHeader) eventHeader.style.display = "none";
          
          if (mensajeYaEnviado) mensajeYaEnviado.style.display = "block";
          return; // Detiene el script para que no se ejecute lo demás
      }
    
    
  const attendanceOptions = form.querySelectorAll('input[name="asistencia"]');
  
  const syncGuestValidation = () => {
    const selectedOption = form.querySelector('input[name="asistencia"]:checked');
    const cannotAttend = selectedOption?.value === "No podré asistir";
    
    guestsField.classList.toggle("is-hidden", cannotAttend);
    guestsField.setAttribute("aria-hidden", String(cannotAttend));
    guestCount.required = !cannotAttend;
    guestCount.disabled = cannotAttend;
    
    if (cannotAttend) {
      guestCount.value = "";
    }
  };
  
  attendanceOptions.forEach((option) => {
    option.addEventListener("change", syncGuestValidation);
  });
  syncGuestValidation();
});

// Prevenir que regresen usando el caché del botón "Atrás"
window.addEventListener("pageshow", () => {
    const form = document.getElementById("rsvpForm");
    const yaEnviado = localStorage.getItem("rsvp_enviado") === "true";
    
    // Si el formulario sigue visible en la pantalla pero la bandera ya existe, recargamos.
    if (form && form.style.display !== "none" && yaEnviado) {
        window.location.reload();
    }
});