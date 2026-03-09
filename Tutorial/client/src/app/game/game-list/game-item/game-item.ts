import { Component, input } from '@angular/core';
import { Game } from '../../model/game.class';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-game-item',
  imports: [MatCard],
  templateUrl: './game-item.html',
  styleUrl: './game-item.scss',
})
export class GameItem {
  game = input<Game>();
}
