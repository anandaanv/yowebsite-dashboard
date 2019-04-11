import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {WebsiteInfo} from '../website-card/website-info';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss' , './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  websites: WebsiteInfo[] = [];

  constructor(private  httpClient: HttpClient) { }

  ngOnInit() {
    const endpoint = 'site/listMyWebsites';
    this.httpClient.get<WebsiteInfo[]>(endpoint).subscribe((response) => {
        this.websites = response;
    });
  }
}
