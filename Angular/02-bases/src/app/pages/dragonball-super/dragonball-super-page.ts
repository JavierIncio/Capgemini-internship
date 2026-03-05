import { Component, inject } from '@angular/core';
import { CharacterList } from '../../components/dragonball/character-list/character-list';
import { CharacterForm } from '../../components/dragonball/character-form/character-form';
import { DragonballService } from '../../services/dragonball-service';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [CharacterList, CharacterForm],
  templateUrl: './dragonball-super-page.html',
})
export class DragonballSuperPage {
  public ds = inject(DragonballService);
}
