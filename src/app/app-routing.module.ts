import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DigimonListComponent } from './components/digimon-list/digimon-list.component';
import { ButtonsControllerComponent } from './components/buttons-controller/buttons-controller.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'digimonList',
    component: DigimonListComponent,
    pathMatch: "full"
  },
  {
    path: 'Team',
    component: TeamComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
