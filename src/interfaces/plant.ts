import type { PlantType } from "../types/plantType";

export interface Plant {
    id : number, 
    name : string , 
    price : number, 
    imageUrl : string , 
    category : PlantType,  
    quantityInStock : number,
    description : string,
    size : string;
}