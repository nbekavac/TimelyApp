import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { FormsModule } from '@angular/forms';
import { ShowProjectComponent } from './components/show-project/show-project.component';


@NgModule({
  declarations: [
    AppComponent,
    EditProjectComponent,
    ShowProjectComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
