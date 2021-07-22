import { Component, OnInit } from '@angular/core';
import { PollService } from '../_services/poll.service';
import { UserService } from '../_services/user.service';

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
