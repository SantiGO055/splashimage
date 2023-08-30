import { Component } from '@angular/core';
import { Image } from 'src/app/model/image';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  label: string = "";
  url: string = "";
  listImages: Image[] = []
  constructor(private firebase: FirebaseService, public authService: AuthService) {
    this.firebase.getImageFromDatabase().subscribe((list: Image[]) => {
      this.listImages = list;
      console.log(this.listImages)
    })
  }

  async addPhoto() {
    const html =
      '<input id="swal-input1" class="swal2-input">' +
      '<input id="swal-input2" class="swal2-input">'
    const formValues = Swal.mixin({
      title: "Add a new photo",
      html: '<input id="swal-input1" class="swal2-input" placeholder="Suspendisse elit massa">' +
        '<input id="swal-input2" class="swal2-input" placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r...">',

      focusConfirm: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "green",


      preConfirm: () => {
        console.log()
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ];
      }
    })

    formValues.fire().then(val => {

      this.label = val.value[0];
      this.url = val.value[1];
      let data: Image = { label: this.label, url: this.url }
      this.firebase.insertImage(data)
    })



    // Swal.fire("Add a new photo", html, "info").then((r) => {
    //   console.log(Swal.getInput())

    // })
    // Swal.clickConfirm()
  }
  get() {
    this.firebase.getImageFromDatabase().subscribe(a => console.log(a))
  }
  insert() {
    let data: Image = { label: 'asd', url: 'asdasdasd' };

    this.firebase.insertImage(data);

  }

}
