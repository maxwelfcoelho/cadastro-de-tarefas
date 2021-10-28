import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from 'src/app/models/ITask';
import { TasksService } from 'src/app/tasks.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  editForm = new FormGroup({
    name: new FormControl('')
  });

  id = this.activatedRoute.snapshot.paramMap.get('id') || '';

  constructor(
    private readonly tasksService: TasksService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.tasksService.getTask(this.id).subscribe(
      (data) => {
        this.editForm.setValue({
          name: data.name
        })
      } 
    )
  }

  editTask(): void {
    this.tasksService.editTask(this.id, this.editForm.get('name')?.value).subscribe(
      (data) => {
        this.router.navigate(['']);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['']);
  }
}
