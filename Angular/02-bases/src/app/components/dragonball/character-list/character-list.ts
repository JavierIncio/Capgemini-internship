import { Component, input } from '@angular/core';
import { Character } from '../../../models/character.interface';

@Component({
  selector: 'db-character-list',
  imports: [],
  templateUrl: './character-list.html',
})
export class CharacterList {
  characters = input.required<Character[]>();
  listName = input.required<string>();
}
