import { Dayjs } from 'dayjs';

export interface IUser {
    id: number;
    name: string;
    email: string;
    emailVerified: boolean;
    password: string;
    birthdate: Dayjs;
    age: number;
    photoURL: string | null;
    teamId: number | null;
    admin: boolean;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
