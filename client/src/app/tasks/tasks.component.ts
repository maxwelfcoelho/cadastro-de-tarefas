import { Component, OnInit } from '@angular/core';
import { ITask } from '../models/ITask';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: ITask[] = [];
  user: string = sessionStorage.getItem('name') ?? '';

  constructor(
    private readonly tasksService: TasksService
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

}
