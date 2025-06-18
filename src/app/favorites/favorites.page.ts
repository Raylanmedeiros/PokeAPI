import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    // Exemplo simples: buscar favoritos do localStorage
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favorites = favs;
  }

  removeFavorite(pokemon: any) {
    this.favorites = this.favorites.filter((p: any) => p.name !== pokemon.name);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
