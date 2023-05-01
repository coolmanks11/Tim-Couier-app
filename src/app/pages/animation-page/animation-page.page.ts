import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-animation-page',
  templateUrl: './animation-page.page.html',
  styleUrls: ['./animation-page.page.scss'],
})
export class AnimationPagePage implements OnInit {

  constructor(public router:Router) { 
    setTimeout(()=>{
      this.router.navigateByUrl('/login'  );
    },5000)
  }

  ngOnInit() {
  }

}
