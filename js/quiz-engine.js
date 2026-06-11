const LANG = {
  brand1: "Quiz",
  brand2: "Lab",
  qLabel: "Pregunta",
  next: "Siguiente",
  check: "Comprobar",
  results: "Ver Resultados",
  dragLabelSrc: "Elementos a clasificar",
  dragLabelTgt: "Tu orden (arrastra aquí)",
  dragBtn: "Comprobar Clasificación",
  hotspotHint: "Haz clic en la región para responder",
  hotspotHintMulti: "Selecciona las regiones necesarias y presiona Comprobar",
  feedbackC: "Correcto.",
  feedbackI: "Incorrecto.",
  feedbackN: "Retroalimentación:",
  resTitle: "Cuestionario Completado",
  resSub: "Aquí está tu desempeño global.",
  statC: "Correctas",
  statT: "Total",
  statS: "Puntos",
  btnRetake: "Reintentar",
  tiersT: [
    "Sigue Practicando",
    "Buen Esfuerzo",
    "Bien Hecho",
    "Excelente Trabajo",
  ],
  tiersS: [
    "Repasa el material e inténtalo de nuevo.",
    "Vas por buen camino.",
    "Rendimiento sólido.",
    "Sobresaliente. Tienes un gran dominio.",
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz-container").forEach((container) => {
    const quizId = container.getAttribute("data-quiz-id");
    if (quizId && quizData[quizId])
      new QuizInstance(container, quizData[quizId]);
  });
});

class QuizInstance {
  constructor(container, data) {
    this.container = container;
    this.quizData = data;
    this.currentQIndex = 0;
    this.score = 0;
    this.answered = false;
    this.isChecking = false;
    this.selectedAnswers = [];
    this.touchItem = null;
    this.initDOM();
    this.startQuiz();
  }

  initDOM() {
    this.container.innerHTML = `
            <div class="quiz-wrapper">
                <div class="quiz-progress-track" style="display:block"><div class="quiz-progress-fill" style="width:0%"></div></div>
                <div class="quiz-screen quiz-active screen-question">
                    <div class="quiz-card">
                        <div class="quiz-body">
                            <div class="type-badge"><span class="dot"></span><span class="q-type-badge">${this.quizData.label}</span></div>
                            <div class="question-label">${LANG.qLabel} 1</div>
                            <h2 class="question-text"></h2>
                            <div class="options-container"></div>
                            <div class="feedback-bar"></div>
                        </div>
                        <div class="quiz-footer">
                            <div class="step-info"><strong class="step-current">1</strong> / <strong class="step-total">${this.quizData.questions.length}</strong></div>
                            <button class="quiz-btn quiz-btn-primary btn-next" disabled>
                                <span class="btn-next-label">${LANG.next}</span>
                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="quiz-screen screen-results">
                    <div class="results-card">
                        <div class="results-score-ring">
                            <svg viewBox="0 0 90 90"><circle class="ring-bg" cx="45" cy="45" r="40"/><circle class="ring-fill" cx="45" cy="45" r="40"/></svg>
                            <div class="ring-label">0%</div>
                        </div>
                        <h2 class="results-title">${LANG.resTitle}</h2>
                        <p class="results-subtitle">${LANG.resSub}</p>
                        <div class="results-stats">
                            <div class="stat-item"><div class="stat-value stat-correct">0</div><div class="stat-label">${LANG.statC}</div></div>
                            <div class="stat-item"><div class="stat-value stat-total">${this.quizData.questions.length}</div><div class="stat-label">${LANG.statT}</div></div>
                            <div class="stat-item"><div class="stat-value stat-pct">0%</div><div class="stat-label">${LANG.statS}</div></div>
                        </div>
                        <div class="results-actions"><button class="quiz-btn quiz-btn-primary btn-restart">${LANG.btnRetake}</button></div>
                    </div>
                </div>
            </div>`;

    this.els = {
      progressFill: this.container.querySelector(".quiz-progress-fill"),
      screenQuestion: this.container.querySelector(".screen-question"),
      screenResults: this.container.querySelector(".screen-results"),
      qLabel: this.container.querySelector(".question-label"),
      qText: this.container.querySelector(".question-text"),
      optsContainer: this.container.querySelector(".options-container"),
      feedbackBar: this.container.querySelector(".feedback-bar"),
      stepCurrent: this.container.querySelector(".step-current"),
      btnNext: this.container.querySelector(".btn-next"),
      btnNextLabel: this.container.querySelector(".btn-next-label"),
      quizCard: this.container.querySelector(".quiz-card"),
      ringFill: this.container.querySelector(".ring-fill"),
      ringLabel: this.container.querySelector(".ring-label"),
      statCorrect: this.container.querySelector(".stat-correct"),
      statPct: this.container.querySelector(".stat-pct"),
      resTitle: this.container.querySelector(".results-title"),
      resSubtitle: this.container.querySelector(".results-subtitle"),
      btnRestart: this.container.querySelector(".btn-restart"),
    };
    this.els.btnNext.addEventListener("click", () => this.handleNextClick());
    this.els.btnRestart.addEventListener("click", () => this.restartQuiz());
  }

