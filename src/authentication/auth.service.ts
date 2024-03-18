import bcrypt from 'bcrypt';
import { LoginError, UserExistsByEmailError } from './auth.errors';
import { IUser } from './auth.models';
import UserRepository, { IUserRepository } from './auth.repository';
import { ITokenService } from './token.service';

type Token = { token: string }

export interface IAuthService {
    login(email: string, password: string): Promise<Token>
    addUser(user: IUser): Promise<Token>
}

export default class AuthService implements IAuthService {

    private tokenService: ITokenService

    constructor(tokenService: ITokenService) {
        this.tokenService = tokenService
    }

    async login(email: string, password: string): Promise<Token> {
        const user = await repository.findByEmail(email)
        if (!user) throw new LoginError()
        const matches = await bcrypt.compare(password, user.password!)
        if (!matches) throw new LoginError()
        const token = this.tokenService.getJwt(email, user.roles!)
        return { token }
    }
    
    async addUser(user: IUser): Promise<Token> {
        const existingUser = await repository.findByEmail(user.email)
        if (existingUser) throw new UserExistsByEmailError()
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password!, salt)
        repository.save(user)
        const token = this.tokenService.getJwt(user.email, user.roles!)
        return { token }
    }

}

const repository: IUserRepository = new UserRepository()