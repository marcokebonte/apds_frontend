import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly BASE_URL = 'http://localhost:53893/api/posts';

  constructor(private http: HttpClient, private auth: AuthServiceService) {}

    getPosts() {
      const token = this.auth.token;
      return this.http.get(this.BASE_URL, {
        headers: {
          'x-auth-token': token ?? '',
        },
      });
    }


    add(title: string, description: string, department: string){
      const token = this.auth.token;
      return this.http.post(
        this.BASE_URL,
        {
          title,
          description,
          departmentCode: department
        },
        {
          headers: {
            'x-auth-token' : token ?? '',
          },
        }
      ); 
    }

    delete(id: string) {
      return this.http.delete('${this.BASE_URL}/${id}', {
        headers: {
          'x-auth-token' : this.auth.token ?? '',
        },
      });
    }


   }
  

