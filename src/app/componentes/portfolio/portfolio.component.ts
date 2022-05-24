import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})


export class PortfolioComponent implements OnInit {
  isLoggedIn = false;
  isLoginFail = false;
  roles: string[]=[];

  constructor(private tokenService: TokenService,
    private autenticacionService: AutenticacionService,
    private router: Router) { }
    
  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }

 
}