import type { PlantType } from "../../types/plantType";
import type { Review } from "../review";

export interface DetailPlant {
    id : number , 
    name : string , 
    price : number , 
    imageUrl : string , 
    category : PlantType,
    description : string , 
    quantityInStock : number,
    reviews : Review[]
}