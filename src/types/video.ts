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
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  reply_id: string;
  create_date: string;
  created_at: string;
  updated_at: string;
};
