export class Message{

    id?:number;
    content:string ;
    source: string;
    target: string;
    dateMessage: string;
    image:string;
    displayNameSender? :string = "" ;
    displayImage? :string ="" ;

    constructor(
        content: string,
        source: string,
        target: string,
        dateMessage:string ,
      ) {
        this.content = content;
        this.source = source;
        this.target = target;
        this.dateMessage=dateMessage ;
      }}