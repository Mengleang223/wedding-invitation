import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./polish.css";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
// Khmer-safe wipe: negative insets so vowel marks and subscripts are never clipped
const WIPE0 = "inset(-40% 110% -40% -10%)";
const WIPE1 = "inset(-40% -10% -40% -10%)";
const st = (trigger, o = {}) => ({
  trigger,
  start: "top 80%",
  once: true,
  ...o,
});

/* Photos: keep the hero as a true full-screen cover; use contain for tall supporting photos when needed. */
function fitPhotos() {
  const imgs = $$(
    ".hero-image,.countdown-image,.thankyou-image,.candle-section>img",
  );
  const run = (img) => {
    const box = img.parentElement;
    if (!img.naturalWidth || !box.clientHeight) return;
    const crop = Math.max(
      img.naturalWidth /
        img.naturalHeight /
        (box.clientWidth / box.clientHeight),
      box.clientWidth /
        box.clientHeight /
        (img.naturalWidth / img.naturalHeight),
    );
    const contain = !img.classList.contains("hero-image") && crop > 1.8;
    img.classList.toggle("fit-contain", contain);
    let bg = $(".bg-blur", box);
    if (contain && !bg) {
      bg = document.createElement("div");
      bg.className = "bg-blur";
      bg.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
      box.prepend(bg);
    }
    if (bg) bg.hidden = !contain;
  };
  imgs.forEach((img) =>
    img.complete ? run(img) : img.addEventListener("load", () => run(img)),
  );
  let w = innerWidth;
  addEventListener("resize", () => {
    if (Math.abs(innerWidth - w) > 40) {
      w = innerWidth;
      imgs.forEach(run);
    }
  });
}

function heroIn() {
  gsap
    .timeline({ delay: 0.3, defaults: { ease: "expo.out" } })
    .from(".hero .crest", { opacity: 0, y: 18, duration: 1.4 })
    .from(".hero .eyebrow", { opacity: 0, y: 12, duration: 1.1 }, "-=1")
    .fromTo(
      ".hero-names .gold-text",
      { clipPath: WIPE0 },
      {
        clipPath: WIPE1,
        duration: 1.5,
        stagger: 0.35,
        ease: "power3.inOut",
        clearProps: "clipPath",
      },
      "-=.8",
    )
    .from(
      ".hero-names small",
      { scale: 0, opacity: 0, duration: 0.9, ease: "back.out(2.4)" },
      "-=1.1",
    )
    .from(".names-en", { opacity: 0, y: 10, duration: 1 }, "-=.6")
    .from(".hero-rule", { scaleX: 0, duration: 1.2 }, "<")
    .from(
      ".invite-line,.date-lockup>*,.lunar,.hero-venue",
      { opacity: 0, y: 14, duration: 1, stagger: 0.07 },
      "-=.8",
    )
    .from(".scroll-cue", { opacity: 0, duration: 1 }, "-=.4");
}

