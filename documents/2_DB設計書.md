# DB 設計書

# Firestore DB 設計（MVP 版）

### 1. users  コレクション（ユーザー情報）

全ユーザーの情報を格納します。ドキュメント ID は Firebase Authentication の UID を使用します。

- **パス:** /users/{userId}

| **フィールド名** | **型**        | **説明**                                                                              |
| ---------------- | ------------- | ------------------------------------------------------------------------------------- |
| userId           | string        | ドキュメント ID (Auth の UID と同一)                                                  |
| displayName      | string        | ユーザーの表示名                                                                      |
| email            | string        | メールアドレス                                                                        |
| avatarUrl        | string        | プロフィール画像の URL                                                                |
| joinedContent    | array<string> | 参加中の content の ID を格納する配列                                                 |
| role             | string        | ユーザー権限 ("general: 一般ユーザー", "badged: 運営バッジユーザー", "admin: 管理者") |
| createdAt        | timestamp     | 作成日時                                                                              |
| updatedAt        | timestamp     | 更新日時                                                                              |

---

### 2. content  コレクション（イベント & コミュニティ情報）

イベントやコミュニティの本体情報を格納します。ドキュメント ID は自動生成される ID を使用します。

- **パス:** /content/{contentId}

| **フィールド名**        | **型**        | **説明**                                    |
| ----------------------- | ------------- | ------------------------------------------- |
| contentId               | string        | ドキュメント ID                             |
| title                   | string        | タイトル                                    |
| description             | string        | 説明文                                      |
| imageUrl                | string        | カバー画像の URL                            |
| type                    | string        | "event"  または  "community"                |
| status                  | string        | "active" (募集中) または  "closed" (終了)   |
| tags                    | array<string> | タグの配列 (例: ["子育て", "お祭り"])       |
| createdBy               | string        | 作成者の  userId                            |
| creatorInfo             | map           | 作成者の冗長データ。表示を高速化するため。  |
| creatorInfo.displayName | string        | 作成者の表示名                              |
| creatorInfo.avatarUrl   | string        | 作成者のプロフィール画像 URL                |
| creatorInfo.role        | string        | 作成者の権限 ("general", "badged", "admin") |
| createdAt               | timestamp     | 作成日時                                    |
| updatedAt               | timestamp     | 更新日時                                    |

---

### 3. サブコレクション

content ドキュメントや works ドキュメントの下に、関連情報を格納します。

### 3-1. オープンチャット

各イベント/コミュニティに紐づく、誰でも参加できるチャットです。

- **パス:** /content/{contentId}/messages/{messageId}

| **フィールド名**       | **型**    | **説明**                       |
| ---------------------- | --------- | ------------------------------ |
| messageId              | string    | ドキュメント ID                |
| senderId               | string    | 送信者の userId                |
| senderInfo             | map       | 送信者の冗長データ（表示用）   |
| senderInfo.displayName | string    | 送信者の表示名                 |
| type                   | string    | "text"  または  "image"        |
| content                | string    | テキスト内容、または画像の URL |
| createdAt              | timestamp | 送信日時                       |

### 3-2. ワーク（タスク）

各イベント/コミュニティ内の具体的なタスクです。

- **パス:** /content/{contentId}/works/{workId}

| **フィールド名** | **型**    | **説明**                            |
| ---------------- | --------- | ----------------------------------- |
| workId           | string    | ドキュメント ID                     |
| title            | string    | ワークのタイトル (例: "テント設営") |
| description      | string    | ワークの詳細説明                    |
| requiredPeople   | number    | 募集人数                            |
| currentPeople    | number    | 現在の参加人数                      |
| isUnlimited      | boolean   | true の場合、人数無制限             |
| createdBy        | string    | 作成者の  userId                    |
| createdAt        | timestamp | 作成日時                            |
| updatedAt        | timestamp | 更新日時                            |

### 3-3. ワークチャット

各ワークに紐づく、参加者のみのチャットです。

- **パス:** /content/{contentId}/works/{workId}/messages/{messageId}
- ※フィールド構成は  3-1. オープンチャット   と同様です。

**補足：設計上の判断と今後の展望**

**1. タグの管理方法について**

今回の開発では、イベントのカテゴリやターゲットを示す tags フィールドの選択肢を、ソースコード内に固定リストとして定義する方式を採用しました。

- **採用理由:**
  - ユーザーによる「子供向け」「子ども向け」といった**表記揺れ**を完全に防止し、データの整合性を担保するため。
  - DB に専用のコレクションを設ける方法と比較し、実装がシンプルであり、**短期開発のスケジュールを遵守**するため。
