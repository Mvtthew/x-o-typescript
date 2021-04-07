// Enum wyboru albo kółko albo krzyżyk na drogę
enum Choice {
	'O' = 0,
	'X' = 1,
}

// button dla x/o w planszy
class Button {
	// Button html element
	element: HTMLButtonElement;
	// Właściwość przycisku co ma zaznaczone
	choice: Choice | null = null;
	constructor(element: HTMLButtonElement) {
		// Przy tworzeniu objektu buttona musimy podac jego htmlowy element
		this.element = element;
	}

	// Metoda do wpisania wyboru x/o do przycisku
	setChoice(choice: Choice) {
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
	}
}

// plansza gry
class Board {
	// tablica wszystkich przycisków
	buttons: Button[] = [];
	// aktualny ruch po kliknięciu
	choiceNow: Choice = Choice.O;
	constructor() {
		// plansza pobiera wszystkie <button> z htmla i dla każdego tworzy nowy objekt klasy Button
		const buttonsElements: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
		buttonsElements.forEach((buttonElement: HTMLButtonElement) => {
			const button = new Button(buttonElement);
			this.buttons = [...this.buttons, button];
			// dodajemy dla każdego przycisku gdy go naciśniemy to wywołujemy funkcje wyboru
			buttonElement.addEventListener('click', () => {
				this.makeChoice(button);
			});
		});
	}

	// funkcja przyciśnięcia na przycisk wyboru
	makeChoice(button: Button) {
		// jeżeli przycisk ma już wybraną opcje o/x to return
		if (button.choice !== null) return;

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
	}

	// funkcja która sprawdza czy nie ma już 3 razy tego samego (o/x) lewo-prawo, góra-dół lub po ukosie
	checkWin() {
		// sprawdzenie lewo prawo
		for (let i = 0; i < 9; i += 3) {
			// jeżeli nie ma jeszcze w tym rzędzie wyboru na pierwszej pozycji nie sprawdzamy => to znaczy nie został jeszcze zaznaczony cały rząd
			if (this.buttons[i].choice !== null)
				if (this.buttons[i].choice === this.buttons[i + 1].choice && this.buttons[i + 1].choice === this.buttons[i + 2].choice)
					this.gameOver();
		}

		// sprawdzenie góra dół
		for (let i = 0; i < 3; i += 1) {
			// jeżeli nie ma jeszcze w tej kolumnie wyboru na pierwszej pozycji nie sprawdzamy => to znaczy nie została jeszcze zaznaczona cała kolumna
			if (this.buttons[i].choice !== null)
				if (this.buttons[i].choice === this.buttons[i + 3].choice && this.buttons[i + 3].choice === this.buttons[i + 6].choice)
					this.gameOver();
		}

		// sprawdzenie skos lewo-góra prawo-dół
		// jeżeli nie ma jeszcze w pierwszej komórce lewo-góra to nie sprawdzamy => nie ma całego skosu
		if (this.buttons[0].choice !== null)
			if (this.buttons[0].choice === this.buttons[4].choice && this.buttons[4].choice === this.buttons[8].choice) this.gameOver();

		// sprawdzenie skos prawo-góra lewo-dół
		// jeżeli nie ma jeszcze w osattnie komórce pierwszego rzędu prawo-góra to nie sprawdzamy => nie ma całego skosu
		if (this.buttons[2].choice !== null)
			if (this.buttons[2].choice === this.buttons[4].choice && this.buttons[4].choice === this.buttons[6].choice) this.gameOver();
	}

	// funkcja kończąca grę i pokazująca kto wygrał
	gameOver() {
		const gameOverElement = document.querySelector('.game-over');
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
	}
}

class App {
	constructor() {
		new Board();
	}
}

new App();
