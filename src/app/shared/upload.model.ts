export class Upload {

    constructor(public expiration_date: string,
                public has_expired: boolean,
                public password_required: boolean,
                public size: number,
                public uploaded_files: 
                    {number_in_upload : number, filename: string}[],
                public url_hash : string
                ) {}
}