import { api} from "../Networking/Interceptor";

export const BaseDataAction = {
  get: (page:number) => api.get("/?fields=id,title,thumbnail,image_id&limit=24&page=" + page),
};