function envelope(lenis) {
  const screen = $("#envelopeScreen"),
    stage = $("#envelopeStage"),
    flap = $("#envelopeFlap"),
    card = $(".envelope-card-preview"),
    invitation = $("#invitation");
  // inner back panel, two-faced flap (front + cream lining), cast shadow
  const back = Object.assign(document.createElement("div"), {
    className: "envelope-back",
  });
  stage.prepend(back);
  $(".flap-lining", flap).remove();
  const front = Object.assign(document.createElement("div"), {
    className: "flap-face flap-front",
  });
  front.append(...flap.childNodes);
  flap.append(
    front,
    Object.assign(document.createElement("div"), {
      className: "flap-face flap-back",
    }),
  );
  const cast = Object.assign(document.createElement("div"), {
    className: "flap-cast",
  });
  $(".envelope-pocket").append(cast);
  const old = $("#openInvitation");
  const seal = old.cloneNode(true);
  old.replaceWith(seal); // drops the old CSS-class handler

  gsap.set(seal, { xPercent: -50, yPercent: -50 });
  gsap.set(card, { yPercent: 10, rotation: -1 });
  gsap.set(flap, { transformOrigin: "50% 0", transformPerspective: 1400 });
  gsap.from(".envelope-intro > *", {
    opacity: 0,
    y: 16,
    stagger: 0.15,
    duration: 1.3,
    ease: "expo.out",
  });
  gsap.from(stage, { opacity: 0, duration: 1.4 });

  const idle = gsap.to(stage, {
    y: -7,
    rotation: 0.35,
    duration: 3.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  const rx = gsap.quickTo(stage, "rotationX", {
    duration: 0.9,
    ease: "power3",
  });
  const ry = gsap.quickTo(stage, "rotationY", {
    duration: 0.9,
    ease: "power3",
  });
  const tilt = (e) => {
    rx((e.clientY / innerHeight - 0.5) * -8);
    ry((e.clientX / innerWidth - 0.5) * 10);
  };
  addEventListener("pointermove", tilt);

  const finish = () => {
    invitation.classList.add("is-visible");
    scrollTo(0, 0);
    root.classList.remove("locked");
    lenis?.start();
    gsap.to(screen, {
      autoAlpha: 0,
      duration: 1,
      onComplete: () => screen.classList.add("is-gone"),
    });
    heroIn();
  };

  let opened = false;
  seal.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    // The seal tap is the user's gesture, so mobile browsers allow the MP3 to start here.
    window.startWeddingMusic?.();
    idle.kill();
    removeEventListener("pointermove", tilt);
    if (reduce) {
      screen.classList.add("is-gone");
      invitation.classList.add("is-visible");
      root.classList.remove("locked");
      return;
    }
    gsap.to(stage, {
      rotationX: 0,
      rotationY: 0,
      rotation: 0,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    });
    const dark = Object.assign(document.createElement("div"), {
      className: "fade-dark",
    });
    screen.append(dark);
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    tl.to(seal, { scale: 0.92, "--sh": "3px", duration: 0.5 }, 0) // pressed
      .to(
        seal,
        { scale: 1.1, y: -26, rotation: -8, "--sh": "26px", duration: 0.9 },
        0.55,
      ) // lifted, shadow grows
      .to(".tap-note,.envelope-intro", { opacity: 0, duration: 0.8 }, 0.55)
      .to(
        seal,
        {
          x: innerWidth * 0.75,
          y: -innerHeight * 0.25,
          rotation: 40,
          duration: 0.9,
          ease: "power2.in",
        },
        1.45,
      ) // set aside
      .to(cast, { opacity: 0, duration: 0.9 }, 2.2)
      .to(flap, { rotationX: -180, duration: 1.5 }, 2.2) // flap folds back
      .set(flap, { zIndex: 1 }, 2.95) // behind the card past 90°
      .to(
        ".envelope-shadow",
        { opacity: 0.15, scaleX: 0.7, duration: 1.5 },
        2.2,
      )
      .to(card, { yPercent: -38, rotation: -4, duration: 1.1 }, 3.5) // card drawn out
      .to(stage, { y: 24, duration: 1.1 }, 3.5) // envelope eases down
      .call(
        () => {
          // card leaves the envelope
          const r = card.getBoundingClientRect(),
            s = screen.getBoundingClientRect(),
            w = card.offsetWidth,
            h = card.offsetHeight;
          const rot = gsap.getProperty(card, "rotation"),
            left = r.left + r.width / 2 - w / 2 - s.left,
            top = r.top + r.height / 2 - h / 2 - s.top;
          screen.append(card);
          gsap.set(card, {
            position: "absolute",
            right: "auto",
            bottom: "auto",
            left,
            top,
            width: w,
            height: h,
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            zIndex: 8,
            rotation: rot,
          });
          const k = Math.min((s.width * 0.82) / w, (s.height * 0.72) / h);
          gsap.to(card, {
            x: s.width / 2 - (left + w / 2),
            y: s.height / 2 - (top + h / 2),
            scale: k,
            rotation: 0,
            duration: 1.1,
            ease: "power3.inOut",
          });
        },
        null,
        4.6,
      )
      .to(
        stage,
        { y: innerHeight * 1.1, duration: 0.9, ease: "power2.in" },
        4.6,
      ) // envelope dropped out of frame
      .to(dark, { opacity: 1, duration: 0.5 }, 5.4) // through dark
      .call(finish, null, 5.9);
  });

  // Mobile-friendly fallback: the whole welcome paper is tappable, while the
  // seal remains the visual focus and the only interactive child control.
  stage.addEventListener("click", (event) => {
    if (!event.target.closest("button,a")) seal.click();
  });
}

