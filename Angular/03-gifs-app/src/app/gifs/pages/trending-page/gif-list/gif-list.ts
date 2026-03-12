import { Component, input } from '@angular/core';
import { GifListItem } from './gif-list-item/gif-list-item';
import type { Gif } from 'src/app/gifs/models/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
})
export class GifList {
  /* TODO: input string[] */
  gifs = input.required<Gif[]>();
}
