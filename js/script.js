// script.js - funciones comunes para las 3 páginas

// --- UTIL: detectar página actual por pathname ---
const path = window.location.pathname.split("/").pop();

// Guardar nombre en localStorage para mostrarlo en todas las páginas
function askNameAndSave(){
  const nombre = prompt("Por favor ingresa tu Nombre:");
  if(!nombre){ alert("No ingresaste nombre. Intentá de nuevo."); return; }
  const apellido = prompt("Por favor ingresa tu Apellido:");
  if(!apellido){ alert("No ingresaste apellido. Intentá de nuevo."); return; }
  const full = nombre.trim() + " " + apellido.trim();
  localStorage.setItem("tp_nombre", full);
  displayNameAnywhere();
  alert("¡Bienvenido, " + full + "!");
}

// Mostrar en donde haya elementos con id user-name-area o welcome areas
function displayNameAnywhere(){
  const saved = localStorage.getItem("tp_nombre");
  if(!saved) return;
  const el = document.getElementById("user-name-area");
  if(el){
    el.innerHTML = `Bienvenido, <strong>${saved}</strong> — tu nombre se guardó para esta sesión.`;
  }
  const el2 = document.getElementById("welcome-msg");
  if(el2){
    el2.textContent = `¡Bienvenido, ${saved}!`;
  }
  const el3 = document.getElementById("welcome-msg-2");
  if(el3){
    el3.textContent = `¡Hola, ${saved}!`;
  }
}

// --- PÁGINA 1: index.html ---
if(path === "" || path === "index.html"){
  const btn = document.getElementById("btn-ask-name");
  if(btn) btn.addEventListener("click", askNameAndSave);
  // al cargar mostrar nombre si está guardado
  displayNameAnywhere();
}

// --- PÁGINA 2: galería ---
if(path === "pagina2.html"){
  // mostrar nombre si existe
  displayNameAnywhere();

  // edad
  const btnAge = document.getElementById("btn-check-age");
  if(btnAge){
    btnAge.addEventListener("click", ()=>{
      const ageStr = prompt("Por favor ingresa tu edad (solo números):");
      if(!ageStr){ alert("No ingresaste edad."); return; }
      const age = parseInt(ageStr, 10);
      const msgEl = document.getElementById("age-msg");
      if(isNaN(age)){
        alert("Valor inválido. Ingresá un número.");
        if(msgEl) msgEl.textContent = "Edad inválida.";
        return;
      }
      if(age > 20){
        if(msgEl) msgEl.textContent = "Tenés " + age + " años — Sos mayor de 20.";
        alert("Eres mayor de 20 años.");
      } else {
        if(msgEl) msgEl.textContent = "Tenés " + age + " años — No sos mayor de 20.";
        alert("No sos mayor de 20 años.");
      }
    });
  }

  // comportamiento hover: cambiar src por data-alt-src
  document.querySelectorAll(".gallery-item img").forEach(img => {
    const original = img.src;
    const alt = img.dataset.altSrc;
    img.addEventListener("mouseenter", () => {
      if(alt) img.src = alt;
    });
    img.addEventListener("mouseleave", () => {
      img.src = original;
    });
    // para dispositivos táctiles: cambia al tocar (alternar)
    img.addEventListener("click", () => {
      const current = img.src;
      if(alt && current === original) img.src = alt;
      else img.src = original;
    });
  });
}

// --- PÁGINA 3: tabla y operaciones ---
if(path === "pagina3.html"){
  displayNameAnywhere();

  function pedirDosNumeros(){
    const a = prompt("Ingresá el primer número:");
    if(a === null) return null;
    const b = prompt("Ingresá el segundo número:");
    if(b === null) return null;
    const na = parseFloat(a);
    const nb = parseFloat(b);
    if(isNaN(na) || isNaN(nb)){
      alert("Uno o ambos valores no son números válidos. Intentá de nuevo.");
      return null;
    }
    return [na, nb];
  }

  document.querySelectorAll(".action-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const acc = btn.dataset.action;
      const nums = pedirDosNumeros();
      if(!nums) return;
      const [n1, n2] = nums;
      let resultado;
      if(acc === "sum"){
        resultado = n1 + n2;
        alert(`Resultado (Suma): ${resultado}`);
      } else if(acc === "div"){
        if(n2 === 0){ alert("No se puede dividir por cero."); return; }
        resultado = n1 / n2;
        alert(`Resultado (División): ${resultado}`);
      } else if(acc === "avg"){
        resultado = (n1 + n2) / 2;
        alert(`Resultado (Promedio): ${resultado}`);
      } else {
        resultado = n1 * n2; // ejemplo
        alert(`Resultado (Operación personalizada - multiplicación): ${resultado}`);
      }
    });
  });
}
