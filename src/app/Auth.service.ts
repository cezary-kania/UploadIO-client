
export class AuthService {
    private userIdentifier : string = 'cezary.kaniaq@gmail.com'; 
    private isUserLoggedIn : boolean = false;

    login() {this.isUserLoggedIn = true;}
    logout() {this.isUserLoggedIn = false;}

    getUserIndentifier() { return this.userIdentifier;}
    getStatus() {return this.isUserLoggedIn;}
    
}