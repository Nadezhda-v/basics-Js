'use strict';

import { isGameRPSFinished } from './game_hard.js';

const startGameRPS = window.gameRPS();
startGameRPS();

if (!isGameRPSFinished) {
  const startGameMar = window.gameMar();
  startGameMar();
}