function sections() {
  // headings: wipe left to right
  $$(".section-heading").forEach((h) => {
    gsap.from($(".eyebrow", h), {
      opacity: 0,
      y: 10,
      duration: 1,
      scrollTrigger: st(h),
    });
    gsap.fromTo(
      $("h2", h),
      { clipPath: WIPE0 },
      {
        clipPath: WIPE1,
        duration: 1.3,
        ease: "power3.inOut",
        clearProps: "clipPath",
        scrollTrigger: st(h),
      },
    );
  });
  gsap.to(".hero-content", {
    yPercent: -8,
    opacity: 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // words: panel opens from the centre
  gsap
    .timeline({ scrollTrigger: st(".paper-panel") })
    .from(".paper-panel", {
      clipPath: "inset(0% 50% 0% 50%)",
      duration: 1.4,
      ease: "expo.inOut",
      clearProps: "clipPath",
    })
    .from(
      ".paper-panel > *",
      { opacity: 0, y: 22, stagger: 0.12, duration: 1, ease: "expo.out" },
      "-=.8",
    );

  // couple: photos swing in from the sides
  gsap.from(".photo-groom", {
    x: -70,
    rotation: -5,
    opacity: 0,
    duration: 1.6,
    ease: "expo.out",
    scrollTrigger: st(".couple-stage"),
  });
  gsap.from(".photo-bride", {
    x: 70,
    rotation: 5,
    opacity: 0,
    duration: 1.6,
    ease: "expo.out",
    scrollTrigger: st(".couple-stage"),
  });
  gsap.from(".couple-copy > *", {
    opacity: 0,
    y: 24,
    stagger: 0.15,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: st(".couple-stage"),
  });

  // countdown: marquee drifts with scroll, numbers tip forward
  gsap.set(".marquee", { rotation: -10, yPercent: -50 });
  gsap.to(".marquee", {
    xPercent: -18,
    ease: "none",
    scrollTrigger: {
      trigger: "#countdown",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.from(".timer > div", {
    opacity: 0,
    y: 30,
    rotationX: -60,
    transformPerspective: 600,
    stagger: 0.12,
    duration: 1.1,
    ease: "back.out(1.6)",
    scrollTrigger: st("#timer"),
  });

  // programme: gold thread draws, icons light up
  gsap.fromTo(
    ".gold-thread",
    { scaleY: 0, transformOrigin: "top" },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".programme-list",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.5,
      },
    },
  );
  $$(".programme-item").forEach((it) => {
    gsap.from(it, {
      x: 36,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: st(it),
    });
    ScrollTrigger.create({
      trigger: it,
      start: "top 62%",
      once: true,
      onEnter: () => $(".ritual-icon", it).classList.add("lit"),
    });
  });

  // story: pinned sideways strip, day to dusk
  const story = $("#story"),
    strip = $(".story-strip");
  const dusk = Object.assign(document.createElement("div"), {
    className: "dusk",
  });
  story.prepend(dusk);
  gsap.set(strip, { rotation: -1.5 });
  const dist = () =>
    Math.max(300, strip.scrollWidth - innerWidth + innerWidth * 0.1);
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: story,
        start: "top top",
        end: () => "+=" + dist() * 1.1,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    .to(strip, { x: () => -dist() }, 0)
    .to(dusk, { opacity: 1 }, 0);

  // candlelight: touch makes ripples and a floating lotus lantern
  const sec = $("#candle");
  const lotus =
    '<svg viewBox="0 0 40 30" width="34"><g fill="#f6e5ae"><path d="M20 2C13 9 13 20 20 28 27 20 27 9 20 2Z"/><path d="M6 10C8 20 14 26 20 28 17 20 13 12 6 10Z" opacity=".8"/><path d="M34 10C32 20 26 26 20 28 23 20 27 12 34 10Z" opacity=".8"/></g></svg>';
  sec.addEventListener("pointerdown", (e) => {
    const r = sec.getBoundingClientRect(),
      pos = { left: e.clientX - r.left + "px", top: e.clientY - r.top + "px" };
    const ring = Object.assign(document.createElement("i"), {
      className: "ring",
    });
    Object.assign(ring.style, pos);
    sec.append(ring);
    gsap.fromTo(
      ring,
      { scale: 0.1, opacity: 0.7 },
      {
        scale: 5,
        opacity: 0,
        duration: 2.2,
        ease: "power2.out",
        onComplete: () => ring.remove(),
      },
    );
    if ($$(".lantern", sec).length > 5) return;
    const l = Object.assign(document.createElement("i"), {
      className: "lantern",
      innerHTML: lotus,
    });
    Object.assign(l.style, pos);
    sec.append(l);
    gsap
      .timeline({ onComplete: () => l.remove() })
      .fromTo(
        l,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
      )
      .to(
        l,
        {
          y: -140,
          x: (Math.random() - 0.5) * 80,
          duration: 6,
          ease: "sine.out",
        },
        0,
      )
      .to(l, { opacity: 0, duration: 1.6 }, 4.4);
  });

  // gallery: tiles unmask one by one
  gsap.set(".gallery-item", { clipPath: "inset(100% 0% 0% 0%)", willChange: "clip-path" });
  ScrollTrigger.batch(".gallery-item", {
    start: "top 90%",
    interval: 0.16,
    batchMax: 2,
    once: true,
    onEnter: (b) =>
      gsap.to(b, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.35,
        ease: "power3.out",
        stagger: 0.16,
        clearProps: "clipPath,willChange",
      }),
  });

  // venue, gift
  gsap.from(".venue-copy > *", {
    opacity: 0,
    x: -40,
    stagger: 0.1,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: st("#venue"),
  });
  gsap.fromTo(
    ".map-frame",
    { clipPath: "inset(0 0 0 100%)" },
    {
      clipPath: "inset(0 0 0 0)",
      duration: 1.5,
      ease: "expo.inOut",
      clearProps: "clipPath",
      scrollTrigger: st("#venue"),
    },
  );
  gsap.from(".gift-card", {
    opacity: 0,
    y: 50,
    rotationX: -22,
    transformPerspective: 900,
    transformOrigin: "50% 0",
    duration: 1.5,
    ease: "expo.out",
    scrollTrigger: st("#gift"),
  });

  // thank you: candles light one by one
  const row = Object.assign(document.createElement("div"), {
    className: "candles",
    innerHTML: '<span class="candle"><b class="flame"></b></span>'.repeat(5),
  });
  $(".thankyou-copy h2").before(row);
  const flames = $$(".flame", row);
  gsap.fromTo(
    flames,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.35,
      duration: 0.9,
      ease: "back.out(3)",
      scrollTrigger: st("#thankyou", { start: "top 60%" }),
      onComplete: () =>
        flames.forEach((f, i) =>
          gsap.to(f, {
            scaleY: 1.15,
            scaleX: 0.94,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.13,
          }),
        ),
    },
  );
  gsap.fromTo(
    ".thankyou-copy h2",
    { clipPath: WIPE0 },
    {
      clipPath: WIPE1,
      duration: 1.4,
      ease: "power3.inOut",
      clearProps: "clipPath",
      scrollTrigger: st("#thankyou", { start: "top 55%" }),
    },
  );
  gsap.from(".share-actions button,.final-logo", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: st(".share-actions", { start: "top 92%" }),
  });
}

function lightboxSwipe() {
  const lb = $("#lightbox");
  let sx = 0;
  lb.addEventListener("pointerdown", (e) => (sx = e.clientX));
  lb.addEventListener("pointerup", (e) => {
    const d = e.clientX - sx;
    if (Math.abs(d) > 50) $(d < 0 ? "#lightboxNext" : "#lightboxPrev").click();
  });
  $("#lightboxImage").addEventListener("load", (e) =>
    gsap.fromTo(
      e.target,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
    ),
  );
}

export function initMotion() {
  fitPhotos();
  root.classList.add("locked");
  let lenis;
  if (fine && !reduce) {
    lenis = new Lenis({ lerp: 0.085 });
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        lenis.scrollTo(a.getAttribute("href"), { duration: 1.4 });
      }),
    );
  }
  envelope(lenis);
  lightboxSwipe();
  if (!reduce) sections();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener("load", () => ScrollTrigger.refresh());
}
