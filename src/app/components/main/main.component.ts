import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private fire: FirebaseService) {

  }

  get() {
    this.fire.getImageFromDatabase().subscribe(a => console.log(a))
  }

}
