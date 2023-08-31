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
  searchText: string = ""
  listImages: Image[] = []
  imageNotFound = "assets/imagenotfound.jpg"
  constructor(private firebase: FirebaseService, public authService: AuthService) {
    this.firebase.getImageFromDatabase().subscribe((list: Image[]) => {
      this.listImages = list.sort((a: Image, b: Image) => {
        return a.datetime > b.datetime ? -1 : 1;
      });

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
      let data: Image = { label: this.label, url: this.url, datetime: new Date().toTimeString() }
      this.firebase.InsertImage(data)
    })

    const now = new Date();
    console.log(now.toTimeString())

    // Swal.fire("Add a new photo", html, "info").then((r) => {
    //   console.log(Swal.getInput())

    // })
    // Swal.clickConfirm()
  }

  validateUrl(url: string) {
    let valid = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);

    if (valid)
      return url;
    else
      return 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';// or "link/to/image1.png"
  }



}
