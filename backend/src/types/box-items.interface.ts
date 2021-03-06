import { Document } from "mongoose";

export interface IBoxItem {
  pokemonGuid: string;
  boxPosition: number;
}
export interface IBox {
  boxName: string;
  boxItems: IBoxItem[];
}

export interface IUserBoxes extends Document {
  userId: string;
  boxes: IBox[];
}
