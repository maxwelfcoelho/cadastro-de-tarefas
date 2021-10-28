import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: string = sessionStorage.getItem('name') ?? '';

  hideModal = true;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
