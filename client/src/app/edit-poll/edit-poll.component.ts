import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll.model';
import { PollService } from 'src/app/_services/poll.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  name: any;

  currentIndex = -1;
  
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];

  title = '';

  constructor(
    private pollService: PollService,
    private votersService: FileUploadService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePolls();
    this.getPoll(this.route.snapshot.paramMap.get('id'));
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePolls();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePolls();
  }

  retrievePolls(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.votersService.get(this.route.snapshot.paramMap.get('id')).subscribe(
      (data) => {
        this.voters = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }


  getPoll(id: any): void {
    this.pollService.get(id).subscribe(
      (data) => {
        this.currentPoll = data;
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

  onEnter() {
    this.searchByName();
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

 


}
