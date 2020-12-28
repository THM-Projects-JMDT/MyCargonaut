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
