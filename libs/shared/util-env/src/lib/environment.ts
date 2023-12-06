import { IEnvironment } from "./environment.interface";

export const environment : IEnvironment ={
    production: true,  // van false naar true want development erbij gedaan
    dataApiUrl: "https://demonodeapp42.azurewebsites.net/api",
    mongo:'mongodb+srv://davit:chDNvn5u7EpUeNo6@cluster0.w3n5jzg.mongodb.net/markt?retryWrites=true&w=majority'
    //mongo:'mongodb+srv://davit:chDNvn5u7EpUeNo6@cluster0.w3n5jzg.mongodb.net/?retryWrites=true&w=majority'  // originele naam, password erin gezet, acheter ? markt gezet omdat yt vid het zei
}