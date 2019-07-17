import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'createUser', component: CreateUserComponent},
    {path: 'chatRoom', component: ChatRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
