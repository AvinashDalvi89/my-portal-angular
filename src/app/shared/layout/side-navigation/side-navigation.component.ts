import { Component, OnInit, HostListener, Output, EventEmitter} from '@angular/core';
import {appConstants} from './../../../app.constants';
import { FormControl, FormsModule, FormGroup, FormArray, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {
  
  enableSearch: boolean;
  screenHeight: number;
  screenWidth: number;
  contentWidth:number;
  contentLeft:number;
  departmentList;
  rollList;
  designationList;
  locationList;
  teamList;
  filterForm;

  @Output() someEvent = new EventEmitter<string>();
  @Output() applySideFilter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.filterForm = new FormGroup({  
        filterDepartment: new FormControl (""),
        filterRollType: new FormControl (""),
        filterDesignation: new FormControl (""),
        filterExperience: new FormControl (""),
        filterJoiningYear: new FormControl (""),
        filterLocation: new FormControl (""),
        filterTeam: new FormControl (""),
       
    });
    this.enableSearch = false;
    this.getScreenSize();
    this.departmentList = appConstants.department;
    this.rollList = appConstants.rollType;
    this.designationList = appConstants.designation;
    this.locationList = appConstants.location;
    this.teamList = appConstants.teamList;
  }
  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          this.contentWidth = this.screenWidth - 224;
          console.log(this.contentWidth);
          console.log(this.screenHeight, this.screenWidth);
  }
  openSearch = function(state){
    this.enableSearch = state;
    if (state){
      this.contentWidth = this.screenWidth - (224 + 360);
      this.contentLeft = 234 + 320;
    }
    else{
      this.contentWidth = this.screenWidth - (270);
    this.contentLeft = 234;
    }
    
    console.log(this.contentWidth);
    this.changeContentStyle();
  }

  changeContentStyle() {
    let contentStyle = {
      'width' : this.contentWidth,
      'left' : this.contentLeft
    }
    this.someEvent.next(JSON.stringify(contentStyle));
  }

  callParentFilter(filterFlag = true){ 
    
    if(filterFlag == false){
      this.filterForm.reset(); 
    } 
    let filterValues:any = this.filterForm.value;
    Object.keys(filterValues).forEach(key => (filterValues[key] === '' || filterValues[key] == null) ? delete filterValues[key] : key);  
    
    this.applySideFilter.next(JSON.stringify(filterValues));
  }

}
