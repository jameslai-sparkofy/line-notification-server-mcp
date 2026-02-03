/**
 * 推播活動相關 MCP 工具
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { LineNotificationClient } from "../client.js";
export declare function registerCampaignTools(server: Server, client: LineNotificationClient): {
    line_list_campaigns: {
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
            };
        };
        handler: (args: {
            botId?: string;
            status?: string;
            limit?: number;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_get_campaign: {
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
                campaignId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            campaignId: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_create_campaign: {
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
                name: {
                    type: string;
                    description: string;
                };
                description: {
                    type: string;
                    description: string;
                };
                messageId: {
                    type: string;
                    description: string;
                };
                targetType: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                targetTags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                targetUsers: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                scheduledAt: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            name: string;
            description?: string;
            messageId: string;
            targetType: string;
            targetTags?: string[];
            targetUsers?: string[];
            scheduledAt?: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_enroll_campaign: {
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
                campaignId: {
                    type: string;
                    description: string;
                };
                userIds: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            campaignId: string;
            userIds: string[];
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
    line_cancel_campaign: {
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
                campaignId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        handler: (args: {
            botId?: string;
            campaignId: string;
        }) => Promise<import("../client.js").ApiResponse<unknown>>;
    };
};
//# sourceMappingURL=campaigns.d.ts.map