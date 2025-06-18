import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: 'pokemon-list.page.html',
  styleUrls: ['pokemon-list.page.scss'],
  standalone: false,
})
export class PokemonListPage implements OnInit {
  pokemons: any[] = [];
  page: number = 1;
  limit: number = 20;
  loading: boolean = false;
  favorites: Set<string> = new Set();
  total: number = 0;
  totalPages: number = 0;

  constructor(private pokeapi: PokeapiService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.loading = true;
    const offset = (this.page - 1) * this.limit;
    this.pokeapi.getPokemonList(offset, this.limit).subscribe((res: any) => {
      this.pokemons = res.results.map((p: any) => ({
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.extractIdFromUrl(p.url)}.png`,
        favorite: this.favorites.has(p.name)
      }));
      this.total = res.count;
      this.totalPages = Math.ceil(this.total / this.limit);
      this.loading = false;
    });
  }

  extractIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return +parts[parts.length - 1];
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPokemons();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPokemons();
    }
  }

  goToPage(pageNum: number) {
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.page = pageNum;
      this.loadPokemons();
    }
  }

  toggleFavorite(pokemon: any) {
    if (this.favorites.has(pokemon.name)) {
      this.favorites.delete(pokemon.name);
      pokemon.favorite = false;
    } else {
      this.favorites.add(pokemon.name);
      pokemon.favorite = true;
    }
  }

  openDetail(pokemon: any) {
    // Navegação para detalhes será implementada depois
  }
}
