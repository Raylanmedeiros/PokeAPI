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
  contrastDark = false;

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

  async loadPokemons() {
    this.loading = true;
    const offset = (this.page - 1) * this.limit;
    this.pokeapi
      .getPokemonList(offset, this.limit)
      .subscribe(async (res: any) => {
        // Para cada Pokémon, buscar detalhes para obter o campo 'order'
        const pokemons = await Promise.all(
          res.results.map(async (p: any) => {
            const details: any = await this.pokeapi
              .getPokemonDetails(p.name)
              .toPromise();
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`;
            const gif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.gif`;
            const shiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${details.id}.png`;
            const shinyGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${details.id}.gif`;

            return {
              name: p.name,
              order: details.id,
              image,
              gif,
              shiny,
              shinyGif,
              types: details.types.map((t: any) => t.type.name).join(', '),
              typesArray: details.types.map((t: any) => t.type.name),
              height: details.height,
              weight: details.weight,
              abilities: details.abilities
                .map((a: any) => a.ability.name)
                .join(', '),

              favorite: this.isFavorite({ name: p.name }),
            };
          })
        );
        this.pokemons = pokemons;
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
      this.favorites = this.favorites.filter(
        (fav) => fav.name !== pokemon.name
      );
      pokemon.favorite = false;
    } else {
      this.favorites.push({
        order: pokemon.order,
        name: pokemon.name,
        image: pokemon.image,
      });
      pokemon.favorite = true;
    }
    this.saveFavorites();
  }

  openDetail(pokemon: any) {
    // Navegação para detalhes será implementada depois
  }

  toggleContrast() {
    this.contrastDark = !this.contrastDark;
    document.body.classList.toggle('dark-theme', this.contrastDark);
  }
}
