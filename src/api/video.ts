import requests from "@/utils/requests";
import { Resp, Video } from "@/types";

export function feed(): Resp<{
  video_list: Video[];
}> {
  return requests({
    method: "get",
    url: "feed",
  });
}
