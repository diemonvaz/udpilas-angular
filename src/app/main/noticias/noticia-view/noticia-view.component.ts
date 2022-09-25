import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { NoticiaRequest } from 'src/app/models/NoticiaRequest';

@Component({
  selector: 'app-noticia-view',
  templateUrl: './noticia-view.component.html',
  styleUrls: ['./noticia-view.component.css']
})
export class NoticiaViewComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/instagram-logo-svgrepo-com.svg'));
    iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/twitter-svgrepo-com.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/facebook-svgrepo-com.svg'));
    iconRegistry.addSvgIcon('whatsapp', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/whatsapp-svgrepo-com.svg'));
    
   }


  

}
