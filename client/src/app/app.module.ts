import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpInterceptorDefault } from './services/http-interceptors/http-interceptor';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CreatetaskComponent } from './pages/createtask/createtask.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EdittaskComponent } from './pages/edittask/edittask.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TasksComponent,
    CreatetaskComponent,
    NavbarComponent,
    EdittaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorDefault,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