  showScreen(className) {
    this.container
      .querySelectorAll(".quiz-screen")
      .forEach((s) => s.classList.remove("quiz-active"));
    this.container.querySelector("." + className).classList.add("quiz-active");
  }

  startQuiz() {
    this.currentQIndex = 0;
    this.score = 0;
    this.els.progressFill.style.width = "0%";
    this.els.ringFill.style.strokeDashoffset = "251.2";
    this.showScreen("screen-question");
    this.renderQuestion();
  }

  renderQuestion() {
    this.answered = false;
    this.selectedAnswers = [];
    const q = this.quizData.questions[this.currentQIndex];
    this.isChecking = !!q.multiple || !!q.alwaysNeutral || q.type === "drag";

    this.els.qLabel.textContent = `${LANG.qLabel} ${this.currentQIndex + 1}`;
    this.els.qText.textContent = q.text;
    this.els.feedbackBar.className = "feedback-bar";
    this.els.feedbackBar.style.display = "none";

    if (this.isChecking && q.type !== "drag") {
      this.els.btnNext.disabled = false;
      this.els.btnNextLabel.textContent = LANG.check;
    } else {
      this.els.btnNext.disabled = true;
      this.els.btnNextLabel.textContent =
        this.currentQIndex === this.quizData.questions.length - 1
          ? LANG.results
          : LANG.next;
    }

    this.els.progressFill.style.width =
      (this.currentQIndex / this.quizData.questions.length) * 100 + "%";
    this.els.stepCurrent.textContent = this.currentQIndex + 1;
    this.els.optsContainer.innerHTML = "";

    if (q.type === "image") this.renderImageOptions(q, this.els.optsContainer);
    else if (q.type === "text")
      this.renderTextOptions(q, this.els.optsContainer);
    else if (q.type === "drag")
      this.renderDragOptions(q, this.els.optsContainer);
    else if (q.type === "hotspot")
      this.renderHotspotOptions(q, this.els.optsContainer);

    this.els.quizCard.style.animation = "none";
    void this.els.quizCard.offsetHeight;
    this.els.quizCard.style.animation =
      "cardIn 0.35s cubic-bezier(0.4,0,0.2,1)";
  }

