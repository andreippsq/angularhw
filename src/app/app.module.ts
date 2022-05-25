import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DogComponent } from './components/dog/dog.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundPageComponent,
    DetailsPageComponent,
    HomePageComponent,
    DogComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
