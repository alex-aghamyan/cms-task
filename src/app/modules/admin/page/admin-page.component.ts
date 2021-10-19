import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  links = [
    { link: 'products', name: 'Products' },
    { link: 'categories', name: 'Categories' },
    { link: 'news', name: 'News' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
