import type PresetPlayer from "xgplayer";

export type Resp<T> = Promise<
  {
    errmsg?: string[];
    status_code: number;
    status_msg: string;
  } & T
>;

export type Players = {
  [keys: string]: PresetPlayer;
};

export * from "./user";
export * from "./video";
