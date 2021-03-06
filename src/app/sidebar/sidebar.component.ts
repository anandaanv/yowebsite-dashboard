import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

  get loggedOut(): boolean {
    return localStorage.getItem('token') === null;
  }
  get username(): String{
    return localStorage.getItem('username');
  }
}
