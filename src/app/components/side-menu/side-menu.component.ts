import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/classes/categories';
import { SideMenuService } from 'src/app/services/side-menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  categories: Categories[] = [];

  constructor(private sidemenuservice: SideMenuService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(()=>
    this.getSideMenu()
    )
  }

  getSideMenu(){
    return this.sidemenuservice.getCategories().subscribe(
      (data)=>this.categories = data
    );
  }
}
