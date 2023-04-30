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
      gab_id:number
    ) {
      this.message = message;
      this.dateAlerte = dateAlerte;
      this.etatAlerte = etatAlerte;
      this.gab_id=gab_id ;
    }
  
    public static fromJson(jsonObj: any): Alert {
      return new Alert(
        jsonObj['message'],
        jsonObj['dateAlerte'],
        jsonObj['etatAlerte'],
        jsonObj['gab_id']
      );
    }
  }
  