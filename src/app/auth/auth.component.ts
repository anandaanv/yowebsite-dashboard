import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isSubmitting: Boolean = false;
  authForm: FormGroup;
  authenticated: Boolean = false;
  loginVisible = true;
  username = '';

  constructor(private fb: FormBuilder,
              private  httpClient: HttpClient,
              private mainRoute: Router) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.loginVisible = false;
      this.username = localStorage.getItem('username');
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.doLogin();
    this.isSubmitting = false;
  }

  private doLogin() {
    const endpoint = 'token/generate-token';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('roles');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = this.authForm.value;
    this.httpClient.post<LoginResponse>(endpoint, {
      username: credentials.email,
      password: credentials.password
    }).subscribe((response) => {
      if (response.message === 'success') {
        this.authenticated = true;
        localStorage.setItem('token', response.result.token);
        localStorage.setItem('username', response.result.username);
        localStorage.setItem('isAdmin', response.result.isAdmin);
        this.mainRoute.navigate(['dashboard']);
        this.loginVisible = false;
      }
    });
  }

  private clearLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    this.loginVisible = true;
    this.mainRoute.navigate(['login']);
  }
}

interface LoginResponse {
  message: String;
  status: number;
  result: {
    token: string;
    username: string;
    isAdmin: string;
    roles: Array<String>;
  };
}
