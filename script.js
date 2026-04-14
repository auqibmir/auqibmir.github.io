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