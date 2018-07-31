import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from '../../node_modules/rxjs/observable/ErrorObservable';

@Injectable()
export class GithubService {
  private clientId = '1aeb117025c680d787c1';
  private clientSecret = 'afa552d5436d42850b2aedf17cd095feeace5fab';

  constructor(private http: HttpClient) { }
  
  getUsers() {
    return this.http.get('https://api.github.com/users' 
      + '?client_id=' + this.clientId 
      + '&client_secret=' + this.clientSecret);
  }

  getUser(userLogin: string) {
    return this.http.get('https://api.github.com/users/' 
      + userLogin + '?client_id=' + this.clientId 
      + '&client_secret=' + this.clientSecret).pipe(catchError(this.handleError));
  }

  getUserRepos(userLogin: string) {
    return this.http.get('https://api.github.com/users/' 
      + userLogin + '/repos?client_id=' + this.clientId 
      + '&client_secret=' + this.clientSecret);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return new ErrorObservable('User not found.');
    } else {
      return new ErrorObservable('Maximum number of request attempts exceeded. Please try again later.');
    }
  }
}