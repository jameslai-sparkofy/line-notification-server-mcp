/**
 * LINE Notification Server API 客戶端
 */
export class LineNotificationClient {
    baseUrl;
    authHeader;
    defaultBotId;
    constructor(config) {
        this.baseUrl = config.baseUrl.replace(/\/$/, '');
        this.defaultBotId = config.defaultBotId || 'default';
        // 優先使用 API Key，否則使用 Basic Auth
        if (config.apiKey) {
            this.authHeader = `Bearer ${config.apiKey}`;
        }
        else if (config.username && config.password !== undefined) {
            this.authHeader = `Basic ${Buffer.from(`${config.username}:${config.password}`).toString('base64')}`;
        }
        else {
            throw new Error(`必須提供 apiKey 或 username/password (username=${config.username}, password=${config.password !== undefined ? '已設定' : '未設定'})`);
        }
    }
    /**
     * 發送 API 請求
     */
    async request(method, endpoint, options = {}) {
        const { botId = this.defaultBotId, query, body } = options;
        // 建構 URL
        let url = `${this.baseUrl}${endpoint}`;
        if (query && Object.keys(query).length > 0) {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined && value !== null) {
                    params.append(key, String(value));
                }
            }
            url += `?${params.toString()}`;
        }
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.authHeader,
                    'X-Bot-Id': botId,
                },
                body: body ? JSON.stringify(body) : undefined,
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            const errorCause = error instanceof Error && error.cause ? ` (cause: ${error.cause})` : '';
            console.error(`[LINE API Error] ${method} ${url}: ${errorMsg}${errorCause}`);
            return {
                success: false,
                error: `${errorMsg}${errorCause}`,
            };
        }
    }
    // ===== 便捷方法 =====
    async get(endpoint, options) {
        return this.request('GET', endpoint, options);
    }
    async post(endpoint, body, options) {
        return this.request('POST', endpoint, { ...options, body });
    }
    async put(endpoint, body, options) {
        return this.request('PUT', endpoint, { ...options, body });
    }
    async delete(endpoint, options) {
        return this.request('DELETE', endpoint, options);
    }
    // ===== 高階方法 =====
    /**
     * 列出 Bot 帳號
     */
    async listBots() {
        return this.get('/api/bots');
    }
    /**
     * 搜尋用戶
     */
    async searchUsers(params, botId) {
        return this.get('/api/users', {
            botId,
            query: {
                ...(params.keyword && { search: params.keyword }),
                ...(params.status && { status: params.status }),
                ...(params.tags && { tags: params.tags.join(',') }),
                ...(params.limit && { limit: params.limit }),
                ...(params.page && { page: params.page }),
            },
        });
    }
    /**
     * 發送訊息
     */
    async sendMessage(target, message, botId) {
        return this.post('/api/push', {
            to: target.userId || target.groupId,
            messages: [message],
        }, { botId });
    }
    /**
     * 取得對話歷史
     */
    async getConversation(targetId, params, botId) {
        return this.get(`/api/conversations/${targetId}`, {
            botId,
            query: params,
        });
    }
    /**
     * 取得未讀訊息
     */
    async getUnreadMessages(botId) {
        return this.get('/api/conversations/unread', { botId });
    }
}
//# sourceMappingURL=client.js.map