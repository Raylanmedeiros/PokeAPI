import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonListPage } from './pokemon-list.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PokemonListPageRoutingModule } from './pokemon-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PokemonListPageRoutingModule
  ],
  declarations: [PokemonListPage]
})
export class PokemonListPageModule {}
