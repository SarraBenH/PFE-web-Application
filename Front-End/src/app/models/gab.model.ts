import { Alert } from "./alert.model";

export class Gab {
    id?: number;
    identifiant :string ;
    latitude: string;
    statutGab: string;
    enseigne: string;
    longitude: string;
    JDAB: string;
    etatCommunication: string;
    etatK1: string;
    etatK2: string;
    etatK3: string;
    etatK4: string;
    address :string ;
    etatTicketClient: string;
    etatSuppK1: string;
    etatSuppK2: string;
    etatSuppK3: string;
    etatSuppK4: string;
    etatSuppTicket: string;
    etatSuppJournal: string;
    etatCoffre:string ;
    etatSuppCoffre:string


    alerts: Alert[];
  
    constructor(
      statutGab: string,
      latitude: string,
      enseigne: string,
      longitude: string,
      JDAB: string,
      etatCommunication: string,
      etatK1: string,
      etatK2: string,
      etatK3: string,
      etatK4: string,
      address :string ,
      etatTicketClient: string,
      etatSuppK1: string,
      etatSuppK2: string,
      etatSuppK3: string,
      etatSuppK4: string,
      etatSuppTicket: string,
      etatSuppJournal: string,
      etatSuppCoffre:string,
      etatCoffre:string ,
      alerts: Alert[]
    ) {
      this.statutGab = statutGab;
      this.latitude = latitude;
      this.enseigne = enseigne;
      this.longitude = longitude;
      this.JDAB = JDAB;
      this.etatCommunication = etatCommunication;
      this.etatK1 = etatK1;
      this.etatK2 = etatK2;
      this.etatK3 = etatK3;
      this.etatK4 = etatK4;
      this.etatTicketClient = etatTicketClient;
      this.etatSuppK1 = etatSuppK1;
      this.etatSuppK2 = etatSuppK2;
      this.etatSuppK3 = etatSuppK3;
      this.etatSuppK4 = etatSuppK4;
      this.etatSuppTicket = etatSuppTicket;
      this.etatSuppJournal = etatSuppJournal;
      this.alerts = alerts;
      this.address =address ;
      this.etatCoffre =etatCoffre ;
      this.etatSuppCoffre = etatSuppCoffre
    }
  
    public static fromJson(jsonObj: any): Gab {
      return new Gab(
        jsonObj['statutGab'],
        jsonObj['latitude'],
        jsonObj['enseigne'],
        jsonObj['longitude'],
        jsonObj['JDAB'],
        jsonObj['etatCommunication'],
        jsonObj['etatCoffre'],
        jsonObj['etatSuppCoffre'],
        jsonObj['etatK1'],
        jsonObj['etatK2'],
        jsonObj['etatK3'],
        jsonObj['etatK4'],
        jsonObj['etatTicketClient'],
        jsonObj['etatSuppK1'],
        jsonObj['etatSuppK2'],
        jsonObj['etatSuppK3'],
        jsonObj['etatSuppK4'],
        jsonObj['etatSuppTicket'],
        jsonObj['etatSuppJournal'],
        jsonObj['address'],
        jsonObj['alerts'].map((jsonAlert: any) => Alert.fromJson(jsonAlert))
      );
    }
  }
  