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
export declare class LineNotificationClient {
    private baseUrl;
    private authHeader;
    private defaultBotId;
    constructor(config: ClientConfig);
    /**
     * 發送 API 請求
     */
    request<T = unknown>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, options?: {
        botId?: string;
        query?: Record<string, string | number | boolean>;
        body?: Record<string, unknown>;
    }): Promise<ApiResponse<T>>;
    get<T = unknown>(endpoint: string, options?: {
        botId?: string;
        query?: Record<string, string | number | boolean>;
    }): Promise<ApiResponse<T>>;
    post<T = unknown>(endpoint: string, body?: Record<string, unknown>, options?: {
        botId?: string;
    }): Promise<ApiResponse<T>>;
    put<T = unknown>(endpoint: string, body?: Record<string, unknown>, options?: {
        botId?: string;
    }): Promise<ApiResponse<T>>;
    delete<T = unknown>(endpoint: string, options?: {
        botId?: string;
    }): Promise<ApiResponse<T>>;
    /**
     * 列出 Bot 帳號
     */
    listBots(): Promise<ApiResponse<unknown>>;
    /**
     * 搜尋用戶
     */
    searchUsers(params: {
        keyword?: string;
        status?: string;
        tags?: string[];
        limit?: number;
        page?: number;
    }, botId?: string): Promise<ApiResponse<unknown>>;
    /**
     * 發送訊息
     */
    sendMessage(target: {
        userId?: string;
        groupId?: string;
    }, message: {
        type: string;
        [key: string]: unknown;
    }, botId?: string): Promise<ApiResponse<unknown>>;
    /**
     * 取得對話歷史
     */
    getConversation(targetId: string, params?: {
        limit?: number;
        before?: string;
    }, botId?: string): Promise<ApiResponse<unknown>>;
    /**
     * 取得未讀訊息
     */
    getUnreadMessages(botId?: string): Promise<ApiResponse<unknown>>;
}
//# sourceMappingURL=client.d.ts.map