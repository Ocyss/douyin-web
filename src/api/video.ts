import requests from "@/utils/requests";
import { Resp, Video } from "@/types";
import { getToken } from "@/utils";

export function feed(): Resp<{
  video_list: Video[];
}> {
  return requests({
    method: "get",
    url: "feed",
  });
}

export function FavoriteAction(video_id: string, action_type: 1 | 2): Resp {
  // 1 点赞 2 取消
  return requests({
    method: "post",
    url: "favorite/action/",
    data: {
      video_id,
      action_type,
      token: getToken(),
    },
  });
}

export function CommentAction(
  video_id: string,
  action_type: 1 | 2,
  comment_text?: string,
  comment_id?: string
): Resp {
  return requests({
    method: "post",
    url: "comment/action/",
    data: {
      video_id,
      action_type,
      comment_text,
      comment_id,
      token: getToken(),
    },
  });
}
