import requests from "@/utils/requests";
import { Resp, User, Message } from "@/types";
import { ElMessage } from "element-plus";
import { getToken, getUserId, setCookie } from "@/utils";

export function login(
  username: string,
  password: string,
  f?: () => void
): void {
  logins(username, password).then((res) => {
    if (res.status_code == 0) {
      setCookie("uid", res.user_id);
      setCookie("token", res.token);
      ElMessage.success("登录成功!!!");
      if (f) {
        f();
      }
    }
  });
}

export function register(
  username: string,
  password: string,
  f?: () => void
): void {
  registers(username, password).then((res) => {
    if (res.status_code == 0) {
      setCookie("uid", res.user_id);
      setCookie("token", res.token);
      ElMessage.success("注册成功!!!");
      if (f) {
        f();
      }
    }
  });
}

export function logins(
  username: string,
  password: string
): Resp<{
  token: string;
  user_id: string;
}> {
  return requests({
    method: "post",
    url: "user/login/",
    data: { username, password },
  });
}

export function registers(
  username: string,
  password: string
): Resp<{
  token: string;
  user_id: string;
}> {
  return requests({
    method: "post",
    url: "user/register/",
    data: { username, password },
  });
}

export function info(user_id?: string): Resp<{ user: User }> {
  if (user_id == undefined) {
    user_id = getUserId();
  }
  return requests({
    method: "get",
    url: "user/",
    params: {
      token: getToken(),
      user_id,
    },
  });
}

export function RelationAction(to_user_id: string, action_type: 1 | 2): Resp {
  return requests({
    method: "post",
    url: "relation/action/",
    data: {
      token: getToken(),
      to_user_id,
      action_type,
    },
  });
}

export function RelationFriendList(): Resp<{
  user_list: (User & {
    message: string;
    msg_type: number;
  })[];
}> {
  return requests({
    method: "get",
    url: "relation/friend/list/",
    params: {
      token: getToken(),
    },
  });
}

export function MessageChat(
  to_user_id: string,
  pre_msg_time?: number
): Resp<{
  message_list: Message[];
}> {
  return requests({
    method: "get",
    url: "message/chat/",
    params: {
      token: getToken(),
      to_user_id,
      pre_msg_time,
    },
  });
}
export function MessageAction(to_user_id: string, content: string): Resp {
  return requests({
    method: "post",
    url: "message/action/",
    params: {
      token: getToken(),
      to_user_id,
      content,
      action_type: 1,
    },
  });
}
