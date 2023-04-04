import { api } from "../Networking/Interceptor";

export const SearchAction = {
  search: (page: number, search: string, controller?: AbortController) =>
    api.get("/search?fields=id,title,thumbnail,image_id&limit=24&page=" + page + "&q=" + search,{
      signal: controller?.signal
    }),
};