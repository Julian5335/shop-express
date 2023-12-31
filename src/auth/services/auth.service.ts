import bcrypt from 'bcrypt';
import LoginError from "../errors/login-error";
import UserExistsByEmailError from "../errors/user-exists-by-email";
import User, { IUser } from "../models/user";
import UserRepository, { IUserRepository } from "../repositories/user-repository";
import { getJwt } from "./token-service";

type Token = { token: string }

const repository: IUserRepository = new UserRepository(User)

export async function login(email: string, password: string): Promise<Token> {
    const user = await repository.findByEmail(email)
    if (!user) throw new LoginError()
    const matches = await bcrypt.compare(password, user.password!)
    if (!matches) throw new LoginError()
    const token = getJwt(email, user.roles!)
    return { token }
}

export async function addUser(user: IUser): Promise<Token> {
    const existingUser = await repository.findByEmail(user.email)
    if (existingUser) throw new UserExistsByEmailError()
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password!, salt)
    repository.save(user)
    const token = getJwt(user.email, user.roles!)
    return { token }
}