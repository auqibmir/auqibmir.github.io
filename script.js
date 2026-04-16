// Typing Animation
const nameText = "Aaqib Mir";
let i = 0;

function type() {
  if (i < nameText.length) {
    document.getElementById("nameTyping").innerHTML += nameText[i];
    i++;
    setTimeout(type, 100);
  }
}
setTimeout(type, 300);

// Scroll Animation
const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach(el => observer.observe(el));

// CURSOR GLOW
const cursor = document.createElement("div");
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.background = "#6366f1";
cursor.style.position = "fixed";
cursor.style.borderRadius = "50%";
cursor.style.pointerEvents = "none";
cursor.style.filter = "blur(10px)";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const btn = document.getElementById("sendBtn");

form.addEventListener("submit", function () {
  btn.innerText = "Sending...";
});

form.addEventListener("submit", function () {
  setTimeout(() => {
    popup.classList.add("show");
    btn.innerText = "Send Message";
  }, 2000);
});

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
let shootingStars = [];

let mouse = { x: w / 2, y: h / 2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// CREATE STARS
for (let i = 0; i < 250; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    depth: Math.random() * 2
  });
}

// CREATE SHOOTING STARS
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * w,
    y: 0,
    len: Math.random() * 80 + 50,
    speed: Math.random() * 10 + 6,
    angle: Math.PI / 4
  });
}

// EVERY FEW SECONDS
setInterval(createShootingStar, 3000);

function draw() {
  ctx.clearRect(0, 0, w, h);

  // 🌌 NEBULA GLOW
  let gradient = ctx.createRadialGradient(
    w / 2, h / 2, 0,
    w / 2, h / 2, w
  );
 gradient.addColorStop(0, "rgba(255,255,255,0.03)");
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // ✨ STARS
  stars.forEach((star, i) => {
    let dx = (mouse.x - w / 2) * 0.0003 * star.depth;
    let dy = (mouse.y - h / 2) * 0.0003 * star.depth;

    star.x += star.speedX + dx;
    star.y += star.speedY + dy;

    if (star.x < 0) star.x = w;
    if (star.x > w) star.x = 0;
    if (star.y < 0) star.y = h;
    if (star.y > h) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * star.depth, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.fill();

    // 🔗 PARTICLE CONNECTIONS
    for (let j = i + 1; j < stars.length; j++) {
      let dx = star.x - stars[j].x;
      let dy = star.y - stars[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  });

  // 💫 SHOOTING STARS
  shootingStars.forEach((s, index) => {
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(
      s.x - Math.cos(s.angle) * s.len,
      s.y - Math.sin(s.angle) * s.len
    );
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (s.x > w || s.y > h) {
      shootingStars.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();