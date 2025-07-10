import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from "@angular/material/icon";
import {UsersService} from "../../service/users/users.service";
import {PostsService} from "../../service/posts/posts.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeletePostComponent} from "../../../public/components/dialog-delete-post/dialog-delete-post.component";
import {FlatProduct} from "../../model/flat-product/flat-product";
import {MessageBoxComponentComponent} from "../message-box-component/message-box-component.component";

@Component({
  selector: 'app-my-posts',
  standalone: true,
    imports: [
        MatCardModule,
        MatIconModule,
        NgForOf,
        NgIf,
        MatMenuModule,
        MatIconModule,
        MatIconButton,
        MatButtonModule,
        RouterLink,
        MessageBoxComponentComponent
    ],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {
  items: FlatProduct[] = []; // corregido: se especifica que items es un array de Products
  post: any = {};
  userId = localStorage.getItem('id');
  checked = false;


  constructor(
    private dialogDeletePost: MatDialog,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.getMyProducts();
  }

  getMyProducts(): void {
    if (!this.userId) return;

    this.postService.getNewProductsByUserId(parseInt(this.userId)).subscribe(
      items => {
        this.items = items.filter(item => item.available);
        this.checked = true;
      },
      error => {
        console.error('Error fetching user products:', error);
        this.checked = true;
      }
    );
  }

  onCallDeletePost(id: number) {
    const dialogRef = this.dialogDeletePost.open(DialogDeletePostComponent, { disableClose: true, data: id });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deleteProduct(id).subscribe(
          res => {
            this.items = this.items.filter((item: FlatProduct) => item.id !== String(id));
          }
        );
      }
    });
  }

  setPost(post: any) {
    this.post = post;
  }

  protected readonly Number = Number;
}
