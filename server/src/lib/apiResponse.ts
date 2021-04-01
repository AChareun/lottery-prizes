import { IApiError } from '../core/apiError';

export interface IApiResponse {
    status: string;
    code: number;
    message: string;
    data: any | any[] | null;
}

export class ApiResponseHelper {
    apiErrors: { [name: string]: IApiError };

    constructor(apiErrors: { [name: string]: IApiError }) {
        this.apiErrors = apiErrors;
    }

    buildOkResponse(data?: any | any[]): IApiResponse {
        return {
            status: 'OK',
            code: 200,
            message: 'Success on request',
            data: data || null,
        };
    }

    buildErrorResponse(errorName: string): IApiResponse {
        const apiError = this.apiErrors[errorName];

        return {
            status: 'ERROR',
            code: apiError.code,
            message: apiError.message,
            data: null,
        };
    }
}
