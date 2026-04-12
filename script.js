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

// Cursor Glow
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

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

// Theme Toggle
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
};