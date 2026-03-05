import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Character } from '../../../models/character.interface';

@Component({
  selector: 'db-character-form',
  imports: [],
  templateUrl: './character-form.html',
})
export class CharacterForm {
  name = signal<string>('');
  power = signal<number>(0);
  newCharacter = output<Character>();

  addCharacter() {
    console.log(`${this.name()} añadido`);
    this.newCharacter.emit({
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    });
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
