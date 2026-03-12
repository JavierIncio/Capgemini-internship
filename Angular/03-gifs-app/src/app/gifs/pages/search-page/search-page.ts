import { Component, inject, signal } from '@angular/core';
import { GifList } from '../trending-page/gif-list/gif-list';
import { GifService } from '../../service/gifs.service';
import { GifMapper } from '../../mapper/gif.mapper';
import { Gif } from '../../models/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((resp) => this.gifs.set(resp));
  }
}
