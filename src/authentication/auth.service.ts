import bcrypt from 'bcrypt';
import { IUser } from '../users/users.model';
import { IUserRepository } from '../users/users.repository';
import { LoginError, UserExistsByEmailError } from './auth.errors';
import { ITokenService } from './token.service';

type Token = { token: string }

export interface IAuthService {
    login(email: string, password: string): Promise<Token>
    addUser(user: IUser): Promise<Token>
}

export default class AuthService implements IAuthService {

    private tokenService: ITokenService
    private userRepository: IUserRepository

    constructor(tokenService: ITokenService, userRepository: IUserRepository) {
        this.tokenService = tokenService
        this.userRepository = userRepository
    }

    async login(email: string, password: string): Promise<Token> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new LoginError()
        const matches = await bcrypt.compare(password, user.password!)
        if (!matches) throw new LoginError()
        const token = this.tokenService.getJwt(email, user.roles!)
        return { token }
    }
    
    async addUser(user: IUser): Promise<Token> {
        const existingUser = await this.userRepository.findByEmail(user.email)
        if (existingUser) throw new UserExistsByEmailError()
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password!, salt)
        this.userRepository.save(user)
        const token = this.tokenService.getJwt(user.email, user.roles!)
        return { token }
    }

}