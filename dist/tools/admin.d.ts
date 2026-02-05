/**
 * 管理相關 MCP 工具
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";
export declare function registerAdminTools(server: Server, client: LineNotificationClient): {
    line_list_bots: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                includeInactive: {
                    type: string;
                    description: string;
                    default: boolean;
                };
            };
        };
        handler: (args: {
            includeInactive?: boolean;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_bot: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_list_tags: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                category: {
                    type: string;
                    enum: string[];
                    description: string;
                };
            };
        };
        handler: (args: {
            category?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_create_tag: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                name: {
                    type: string;
                    description: string;
                };
                color: {
                    type: string;
                    description: string;
                };
                category: {
                    type: string;
                    enum: string[];
                    description: string;
                    default: string;
                };
                description: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            name: string;
            color?: string;
            category?: string;
            description?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_or_create_tag: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                name: {
                    type: string;
                    description: string;
                };
                color: {
                    type: string;
                    description: string;
                };
                category: {
                    type: string;
                    enum: string[];
                    description: string;
                    default: string;
                };
                description: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            name: string;
            color?: string;
            category?: string;
            description?: string;
        }) => Promise<{
            created: boolean;
            success: boolean;
            data?: unknown;
            error?: string;
            message?: string;
        }>;
    };
    line_get_stats: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
            };
        };
        handler: (args: {
            botId?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_send_logs: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {
                botId: {
                    type: string;
                    description: string;
                    default: string;
                };
                status: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                    default: number;
                };
                startDate: {
                    type: string;
                    description: string;
                };
                endDate: {
                    type: string;
                    description: string;
                };
            };
        };
        handler: (args: {
            botId?: string;
            status?: string;
            limit?: number;
            startDate?: string;
            endDate?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_features: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {};
        };
        handler: () => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_branding: {
        name: string;
        description: string;
        inputSchema: {
            type: "object";
            properties: {};
        };
        handler: () => Promise<import("../client.js").ApiResponse<unknown>>;
    };
};
//# sourceMappingURL=admin.d.ts.map