import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/_services/poll.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadRepresentativeService } from '../_services/file-upload-representatives.service';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.css'],
})
export class EditPollComponent implements OnInit {
  currentPoll: any;
  voters: any;
  isUpdateFailed = false;
  isSuccessful = false;
  name = '';
  nameRepresent = '';
  allRepresentatives: any;
  startDate: any;
  endDate: any;
  today = new Date();
  isFinished = false;
  isUpdated = false;

  p: number = 1;
  p1: number = 1;

  constructor(
    private pollService: PollService,
    private votersService: FileUploadService,
    private tokenStorageService: TokenStorageService,
    private representativeService: FileUploadRepresentativeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPoll(this.route.snapshot.paramMap.get('id'));
    this.retrievePolls();
    this.getAllRepresents();
  }

  retrievePolls(): void {
    this.votersService.get(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.voters = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllRepresents(): void {
    this.representativeService
      .get(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (data) => {
          this.allRepresentatives = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getPoll(id: any): void {
    this.pollService.get(id).subscribe(
      (data) => {
        this.currentPoll = data;
        console.log(this.currentPoll);
        this.startDate = Date.parse(this.currentPoll.start_date);
        this.endDate = Date.parse(this.currentPoll.end_date);

        if (this.today.getTime() >= this.endDate) {
          this.isFinished = true;
        } else {
          this.isFinished = false;
        }
       
        if (
          this.today.getTime() >= this.startDate &&
          this.today.getTime() <= this.endDate
        ) {
          this.isUpdated = false;
        } else {
          this.isUpdated = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getVoters(id: any): void {
    this.votersService.get(id).subscribe(
      (data) => {
        this.voters = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePoll() {
    this.pollService.delete(this.currentPoll.id).subscribe(
      (response) => {
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteVoter(id) {
    this.votersService.delete(id).subscribe(
      (response) => {
        this.searchByName();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRepresent(id) {
    this.representativeService.delete(id).subscribe(
      (response) => {
        this.searchByNameRepresents();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onEnter() {
    this.searchByName();
    this.searchByNameRepresents();
  }

  searchByName(): void {
    this.votersService
      .findByName(this.name, this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (data) => {
          this.voters = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  searchByNameRepresents(): void {
    this.representativeService
      .findByName(this.nameRepresent, this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (data) => {
          this.allRepresentatives = data;
          console.log(data);
        },
        (error) => {
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
