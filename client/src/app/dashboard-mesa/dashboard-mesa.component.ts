import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/_services/poll.service';

@Component({
  selector: 'app-dashboard-mesa',
  templateUrl: './dashboard-mesa.component.html',
  styleUrls: ['./dashboard-mesa.component.css']
})
export class DashboardMesaComponent implements OnInit {
  content?: string;

  polls?: Poll[];
  currentPoll: Poll = {};
  currentIndex = -1;
  title = '';

  constructor(
    private userService: UserService,
    private pollService: PollService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.retrievePolls();
  }

    retrievePolls(): void {
    this.pollService.getAll()
      .subscribe(
        data => {
          this.polls = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrievePolls();
    this.currentPoll = {};
    this.currentIndex = -1;
  }

  setActivePoll(tutorial: Poll, index: number): void {
    this.currentPoll = tutorial;
    this.currentIndex = index;
  }

  removeAllPolls(): void {
    this.pollService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentPoll = {};
    this.currentIndex = -1;

    this.pollService.findByTitle(this.title)
      .subscribe(
        data => {
          this.polls = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
