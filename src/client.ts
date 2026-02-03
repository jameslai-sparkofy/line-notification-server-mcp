/**
 * LINE Notification Server API 客戶端
 */

export interface ClientConfig {
  baseUrl: string;
  apiKey?: string;
  username?: string;
  password?: string;
  defaultBotId?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class LineNotificationClient {
  private baseUrl: string;
  private authHeader: string;
  private defaultBotId: string;

  constructor(config: ClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.defaultBotId = config.defaultBotId || 'default';

    // 優先使用 API Key，否則使用 Basic Auth
    if (config.apiKey) {
      this.authHeader = `Bearer ${config.apiKey}`;
    } else if (config.username && config.password !== undefined) {
      this.authHeader = `Basic ${Buffer.from(`${config.username}:${config.password}`).toString('base64')}`;
    } else {
      throw new Error(`必須提供 apiKey 或 username/password (username=${config.username}, password=${config.password !== undefined ? '已設定' : '未設定'})`);
    }
  }

  /**
   * 發送 API 請求
   */
  async request<T = unknown>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    options: {
      botId?: string;
      query?: Record<string, string | number | boolean>;
      body?: Record<string, unknown>;
    } = {}
  ): Promise<ApiResponse<T>> {
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

      const data = await response.json() as ApiResponse<T>;
      return data;
    } catch (error) {
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

  async get<T = unknown>(endpoint: string, options?: { botId?: string; query?: Record<string, string | number | boolean> }) {
    return this.request<T>('GET', endpoint, options);
  }

  async post<T = unknown>(endpoint: string, body?: Record<string, unknown>, options?: { botId?: string }) {
    return this.request<T>('POST', endpoint, { ...options, body });
  }

  async put<T = unknown>(endpoint: string, body?: Record<string, unknown>, options?: { botId?: string }) {
    return this.request<T>('PUT', endpoint, { ...options, body });
  }

  async delete<T = unknown>(endpoint: string, options?: { botId?: string }) {
    return this.request<T>('DELETE', endpoint, options);
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
  async searchUsers(params: { keyword?: string; status?: string; tags?: string[]; limit?: number; page?: number }, botId?: string) {
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
  async sendMessage(
    target: { userId?: string; groupId?: string },
    message: { type: string; [key: string]: unknown },
    botId?: string
  ) {
    return this.post('/api/push', {
      to: target.userId || target.groupId,
      messages: [message],
    }, { botId });
  }

  /**
   * 取得對話歷史
   */
  async getConversation(targetId: string, params?: { limit?: number; before?: string }, botId?: string) {
    return this.get(`/api/conversations/${targetId}`, {
      botId,
      query: params as Record<string, string | number | boolean> | undefined,
    });
  }

  /**
   * 取得未讀訊息
   */
  async getUnreadMessages(botId?: string) {
    return this.get('/api/conversations/unread', { botId });
  }
}
