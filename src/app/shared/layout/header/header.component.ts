import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {appConstants} from './../../../app.constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  teamList;
  chooseTeam = null;

  @Output() applyFilter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    this.teamList = appConstants.teamList;
  }

  selectTeam(){
    this.callParentFilter();
  }

  callParentFilter(){ 
    let filterValues = {};
    if(this.chooseTeam == null){
      filterValues = {
        'filterTeam' : ''
      }
    }else{
      filterValues = {
        'filterTeam' : this.chooseTeam
      }
    }
    
    this.applyFilter.next(JSON.stringify(filterValues));
  }

}
