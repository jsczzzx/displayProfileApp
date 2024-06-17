import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../shared/service/fetch-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data: any;
  username: any;
  url: string = 'https://api.github.com/search/users?q=';

  constructor(
    private fetchData: FetchDataService
  ) { }

  ngOnInit(): void {

  }

  onClick() {
    //alert(this.username);
    const valid = (this.username) && /^[a-zA-Z0-9-]*$/.test(this.username);
    if (valid) {
      this.data = this.fetchData.getData(this.url+this.username).subscribe({
        next: (response) => {
          //alert(JSON.stringify(response.items))
          this.data = response.items;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
        complete: () => {
          console.log('Data fetching completed');
        }
      });
    } else {
      this.data = null;
      alert("Invalid username!");
    }

  }

}
