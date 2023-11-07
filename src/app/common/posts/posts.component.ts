import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input('id') id = '';
  @Input('title') title = '';
  @Input('description') description = '';
  @Input('department') department = '';
  @Output()delete = new EventEmitter()


  constructor(){}


  ngOnInit(): void {}

  onClick(){
    this.delete.emit();
  }
  

}
