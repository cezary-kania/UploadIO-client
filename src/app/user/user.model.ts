export class User {
    constructor(public login : string, 
                public email: string, 
                public account_type : string,
                public account_creation_date: string,
                public access_token: string,
                public refresh_token: string,
                public tokenExpiration : Date,
                public refreshTokenExpiration : Date
                ) {}
    static get  tokenExpirationTime() {
        return 60*1000*15;
    }
    get tokenExpired() {
        return new Date() > this.tokenExpiration;
    }
    get timeToTokenExpire() { 
        const toExpire = this.tokenExpiration.getTime() - new Date().getTime();
        if(toExpire >= 0) return toExpire;
        return 0;
    }
    get timeToRefTokenExpire() {
        const toExpire = this.refreshTokenExpiration.getTime() - new Date().getTime();
        if(toExpire >= 0) return toExpire;
        return 0;
    }
    get refreshTokenExpired() {
        return new Date() > this.refreshTokenExpiration;
    }
    public static GenTokenExpirationDate() : Date {
        let expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + 60*15);
        return expirationDate;
    }
    public static GenRefTokenExpirationDate() : Date {
        let expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + 60*60*24*14);
        return expirationDate;
    }
}