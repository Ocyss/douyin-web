# 公共

## model

> 不使用自增 id,改为使用雪花自增 19 位 id (雪花个毛线,就是纳秒时间戳简单乘加法运算<-🤡)

```go
type Model struct {
	ID        int64          `json:"id" gorm:"primarykey;comment:主键"`
	CreatedAt time.Time      `json:"-" gorm:"comment:创建时间"`
	UpdatedAt time.Time      `json:"-" gorm:"comment:修改时间"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"comment:删除时间"`
}

func (u *Model) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = utils.GetId()
	return
}
```

# User 类

## User

> 还没决定 是否关注 字段怎么实现..
> 获赞和点赞 全部走 Redis

```go
User struct {
	Model
	Name          string `json:"name" gorm:"index:,unique;size:32;comment:用户名称"`
	Pawd          string `json:"-" gorm:"size:128;comment:用户密码"`
	FollowCount   int64  `json:"follow_count" gorm:"default:0;comment:关注总数"`
	FollowerCount int64  `json:"follower_count" gorm:"default:0;comment:粉丝总数"`
	//IsFollow        bool       `json:"is_follow" gorm:"-"` // 是否关注
	Avatar          string     `json:"avatar" gorm:"comment:用户头像"`
	BackgroundImage string     `json:"background_image" gorm:"comment:用户个人页顶部大图"`
	Signature       string     `json:"signature" gorm:"default:此人巨懒;comment:个人简介"`
	WorkCount       int64      `json:"work_count" gorm:"default:0;comment:作品数量"`
	TotalFavorited  int64      `json:"total_favorited" gorm:"-"` // 获赞数量
	FavoriteCount   int64      `json:"favorite_count" gorm:"-"`  // 点赞数量
	Follow          []*User    `json:"follow,omitempty" gorm:"many2many:UserFollow;comment:关注列表"`
	Follower        []*User    `json:"follower,omitempty" gorm:"many2many:UserFollower;comment:粉丝列表"`
	Friend          []*User    `json:"friend,omitempty" gorm:"many2many:UserFriend;comment:好友列表"`
	Favorite        []*Video   `json:"like_list,omitempty" gorm:"many2many:UserFavorite;comment:喜欢列表"`
	Videos          []*Video   `json:"video_list,omitempty" gorm:"many2many:UserCreation;comment:作品列表"`
	Comment         []*Comment `json:"comment_list,omitempty" gorm:"comment:评论列表"`
}
```

## FriendUser

> 咦?我第一次设计的时候怎么会加上 gorm 字段

```go
FriendUser struct {
	User
	Message string `json:"message" gorm:"comment:和该好友的最新聊天消息"`
	MsgType bool   `json:"msg_type,number" gorm:"comment:消息类型"` // 0 => 当前请求用户接收的消息， 1 => 当前请求用户发送的消息
}
```

# Video 类

## Video

> 封面地址,点赞数量,评论数量,播放量都走 Redis
> 联合投稿?不知道设计的时候咋写出来的捏

```go
Video struct {
	Model
	AuthorID      int64      `json:"-" gorm:"index;notNull;comment:视频作者信息"`
	Author        User       `json:"author"`
	PlayUrl       string     `json:"play_url" gorm:"comment:视频播放地址"`
	CoverUrl      string     `json:"cover_url" gorm:"-"`      // 视频封面地址
	FavoriteCount int64      `json:"favorite_count" gorm:"-"` // 视频的点赞总数
	CommentCount  int64      `json:"comment_count" gorm:"-"`  // 视频的评论总数
	PlayCount     int64      `json:"play_count" gorm:"-"`     // 视频的播放量
	IsFavorite    bool       `json:"is_favorite" gorm:"-"`    // 是否点赞
	Title         string     `json:"title" gorm:"comment:视频标题"`
	Desc          string     `json:"desc" gorm:"comment:简介"`
	Comment       []*Comment `json:"comment,omitempty"` // 评论列表
	// 自建字段
	CoAuthor []*UserCreation `json:"authors,omitempty" gorm:"-"` // 联合投稿
}
```

## UserCreation

```go
UserCreation struct {
		VideoID   int64  `json:"video_id,omitempty" gorm:"primaryKey"`
		UserID    int64  `json:"author_id" gorm:"primaryKey"`
		Type      string `json:"type" gorm:"comment:创作者类型"` //Up主,参演，剪辑，录像，道具，编剧，打酱油
		CreatedAt time.Time
		DeletedAt gorm.DeletedAt `json:"-"`
	}
```

# Message 类

## Message

> 感觉改成复合主键(收发人 id+时间)比较好,不要老是调用的高端的雪花算法来生成破 id

```go
Message struct {
	Model
	ToUserID   int64  `json:"to_user_id" gorm:"primaryKey;comment:该消息接收者的id"`
	FromUserID int64  `json:"from_user_id" gorm:"primaryKey;comment:该消息发送者的id"`
	ToUser     User   `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	FromUser   User   `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Content    string `json:"content" gorm:"comment:消息内容"`
	//CreateTime string `json:"create_time" gorm:"comment:消息创建时间"`
}
```

# Comment 类

## Comment

> 一样改用复合主键

```go
Comment struct {
	Model
	UserID  int64  `json:"-" gorm:"index:idx_uvid;comment:评论用户信息"`
	VideoID int64  `json:"-" gorm:"index:idx_uvid;comment:评论视频信息"`
	User    User   `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Video   Video  `json:"video" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Content string `json:"content" gorm:"comment:评论内容"`
	//create_date string // 评论发布日期，格式 mm-dd
	// 自建字段
	ReplyID int64 `json:"reply_id" gorm:"index;comment:回复ID"`
}
```
