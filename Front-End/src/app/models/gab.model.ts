import { Alert } from "./alert.model";

export class Gab {
    id?: number;
    identifiant :string ;
    etatService: string;
    etatGab: string;
    enseigne: string;
    etatK7: string;
    JDAB: string;
    etatCommunication: string;
    etatKeys: string;
    address :string ;
    alerts: Alert[];
  
    constructor(
      etatService: string,
      etatGab: string,
      enseigne: string,
      etatK7: string,
      JDAB: string,
      etatCommunication: string,
      etatKeys: string,
      address :string ,
      alerts: Alert[]
    ) {
      this.etatService = etatService;
      this.etatGab = etatGab;
      this.enseigne = enseigne;
      this.etatK7 = etatK7;
      this.JDAB = JDAB;
      this.etatCommunication = etatCommunication;
      this.etatKeys = etatKeys;
      this.alerts = alerts;
      this.address =address ;
    }
  
    public static fromJson(jsonObj: any): Gab {
      return new Gab(
        jsonObj['etatService'],
        jsonObj['etatGab'],
        jsonObj['enseigne'],
        jsonObj['etatK7'],
        jsonObj['JDAB'],
        jsonObj['etatCommunication'],
        jsonObj['etatKeys'],
        jsonObj['address'],
        jsonObj['alerts'].map((jsonAlert: any) => Alert.fromJson(jsonAlert))
      );
    }
  }
  