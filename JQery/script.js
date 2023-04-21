// Определение переменных
let board = $(".board"); // Элемент доски
let cells = $(".cell"); // Элементы ячеек
let message = $(".message"); // Элемент сообщения
let restart = $("#restart"); // Элемент кнопки перезапуска
let turn = "X"; // Текущий ход
let gameOver = false; // Флаг окончания игры
let winPatterns = [ // Выигрышные комбинации
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Определение функций
function checkWin() { // Проверка на победу
    for (let pattern of winPatterns) { // Цикл по комбинациям
        let cell1 = cells.eq(pattern[0]); // Получение первой ячейки
        let cell2 = cells.eq(pattern[1]); // Получение второй ячейки
        let cell3 = cells.eq(pattern[2]); // Получение третьей ячейки
        if (cell1.text() && cell1.text() === cell2.text() && cell2.text() === cell3.text()) { // Если все три ячейки имеют одинаковый текст
            gameOver = true; // Установка флага окончания игры в true
            message.text("Игрок " + turn + " победил!"); // Вывод сообщения о победителе
            break; // Прерывание цикла
        }
    }
}

function checkTie() { // Проверка на ничью
    let filled = 0; // Количество заполненных ячеек
    cells.each(function() { // Цикл по ячейкам
        if ($(this).text()) { // Если ячейка имеет текст
            filled++; // Увеличение счетчика заполненных ячеек
        }
    });
    if (filled === 9) { // Если все ячейки заполнены
        gameOver = true; // Установка флага окончания игры в true
        message.text("Это ничья!"); // Вывод сообщения о ничьей
    }
}

function switchTurn() { // Смена хода
    if (turn === "X") { // Если текущий ход X
        turn = "O"; // Смена на O
    } else { // Иначе
        turn = "X"; // Смена на X
    }
    message.text("Ход игрока " + turn); // Вывод сообщения о текущем ходе
}

function resetGame() { // Сброс игры
    cells.text(""); // Очистка текста ячеек
    message.text("Ход игрока X"); // Вывод начального сообщения
    turn = "X"; // Установка хода в X
    gameOver = false; // Установка флага окончания игры в false
}

// Определение обработчиков событий
board.on("click", ".cell", function() { // При клике на ячейку
    let cell = $(this); // Получение кликнутой ячейки
    if (!cell.text() && !gameOver) { // Если ячейка пуста и игра не окончена
        cell.text(turn); // Заполнение ячейки текстом текущего хода
	    cell.addClass(turn.toLowerCase()); // Добавляется класс в ячейку на основе хода
        checkWin(); // Проверка на победу
        if (!gameOver) { // Если игра не окончена
            checkTie(); // Проверка на ничью
            if (!gameOver) { // Если игра не окончена
                switchTurn(); // Смена хода
            }
        }
    }
});

restart.on("click", function() { // При клике на кнопку перезапуска
    resetGame(); // Сброс игры
});