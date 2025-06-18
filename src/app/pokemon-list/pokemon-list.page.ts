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
  favorites: any[] = [];
  total: number = 0;
  totalPages: number = 0;

  constructor(private pokeapi: PokeapiService) {}

  ngOnInit() {
    this.loadFavorites();
    this.loadPokemons();
  }

  loadFavorites() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.some((fav) => fav.name === pokemon.name);
  }

  loadPokemons() {
    this.loading = true;
    const offset = (this.page - 1) * this.limit;
    this.pokeapi.getPokemonList(offset, this.limit).subscribe((res: any) => {
      this.pokemons = res.results.map((p: any) => {
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.extractIdFromUrl(p.url)}.png`;
        return {
          name: p.name,
          image,
          favorite: this.isFavorite({ name: p.name })
        };
      });
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
    if (this.isFavorite(pokemon)) {
      this.favorites = this.favorites.filter((fav) => fav.name !== pokemon.name);
      pokemon.favorite = false;
    } else {
      this.favorites.push({ name: pokemon.name, image: pokemon.image });
      pokemon.favorite = true;
    }
    this.saveFavorites();
  }

  openDetail(pokemon: any) {
    // Navegação para detalhes será implementada depois
  }
}
