import { IAddress } from "./addresses/addresses.schema";
import { IUser } from "./users.model";
import { IUserRepository } from "./users.repository";

export interface IUserService {
    addAddress(user: IUser, address: IAddress): Promise<IUser>
    setAddresses(user: IUser, addresses: IAddress[]): Promise<IUser>
}

export default class UserService implements IUserService {

    private repository: IUserRepository

    constructor(repository: IUserRepository) {
        this.repository = repository
    }

    async addAddress(user: IUser, address: IAddress) {
        user.addresses.push(address)
        return await this.repository.save(user)
    }

    async setAddresses(user: IUser, addresses: IAddress[]) {
        user.addresses = addresses
        return await this.repository.save(user)
    }

}