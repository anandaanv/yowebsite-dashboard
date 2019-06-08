import {Component, OnInit} from '@angular/core';
import {
    AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn,
    Validators, FormGroupDirective, NgForm
} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ErrorStateMatcher} from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    isSubmitting = false;
    authType: string = null;
    registerSuccess = false;
    companies: Array<any>;
    industryTypes: Array<any>;
    errorMatcher = new CrossFieldErrorMatcher();
    title = 'Register';

    constructor(private fb: FormBuilder,
                private  httpClient: HttpClient) {
        this.registerForm = this.fb.group({
            'username': ['', {
                updateOn: 'blur',
                validators: Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
                asyncValidators: [validateEmail(httpClient)]
            }],
            'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
            'verifyPassword': ['', Validators.required],
            'firstname': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
            'lastname': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
            'title': [''],
            'address1': ['', Validators.required],
            'address2': [''],
            'city': ['', Validators.required],
            'postalCode': ['', Validators.required],
            'phone': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
            'mobile': [''],
            'email': ['', {
                updateOn: 'blur',
                validators: Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
                asyncValidators: [validateEmail(httpClient)]
            }
            ]
        }, {
          validator: this.passwordValidator
        });
    }

    register() {
        this.isSubmitting = true;
        const endpoint = 'users/signup';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const credentials = this.registerForm.value;
        this.httpClient.post<RegisterResponse>(endpoint, credentials)
            .subscribe((response) => {
                if (response.status === 200) {
                    this.registerSuccess = true;
                }
            });
        this.isSubmitting = false;
    }

    passwordValidator(form: FormGroup) {
      const condition = form.get('password').value !== form.get('verifyPassword').value;
      return condition ? { passwordsDoNotMatch: true} : null;
    }
}

interface RegisterResponse {
    message: String;
    status: number;
    result: {
        token: string;
        username: string;
    };
}

interface FetchuserResponse {
    status: number;
    result: string;
}


export function validateEmail(httpClient: HttpClient): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const endpoint = 'users/exists/' + control.value;
        return new Promise(function (resolve, reject) {
            httpClient.get<FetchuserResponse>(endpoint)
                .subscribe((response) => {
                    if (response.result !== '') {
                        resolve({'userExists': true});
                    } else {
                        resolve(null);
                    }
                });
        });
    };
}

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}
