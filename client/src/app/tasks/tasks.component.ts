import { Component, OnInit } from '@angular/core';
import { ITask } from '../models/ITask';
import { TasksService } from '../tasks.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
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

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
