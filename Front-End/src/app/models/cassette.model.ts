export class Cassette {
    id?: number;
    enseigneGab :string;
    valeurk71 : string ;
    soldeK71: string;
    valeurK72 : string ;
    soldeK72 : string;
    valeurK73 :string;
    soldeK73 : string ;
    valeurK74: string;
    soldeK74 : string ;
    totalCoffre : string;
    lastDateCharged :string;
    montantCharged : string ;
    montantDecharged: string;
    montantEx : string ;
    montantDe : string;
  
    constructor(
        enseigneGab : string,
        valeurk71 :string,
        soldeK71: string,
        valeurK72 : string ,
        soldeK72 : string,
        valeurK73 :string,
        soldeK73 : string ,
        valeurK74: string,
        soldeK74 : string ,
        totalCoffre : string,
        lastDateCharged :string,
        montantCharged : string ,
        montantDecharged: string,
        montantEx : string ,
        montantDe : string,
    ) {
     this.enseigneGab= enseigneGab ;
     this.soldeK71 =soldeK71 ;
     this.soldeK72 = soldeK72 ;
     this.soldeK73 = soldeK73 ;
     this.soldeK74 =soldeK74 ;
     this.valeurk71 = valeurk71 ;
     this.valeurK72 = valeurK72 ;
     this.valeurK73 = valeurK73 ;
     this.valeurK74 =valeurK74 ;
     this.totalCoffre =totalCoffre ;
     this.lastDateCharged = lastDateCharged ;
     this.montantCharged = montantCharged ;
     this.montantDecharged = montantDecharged ;
     this.montantDe = montantDe ;
     this.montantEx = montantEx ;
    }

    public static fromJson(jsonObj: any): Cassette {
        return new Cassette(
          jsonObj['enseigneGab'],
          jsonObj['soldeK71'],
          jsonObj['soldeK72'],
          jsonObj['soldeK73'],
          jsonObj['soldeK74'],
          jsonObj['valeurk71'],
          jsonObj['valeurK72'],
          jsonObj['valeurK73'],
          jsonObj['valeurK74'],
          jsonObj['totalCoffre'],
          jsonObj['lastDateCharged'],
          jsonObj['montantCharged'],
          jsonObj['montantDecharged'],
          jsonObj['montantDe'],
          jsonObj['montantEx'],
         
        );
      }
  }
  