/* eslint-disable prettier/prettier */
import { ApiResponse } from "./apiResponse.dto";

export function createResponse<T>(success: boolean, message: string, data: T): ApiResponse<T> {
    return new ApiResponse<T>(success, message, data);
}