import { Component, OnInit } from '@angular/core';

import { GithubService } from '../github.service';

@Component({
  selector: 'ga-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users:any = [];
  userName: string;
  hasError: boolean = false;
  

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.githubService.getUsers().subscribe(users => this.users = users);
  }

  searchUser(event) {
    this.hasError = false;
    this.userName = event.target.value;
    this.githubService.getUser(this.userName)
      .subscribe(user => this.users.splice(0, 0, user), () => this.hasError = true);
    event.target.value = '';
  }

}
