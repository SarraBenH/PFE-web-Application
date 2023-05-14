export class Message{

    id?:number;
    content:string ;
    source: string;
    target: string;
    dateMessage: string;
    image:string;

    constructor(
        content: string,
        source: string,
        target: string,
        dateMessage:string ,
        image:string
      ) {
        this.content = content;
        this.source = source;
        this.target = target;
        this.dateMessage=dateMessage ;
        this.image=image ;
      }}