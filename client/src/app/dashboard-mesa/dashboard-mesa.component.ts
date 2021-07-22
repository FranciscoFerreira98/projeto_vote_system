import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/_services/poll.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-dashboard-mesa',
  templateUrl: './dashboard-mesa.component.html',
  styleUrls: ['./dashboard-mesa.component.css'],
})
export class DashboardMesaComponent implements OnInit {
  content?: string;
  private roles: string[] = [];
  polls?: Poll[];
  currentPoll: Poll = {};
  currentIndex = -1;
  title = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showMesaBoard = false;

  constructor(
    private userService: UserService,
    private pollService: PollService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMesaBoard = this.roles.includes('ROLE_MESA');

      this.userService.getAdminBoard().subscribe(
        (data) => {
          this.content = data;
          this.retrievePolls();
        },
        (err) => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }

  retrievePolls(): void {
    this.pollService.getAll().subscribe(
      (data) => {
        this.polls = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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
    this.pollService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
