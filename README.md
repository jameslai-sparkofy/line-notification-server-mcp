# LINE Notification Server MCP

LINE Notification Server 的 Model Context Protocol (MCP) 伺服器，讓 Claude 可以直接操作 LINE 訊息管理系統。

## 安裝

### 使用 npx 從 GitHub（推薦）

```bash
npx github:jameslai-sparkofy/line-notification-server-mcp
```

### 從原始碼安裝

```bash
git clone https://github.com/jameslai-sparkofy/line-notification-server-mcp.git
cd line-notification-server-mcp
npm install
npm run build
```

## 設定

### Claude Code 設定

在專案根目錄建立 `.mcp.json`：

```json
{
  "mcpServers": {
    "line-notification": {
      "command": "npx",
      "args": ["-y", "github:jameslai-sparkofy/line-notification-server-mcp"],
      "env": {
        "LINE_API_BASE_URL": "https://line.yes-ceramics.com",
        "LINE_API_USERNAME": "admin",
        "LINE_API_PASSWORD": "your-password"
      }
    }
  }
}
```

### Claude Desktop 設定

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "line-notification": {
      "command": "npx",
      "args": ["-y", "github:jameslai-sparkofy/line-notification-server-mcp"],
      "env": {
        "LINE_API_BASE_URL": "https://line.yes-ceramics.com",
        "LINE_API_USERNAME": "admin",
        "LINE_API_PASSWORD": "your-password"
      }
    }
  }
}
```

### 環境變數

| 變數 | 說明 | 必要 |
|------|------|------|
| `LINE_API_BASE_URL` | LINE Notification Server 的網址 | ✓ |
| `LINE_API_KEY` | API 金鑰（優先使用） | 擇一 |
| `LINE_API_USERNAME` | Basic Auth 使用者名稱 | 擇一 |
| `LINE_API_PASSWORD` | Basic Auth 密碼 | 擇一 |
| `LINE_DEFAULT_BOT_ID` | 預設的 Bot ID | 選填 |

## 可用工具

### 訊息相關

- `line_send_text` - 發送文字訊息
- `line_send_flex` - 發送 Flex Message
- `line_send_template` - 使用模板發送訊息
- `line_list_templates` - 列出訊息模板

### 用戶相關

- `line_search_users` - 搜尋用戶
- `line_get_user` - 取得用戶詳情
- `line_update_user` - 更新用戶資料
- `line_update_user_tags` - 更新用戶標籤
- `line_list_groups` - 列出群組

### 對話相關

- `line_get_conversation` - 取得對話歷史
- `line_get_unread` - 取得未讀訊息
- `line_mark_read` - 標記已讀
- `line_list_conversations` - 取得對話列表

### 推播活動

- `line_list_campaigns` - 列出推播活動
- `line_get_campaign` - 取得活動詳情
- `line_create_campaign` - 建立推播活動
- `line_enroll_campaign` - 加入用戶到活動
- `line_cancel_campaign` - 取消活動

### 管理工具

- `line_list_bots` - 列出 Bot 帳號
- `line_get_bot` - 取得 Bot 詳情
- `line_list_tags` - 列出標籤
- `line_create_tag` - 建立標籤
- `line_get_stats` - 取得統計資料
- `line_get_send_logs` - 取得發送日誌
- `line_get_features` - 取得功能設定
- `line_get_branding` - 取得品牌設定

### 萬用工具

- `line_call_api` - 調用任意 API 端點

## 使用範例

### 搜尋用戶並發送訊息

```
Claude: 幫我找名字包含「王」的用戶，然後發送生日祝福給他們

[Claude 會使用 line_search_users 搜尋用戶]
[找到用戶後，使用 line_send_text 發送訊息]
```

### 查看未讀訊息

```
Claude: 有沒有未讀訊息？

[Claude 會使用 line_get_unread 取得未讀訊息列表]
```

### 建立推播活動

```
Claude: 幫我建立一個中秋節促銷活動，發給所有 VIP 客戶

[Claude 會使用 line_create_campaign 建立活動]
[使用 line_list_tags 找到 VIP 標籤]
[設定活動目標為該標籤]
```

## 開發

### 建置

```bash
npm run build
```

### 開發模式

```bash
npm run dev
```

## 授權

MIT License
