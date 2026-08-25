// Address
export interface Address {
  _id?: string;
  id?: string;
  username: string;
  street: string;
  city: string;
  phone: string;
  lat: string;
  long: string;
}

// Address form
export interface AddressFormData {
  username: string;
  city: string;
  street: string;
  phone: string;
  lat: string;
  long: string;
}

export type ModalMode = "add" | "edit";

export type ViewMode = "list" | "form-step1" | "form-step2" | "delete";