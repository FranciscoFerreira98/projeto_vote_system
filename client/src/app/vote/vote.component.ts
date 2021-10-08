import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/_services/poll.service';
import { FileUploadService } from '../_services/file-upload.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FileUploadRepresentativeService } from '../_services/file-upload-representatives.service';
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
  allRepresentatives : any;
  showVote = false;
  
  constructor(
    private pollService: PollService,
    private votersService: FileUploadService,
    private representativeService: FileUploadRepresentativeService,
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
       this.getRepresentives(data.id);
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
        this.showVote = true;
      },
      (error) => {
        this.showVote = false;
        console.log(error);
      }
    );
  }

  getRepresentives(id: any): void {
    this.representativeService.get(id).subscribe(
      (data) => {
        this.allRepresentatives = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
