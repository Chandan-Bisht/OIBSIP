// theme setting
const theme = document.querySelector(".mode");
const html = document.querySelector("html");
const dropdownContent = document.querySelector(".dropdown-content");
const dropdownItem = document.querySelector(".dropdown-item");
const todos_list_header = document.querySelector(".todos-list-header");

// Load theme preference from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
}

// setting event listener for toggle between dark and light mode
theme.addEventListener("click", () => {
  toggleTheme();
});

function toggleTheme() {
  theme.classList.toggle("active");

  if (theme.classList.contains("active")) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  // Save theme preference to localStorage
  localStorage.setItem(
    "theme",
    theme.classList.contains("active") ? "dark" : "light"
  );
}

function applyTheme(selectedTheme) {
  if (selectedTheme === "dark") {
    theme.innerHTML = `<i class="bx bxs-moon bx-sm"></i>`;
    document.body.style.backgroundColor = "#2b313c";
    document.body.style.color = "#a7adbb";
    dropdownContent.style.backgroundColor = "#242933";
    todos_list_header.style.backgroundColor = "#252833";
    todos_list_body.style.backgroundColor = "#2a313d";
  } else {
    theme.innerHTML = `<i class="bx bxs-sun bx-sm"></i>`;
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    dropdownContent.style.backgroundColor = "";
    todos_list_header.style.backgroundColor = "";
    todos_list_body.style.backgroundColor = "";
  }
}
