import { Dayjs } from 'dayjs';

export interface ITeam {
    id: number;
    name: string;
    knownby: string;
    initials: string;
    logoURL: string;
    foundationDate: Dayjs;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
