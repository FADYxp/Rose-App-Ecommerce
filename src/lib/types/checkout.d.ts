declare type CheckoutStep = {
  setStep: React.Dispatch<React.SetStateAction<string>>;
};

declare type AddressCardProps = {
  selectedAddress: boolean;
  city: string;
  phone: string;
  street: string;
};

declare type ShippingAddressProps = {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setLat: React.Dispatch<React.SetStateAction<string>>;
  setLong: React.Dispatch<React.SetStateAction<string>>;
};

declare type Address = {
  _id: string;
  street: string;
  phone: string;
  city: string;
  lat?: string;
  long?: string;
  username?: string;
};

declare type GetAddressesResponse = {
  message: string;
  addresses: Address[];
};

declare type PayMethodProps = {
  index: number;
  image: string;
  title: string;
  description: string;
  selectedMethod: boolean;
};


declare type CheckoutPayload = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
};
