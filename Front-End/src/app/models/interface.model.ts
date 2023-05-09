
export class Interface {
    id?: number;
    intCode : number;
    intIden :string;
    intLabe : string ;
    intPrimPort: number;
    intPrimAdre : string ;
    status : number;
  
    constructor(
      intCode : number,
      intIden :string,
      intLabe : string ,
      intPrimPort: number,
      intPrimAdre : string ,
      status : number
    ) {
      this.intCode = intCode;
      this.intIden = intIden;
      this.intPrimPort = intPrimPort;
      this.intPrimAdre = intPrimAdre
      this.intLabe = intLabe;
      this.status = status;
    }
  }
  