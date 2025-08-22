# Sudoku Generator and Solver

**[Русская версия](#russian-version)** | **[English Version](#english-version)**

---

## English Version

### Overview

Welcome to the **Sudoku Generator and Solver**, a sleek and intuitive web application designed for puzzle enthusiasts! This project lets you generate, play, and solve Sudoku puzzles with ease. Built with vanilla web technologies, it’s lightweight, responsive, and packed with features to make your Sudoku experience fun and engaging. Whether you're a casual player or a puzzle master, this app has something for you!

### Features

- **Puzzle Generation**: Create random Sudoku puzzles with three difficulty levels: Easy, Medium, or Hard.
- **Auto-Solver**: Solve puzzles instantly with a visually appealing animation powered by a backtracking algorithm.
- **Hints**: Get up to 3 hints per game to fill in an empty cell. In Custom Mode, enjoy unlimited hints!
- **Custom Mode**: Input your own Sudoku puzzle and solve it or get hints without restrictions.
- **Real-Time Feedback**: Errors are highlighted in red as you play, with conflict detection in Custom Mode.
- **Smart Highlights**: Clicking a cell highlights its row, column, 3x3 block, and cells with the same number for easier gameplay.
- **Timer**: Tracks your solving time, stopping when you complete the puzzle.
- **Themes**: Switch between Light and Dark modes for a comfortable experience in any lighting.
- **Clear Grid**: Reset the board to start fresh.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices (best on larger screens).

Everything runs client-side, so no server is needed, and puzzles are freshly generated every time for endless replayability.

### Demo

Try it out live: [Live Demo](https://yourusername.github.io/sudoku-solver/)  
*(Replace "yourusername" with your GitHub username if hosting on GitHub Pages. To enable: Go to Repository Settings > Pages > Select `main` branch > Save.)*

### Technologies Used

- **HTML5**: Structures the game interface, including the grid, buttons, and settings panel.
- **CSS3**: Powers the styling with gradients, animations, responsive layouts, and theme switching (Light/Dark).
- **JavaScript (Vanilla)**: Drives the core logic, including puzzle generation, backtracking solver, cell highlighting, timer, and user interactions.
- **Font Awesome**: Provides icons for buttons (e.g., generate, solve, hint, settings).
- No external frameworks or dependencies – pure, lightweight code compatible with modern browsers.

### How to Use

#### Running Locally
1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/sudoku-solver.git
   ```
2. Open `index.html` in a modern web browser (e.g., Chrome, Firefox, Edge).
3. Start playing – no setup or dependencies required!

#### Playing the Game
- **Generate a Puzzle**: Select a difficulty (Easy, Medium, Hard) in the settings panel, then click the green refresh button.
- **Enter Numbers**: Click a cell and type a number (1-9). Pre-filled cells are locked in normal mode.
- **Check Errors**: Incorrect numbers are highlighted in red. In Custom Mode, conflicts are detected instantly.
- **Use Hints**: Click the orange lightbulb button to fill one empty cell (3 hints max in normal mode, unlimited in Custom Mode).
- **Solve**: Click the purple checkmark button to auto-solve with an animation.
- **Clear Grid**: Use the red trash button to reset editable cells.
- **Settings**: Click the gear button to adjust:
  - **Difficulty**: Easy, Medium, or Hard.
  - **Mode**: Toggle between Normal and Custom Mode (edit the entire grid).
  - **Theme**: Switch between Light and Dark modes.
- **Win**: Complete the puzzle correctly to see a congratulatory message and stop the timer.

In **Custom Mode**, input your own puzzle, then use the Solve or Hint buttons to check or complete it.

### Project Structure

```
sudoku-solver/
├── index.html       # Main HTML file with the game structure
├── style.css        # Styles for layout, themes, and animations
├── main.js          # Core logic for puzzle generation, solving, and interactions
└── README.md        # This file
```

### Contributing

Got ideas or found a bug? I’d love to hear from you!  
- **Report Issues**: Open an issue on GitHub for bugs or feature suggestions (e.g., new difficulty levels, multiplayer mode).
- **Submit Pull Requests**: Feel free to fork the repo and contribute improvements.
- Check out `main.js` for logic tweaks or `style.css` for visual enhancements.

### License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and share it, but please give credit where it’s due.

### Acknowledgements

Thanks to the open-source community and puzzle lovers everywhere! Built with ☕ and a passion for coding.

Happy puzzling! 🧩

---

## Russian Version

### Обзор

Добро пожаловать в **Генератор и Решатель Судоку** – простое и удобное веб-приложение для любителей головоломок! Это приложение позволяет создавать, решать и играть в Судоку с удовольствием. Оно построено на чистых веб-технологиях, легковесное, адаптивное и полно крутых функций. Неважно, новичок вы или мастер головоломок – здесь найдётся что-то для вас!

### Возможности

- **Генерация Головоломок**: Создавайте случайные Судоку с тремя уровнями сложности: Лёгкий, Средний, Тяжёлый.
- **Авто-Решатель**: Нажмите "Решить", чтобы увидеть, как головоломка заполняется с красивой анимацией (используется алгоритм бэктрекинга).
- **Подсказки**: Получайте до 3 подсказок за игру для заполнения пустой ячейки. В режиме своей игры – безлимитные подсказки!
- **Режим Своей Игры**: Введите свою головоломку и решайте её или берите подсказки без ограничений.
- **Обратная Связь**: Ошибки подсвечиваются красным по мере игры, с моментальной проверкой конфликтов в режиме своей игры.
- **Умная Подсветка**: Клик на ячейку подсвечивает строку, столбец, блок 3x3 и ячейки с тем же числом – очень удобно!
- **Таймер**: Отслеживает время решения, останавливается при завершении.
- **Темы**: Переключайтесь между Светлой и Тёмной темами для комфортной игры в любое время.
- **Очистка Сетки**: Сбросьте доску, чтобы начать заново.
- **Адаптивность**: Работает на компьютерах, планшетах и телефонах (лучше на больших экранах).

Всё работает на стороне клиента, без сервера. Головоломки генерируются заново каждый раз – бесконечное удовольствие!

### Демо

Попробуйте вживую: [Живое Демо](https://yourusername.github.io/sudoku-solver/)  
*(Замените "yourusername" на ваше имя пользователя GitHub, если хостите на GitHub Pages. Для настройки: Репозиторий > Настройки > Pages > Выберите ветку `main` > Сохранить.)*

### Используемые Технологии

- **HTML5**: Структура интерфейса игры – сетка, кнопки, панель настроек.
- **CSS3**: Стилизация с градиентами, анимациями, адаптивным дизайном и переключением тем (Светлая/Тёмная).
- **JavaScript (Vanilla)**: Основная логика – генерация головоломок, решение бэктрекингом, подсветка, таймер и взаимодействие с пользователем.
- **Font Awesome**: Иконки для кнопок (генерация, решение, подсказка, настройки).
- Без внешних фреймворков и зависимостей – чистый код, совместимый с современными браузерами.

### Как Использовать

#### Локальный Запуск
1. Клонируйте или скачайте репозиторий:
   ```bash
   git clone https://github.com/yourusername/sudoku-solver.git
   ```
2. Откройте `index.html` в современном браузере (например, Chrome, Firefox, Edge).
3. Играйте – установка не требуется!

#### Игра
- **Создать Головоломку**: Выберите сложность (Лёгкий, Средний, Тяжёлый) в настройках, затем нажмите зелёную кнопку (обновление).
- **Ввод Чисел**: Кликните на ячейку и введите число (1-9). Предзаполненные ячейки заблокированы в обычном режиме.
- **Проверка Ошибок**: Неправильные числа подсвечиваются красным. В режиме своей игры конфликты выявляются сразу.
- **Подсказка**: Оранжевая кнопка (лампочка) заполняет одну ячейку (3 подсказки в обычном режиме, безлимит в своей игре).
- **Решить**: Фиолетовая кнопка (галочка) автоматически решает головоломку с анимацией.
- **Очистить**: Красная кнопка (мусорка) сбрасывает редактируемые ячейки.
- **Настройки**: Кнопка шестерёнки открывает:
  - **Сложность**: Лёгкий, Средний, Тяжёлый.
  - **Режим**: Переключение между обычным и режимом своей игры (редактирование всей сетки).
  - **Тема**: Светлая или Тёмная.
- **Победа**: Заполните головоломку правильно – получите поздравление, таймер остановится.

В **режиме своей игры** введите свою головоломку, затем используйте кнопки Решить или Подсказка.

### Структура Проекта

```
sudoku-solver/
├── index.html       # Главный HTML-файл с интерфейсом игры
├── style.css        # Стили для оформления, тем и анимаций
├── main.js          # Основная логика генерации, решения и взаимодействия
└── README.md        # Этот файл
```

### Вклад в Проект

Нашли баг или есть идеи? Буду рад услышать!  
- **Сообщайте о Проблемах**: Открывайте issue на GitHub для багов или идей (например, новые уровни сложности, мультиплеер).
- **Отправляйте Pull Requests**: Форкните репозиторий и вносите улучшения.
- Загляните в `main.js` для доработки логики или в `style.css` для визуальных изменений.

### Лицензия

Проект распространяется под [лицензией MIT](LICENSE). Используйте, модифицируйте и делитесь, но указывайте авторство.

### Благодарности

Спасибо сообществу open-source и всем любителям головоломок! Сделано с ☕ и любовью к кодингу.

Удачи с головоломками! 🧩