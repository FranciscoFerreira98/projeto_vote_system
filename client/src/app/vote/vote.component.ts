import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/_services/poll.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})


export class VoteComponent implements OnInit {
  
  //variaveis
  currentPoll : any;
  currentVoter : any;

  constructor(
    private pollService: PollService,
    private votersService: FileUploadService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getVoters(this.route.snapshot.paramMap.get('id'));
  }


  getPoll(id: any): void {
    this.pollService.get(id).subscribe(
      (data) => {
        this.currentPoll = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  getVoters(id: any): void {
    this.votersService.getByMd5(id).subscribe(
      (data) => {
        this.currentVoter = data;
        this.getPoll(data[0].pollId);
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
