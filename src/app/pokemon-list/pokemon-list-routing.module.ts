import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListPage } from './pokemon-list.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonListPageRoutingModule {}
