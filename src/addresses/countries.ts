export enum CountryCode {
    usa = "USA",
    canada = "CAN",
    uk = "GBR",
    france = "FRA",
    germany = "DEU",
    ireland = "IRL",
    denmark = "DNK",
    india = "IND",
    japan = "JPN",
    china = "CHN",
    south_korea = "KOR",

}

export function allCountryCodes() {
    return [
        CountryCode.usa,
        CountryCode.canada,
        CountryCode.uk,
        CountryCode.france,
        CountryCode.germany,
        CountryCode.ireland,
        CountryCode.denmark,
        CountryCode.india,
        CountryCode.japan,
        CountryCode.china,
        CountryCode.south_korea
    ]
}