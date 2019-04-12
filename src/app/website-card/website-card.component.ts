import { Component, Input, OnInit } from '@angular/core';
import { WebsiteInfo } from './website-info';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-website-card',
    templateUrl: './website-card.component.html',
    styleUrls: ['./website-card.component.scss']
})
export class WebsiteCardComponent implements OnInit {

    @Input()
    website: WebsiteInfo;

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
    }

    goLive(websiteToGolive: WebsiteInfo) {
        const endpoint = 'site/goLive';
        this.httpClient.post<WebsiteInfo>(endpoint, websiteToGolive).subscribe((response) => {
            websiteToGolive.status = response.status;
        });
    }

}
