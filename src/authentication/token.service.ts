import jwt from 'jsonwebtoken'
import { ForbiddenError } from '../app.errors'
import { IUser, Role } from './auth.models'
import UserRepository from './auth.repository'

type Payload = { email: string, iat: number, exp: number, roles: Role[] }

export interface ITokenService {
    getJwt(email: string, roles: Role[]): string
    validateJwt(token: string, role: Role): Promise<IUser>
}

export default class TokenService implements ITokenService {

    private secret: string

    constructor() { 
        this.secret = process.env.JWT_SECRET!
    }

    getJwt(email: string, roles: Role[]): string {
        const iat = Date.now()
        const exp = iat + 3_600_000
        const payload: Payload = { email, iat, exp, roles }
        return jwt.sign(payload, this.secret)
    }
    
    async validateJwt(token: string, role: Role): Promise<IUser> {
        const payload = jwt.verify(token, this.secret)
        const { email, iat, exp, roles } = payload as Payload
        const now = Date.now()
        if (now < iat) throw new ForbiddenError('Token has not been issued yet', 'token')
        if (now > exp) throw new ForbiddenError('Token has expired', 'token')
        if (roles.indexOf(role) == -1) throw new ForbiddenError('Not authorized', 'token')
        const userRepository = new UserRepository()
        const user = await userRepository.findByEmail(email)
        if (!user) throw new ForbiddenError('User doesn\'t exist', 'token')
        return user
    }
}
