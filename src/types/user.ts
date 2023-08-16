export type User = {
  id?: string;
  user_id?: string;
  name: string;
  avatar: string;
  background_image: string;
  signature: string;
  work_count: number;
  follow_count: number;
  follower_count: number;
  total_favorited: number;
  favorite_count: number;
  is_follow: boolean;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  content: string;
  from_user_id: string;
  to_user_id: string;
  create_time: number;
};
