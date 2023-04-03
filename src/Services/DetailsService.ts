import { api } from "../Networking/Interceptor";

export const DetailsAction = {
    getDetails: (id:number) => api.get("/" + id)
}