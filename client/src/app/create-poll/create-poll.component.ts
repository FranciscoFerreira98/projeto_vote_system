import { Component, OnInit } from '@angular/core';
import { PollService } from '../_services/poll.service';
import { UserService } from '../_services/user.service';

import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr'

export function flatpickrFactory() {
  flatpickr.localize(Portuguese);
  return flatpickr;
}

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  content?: string;
  
  isSuccessful = false;
  submitted = false;
  poll = {
    nome: '',
    start_date: '',
    end_date:''
  };

  getDate = new Date();
dd = String(this.getDate.getDate()).padStart(2, '0');
mm = String(this.getDate.getMonth() + 1).padStart(2, '0'); //January is 0!
yyyy = this.getDate.getFullYear();

 today =  this.yyyy + '-' + this.mm + '-' + this.dd;
 
  basicDemoValue = '2017-01-01';
  modelValueAsDate: Date = new Date();
  dateTimeValue: Date = new Date();
  multiDates: Date[] = [new Date(), (new Date() as any)['fp_incr'](10)];
  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };
  inlineDatePicker: Date = new Date();

  constructor(
    private userService: UserService,
    private pollService: PollService) { }

  ngOnInit(): void {
    flatpickrFactory();
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    
  }

  createEspecialidade() {
    const data = {
      nome: this.poll.nome,
      start_date:  this.poll.start_date,
      end_date:  this.poll.end_date,
    };

    console.log(data);
    this.pollService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.isSuccessful = true
        },
        error => {
          console.log(error);
        });
  }

}
