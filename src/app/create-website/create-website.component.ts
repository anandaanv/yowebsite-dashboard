import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {WebsiteInfo} from '../website-card/website-info';

@Component({
  selector: 'app-create-website',
  templateUrl: './create-website.component.html',
  styleUrls: ['./create-website.component.scss']
})
export class CreateWebsiteComponent implements OnInit {

  title: String = 'Create website';
  isSubmitting: Boolean = false;
  websiteForm: FormGroup;
  websiteInfo: WebsiteInfo;
  websiteCreated = false;

  constructor(
    private fb: FormBuilder,
    private  httpClient:  HttpClient,
    private mainRoute: Router
  ) {
    this.websiteForm = this.fb.group({
      'websiteName': ['', Validators.required],
      'description': ['', Validators.required]
    });
  }

  ngOnInit() {
  }


  submitForm() {
    const endpoint = 'site/create';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const details = this.websiteForm.value;
    this.httpClient.post<WebsiteInfo>(endpoint, {
      websiteName: details.websiteName,
      description: details.description
    }).subscribe((response) => {
      this.websiteCreated = true;
    });
  }

}
