"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// Enum wyboru albo kółko albo krzyżyk na drogę
var Choice;
(function (Choice) {
    Choice[Choice["O"] = 0] = "O";
    Choice[Choice["X"] = 1] = "X";
})(Choice || (Choice = {}));
// button dla x/o w planszy
var Button = /** @class */ (function () {
    function Button(element) {
        // Właściwość przycisku co ma zaznaczone
        this.choice = null;
        // Przy tworzeniu objektu buttona musimy podac jego htmlowy element
        this.element = element;
    }
    // Metoda do wpisania wyboru x/o do przycisku
    Button.prototype.setChoice = function (choice) {
        // przypisujemy do właściwości przycisku
        this.choice = choice;
        // oraz podmieniamy inner html elementu tego objektu buttona
        switch (choice) {
            case Choice.O:
                this.element.innerHTML = 'O';
                break;
            case Choice.X:
                this.element.innerHTML = 'X';
                break;
        }
    };
    return Button;
}());
// plansza gry
var Board = /** @class */ (function () {
    function Board() {
        var _this = this;
        // tablica wszystkich przycisków
        this.buttons = [];
        // aktualny ruch po kliknięciu
        this.choiceNow = Choice.O;
        // plansza pobiera wszystkie <button> z htmla i dla każdego tworzy nowy objekt klasy Button
        var buttonsElements = document.querySelectorAll('button');
        buttonsElements.forEach(function (buttonElement) {
            var button = new Button(buttonElement);
            _this.buttons = __spreadArray(__spreadArray([], _this.buttons), [button]);
            // dodajemy dla każdego przycisku gdy go naciśniemy to wywołujemy funkcje wyboru
            buttonElement.addEventListener('click', function () {
                _this.makeChoice(button);
            });
        });
    }
    // funkcja przyciśnięcia na przycisk wyboru
    Board.prototype.makeChoice = function (button) {
        // jeżeli przycisk ma już wybraną opcje o/x to return
        if (button.choice !== null)
            return;
        // jeżeli wciśniemy na pusty przycisk ustawiamy w nim aktualną wartość oraz zmieniamy nastpeny wybór
        switch (this.choiceNow) {
            case Choice.O:
                button.setChoice(this.choiceNow);
                this.choiceNow = Choice.X;
                break;
            case Choice.X:
                button.setChoice(this.choiceNow);
                this.choiceNow = Choice.O;
                break;
        }
        // po wybraniu opcji sprawdzamy czy jakiś gracz nie wygrał
        this.checkWin();
    };
    // funkcja która sprawdza czy nie ma już 3 razy tego samego (o/x) lewo-prawo, góra-dół lub po ukosie
    Board.prototype.checkWin = function () {
        // sprawdzenie lewo prawo
        for (var i = 0; i < 9; i += 3) {
            // jeżeli nie ma jeszcze w tym rzędzie wyboru na pierwszej pozycji nie sprawdzamy => to znaczy nie został jeszcze zaznaczony cały rząd
            if (this.buttons[i].choice !== null)
                if (this.buttons[i].choice === this.buttons[i + 1].choice && this.buttons[i + 1].choice === this.buttons[i + 2].choice)
                    this.gameOver();
        }
        // sprawdzenie góra dół
        for (var i = 0; i < 3; i += 1) {
            // jeżeli nie ma jeszcze w tej kolumnie wyboru na pierwszej pozycji nie sprawdzamy => to znaczy nie została jeszcze zaznaczona cała kolumna
            if (this.buttons[i].choice !== null)
                if (this.buttons[i].choice === this.buttons[i + 3].choice && this.buttons[i + 3].choice === this.buttons[i + 6].choice)
                    this.gameOver();
        }
        // sprawdzenie skos lewo-góra prawo-dół
        // jeżeli nie ma jeszcze w pierwszej komórce lewo-góra to nie sprawdzamy => nie ma całego skosu
        if (this.buttons[0].choice !== null)
            if (this.buttons[0].choice === this.buttons[4].choice && this.buttons[4].choice === this.buttons[8].choice)
                this.gameOver();
        // sprawdzenie skos prawo-góra lewo-dół
        // jeżeli nie ma jeszcze w osattnie komórce pierwszego rzędu prawo-góra to nie sprawdzamy => nie ma całego skosu
        if (this.buttons[2].choice !== null)
            if (this.buttons[2].choice === this.buttons[4].choice && this.buttons[4].choice === this.buttons[6].choice)
                this.gameOver();
    };
    // funkcja kończąca grę i pokazująca kto wygrał
    Board.prototype.gameOver = function () {
        var gameOverElement = document.querySelector('.game-over');
        if (gameOverElement) {
            switch (this.choiceNow) {
                // gdy zakonczymy gre wygrywa ta osoba która ostatnia robiła ruch czyli nie ta która ma zrobić następny ruch
                case Choice.O:
                    gameOverElement.innerHTML = '<h1>X wins!</h1>';
                    break;
                case Choice.X:
                    gameOverElement.innerHTML = '<h1>O wins!</h1>';
                    break;
            }
            gameOverElement.classList.add('show');
        }
    };
    return Board;
}());
var App = /** @class */ (function () {
    function App() {
        new Board();
    }
    return App;
}());
new App();
