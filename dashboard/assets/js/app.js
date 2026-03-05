(() => {
  "use strict";

  const state = {
    lang: "en",
    data: null,
    activeFilter: "all"
  };

  const dom = {
    identityName: document.getElementById("identityName"),
    identityRole: document.getElementById("identityRole"),
    navProjects: document.getElementById("navProjects"),
    navCompetencies: document.getElementById("navCompetencies"),
    navRoadmap: document.getElementById("navRoadmap"),
    navContact: document.getElementById("navContact"),
    btnLangEn: document.getElementById("btnLangEn"),
    btnLangRu: document.getElementById("btnLangRu"),
    heroKicker: document.getElementById("heroKicker"),
    heroHeadline: document.getElementById("heroHeadline"),
    heroSubheadline: document.getElementById("heroSubheadline"),
    ctaRow: document.getElementById("ctaRow"),
    competenciesTitle: document.getElementById("competenciesTitle"),
    competenciesNote: document.getElementById("competenciesNote"),
    projectsTitle: document.getElementById("projectsTitle"),
    projectsNote: document.getElementById("projectsNote"),
    roadmapTitle: document.getElementById("roadmapTitle"),
    roadmapNote: document.getElementById("roadmapNote"),
    contactTitle: document.getElementById("contactTitle"),
    contactNote: document.getElementById("contactNote"),
    kpiGrid: document.getElementById("kpiGrid"),
    filterRow: document.getElementById("filterRow"),
    projectsGrid: document.getElementById("projectsGrid"),
    roadmapList: document.getElementById("roadmapList"),
    contactList: document.getElementById("contactList"),
    contactNarrative: document.getElementById("contactNarrative"),
    footerVersion: document.getElementById("footerVersion"),
    footerUpdated: document.getElementById("footerUpdated"),
    projectModal: document.getElementById("projectModal"),
    modalTitle: document.getElementById("modalTitle"),
    modalTagline: document.getElementById("modalTagline"),
    modalClose: document.getElementById("modalClose"),
    modalChips: document.getElementById("modalChips"),
    detailGrid: document.getElementById("detailGrid"),
    artifactList: document.getElementById("artifactList")
  };

  const projectBySlug = new Map();

  function readInitialLang() {
    const queryLang = new URLSearchParams(window.location.search).get("lang");
    if (queryLang === "en" || queryLang === "ru") {
      return queryLang;
    }
    return "en";
  }

  function updateLanguageButtons() {
    dom.btnLangEn.classList.toggle("is-active", state.lang === "en");
    dom.btnLangRu.classList.toggle("is-active", state.lang === "ru");
  }

  function setLangInUrl(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
  }

  async function loadContent(lang) {
    const path = `assets/data/content.${lang}.json`;
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    return response.json();
  }

  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function renderHero(data) {
    dom.heroKicker.textContent = data.hero.kicker;
    dom.heroHeadline.textContent = data.hero.headline;
    dom.heroSubheadline.textContent = data.hero.subheadline;

    clearNode(dom.ctaRow);
    data.hero.ctas.forEach((cta) => {
      const link = document.createElement("a");
      link.className = `btn ${cta.kind === "primary" ? "btn-primary" : "btn-secondary"}`;
      link.href = cta.href;
      link.textContent = cta.label;
      link.target = cta.href.startsWith("http") || cta.href.startsWith("file://") ? "_blank" : "_self";
      if (link.target === "_blank") {
        link.rel = "noopener noreferrer";
      }
      dom.ctaRow.appendChild(link);
    });
  }

  function renderSections(data) {
    dom.identityName.textContent = data.meta.name;
    dom.identityRole.textContent = data.meta.title;
    dom.navProjects.textContent = data.nav.projects;
    dom.navCompetencies.textContent = data.nav.competencies;
    dom.navRoadmap.textContent = data.nav.roadmap;
    dom.navContact.textContent = data.nav.contact;

    dom.competenciesTitle.textContent = data.sections.competenciesTitle;
    dom.competenciesNote.textContent = data.sections.competenciesNote;
    dom.projectsTitle.textContent = data.sections.projectsTitle;
    dom.projectsNote.textContent = data.sections.projectsNote;
    dom.roadmapTitle.textContent = data.sections.roadmapTitle;
    dom.roadmapNote.textContent = data.sections.roadmapNote;
    dom.contactTitle.textContent = data.sections.contactTitle;
    dom.contactNote.textContent = data.sections.contactNote;

    dom.footerVersion.textContent = data.footer.version;
    dom.footerUpdated.textContent = `${data.footer.updatedPrefix}: ${data.meta.updatedAt}`;
  }

  function renderKpis(kpis) {
    clearNode(dom.kpiGrid);
    kpis.forEach((kpi) => {
      const card = document.createElement("article");
      card.className = "card kpi-card reveal";
      card.innerHTML = `
        <div class="kpi-title">${kpi.label}</div>
        <div class="kpi-value">${kpi.value}</div>
        <div class="kpi-note">${kpi.note}</div>
      `;
      dom.kpiGrid.appendChild(card);
    });
  }

  function renderFilters(filters) {
    clearNode(dom.filterRow);
    filters.forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-chip${filter.id === state.activeFilter ? " is-active" : ""}`;
      button.dataset.filter = filter.id;
      button.textContent = filter.label;
      button.addEventListener("click", () => {
        state.activeFilter = filter.id;
        updateFilterState();
        applyFilters(filter.id);
      });
      dom.filterRow.appendChild(button);
    });
  }

  function updateFilterState() {
    dom.filterRow.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.filter === state.activeFilter);
    });
  }

  function createProjectCard(project, index) {
    const article = document.createElement("article");
    article.className = `card project-card reveal${index === 0 ? " is-wide" : ""}`;
    article.dataset.competencies = project.competencies.join(",");
    article.dataset.slug = project.slug;

    const chips = project.chips
      .map((chip) => `<span class="chip">${chip}</span>`)
      .join("");

    const modalOpenLabel = state.data.modal.openLabel;

    article.innerHTML = `
      <img src="${project.previewImage}" alt="${project.title}" style="width: 100%; border-radius: 12px; border: 1px solid rgba(170,205,255,0.24);" loading="lazy" />
      <div class="project-meta">
        <span class="project-tagline">${project.tagline}</span>
      </div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-summary">${project.context}</p>
      <div class="chips">${chips}</div>
      <button class="project-open" type="button" data-open-project="${project.slug}">${modalOpenLabel}</button>
    `;

    const openBtn = article.querySelector("[data-open-project]");
    openBtn.addEventListener("click", () => openProject(project.slug, true));
    return article;
  }

  function renderProjects(projects) {
    clearNode(dom.projectsGrid);
    projectBySlug.clear();

    projects.forEach((project, index) => {
      projectBySlug.set(project.slug, project);
      dom.projectsGrid.appendChild(createProjectCard(project, index));
    });

    applyFilters(state.activeFilter);
  }

  function applyFilters(filterKey) {
    dom.projectsGrid.querySelectorAll(".project-card").forEach((card) => {
      if (filterKey === "all") {
        card.classList.remove("is-hidden");
        return;
      }

      const competencies = (card.dataset.competencies || "").split(",");
      const visible = competencies.includes(filterKey);
      card.classList.toggle("is-hidden", !visible);
    });
  }

  function renderRoadmap(items) {
    clearNode(dom.roadmapList);
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "roadmap-item reveal";
      li.innerHTML = `
        <h3 class="roadmap-phase">${item.phase}</h3>
        <div class="roadmap-window">${item.window}</div>
        <div class="roadmap-focus">${item.focus}</div>
        <div class="roadmap-kpi"><strong>KPI:</strong> ${item.kpi}</div>
      `;
      dom.roadmapList.appendChild(li);
    });
  }

  function renderContact(contact) {
    clearNode(dom.contactList);
    clearNode(dom.contactNarrative);

    contact.items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="contact-label">${item.label}</div>
      `;

      const value = document.createElement(item.href ? "a" : "div");
      value.className = "contact-value";
      value.textContent = item.value;
      if (item.href) {
        value.href = item.href;
        value.target = item.href.startsWith("http") || item.href.startsWith("mailto:") ? "_blank" : "_self";
        if (value.target === "_blank") {
          value.rel = "noopener noreferrer";
        }
      }
      li.appendChild(value);
      dom.contactList.appendChild(li);
    });

    contact.narrative.forEach((line) => {
      const p = document.createElement("p");
      p.className = "project-summary";
      p.style.marginTop = "0";
      p.style.marginBottom = "12px";
      p.textContent = line;
      dom.contactNarrative.appendChild(p);
    });
  }

  function createList(items) {
    const list = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    return list;
  }

  function renderModalDetails(project) {
    dom.modalTitle.textContent = project.title;
    dom.modalTagline.textContent = project.tagline;

    clearNode(dom.modalChips);
    project.chips.forEach((chip) => {
      const span = document.createElement("span");
      span.className = "chip";
      span.textContent = chip;
      dom.modalChips.appendChild(span);
    });

    clearNode(dom.detailGrid);
    const f = state.data.modal.fields;

    const blocks = [
      [f.context, project.context],
      [f.problem, project.problem],
      [f.dataSources, project.dataSources],
      [f.method, project.method],
      [f.insights, project.insights],
      [f.decision, project.decision],
      [f.impact, project.impact],
      [f.nextExperiment, project.nextExperiment]
    ];

    blocks.forEach(([title, payload]) => {
      const block = document.createElement("section");
      block.className = "detail-block";
      const h4 = document.createElement("h4");
      h4.textContent = title;
      block.appendChild(h4);

      if (Array.isArray(payload)) {
        block.appendChild(createList(payload));
      } else {
        const p = document.createElement("p");
        p.textContent = payload;
        block.appendChild(p);
      }

      dom.detailGrid.appendChild(block);
    });

    clearNode(dom.artifactList);
    const artifactTitle = document.createElement("h4");
    artifactTitle.textContent = state.data.modal.artifactTitle;
    artifactTitle.style.margin = "0";
    artifactTitle.style.fontSize = "0.82rem";
    artifactTitle.style.letterSpacing = "0.08em";
    artifactTitle.style.textTransform = "uppercase";
    artifactTitle.style.color = "var(--text-secondary)";
    dom.artifactList.appendChild(artifactTitle);

    project.artifacts.forEach((artifact) => {
      const link = document.createElement("a");
      link.className = "btn btn-secondary";
      link.href = artifact.path;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = artifact.label;
      dom.artifactList.appendChild(link);
    });
  }

  function getSlugFromHash() {
    const rawHash = window.location.hash.replace(/^#/, "");
    if (rawHash.startsWith("project=")) {
      return decodeURIComponent(rawHash.slice("project=".length));
    }
    return null;
  }

  function setHashProject(slug) {
    const url = new URL(window.location.href);
    url.hash = `project=${encodeURIComponent(slug)}`;
    window.history.replaceState({}, "", url);
  }

  function clearHashProject() {
    const url = new URL(window.location.href);
    if (url.hash.startsWith("#project=")) {
      url.hash = "";
      window.history.replaceState({}, "", url);
    }
  }

  function openProject(slug, syncHash) {
    const project = projectBySlug.get(slug);
    if (!project) {
      return;
    }

    renderModalDetails(project);
    dom.projectModal.classList.add("is-open");
    dom.projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (syncHash) {
      setHashProject(slug);
    }
  }

  function closeProject() {
    dom.projectModal.classList.remove("is-open");
    dom.projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    clearHashProject();
  }

  function bindModalEvents() {
    dom.modalClose.addEventListener("click", closeProject);
    dom.projectModal.addEventListener("click", (event) => {
      if (event.target === dom.projectModal) {
        closeProject();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && dom.projectModal.classList.contains("is-open")) {
        closeProject();
      }
    });
  }

  function applyReveal() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = document.querySelectorAll(".reveal");

    if (reduceMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealNodes.forEach((node) => observer.observe(node));
  }

  function bindLanguageEvents() {
    dom.btnLangEn.addEventListener("click", () => switchLanguage("en"));
    dom.btnLangRu.addEventListener("click", () => switchLanguage("ru"));
  }

  async function switchLanguage(nextLang) {
    if (nextLang === state.lang) {
      return;
    }

    state.lang = nextLang;
    setLangInUrl(nextLang);
    updateLanguageButtons();

    try {
      state.data = await loadContent(nextLang);
      renderAll();
    } catch (error) {
      console.error(error);
    }
  }

  function renderAll() {
    renderSections(state.data);
    renderHero(state.data);
    renderKpis(state.data.kpis);
    renderFilters(state.data.filters);
    renderProjects(state.data.projects);
    renderRoadmap(state.data.roadmap);
    renderContact(state.data.contact);
    applyReveal();

    const slugFromHash = getSlugFromHash();
    if (slugFromHash) {
      openProject(slugFromHash, false);
    }
  }

  function bindHashListener() {
    window.addEventListener("hashchange", () => {
      const slug = getSlugFromHash();
      if (slug) {
        openProject(slug, false);
      } else if (dom.projectModal.classList.contains("is-open")) {
        dom.projectModal.classList.remove("is-open");
        dom.projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    });
  }

  async function init() {
    bindLanguageEvents();
    bindModalEvents();
    bindHashListener();

    state.lang = readInitialLang();
    updateLanguageButtons();
    setLangInUrl(state.lang);

    try {
      state.data = await loadContent(state.lang);
      renderAll();
    } catch (error) {
      console.error(error);
      dom.heroHeadline.textContent = "Unable to load dashboard content.";
      dom.heroSubheadline.textContent = "Please run this dashboard through a local static server (for example, python -m http.server).";
    }
  }

  init();
})();
