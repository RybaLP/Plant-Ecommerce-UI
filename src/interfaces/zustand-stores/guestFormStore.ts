import type { Address } from "../address";

export interface GuestFormStore {
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  shippingAddress: Address;
  //  optional names for companies
  companyName? : string; 
  nip? : string;

  setGuestInfo: (data: Partial<GuestFormStore>) => void;
  clearGuestForm: () => void;
}