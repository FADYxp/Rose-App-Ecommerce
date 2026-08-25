export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  phone: string;
  photo: string;
  role: "user" | "admin";
  wishlist: string[];
  addresses: string[];
  createdAt: string;
}
