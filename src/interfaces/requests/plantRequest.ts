import type { PlantType } from "../../types/plantType";

export interface PlantRequest {
    name : string ,
    description : string,
    price : number,
    quantityInStock : number,
    imageUrl : string,
    category : PlantType,
    size : string,
}