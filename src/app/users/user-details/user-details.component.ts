import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { GithubService } from '../../github.service';

@Component({
  selector: 'ga-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  repos: any;
  repoTitle: string;
  repoDescription: string;
  repoLanguage: string;
  repoIssues: boolean;
  repoUrl: string;

  

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private location: Location,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const userLogin = this.route.snapshot.paramMap.get('login');
    this.githubService.getUser(userLogin).subscribe(user => {
      this.user = user;
    });
    this.githubService.getUserRepos(userLogin).subscribe(repos => {
      this.repos = repos;
    });
  }

  goBack() {
    this.location.back();
  }

  passDataToModal(repo: any) {
    this.repoTitle = repo.name;
    this.repoDescription = repo.description;
    this.repoLanguage = repo.language;
    this.repoIssues = repo.has_issues;
    this.repoUrl = repo.html_url;
  }

}
