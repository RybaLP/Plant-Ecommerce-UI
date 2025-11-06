import type { PlantType } from "../../types/plantType";

export interface PlantResponse {
    id : number,
    name : string, 
    price : number,
    imageUrl : string,
    category : PlantType,
    size : string,
    quantityInStock : number
}