import { Component } from '@angular/core';
import { Image } from 'src/app/model/image';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private fire: FirebaseService, public authService: AuthService) {

  }

  get() {
    this.fire.getImageFromDatabase().subscribe(a => console.log(a))
  }
  insert() {
    let data: Image = { label: 'asd', name: 'asdasdasd' };

    this.fire.insertImage(data);

  }

}
