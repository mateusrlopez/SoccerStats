import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ICreateMatch } from './dto/create-match.dto';
import { IUpdateMatch } from './dto/update-match.dto';
import { IMatch } from './entities/match.entity';

export interface IMatchRepository {
    create(data: ICreateMatch): Promise<IMatch>;
    findMany(): Promise<Array<IMatch>>;
    findOneById(id: string): Promise<IMatch>;
    updateOneById(id: string, data: IUpdateMatch): Promise<IMatch>;
    deleteOneById(id: string): Promise<void>;
}

@Injectable()
export class PrismaMatchRepository implements IMatchRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: ICreateMatch): Promise<IMatch> {
        return this.prisma.match.create({
            data,
            include: { stadium: true, homeTeam: true, awayTeam: true },
        });
    }

    findMany(): Promise<IMatch[]> {
        return this.prisma.match.findMany({
            include: { stadium: true, homeTeam: true, awayTeam: true },
        });
    }

    findOneById(id: string): Promise<IMatch> {
        return this.prisma.match.findUnique({
            where: { id },
            include: { stadium: true, homeTeam: true, awayTeam: true },
        });
    }

    updateOneById(id: string, data: IUpdateMatch): Promise<IMatch> {
        return this.prisma.match.update({
            where: { id },
            data,
            include: { stadium: true, homeTeam: true, awayTeam: true },
        });
    }

    async deleteOneById(id: string): Promise<void> {
        await this.prisma.match.delete({ where: { id } });
    }
}