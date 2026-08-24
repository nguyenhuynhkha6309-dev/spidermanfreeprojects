/* =========================================
   SPIDER-MAN — BEYOND THE MASK
   NO LOADING SCREEN
========================================= */


/* CITY + STARS */

const canvas =
  document.getElementById("cityCanvas");

const ctx =
  canvas.getContext("2d");

let stars = [];

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};


function resize() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

  createStars();

}


function createStars() {

  stars = [];

  const amount =
    window.innerWidth < 700
      ? 100
      : 220;

  for (let i = 0; i < amount; i++) {

    stars.push({

      x:
        Math.random() *
        canvas.width,

      y:
        Math.random() *
        canvas.height,

      size:
        Math.random() * 1.2 + .2,

      opacity:
        Math.random() * .6 + .15,

      speed:
        Math.random() * .15 + .02

    });

  }

}


function draw() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  /* NIGHT SKY */

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height
    );

  gradient.addColorStop(
    0,
    "#03050a"
  );

  gradient.addColorStop(
    1,
    "#09070b"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  /* STARS */

  stars.forEach(star => {

    star.y -= star.speed;

    if (star.y < 0) {

      star.y =
        canvas.height;

    }

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${star.opacity})`;

    ctx.fill();

  });


  /* CITY */

  const buildings =
    35;

  const width =
    canvas.width /
    buildings;


  for (let i = 0; i < buildings; i++) {

    const height =
      60 +
      Math.random() *
      170;

    const x =
      i * width;

    const y =
      canvas.height -
      height;


    ctx.fillStyle =
      "#030407";

    ctx.fillRect(
      x,
      y,
      width + 2,
      height
    );


    /* WINDOWS */

    for (
      let wy = y + 15;
      wy < canvas.height - 10;
      wy += 18
    ) {

      for (
        let wx = x + 7;
        wx < x + width - 5;
        wx += 13
      ) {

        if (
          Math.random() > .68
        ) {

          ctx.fillStyle =
            Math.random() > .8
              ? "rgba(237,28,36,.4)"
              : "rgba(255,210,120,.18)";

          ctx.fillRect(
            wx,
            wy,
            3,
            5
          );

        }

      }

    }

  }


  requestAnimationFrame(draw);

}


resize();

draw();


window.addEventListener(
  "resize",
  resize
);


/* MOUSE */

document.addEventListener(
  "mousemove",
  e => {

    mouse.x =
      e.clientX;

    mouse.y =
      e.clientY;

  }
);


/* NAV */

const menu =
  document.getElementById("menu");

const nav =
  document.getElementById("nav");

const links =
  document.querySelectorAll(
    "nav a"
  );


menu?.addEventListener(
  "click",
  () => {

    nav.classList.toggle(
      "mobile"
    );

  }
);


links.forEach(link => {

  link.addEventListener(
    "click",
    () => {

      nav.classList.remove(
        "mobile"
      );

    }
  );

});


/* SMOOTH SCROLL */

function goTo(id) {

  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth"
    });

}


document
  .getElementById("swingButton")
  ?.addEventListener(
    "click",
    () => goTo("suits")
  );


document
  .getElementById("storyButton")
  ?.addEventListener(
    "click",
    () => goTo("story")
  );


/* ACTIVE NAV */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


window.addEventListener(
  "scroll",
  () => {

    let current = "";

    sections.forEach(section => {

      if (
        window.scrollY >=
        section.offsetTop - 250
      ) {

        current =
          section.id;

      }

    });


    links.forEach(link => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
        "#" + current
      );

    });

  },
  { passive: true }
);


/* SPIDER PARALLAX */

const spiderStage =
  document.querySelector(
    ".spider-stage"
  );

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


document.addEventListener(
  "mousemove",
  e => {

    if (
      window.innerWidth < 800 ||
      !spiderStage
    ) return;


    targetX =
      (e.clientX /
      window.innerWidth -
      .5) * 12;


    targetY =
      (e.clientY /
      window.innerHeight -
      .5) * 10;

  }
);


function spiderParallax() {

  currentX +=
    (targetX - currentX) *
    .08;

  currentY +=
    (targetY - currentY) *
    .08;


  if (spiderStage) {

    spiderStage.style.transform =
      `
      translate3d(
        ${currentX}px,
        ${currentY}px,
        0
      )
      `;

  }


  requestAnimationFrame(
    spiderParallax
  );

}


spiderParallax();


/* 3D SUIT CARDS */

if (
  window.innerWidth > 800
) {

  document
    .querySelectorAll(
      ".suit-card,.villain-card"
    )
    .forEach(card => {

      card.addEventListener(
        "mousemove",
        e => {

          const rect =
            card.getBoundingClientRect();


          const x =
            e.clientX -
            rect.left;

          const y =
            e.clientY -
            rect.top;


          const rotateX =
            ((y /
              rect.height) -
              .5) *
            -5;


          const rotateY =
            ((x /
              rect.width) -
              .5) *
            5;


          card.style.transform =
            `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

}


/* SUIT DATA */

const suits = {

  classic: {

    type:
      "THE ORIGINAL",

    title:
      "CLASSIC",

    description:
      "The legendary red and blue suit. Simple, iconic and instantly recognizable. The symbol of Spider-Man as generations know him.",

    origin:
      "EARTH-616",

    style:
      "CLASSIC"

  },


  black: {

    type:
      "SYMBIOTE",

    title:
      "BLACK SUIT",

    description:
      "A mysterious alien symbiote that dramatically increases Peter's abilities while introducing a dangerous influence.",

    origin:
      "ALIEN SYMBIOTE",

    style:
      "DARK"

  },


  iron: {

    type:
      "STARK TECHNOLOGY",

    title:
      "IRON SPIDER",

    description:
      "An advanced suit built with cutting-edge technology, enhanced protection and mechanical spider arms.",

    origin:
      "STARK INDUSTRIES",

    style:
      "ARMOR"

  },


  miles: {

    type:
      "SPIDER-VERSE",

    title:
      "MILES MORALES",

    description:
      "A new Spider-Man from another universe. Stealth, electricity and camouflage give this Spider a style all his own.",

    origin:
      "EARTH-1610",

    style:
      "STEALTH"

  }

};


/* MODAL */

const modal =
  document.getElementById(
    "suitModal"
  );

const closeModal =
  document.getElementById(
    "closeModal"
  );

const modalType =
  document.getElementById(
    "modalType"
  );

const modalTitle =
  document.getElementById(
    "modalTitle"
  );

const modalDescription =
  document.getElementById(
    "modalDescription"
  );

const modalOrigin =
  document.getElementById(
    "modalOrigin"
  );

const modalStyle =
  document.getElementById(
    "modalStyle"
  );


function openSuit(name) {

  const suit =
    suits[name];

  if (!suit) return;


  modalType.textContent =
    suit.type;

  modalTitle.textContent =
    suit.title;

  modalDescription.textContent =
    suit.description;

  modalOrigin.textContent =
    suit.origin;

  modalStyle.textContent =
    suit.style;


  modal.classList.add(
    "active"
  );

}


document
  .querySelectorAll(
    ".discover"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      e => {

        const card =
          e.currentTarget
            .closest(
              ".suit-card"
            );

        openSuit(
          card.dataset.suit
        );

      }
    );

  });


