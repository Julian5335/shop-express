import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'
import { ForbiddenError } from '../app.errors'
import { Role } from '../users/users.enums'
import { IUserRepository } from '../users/users.repository'
import { IUser } from '../users/users.model'

type Payload = { email: string, iat: number, exp: number, roles: Role[] }

export interface ITokenService {
    getJwt(email: string, roles: Role[]): string
    validateJwt(token: string, role: Role): Promise<ObjectId>
}

export default class TokenService implements ITokenService {

    private secret: string
    private userRepository: IUserRepository<IUser>

    constructor(userRepository: IUserRepository<IUser>) { 
        this.secret = process.env.JWT_SECRET!
        this.userRepository = userRepository
    }

    getJwt(email: string, roles: Role[]): string {
        const iat = Date.now()
        const exp = iat + 3_600_000
        const payload: Payload = { email, iat, exp, roles }
        return jwt.sign(payload, this.secret)
    }
    
    async validateJwt(token: string, role: Role): Promise<ObjectId> {
        const payload = jwt.verify(token, this.secret)
        const { email, iat, exp, roles } = payload as Payload
        const now = Date.now()
        if (now < iat) throw new ForbiddenError('Token has not been issued yet', 'token')
        if (now > exp) throw new ForbiddenError('Token has expired', 'token')
        if (roles.indexOf(role) == -1) throw new ForbiddenError('Not authorized', 'token')
        const _id = (await this.userRepository.findIdByEmail(email))?._id
        if (!_id) throw new ForbiddenError('User doesn\'t exist', 'token')
        return _id
    }
}
