// debut du fichier
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';


// <-- dans la suite du TP, Ajouter les références aux autres modules ici aussi

import { AppComponent } from './app.component';
import { MeteoComponent } from './meteo/meteo.component';
import { RouterLink, RouterLinkActive, RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MeteoDetailComponent } from './meteo-detail/meteo-detail.component';
// <-- dans la suite du TP, Ajouter les références à MeteoDetailComponent aussi

const appRoutes: Routes = [
  {
    path: '', // la page principale utilisera le component suivant
    component: MeteoComponent,
  },
  {
    path: 'meteo/:name', // la page affichant la météo prendra comme paramètre 'name'
    component: MeteoDetailComponent, // Ce component fera l'appel AJAX et afficher les données reçues par openWeatherMap
  },
  {
    path: '**', // un chemin vers une page inexistante redirigera vers '/'
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    MeteoDetailComponent
    // <-- dans la suite du TP,ajouter MeteoDetailComponent ici  

  ],
  // ....=
  imports: [
    // ... 
    // ajouter ces modules : 
    CommonModule,
    RouterLink, RouterLinkActive,
    // AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ), BrowserModule, FormsModule, ReactiveFormsModule

  ],
  // ...
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }



