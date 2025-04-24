import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { DrawerModule } from 'primeng/drawer';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { AppService } from './services/app.service';
import { LoadingService } from './core/services/loading.service';
import { Usuario } from './DtoUsers';
import { LoadingComponent } from './Utils/loading/loading.component';
@Component({
  selector: 'app-root',
  imports: [LoadingComponent,CheckboxModule, DatePickerModule, MenuModule, CardModule, InputNumberModule, CalendarModule, SelectModule, TextareaModule, InputTextModule, FormsModule, TableModule, DrawerModule, PasswordModule, DropdownModule, FileUploadModule, CommonModule, ButtonModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prueba';
  usuarios: Usuario[] = []
  constructor(private usersService: AppService, private loadingService: LoadingService) {

  }
  ngOnInit() {
    console.log('ENTRA??? ');

    this.getAllUsers()
  }

  getAllUsers() {
    console.log('ENTRA??? LLAMA A GETALLUSERS');
    this.loadingService.showLoading();
    this.usersService.getDto().subscribe({


      next: (data) => {
        console.log('ENTRA??? AL SUBSCRIBE??')
        console.log('data', data);
        this.usuarios = data.results
        this.loadingService.hideLoading();

      },
      error: (err) => {
        console.log('ENTRA??? AL SUBSCRIBE??')
        this.loadingService.hideLoading();
        this.loadingService.hideLoading();
      },
    })
  }
}
