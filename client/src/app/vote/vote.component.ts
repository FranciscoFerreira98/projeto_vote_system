import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/_services/poll.service';
import { FileUploadService } from '../_services/file-upload.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { VoteService } from '../_services/vote.service';
import { FileUploadRepresentativeService } from '../_services/file-upload-representatives.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  //variaveis
  currentPoll: any;
  currentVoter: any;
  allRepresentatives: any;
  showVote = false;
  checkBox = {
    getCheckedVote: '',
  };
  message = '';

  constructor(
    private pollService: PollService,
    private votersService: FileUploadService,
    private representativeService: FileUploadRepresentativeService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private voteService: VoteService
  ) {}

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
        if (data[0].voted == false) {
          this.getPoll(data[0].pollId);
          this.showVote = true;
        }
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

  updateVoter(): void {
    this.message = '';
    const data = {
      voted: true,
    };

    this.votersService.update(this.currentVoter[0].id, data).subscribe(
      (response) => {
        console.log(response);
        this.message = response.message
          ? response.message
          : 'This Voter was updated successfully!';
      },
      (error) => {
        console.log(error); 
      }
    );
  }

  onSubmit() {
    const data = {
      pollId: this.currentVoter[0].pollId,
      pollQuestionId: '2',
      pollAnswerId: this.checkBox.getCheckedVote,
    };
    console.log(this.checkBox.getCheckedVote);

    /*this.voteService.create(data).subscribe(
      (response) => {
        this.updateVoter();
        console.log(data);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );*/
  }
}
