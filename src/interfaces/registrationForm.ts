import type { Address } from "./address"

export interface RegistrationForm {

    username : string , 
    password : string , 
    email : string , 
    firstName : string , 
    lastName : string , 
    shippingAddress : Address , 
    phoneNumber : string, 
}