import requests from "@/utils/requests";
import { Resp, User } from "@/types";
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
