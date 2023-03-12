import { Status } from "./status";

export class Event {
  nomEvenement: string | undefined;
  lieu: string | undefined;
  description: string | undefined;
  etat: string | undefined;
  typeEvenement: string | undefined;
  duree: number | undefined;
  status!: Status[];
  image: string | undefined;

  constructor(public title: string, public date: string) {}
}
