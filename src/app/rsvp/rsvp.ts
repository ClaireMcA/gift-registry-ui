export interface Rsvp {
    names: string;
    canAttend: boolean | null;
    dietaryRequirements: boolean | null;
    dietaryDetails: string;
    comments: string;
    userName: string;
}


export class Rsvp {

    constructor(
      public names: string,
      public canAttend: boolean | null,
      public dietaryRequirements: boolean | null,
      public dietaryDetails: string,
      public comments: string,
      public userName: string,
    ) {  }
  
  }