import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn,
  Validators, FormGroupDirective, NgForm
} from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {validateEmail} from '../register/register.component';


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  submitted = false;
  profileSuccess = false;
  currentRate: any;
  public typeaheadBasicModel: any;
  public typeaheadFocusModel: any;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private  httpClient: HttpClient) {
    this.registerForm = this.fb.group({
      'username': ['', {
        updateOn: 'blur',
        validators: Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        asyncValidators: [validateEmail(httpClient)]
      }],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      'firstname': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      'aboutme': ['', [Validators.required]],
      'city': ['', Validators.required],
      'mobile': [''],
      'email': ['', {
        updateOn: 'blur',
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
        asyncValidators: [validateEmail(httpClient)]
      }
      ]
    });
  }

  ngOnInit(): void {
  }


  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length > 1 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  focusSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? states : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  onSubmit() {
    this.submitted = true;
    const endpoint = '/form/submit';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const credentials = this.registerForm.value;
    this.httpClient.post<ProfileResponse>(endpoint, credentials)
      .subscribe((response) => {
        if (response.status === 200) {
          this.profileSuccess = true;
        }
      });
    this.submitted = false;
  }

}

interface ProfileResponse {
  message: String;
  status: number;
  result: {
    token: string;
    username: string;
  };
