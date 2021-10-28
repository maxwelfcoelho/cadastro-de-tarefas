import { Component, OnInit, ViewChild } from '@angular/core';
import { ITask } from '../../models/ITask';
import { TasksService } from '../../tasks.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: ITask[] = [];
  user: string = sessionStorage.getItem('name') ?? '';

  trashIcon = faTrashAlt;
  editIcon = faEdit;
  checkIcon = faCheckSquare;
  plusIcon = faPlus;

  hideModal = true;

  constructor(
    private readonly tasksService: TasksService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe(
      (data) => {
         this.tasks = data
      }
    )
  }

  deleteTask(id: string): void {
    const shouldDelete = confirm('Você quer realmente deletar está tarefa?');

   if (shouldDelete) {
      this.tasksService.deleteTask(id).subscribe(
        (data) => {
          this.getTasks();
        }
      )
   }
  }

  completeTask(id: string): void {
    this.tasksService.completeTask(id).subscribe(
      (data) => {
        this.getTasks();
      }
    )
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
