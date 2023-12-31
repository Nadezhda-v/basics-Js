

export let isGameRPSFinished = false;
let isGameMrcFinished = false;

(() => {
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getFigure = (lang) => {
    const languages = {
      RUS: {
        computer: 'Компьютер',
        player: 'Вы',
        result: 'Результат',
        exit: 'Точно хотите выйти?',
        win: 'Вы выйграли!',
        drow: 'Ничья!',
        loss: 'Выйграл компьютер!',
      },
      ENG: {
        computer: 'Computer',
        player: 'You',
        result: 'Result',
        exit: 'Are you sure you want to get out?',
        win: 'You win!',
        drow: 'Drow!',
        loss: 'Computer win!',
      },
    };
    return languages[lang];
  };

  const resultOne = {
    player: 0,
    computer: 0,
  };

  const game = (language) => {
    const FIGURES = language === 'EN' || language === 'ENG' ?
      FIGURES_ENG : FIGURES_RUS;

    if (language === '' || language === undefined) {
      language = 'RUS';
    }

    if (language === 'EN') {
      language = 'ENG';
    }

    return function start() {
      alert(`Сыграем в игру. Определим кто будет ходить первым`);

      const languageText = getFigure(language);

      let randomInt;
      let inputComputer;
      let inputPlayer;
      let inputString;

      const getInputPlayer = () => {
        inputString = prompt(`${FIGURES[0]}, ${FIGURES[1]}, ${FIGURES[2]}?`);
        if (inputString === '') {
          getInputPlayer();
        }
      };

      const isValidInputPlayer = (val) => {
        val = val.toLowerCase();
        inputPlayer = FIGURES.find((str) => str.startsWith(val));
        if (inputPlayer !== undefined) {
          return inputPlayer;
        } else {
          return false;
        }
      };

      const isCancel = (str) => {
        if (str === null) {
          const exit = confirm(`${languageText.exit}`);
          if (exit === true) {
            alert(`
              ${languageText.result}:
              ${languageText.computer}: ${resultOne.computer}
              ${languageText.player}: ${resultOne.player}`);
            return true;
          } else {
            getInputPlayer();
            return false;
          }
        }
      };

      const choiceFigures = () => {
        getInputPlayer();

        if (isCancel(inputString)) return;

        if (!isValidInputPlayer(inputString)) {
          choiceFigures();
        }

        randomInt = getRandomIntInclusive(0, 2);
        return inputComputer = FIGURES[randomInt];
      };

      choiceFigures();

      if (inputString === null) {
        isGameRPSFinished = true;
        return false;
      }

      let isDrow = false;

      while (!isDrow) {
        if (inputPlayer === inputComputer) {
          alert(`
            ${languageText.computer}: ${inputComputer}
            ${languageText.player}: ${inputPlayer}
            ${languageText.drow}`);
          choiceFigures();
        } else {
          isDrow = true;
        }
      }

      if (
        (inputPlayer === FIGURES[0] && inputComputer === FIGURES[1]) ||
        (inputPlayer === FIGURES[1] && inputComputer === FIGURES[2]) ||
        (inputPlayer === FIGURES[2] && inputComputer === FIGURES[0])
      ) {
        alert(`
            ${languageText.computer}: ${inputComputer}
            ${languageText.player}: ${inputPlayer}

            ${languageText.win}`);
        resultOne.player += 1;
      } else {
        alert(`
            ${languageText.computer}: ${inputComputer}
            ${languageText.player}: ${inputPlayer}

            ${languageText.loss}`);
        resultOne.computer += 1;
      }
    };
  };
  window.gameRPS = game;

  (() => {
    const evenOrOdd = ['четное', 'нечетное'];

    const game = () => {
      const result = {
        player: 5,
        computer: 5,
      };

      const getInputPlayer = () =>
        prompt(`Введите число от 1 до ${result.player}`);

      const isNumber = (num) => {
        if (Number.isNaN(num) || !Number.isInteger(+num) ||
          num > result.player || num < 1 || num === '') {
          alert('Введите число!');
          return false;
        }
        return true;
      };

      const isCountBall = () => {
        if (result.player === 1) {
          result.player -= 1;
          result.computer += 1;
        }

        if (result.computer === 1) {
          result.player += 1;
          result.computer -= 1;
        }
      };

      if (resultOne.player === 1) {
        alert('Вы ходите первым');
      } else {
        alert('Бот ходит первым и загадывает число');
      }

      return function start() {
        let randomInt;
        let isEven;
        let inputPlayer;
        let inputComputer;
        let isNumberPlayer;
        let isNumberComputer;
        let playAgain;

        const getInputComputer = () => {
          inputComputer = getRandomIntInclusive(1, result.computer);
        };

        const isCancel = (val) => {
          if (val === null) {
            const exit = confirm(`Точно хотите выйти?`);
            if (exit) {
              return true;
            } else {
              start();
            }
          }
        };

        if (resultOne.player === 1) {
          inputPlayer = getInputPlayer();

          if (isCancel(inputPlayer)) return true;

          if (!isNumber(inputPlayer)) {
            start();
          }

          inputPlayer = +inputPlayer;

          isNumberPlayer = inputPlayer % 2 === 0 ?
            evenOrOdd[0] : evenOrOdd[1];

          alert('Бот угадывает четное или нечетное число вы загадали');

          randomInt = getRandomIntInclusive(0, 1);
          isNumberComputer = evenOrOdd[randomInt];

          if (isNumberPlayer === isNumberComputer) {
            result.computer += inputPlayer;
            result.player -= inputPlayer;

            if (result.player < 1) {
              result.player = 0;
            }

            alert(`
              Бот угадал!
              Количество шариков:
  
              У бота: ${result.computer}
              У Вас: ${result.player}
            `);
          }

          if (isNumberPlayer !== isNumberComputer) {
            if (inputPlayer <= result.computer) {
              result.computer -= inputPlayer;
              result.player += inputPlayer;
            } else {
              result.player += result.computer;
              result.computer -= result.computer;
            }

            if (result.computer < 1) {
              result.computer = 0;
            }

            alert(`
              Бот не угадал!
              Количество шариков:

              У Вас: ${result.player}
              У бота: ${result.computer}
            `);
          }

          resultOne.player = 0;
          resultOne.computer = 1;
        } else {
          getInputComputer();
          isEven = confirm('Число четное?');
          isNumberPlayer = isEven === true ? evenOrOdd[0] : evenOrOdd[1];
          isNumberComputer = inputComputer % 2 === 0 ?
            evenOrOdd[0] : evenOrOdd[1];

          if (isNumberPlayer === isNumberComputer) {
            result.computer -= inputComputer;
            result.player += inputComputer;

            if (result.computer < 1) {
              result.computer = 0;
            }

            alert(`
              Вы угадали!
              Количество шариков:

              У бота: ${result.computer}
              У Вас: ${result.player}
            `);
          }

          if (isNumberPlayer !== isNumberComputer) {
            if (inputComputer <= result.player) {
              result.computer += inputComputer;
              result.player -= inputComputer;
            } else {
              result.computer += result.player;
              result.player -= result.player;
            }

            if (result.player < 1) {
              result.player = 0;
            }

            alert(`
              Вы не угадали!
              Количество шариков:
      
              У Вас: ${result.player}
              У бота: ${result.computer}
            `);
          }

          resultOne.player = 1;
          resultOne.computer = 0;
        }

        isCountBall();

        if (result.computer < 1) {
          alert(`Бот проиграл`);
        }

        if (result.player < 1) {
          alert(`Вы проиграли`);
        }

        if (result.computer < 1 || result.player < 1) {
          alert(`
              Результат:
              Вы: ${result.player}
              Бот: ${result.computer}
            `);
          playAgain = confirm('Хотите сыграть еще?');
          if (playAgain) {
            resultOne.player = 0;
            resultOne.computer = 0;
            result.player = 5;
            result.computer = 5;
            window.gameRPS()();
          } else {
            return isGameMrcFinished = true;
          }
        } else {
          start();
        }

        if (isGameMrcFinished) {
          return false;
        }

        if (!isGameRPSFinished) {
          start();
        } else {
          return false;
        }
      };
    };

    window.gameMar = game;
  })();
})();
