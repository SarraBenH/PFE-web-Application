export class User {
    id?:string;
    sessionId?:string ;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    city: string;
    position: string;
    image: string;
    alert_ids : number[]
    message_ids : number[]
    // Autres propriétés spécifiques à l'utilisateur
  
    constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      phoneNumber: string,
      city: string,
      position: string,
      image: string ,
      alert_ids:number[],
      message_ids:number[]
    ) {
      
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.city = city;
      this.position = position;
      this.image = image;
      this.alert_ids=alert_ids;
      this.message_ids = message_ids;
      // Initialisation d'autres propriétés
    } 

   
    public static fromJson(jsonObj: any): User {
        return new User(

          jsonObj['firstName'],
          jsonObj['lastName'],
          jsonObj['email'],
          jsonObj['password'],
          jsonObj['phoneNumber'],
          jsonObj['city'],
          jsonObj['position'],
          jsonObj['image'],
          jsonObj['alert_ids'],
          jsonObj['message_ids']



        //  jsonObj['data'].map((jsonRequest: any) => Request.fromJson(jsonRequest)));
      )}
  }
  