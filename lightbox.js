// Abre a foto inteira ao tocar numa miniatura (.mini img).
// Toque na foto aumenta/diminui o zoom; com zoom, arraste para ver de perto.
(function () {
  const box = document.createElement("div");
  box.className = "lb";
  box.hidden = true;
  box.innerHTML = `
    <div class="lb-barra">
      <span class="lb-nome" id="lbNome"></span>
      <button type="button" class="lb-btn" id="lbFechar" aria-label="Fechar">Fechar</button>
    </div>
    <div class="lb-area" id="lbArea"><img id="lbImg" alt=""></div>
    <div class="lb-barra lb-baixo">
      <button type="button" class="lb-btn" id="lbAnt" aria-label="Foto anterior">‹ Anterior</button>
      <span class="lb-dica" id="lbDica">Toque na foto para aproximar</span>
      <button type="button" class="lb-btn" id="lbProx" aria-label="Próxima foto">Próxima ›</button>
    </div>`;
  document.body.appendChild(box);
  const img = box.querySelector("#lbImg"), area = box.querySelector("#lbArea");
  const nome = box.querySelector("#lbNome"), dica = box.querySelector("#lbDica");
  let lista = [], idx = 0, zoom = false;

  function mostrar(i) {
    idx = (i + lista.length) % lista.length;
    const el = lista[idx];
    img.src = el.src;
    img.alt = el.alt;
    const leg = el.closest(".mini")?.querySelector("span");
    nome.textContent = leg ? leg.textContent : "";
    setZoom(false);
  }
  function setZoom(z) {
    zoom = z;
    box.classList.toggle("zoom", z);
    dica.textContent = z ? "Arraste para ver · toque para afastar" : "Toque na foto para aproximar";
    if (z) requestAnimationFrame(() => {
      area.scrollLeft = (area.scrollWidth - area.clientWidth) / 2;
      area.scrollTop = (area.scrollHeight - area.clientHeight) / 2;
    });
  }
  function abrir(el) {
    lista = Array.from(document.querySelectorAll(".mini img"));
    box.hidden = false;
    document.body.style.overflow = "hidden";
    mostrar(lista.indexOf(el));
  }
  function fechar() { box.hidden = true; document.body.style.overflow = ""; }

  document.addEventListener("click", e => {
    const el = e.target.closest(".mini img");
    if (el && box.hidden) abrir(el);
  });
  img.addEventListener("click", () => setZoom(!zoom));
  box.querySelector("#lbFechar").onclick = fechar;
  box.querySelector("#lbAnt").onclick = () => mostrar(idx - 1);
  box.querySelector("#lbProx").onclick = () => mostrar(idx + 1);
  document.addEventListener("keydown", e => {
    if (box.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrar(idx - 1);
    if (e.key === "ArrowRight") mostrar(idx + 1);
  });
  // arrastar para o lado troca de foto (sem zoom)
  let x0 = null;
  area.addEventListener("touchstart", e => { if (!zoom && e.touches.length === 1) x0 = e.touches[0].clientX; }, { passive: true });
  area.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 60) mostrar(idx + (dx < 0 ? 1 : -1));
  });
})();
