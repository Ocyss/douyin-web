import { User } from "./user";

export type Video = {
  id: string;
  author: User;
  play_url: string;
  cover_url: string;
  title: string;
  desc: string;
  is_favorite: boolean;
  play_count: number;
  favorite_count: number;
  comment_count: number;
};
