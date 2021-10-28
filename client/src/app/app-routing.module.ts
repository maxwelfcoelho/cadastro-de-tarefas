import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreatetaskComponent } from './pages/createtask/createtask.component';
import { EdittaskComponent } from './pages/edittask/edittask.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: TasksComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'create', component: CreatetaskComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EdittaskComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent,  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
