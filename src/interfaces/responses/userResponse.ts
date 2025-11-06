import type { Address } from "../address"

export interface UserResponse {
    firstName : string, 
    lastName : string ,
    phoneNumber : string, 
    registrationDate : Date,
    address : Address
}