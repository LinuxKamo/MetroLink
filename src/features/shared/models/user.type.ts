import type { Address } from "./Address.model";

export type User = {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  department?: string;
  status?: string;
  municipality?: string;
  location?: Address;
  phone?: string;
  profile_image?: string;
};
