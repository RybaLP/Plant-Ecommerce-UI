export interface CreateUserOrder {
    deliveryPrice : number,
    paymentMethod : "STRIPE" | "CASH_ON_DELIVERY",
    isCompanyOrder : boolean,
    nip? : string,
    companyName? : string
}