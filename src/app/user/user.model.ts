export class User {
    constructor(public login : string, 
                public email: string, 
                public account_type : string,
                public account_creation_date: string,
                public access_token: string,
                public refresh_token: string,
                public tokenExpiration : Date
                ) {}
    
    get tokenExpired() {
        return new Date() > this.tokenExpiration;
    }
}