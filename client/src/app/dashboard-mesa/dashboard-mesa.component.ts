import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/_services/poll.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';

export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}


declare let KTStepper : any;


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
  element:any;
  stepper:any;

  message?: string;
  isSuccessful = false;
  submitted = false;
  isError = false;
  poll = {
    nome: '',
    date: '',
  };
  submitBtn : any;

  getDate = new Date();
  dd = String(this.getDate.getDate()).padStart(2, '0');
  mm = String(this.getDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.getDate.getFullYear();

  today = this.yyyy + '-' + this.mm + '-' + this.dd;

  basicDemoValue = new Date();
  startDate = new Date();

  constructor(
    private userService: UserService,
    private pollService: PollService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    flatpickrFactory();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.element = document.querySelector("#kt_stepper_example_vertical");
    this.submitBtn = document.querySelector('[data-kt-stepper-action="submit"]'), 
    this.stepper = new KTStepper(this.element);
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
  goBack(){
    
    this.stepper.goPrevious(); // go next step 
    this.submitBtn.classList.remove("d-inline-block");
  }

  goNext(){
    if(this.stepper.getCurrentStepIndex() == 4){
      this.submitBtn.classList.add("d-inline-block");
    }
    if(this.stepper.getCurrentStepIndex() != 4){
      this.submitBtn.classList.remove("d-inline-block");
    }

    this.stepper.goNext(); // go next step

  }


  createPoll() {
    const data = {
      name: this.poll.nome,
      start_date: this.poll.date,
    };

    console.log(data);
    /*this.pollService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.isSuccessful = true;
        this.isError = false;
      },
      (error) => {
        this.isError = true;
        this.message = error.statusText;
        console.log(error);
      }
    );*/
  }
}
