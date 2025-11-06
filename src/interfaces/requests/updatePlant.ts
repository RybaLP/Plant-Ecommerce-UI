import type { PlantType } from "../../types/plantType";

export interface UpdatePlant {
    name : string, 
    price : number, 
    imageUrl : string,
    category : PlantType,
    quantityInStock : number
}