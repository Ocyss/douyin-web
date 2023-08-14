import requests from "@/utils/requests";
import { Resp, Video, Comment } from "@/types";
import { getToken } from "@/utils";

export function feed(
  _type = "",
  repeat = false
): Resp<{
  video_list: Video[];
}> {
  return requests({
    method: "get",
    url: "feed",
    params: {
      token: getToken(),
      type: _type,
      repeat,
    },
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
  // 1 发布 2 取消
  video_id: string,
  action_type: 1 | 2,
  comment_text?: string,
  comment_id?: string
): Resp<{ comment: Comment }> {
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

export function CommentList(video_id: string): Resp<{
  comment_list: Comment[];
}> {
  return requests({
    method: "get",
    url: "comment/list/",
    params: {
      video_id,
    },
  });
}
