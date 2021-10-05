import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/_services/poll.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.css']
})


export class EditPollComponent implements OnInit {
  currentPoll: any;
  isUpdateFailed = false;
  isSuccessful = false;

  
  constructor(  private pollService: PollService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPoll(this.route.snapshot.paramMap.get('id'));

  }


  getPoll(id:any): void{
    this.pollService.get(id)
      .subscribe(
        data => {
          this.currentPoll = data;
          console.log(this.currentPoll)
        },
        error => {
          console.log(error);
        });
  }

  deletePoll(){
    this.pollService.delete(this.currentPoll.id)
    .subscribe(
      response => {
        console.log(response);
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      error => {
        console.log(error);
      });
  }
}
