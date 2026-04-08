import type { Section } from "./Section.model";

export type Area = {
    _id: string | number;
    name: string;
    municipality: string;
    sections: Section[];
}