- **今後の展望:**
  現状の方式では、タグの追加・修正にプログラムの改修と再デプロイが必要となります。そのため、フェーズ 2 以降の機能拡張として、管理者権限を持つユーザーが Web 画面上から動的にタグを管理できるよう、Firestore に専用の tags コレクションを新設し、そこから選択肢を読み込む方式へ移行することを推奨します。

---

# ダミーデータ

```jsx
// src/dummyData.js

// ユーザー情報
export const dummyUsers = {
  user_admin_01: {
    userId: "user_admin_01",
    displayName: "佐藤 管理者",
    email: "admin@example.com",
    role: "admin",
    avatarUrl: "https://placehold.jp/150x150.png?text=Admin",
  },
  user_badged_01: {
    userId: "user_badged_01",
    displayName: "田中 太郎（自治会）",
    email: "tanaka@example.com",
    role: "badged",
    avatarUrl: "https://placehold.jp/150x150.png?text=Tanaka",
  },
  user_general_01: {
    userId: "user_general_01",
    displayName: "鈴木 花子",
    email: "suzuki@example.com",
    role: "general",
    avatarUrl: "https://placehold.jp/150x150.png?text=Suzuki",
  },
};

// イベント＆コミュニティ情報
export const dummyContent = [
  {
    contentId: "event_001",
    title: "地域こども夏祭り 2025",
    description:
      "３年ぶりに開催！屋台、盆踊り、花火など、家族みんなで楽しめるイベントです。ボランティアスタッフも大募集中！",
    imageUrl:
      "https://images.unsplash.com/photo-1565876249477-B932SEXAMPLE?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "event",
    status: "active",
    tags: ["お祭り", "家族向け", "ボランティア募集"],
    createdBy: "user_badged_01",
    creatorInfo: {
      displayName: "田中 太郎（自治会）",
      avatarUrl: "https://placehold.jp/150x150.png?text=Tanaka",
      role: "badged",
    },
    createdAt: new Date("2025-07-20T10:00:00"),
    updatedAt: new Date("2025-07-21T11:00:00"),
  },
  {
    contentId: "community_001",
    title: "公園を愛する会",
    description:
      "毎週日曜の朝に、中央公園の清掃と花壇の手入れを行っています。誰でも気軽にご参加ください。",
    imageUrl:
      "https://images.unsplash.com/photo-1599797198539-7SEXAMPLE?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "community",
    status: "active",
    tags: ["清掃活動", "コミュニティ", "ボランティア"],
    createdBy: "user_general_01",
    creatorInfo: {
      displayName: "鈴木 花子",
      avatarUrl: "https://placehold.jp/150x150.png?text=Suzuki",
      role: "general",
    },
    createdAt: new Date("2025-06-01T09:00:00"),
    updatedAt: new Date("2025-06-01T09:00:00"),
  },
];

// 夏祭り(event_001)のワーク（タスク）一覧
export const dummyWorks_event_001 = [
  {
    workId: "work_001",
    title: "会場設営（テント張り）",
    description: "朝8時に集合して、本部テントや休憩所のテントを設営します。",
    requiredPeople: 10,
    currentPeople: 3,
    isUnlimited: false,
  },
  {
    workId: "work_002",
    title: "焼きそばの調理・販売",
    description: "調理経験は問いません！みんなで楽しく焼きそばを作りましょう。",
    requiredPeople: 8,
    currentPeople: 8,
    isUnlimited: false,
  },
];

// 夏祭り(event_001)のオープンチャットのメッセージ
export const dummyMessages_event_001 = [
  {
    messageId: "msg_001",
    senderId: "user_general_01",
    senderInfo: { displayName: "鈴木 花子" },
    type: "text",
    content: "こんにちは！夏祭り、とても楽しみです！",
    createdAt: new Date("2025-07-22T12:00:00"),
  },
  {
    messageId: "msg_002",
    senderId: "user_badged_01",
    senderInfo: { displayName: "田中 太郎（自治会）" },
    type: "text",
    content: "ご参加ありがとうございます！皆で盛り上げていきましょう！",
    createdAt: new Date("2025-07-22T12:05:00"),
  },
];

// テント設営(work_001)のワークチャットのメッセージ
export const dummyMessages_work_001 = [
  {
    messageId: "work_msg_001",
    senderId: "user_admin_01",
    senderInfo: { displayName: "佐藤 管理者" },
    type: "text",
    content: "テント設営に参加登録しました。よろしくお願いします！",
    createdAt: new Date("2025-07-23T09:00:00"),
  },
];
```
