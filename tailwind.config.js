module.exports = {
  content: [
    "./index.html", // Главная страница
    "./*.html", // Все HTML-файлы в корне
    "./**/*.js", // JS-файлы (если есть)
    "./**/*.css", // CSS-файлы (например, style.css)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
