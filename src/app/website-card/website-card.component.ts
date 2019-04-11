import {Component, Input, OnInit} from '@angular/core';
import {WebsiteInfo} from './website-info';

@Component({
  selector: 'app-website-card',
  templateUrl: './website-card.component.html',
  styleUrls: ['./website-card.component.scss']
})
export class WebsiteCardComponent implements OnInit {

  @Input()
  website: WebsiteInfo;

  constructor() { }

  ngOnInit() {
  }

}