  renderImageOptions(q, container) {
    const grid = document.createElement("div");
    grid.className = "options-grid image-grid";
    q.options.forEach((opt, i) => {
      const card = document.createElement("div");
      card.className = "option-card";
      const media = opt.image ? `<img src="${opt.image}" alt="">` : opt.icon;
      card.innerHTML = `<div class="option-image-wrap"><div class="option-placeholder">${media}</div></div><div class="option-image-label"><div class="option-check"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5,5 4,7.5 8.5,2.5"/></svg></div>${opt.label}</div>`;
      card.addEventListener("click", () => this.selectOption(card, i, q, grid));
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  renderTextOptions(q, container) {
    const grid = document.createElement("div");
    grid.className = "options-grid text-grid";
    ["A", "B", "C", "D", "E"].slice(0, q.options.length).forEach((key, i) => {
      const card = document.createElement("div");
      card.className = "option-card";
      card.innerHTML = `<div class="option-text-card"><div class="option-key">${key}</div><div class="option-text-content">${q.options[i].label}</div></div>`;
      card.addEventListener("click", () => this.selectOption(card, i, q, grid));
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  selectOption(card, idx, q, grid) {
    if (this.answered) return;
    if (this.isChecking) {
      if (this.selectedAnswers.includes(idx)) {
        this.selectedAnswers = this.selectedAnswers.filter((v) => v !== idx);
        card.classList.remove("selected");
      } else {
        this.selectedAnswers.push(idx);
        card.classList.add("selected");
      }
    } else {
      this.answered = true;
      const correctArr = q.correct || [];
      const isCorrect = correctArr.includes(idx);
      this.score += isCorrect ? 1 : 0;
      grid.querySelectorAll(".option-card").forEach((c, i) => {
        c.style.pointerEvents = "none";
        if (correctArr.includes(i)) c.classList.add("correct");
      });
      card.classList.remove("selected");
      if (!isCorrect) card.classList.add("incorrect");
      this.showFeedback(isCorrect, q);
      this.els.btnNext.disabled = false;
    }
  }

  validateMultipleChoices(q) {
    this.answered = true;
    const grid = this.els.optsContainer.querySelector(".options-grid");
    let isCorrect = false;
    if (q.alwaysNeutral) {
      isCorrect = true;
      this.score += 1;
    } else {
      const correctArr = q.correct || [];
      isCorrect =
        this.selectedAnswers.length === correctArr.length &&
        this.selectedAnswers.every((v) => correctArr.includes(v));
      this.score += isCorrect ? 1 : 0;
    }
    grid.querySelectorAll(".option-card").forEach((c, i) => {
      c.style.pointerEvents = "none";
      if (!q.alwaysNeutral) {
        const shouldBeSelected = (q.correct || []).includes(i),
          isSelected = this.selectedAnswers.includes(i);
        if (shouldBeSelected) c.classList.add("correct");
        else if (isSelected) c.classList.add("incorrect");
      }
    });
    this.showFeedback(isCorrect, q);
    this.els.btnNextLabel.textContent =
      this.currentQIndex === this.quizData.questions.length - 1
        ? LANG.results
        : LANG.next;
  }

  renderDragOptions(q, container) {
    const wrap = document.createElement("div");
    wrap.className = "drag-container";
    if (q.mode === "grouping") {
      let groupsHTML = q.groups
        .map(
          (g) =>
            `<div class="drag-group"><div class="drag-group-title">${g.label}</div><div class="drag-target group-target" data-group="${g.id}"></div></div>`,
        )
        .join("");
      wrap.innerHTML = `<div class="drag-label">${LANG.dragLabelSrc}</div><div class="drag-source"></div><div class="drag-groups-container">${groupsHTML}</div>`;
    } else {
      wrap.innerHTML = `<div class="drag-label">${LANG.dragLabelSrc}</div><div class="drag-source"></div><div class="drag-label" style="margin-top:8px">${LANG.dragLabelTgt}</div><div class="drag-target order-target"></div>`;
    }

    container.appendChild(wrap);
    const src = wrap.querySelector(".drag-source");
    const targets = wrap.querySelectorAll(".drag-target");

    [src, ...targets].forEach((zone) => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("drag-over");
      });
      zone.addEventListener("dragleave", (e) =>
        e.currentTarget.classList.remove("drag-over"),
      );
      zone.addEventListener("drop", (e) => this.dropHere(e, wrap, zone));
    });

    [...q.options]
      .sort(() => Math.random() - 0.5)
      .forEach((opt) => src.appendChild(this.createDragItem(opt, q.imageOnly)));

    // Aquí usamos la nueva clase índigo (quiz-btn-action) que solicitaste
    const btn = document.createElement("button");
    btn.className = "quiz-btn quiz-btn-action";
    btn.style.marginTop = "16px";
    btn.textContent = LANG.dragBtn;
    btn.onclick = () =>
      q.mode === "grouping"
        ? this.checkGroupAnswer(q, wrap, src)
        : this.checkOrderAnswer(q, wrap.querySelector(".order-target"), src);
    container.appendChild(btn);
  }

  createDragItem(opt, imageOnly) {
    const el = document.createElement("div");
    el.className =
      "drag-item" +
      (opt.image ? " has-image" : "") +
      (imageOnly ? " image-only" : "");
    el.draggable = true;
    el.dataset.id = opt.id;
    el.innerHTML = opt.image
      ? `<img src="${opt.image}"> <span>${opt.label}</span>`
      : opt.label;
    if (imageOnly) el.title = opt.label;

    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", opt.id);
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));

    el.addEventListener(
      "touchstart",
      (e) => {
        if (this.answered) return;
        this.touchItem = el;
        el.classList.add("dragging");
      },
      { passive: true },
    );

    el.addEventListener(
      "touchmove",
      (e) => {
        if (!this.touchItem || this.answered) return;
        e.preventDefault();
        const touch = e.touches[0];
        const dropTarget = document
          .elementFromPoint(touch.clientX, touch.clientY)
          ?.closest(".drag-target, .drag-source");
        this.container
          .querySelectorAll(".drag-target, .drag-source")
          .forEach((z) => z.classList.remove("drag-over"));
        if (dropTarget && this.container.contains(dropTarget))
          dropTarget.classList.add("drag-over");
      },
      { passive: false },
    );

    el.addEventListener("touchend", (e) => {
      if (!this.touchItem || this.answered) return;
      this.touchItem.classList.remove("dragging");
      const touch = e.changedTouches[0];
      const dropTarget = document
        .elementFromPoint(touch.clientX, touch.clientY)
        ?.closest(".drag-target, .drag-source");
      this.container
        .querySelectorAll(".drag-target, .drag-source")
        .forEach((z) => z.classList.remove("drag-over"));
      if (dropTarget && this.container.contains(dropTarget))
        dropTarget.appendChild(this.touchItem);
      this.touchItem = null;
    });

    return el;
  }

  dropHere(e, wrap, targetZone) {
    e.preventDefault();
    targetZone.classList.remove("drag-over");
    const id = e.dataTransfer.getData("text/plain");
    const ex = wrap.querySelector(`[data-id="${id}"]`);
    if (ex) {
      ex.parentNode.removeChild(ex);
      targetZone.appendChild(ex);
    }
  }

  checkOrderAnswer(q, tgt, src) {
    if (this.answered) return;
    const items = tgt.querySelectorAll(".drag-item");
    const placed = Array.from(items).map((i) => i.dataset.id);

    if (
      !q.alwaysNeutral &&
      !q.acceptAnyOrder &&
      placed.length < q.correctOrder.length
    ) {
      tgt.style.borderColor = "var(--error)";
      setTimeout(() => (tgt.style.borderColor = ""), 1000);
      return;
    }

    this.answered = true;
    let isCorrect = false;

    if (q.alwaysNeutral || q.acceptAnyOrder) {
      isCorrect = true;
      this.score += 1;
    } else {
      isCorrect = JSON.stringify(placed) === JSON.stringify(q.correctOrder);
      this.score += isCorrect ? 1 : 0;
      items.forEach((item, i) => {
        item.classList.add(
          item.dataset.id === q.correctOrder[i]
            ? "correct-placed"
            : "incorrect-placed",
        );
        item.draggable = false;
      });
    }

    src.style.pointerEvents = "none";
    tgt.style.pointerEvents = "none";
    this.showFeedback(isCorrect, q);
    this.els.btnNext.disabled = false;
  }

  checkGroupAnswer(q, wrap, src) {
    if (this.answered) return;
    const srcItems = src.querySelectorAll(".drag-item");
    let expectedTotal = q.groups.reduce(
      (acc, g) => acc + g.correctItems.length,
      0,
    );
    if (!q.alwaysNeutral && expectedTotal > 0 && srcItems.length > 0) {
      src.style.borderColor = "var(--error)";
      setTimeout(() => (src.style.borderColor = ""), 1000);
      return;
    }

    this.answered = true;
    let allCorrect = true;

    if (q.alwaysNeutral) {
      this.score += 1;
    } else {
      q.groups.forEach((g) => {
        const target = wrap.querySelector(`[data-group="${g.id}"]`);
        const items = target.querySelectorAll(".drag-item");
        if (g.correctItems.length === 0 && items.length > 0) allCorrect = false;
        items.forEach((item) => {
          const isItemCorrect = g.correctItems.includes(item.dataset.id);
          item.classList.add(
            isItemCorrect ? "correct-placed" : "incorrect-placed",
          );
          if (!isItemCorrect) allCorrect = false;
        });
      });
      this.score += allCorrect ? 1 : 0;
    }

    src.style.pointerEvents = "none";
    wrap
      .querySelectorAll(".drag-target")
      .forEach((t) => (t.style.pointerEvents = "none"));
    this.showFeedback(allCorrect, q);
    this.els.btnNext.disabled = false;
  }

  renderHotspotOptions(q, container) {
    const wrap = document.createElement("div");
    const hs = document.createElement("div");
    hs.className = "hotspot-wrap" + (q.image ? " has-image" : "");
    if (q.image) {
      hs.style.backgroundImage = `url('${q.image}')`;
    } else {
      hs.innerHTML = `<div class="hotspot-placeholder">🗺️</div>`;
    }

    q.regions.forEach((r) => {
      const reg = document.createElement("div");
      reg.className = "hotspot-region";
      reg.dataset.id = r.id;
      reg.dataset.correct = r.correct;
      reg.style.cssText = `left:${r.x};top:${r.y};width:${r.w};height:${r.h}`;
      reg.textContent = r.label;
      reg.addEventListener("click", (e) => this.clickHotspot(e, reg, hs, q));
      reg.addEventListener("mouseenter", () => {
        if (!this.answered) reg.classList.add("active");
      });
      reg.addEventListener("mouseleave", () => reg.classList.remove("active"));
      hs.appendChild(reg);
    });

    const hint = document.createElement("div");
    hint.className = "hotspot-hint";
    hint.textContent = this.isChecking
      ? LANG.hotspotHintMulti
      : LANG.hotspotHint;
    wrap.appendChild(hs);
    wrap.appendChild(hint);
    container.appendChild(wrap);
  }

  clickHotspot(e, reg, hs, q) {
    if (this.answered) return;
    if (this.isChecking && !q.alwaysNeutral) {
      const id = reg.dataset.id;
      if (this.selectedAnswers.includes(id)) {
        this.selectedAnswers = this.selectedAnswers.filter((v) => v !== id);
        reg.classList.remove("active-selection");
        const m = hs.querySelector(`.marker-${id}`);
        if (m) m.remove();
      } else {
        this.selectedAnswers.push(id);
        reg.classList.add("active-selection");
        const rect = hs.getBoundingClientRect();
        const marker = document.createElement("div");
        marker.className = `click-marker marker-${id}`;
        marker.style.left = ((e.clientX - rect.left) / rect.width) * 100 + "%";
        marker.style.top = ((e.clientY - rect.top) / rect.height) * 100 + "%";
        hs.appendChild(marker);
      }
    } else {
      this.answered = true;
      let isCorrect = true;
      if (q.alwaysNeutral) {
        this.score += 1;
      } else {
        isCorrect = reg.dataset.correct === "true";
        this.score += isCorrect ? 1 : 0;
        hs.querySelectorAll(".hotspot-region").forEach((r) => {
          r.classList.remove("active");
          r.style.pointerEvents = "none";
          if (r.dataset.correct === "true") r.classList.add("correct-click");
        });
        if (!isCorrect) reg.classList.add("incorrect-click");
      }
      const rect = hs.getBoundingClientRect();
      const marker = document.createElement("div");
      marker.className = "click-marker";
      marker.style.left = ((e.clientX - rect.left) / rect.width) * 100 + "%";
      marker.style.top = ((e.clientY - rect.top) / rect.height) * 100 + "%";
      hs.appendChild(marker);
      this.showFeedback(isCorrect, q);
      this.els.btnNext.disabled = false;
    }
  }

  validateMultipleHotspot(q) {
    this.answered = true;
    const hs = this.els.optsContainer.querySelector(".hotspot-wrap");
    let isCorrect = false;
    if (q.alwaysNeutral) {
      isCorrect = true;
      this.score += 1;
    } else {
      const correctRegions = q.regions
        .filter((r) => r.correct)
        .map((r) => r.id);
      isCorrect =
        this.selectedAnswers.length === correctRegions.length &&
        this.selectedAnswers.every((v) => correctRegions.includes(v));
      this.score += isCorrect ? 1 : 0;
      hs.querySelectorAll(".hotspot-region").forEach((r) => {
        r.style.pointerEvents = "none";
        r.classList.remove("active-selection");
        const isCorrectRegion = r.dataset.correct === "true",
          isSelected = this.selectedAnswers.includes(r.dataset.id);
        if (isCorrectRegion) r.classList.add("correct-click");
        else if (isSelected) r.classList.add("incorrect-click");
      });
    }
    this.showFeedback(isCorrect, q);
    this.els.btnNextLabel.textContent =
      this.currentQIndex === this.quizData.questions.length - 1
        ? LANG.results
        : LANG.next;
  }

  handleNextClick() {
    if (this.isChecking && !this.answered) {
      const q = this.quizData.questions[this.currentQIndex];
      if (q.type === "hotspot") this.validateMultipleHotspot(q);
      else if (q.type !== "drag") this.validateMultipleChoices(q);
      this.isChecking = false;
    } else {
      this.currentQIndex++;
      if (this.currentQIndex >= this.quizData.questions.length)
        this.showResults();
      else this.renderQuestion();
    }
  }

  showFeedback(isCorrect, q) {
    this.els.feedbackBar.style.display = "block";
    if (q.alwaysNeutral) {
      this.els.feedbackBar.className = "feedback-bar neutral";

      // Evaluamos si incluyó su propia estructura HTML, de no ser así le ponemos el título por defecto
      const msgHTML = q.feedback.neutral;
      this.els.feedbackBar.innerHTML = msgHTML.includes("<")
        ? msgHTML
        : `<strong>${LANG.feedbackN}</strong> ${msgHTML}`;
    } else {
      this.els.feedbackBar.className =
        "feedback-bar " + (isCorrect ? "correct" : "incorrect");
      const msgHTML = isCorrect ? q.feedback.correct : q.feedback.incorrect;
      this.els.feedbackBar.innerHTML = msgHTML.includes("<")
        ? msgHTML
        : `<strong>${isCorrect ? LANG.feedbackC : LANG.feedbackI}</strong> ${msgHTML}`;
    }
  }

  showResults() {
    const total = this.quizData.questions.length;
    const pct = Math.round((this.score / total) * 100) || 0;
    this.els.progressFill.style.width = "100%";
    this.els.statCorrect.textContent = this.score;
    this.els.statPct.textContent = pct + "%";
    this.els.ringLabel.textContent = pct + "%";
    const tier = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    this.els.resTitle.textContent = LANG.tiersT[tier];
    this.els.resSubtitle.textContent = LANG.tiersS[tier];
    this.showScreen("screen-results");
    setTimeout(() => {
      this.els.ringFill.style.strokeDashoffset = 251.2 - (pct / 100) * 251.2;
    }, 100);
  }

  restartQuiz() {
    this.startQuiz();
  }
}
