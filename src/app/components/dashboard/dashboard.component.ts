import { Component, OnInit, NgModule } from '@angular/core'; 
import { appConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  profiles=[];
  totalResult:number;
  filterProfiles=[];
  chooseTeam=[];
  profileLocation ="Bangalore";
  widthStyle:number;
  leftStyle:number;
  constructor() { }

  ngOnInit() {
    console.log(this.chooseTeam);
    this.profiles = appConstants.profileList
    this.filterProfiles = this.profiles;
    this.totalResult = this.filterProfiles.length;
    
  }
  filterBangalore = function(event){
    let filterValues = {};
    if(event.target.checked == true){
      filterValues = {
        'filterLocation' : 'Bangalore'
      } 
    }
    this.searchProfiles(JSON.stringify(filterValues));
    
  }
  getSelected = function(){ 
    this.filterProfiles = this.profiles.filter(x => { 
      return x.location == this.profileLocation
    });  
  } 
  
  setContentStyle = function(event){
    let contentStyle = JSON.parse(event);
    this.widthStyle = contentStyle.width;
    this.leftStyle = contentStyle.left;
    console.log(JSON.parse(event));
  }

  searchProfiles = function(event){
    let filterValues = JSON.parse(event); 
    let experienceArray=[];
    if (Object.keys(filterValues).length === 0 && filterValues.constructor === Object) { 
      this.filterProfiles = this.profiles;
    }
    else{
      if("filterExperience" in filterValues){
        if(filterValues.filterExperience.indexOf("-") >=0){
          experienceArray = filterValues.filterExperience.split("-")
        }else{
          experienceArray[0] = filterValues.filterExperience;
        }
      }
      this.filterProfiles = this.profiles.filter(x => { 
        let result = ((filterValues.filterTeam != "" && "filterTeam" in filterValues ) ?  x.currentTeam == filterValues.filterTeam : x.currentTeam )
                      && ((filterValues.filterDepartment != "" && "filterDepartment" in filterValues) ?  x.department == filterValues.filterDepartment : x.department )
                      && ((filterValues.filterRollType != "" && "filterRollType" in filterValues) ?  x.rollType == filterValues.filterRollType : x.rollType )
                      && ((filterValues.filterDesignation != "" && "filterDesignation" in filterValues) ?  x.title == filterValues.filterDesignation : x.title )
                      && ((filterValues.filterExperience != "" && "filterExperience" in filterValues) ?  ((experienceArray.length == 1) ? x.experience > experienceArray[0] : x.experience >= experienceArray[0] &&  x.experience <= experienceArray[1]) : x.experience )
                      && ((filterValues.filterJoiningYear != "" && "filterJoiningYear" in filterValues) ?  x.joiningDate == filterValues.filterJoiningYear : x.joiningDate )
                      && ((filterValues.filterLocation != "" && "filterLocation" in filterValues) ?  x.location == filterValues.filterLocation : x.location ) 
  
        return result;
      });  
      
    }   
    this.totalResult = this.filterProfiles.length;
  }
 
  giveRating = function(index, event){  
    this.filterProfiles[index].rating = event;
  }
}
