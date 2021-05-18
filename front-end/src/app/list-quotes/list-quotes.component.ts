import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  styleUrls: ['./list-quotes.component.css']
})
export class ListQuotesComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }

}
