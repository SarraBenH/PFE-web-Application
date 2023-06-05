export class Tpe {
    id?: number;
    lastTrxCode:string ;
    lastTrxType:string ;
    sphTimeReceived:string;
    sphTerminalId :string ;
    sphAtpName :string ;
    sphCard :string ;
    sphMer:string ;
    sphIsREVERSAL :string ;
  
    constructor(  lastTrxCode:string ,
        lastTrxType:string ,
        sphTimeReceived:string,
        sphTerminalId :string ,
        sphAtpName :string ,
        sphCard :string ,
        sphMer:string ,
        sphIsREVERSAL :string ,
   
    ) { this.lastTrxCode =lastTrxCode ;
        this.lastTrxType = lastTrxType ;
        this.sphTerminalId =sphTerminalId ;
        this.sphAtpName = sphAtpName ;
        this.sphCard =sphCard ;
        this.sphIsREVERSAL =sphIsREVERSAL ;
        this.sphMer =sphMer ;
        this.sphTimeReceived = sphTimeReceived
      
    }

    public static fromJson(jsonObj: any): Tpe {
        return new Tpe(
          jsonObj['lastTrxCode'],
          jsonObj['lastTrxType'],
          jsonObj['sphTerminalId'],
          jsonObj['sphAtpName'],
          jsonObj['sphCard'],
          jsonObj['sphIsREVERSAL'],
          jsonObj['sphMer'],
          jsonObj['sphTimeReceived'],
         
        );
      }
  }