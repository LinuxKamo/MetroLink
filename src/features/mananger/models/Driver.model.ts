export type Driver = {
    profile_url : string;
    _id: string | number;
    name: string;
    surname:string;
    email: string;
    status: "on trip" | "available";
    lastTripDate: string;
    totaltrips: number;
    phoneNumber: string;
    truckCapacity: number;
    licensePlate: string;
}