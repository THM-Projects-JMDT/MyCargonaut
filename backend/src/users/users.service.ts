import { Injectable } from "@nestjs/common";
import { User } from "./user";

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: "admin",
        password: "admin",
        firstName: "Jannik",
        lastName: "Lapp",
        ppPath: "images/test.png",
        birthday: new Date("11-09-1998"),
        email: "jannik.lapp@mni.thm.de",
        cargoCoins: 3000,
      },
    ];
    /**
     * Get from Database
     */
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
