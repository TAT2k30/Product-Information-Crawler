import { CommonProps } from "./commons/CommonProps";

export interface ProductProps extends CommonProps { 
    productName?: string;
    description?: string;
    imageUrl?: string;
    currentPrice?: number;
    platformLinks?: Array<{ platform: string; url: string }>;
    ratings?: {
      averageRating: number;
      reviewCount: number;
    };
    fetchDate?: Date;
    source?: string;
}