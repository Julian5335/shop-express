import jwt from 'jsonwebtoken'
import User from '../models/user'
import UserRepository from '../repositories/user-repository'
import ForbiddenError from '../../errors/forbidden-error'
import { Role } from '../enums/role'

type Payload = { email: string, iat: number, exp: number, roles: Role[] }

export function getJwt(email: string, roles: Role[]) {
    const secret: string = process.env.JWT_SECRET!
    const iat = Date.now()
    const exp = iat + 3_600_000
    const payload: Payload = { email, iat, exp, roles }
    return jwt.sign(payload, secret)
}

export async function validateJwt(token: string, role: Role) {
    const secret: string = process.env.JWT_SECRET!
    const payload = jwt.verify(token, secret)
    const { email, iat, exp, roles } = payload as Payload
    const now = Date.now()
    if (now < iat) throw new ForbiddenError('Token has not been issued yet', 'token')
    if (now > exp) throw new ForbiddenError('Token has expired', 'token')
    if (roles.indexOf(role) == -1) throw new ForbiddenError('Not authorized', 'token')
    const userRepository = new UserRepository(User)
    return await userRepository.findByEmail(email)
}