export interface IApiError {
    statusCode: number; 
    message: string;
    details?: string; 
    timestamp: string; 
    path: string; 
  }
  