closeModal?.addEventListener(
  "click",
  () => {

    modal.classList.remove(
      "active"
    );

  }
);


modal?.addEventListener(
  "click",
  e => {

    if (
      e.target === modal
    ) {

      modal.classList.remove(
        "active"
      );

    }

  }
);


/* RANDOM SUIT */

document
  .getElementById("randomSuit")
  ?.addEventListener(
    "click",
    () => {

      const names =
        Object.keys(suits);

      const random =
        names[
          Math.floor(
            Math.random() *
            names.length
          )
        ];

      openSuit(random);

    }
  );


/* SPIDER VERSE */

const verse =
  document.getElementById(
    "verse"
  );

const verseButton =
  document.getElementById(
    "verseButton"
  );

const verseClose =
  document.getElementById(
    "verseClose"
  );


verseButton?.addEventListener(
  "click",
  () => {

    verse.classList.add(
      "active"
    );

  }
);


verseClose?.addEventListener(
  "click",
  () => {

    verse.classList.remove(
      "active"
    );

  }
);


/* ESC */

document.addEventListener(
  "keydown",
  e => {

    if (
      e.key === "Escape"
    ) {

      modal?.classList.remove(
        "active"
      );

      verse?.classList.remove(
        "active"
      );

    }

  }
);


/* TOP */

document
  .getElementById("topButton")
  ?.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


/* REVEAL */

const reveal =
  document.querySelectorAll(
    ".section-heading," +
    ".suit-card," +
    ".villain-card," +
    ".story-content," +
    ".story-visual"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "show"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: .08
    }
  );


reveal.forEach(el => {

  el.classList.add(
    "reveal"
  );

  observer.observe(el);

});


/* REVEAL STYLE */

const revealStyle =
  document.createElement(
    "style"
  );

revealStyle.textContent = `

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity .8s ease,
    transform .8s ease;
}

.reveal.show {
  opacity: 1;
  transform: translateY(0);
}

`;

document.head.appendChild(
  revealStyle
);


/* CONSOLE */

console.log(
  "%c🕷 SPIDER-MAN ONLINE",
  "font-size:24px;font-weight:900;color:#ed1c24;"
);

console.log(
  "%cWITH GREAT POWER COMES GREAT RESPONSIBILITY.",
  "font-size:11px;color:#888;"
);
