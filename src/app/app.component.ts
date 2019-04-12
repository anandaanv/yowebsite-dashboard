import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Yo website - your website in a minute';

  constructor(private route: Router) {
  }

  ngOnInit() {
    // if (!localStorage.getItem('token')) {
    //   this.route.navigate(['login']);
    // }
  }
}
