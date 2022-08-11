import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

interface LoginForm {
  userID: number,
  remember: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errorMsg!: string;
  public loading = false;
  constructor(public dataService: DataService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit (formValue: LoginForm) {
    if (this.loading) return;
    this.loading = true;
    this.dataService.saveUserID(formValue.userID)
      .subscribe({
        next: () => this.router.navigate(['loading']),
        error: err => {
          this.errorMsg = err;
          this.loading = false;
        }
      })
  }
}
