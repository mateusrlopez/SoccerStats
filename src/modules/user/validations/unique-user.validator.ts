import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { UserService } from "@user/user.service";

@ValidatorConstraint({ async: true, name: "UniqueUser" })
@Injectable()
export class UniqueUser implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    public async validate(value: string): Promise<boolean> {
        const user = await this.userService.findByEmail(value, false);
        return typeof user === "undefined";
    }

    public defaultMessage(): string {
        return "The e-mail $value is already in user";
    }
}