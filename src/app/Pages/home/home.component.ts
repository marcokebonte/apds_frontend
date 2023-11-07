import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  posts: any[] = [];
  title = new FormControl('');
  description = new FormControl('');
  department = new FormControl('');
  hasError = false;
  errorMessage = '';


  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private postsService: PostsService
  ){}


  ngOnInit(): void {
    if(!this.auth.isLoggedIn){
      this.router.navigate(['/login']);
      return;
    }
  this.postsService.getPosts().subscribe({
    next: (v) => (this.posts = v as any),
    error: (e) => console.log(e),
  });
}



addNewPost(e: Event){
  e.preventDefault();
  this.hasError = false;

  if(
    !this.title.value ||
    !this.department.value
  ){
    this.hasError = true;
    this.errorMessage = 'Please fill out all fields';
    return;
  }

  const descriptionValue = this.description.value ?? '';
  this.postsService
  .add(this.title.value, descriptionValue, this.department.value)
  .subscribe({
    next: (v) => {
      this.posts.push(v);
      this.title.setValue('');
      this.description.setValue('');
      this.department.setValue('');
    },
    error: (e) => {
      this.hasError = true;
      this.errorMessage = e.error;
      console.log(e);
    },
  });

}




deletePost(id: string){
  console.log('I was called!');
  this.postsService
  .delete(id)
  .subscribe({ next: (v) => console.log(v), error: (e) => console.log(e)})

  const filtered = this.posts.filter((post) => post._id !== id);
  this.posts = filtered
}

}



