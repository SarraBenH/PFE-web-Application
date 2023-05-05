export class Alert {
    id?: number;
    message: string;
    dateAlerte: string;
    etatAlerte: string;
    gab_id?: number ;
    emailSent : boolean;
  
    constructor(
      message: string,
      dateAlerte: string,
      etatAlerte: string,
      gab_id:number ,
      emailSent:boolean
    ) {
      this.message = message;
      this.dateAlerte = dateAlerte;
      this.etatAlerte = etatAlerte;
      this.gab_id=gab_id ;
      this.emailSent=emailSent ;
    }
  
    public static fromJson(jsonObj: any): Alert {
      return new Alert(
        jsonObj['message'],
        jsonObj['dateAlerte'],
        jsonObj['etatAlerte'],
        jsonObj['emailSent'],
        jsonObj['gab_id']
      );
    }
  }
  