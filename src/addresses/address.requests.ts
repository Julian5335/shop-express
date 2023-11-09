import { IAddress } from "./address"
import { CountryCode } from "./countries"

export interface UpdateAddressRequest {
    default: boolean
    premise: string
    thoroughfare: string
    locality: string
    administrativeArea: string
    postalCode: string
    country: CountryCode     
}

export function updateAddressFromRequest(address: IAddress, req: UpdateAddressRequest) {
    address.default = req.default
    address.premise = req.premise
    address.thoroughfare = req.thoroughfare
    address.locality = req.locality
    address.administrativeArea = req.administrativeArea
    address.postalCode = req.postalCode
    address.country = req.country
}