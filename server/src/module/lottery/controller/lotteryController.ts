import { LotteryService } from '../service/lotteryService';
import { ApiResponseHelper } from '../../../lib/apiResponse';
import { Application, Request, Response } from 'express';
import { isValidDate } from '../../../lib/dateHelpers';

export class LotteryController {
    BASE_ROUTE = '/lottery'
    lotteryService: LotteryService;
    responseHelper: ApiResponseHelper;

    constructor(lotteryService: LotteryService, responseHelper: ApiResponseHelper) {
        this.lotteryService = lotteryService;
        this.responseHelper = responseHelper;
    }

    configureRoutes(app: Application): void {
        const { BASE_ROUTE } = this;

        app.get(`${BASE_ROUTE}`, this.getResults.bind(this));
        app.post(`${BASE_ROUTE}`, this.postResults.bind(this));
    }

    async getResults(req: Request, res: Response): Promise<void> {
        const date = req?.query?.date === 'today' ? new Date().toString() : req?.query?.date;

        if (typeof date === 'string' && isValidDate(new Date(date))) {
            try {
                const results = await this.lotteryService.getByDate(date);
                const response = this.responseHelper.buildOkResponse(results)
                res.status(200).json(response);

                return
            } catch (e) {
                const errResponse = this.responseHelper.buildErrorResponse(e.name);
                res.status(400).json(errResponse);

                return
            }
        } else {
            const errorResponse = this.responseHelper.buildErrorResponse('WRONG_QUERY_PARAM');
            res.status(400).json(errorResponse);

            return;
        }
    }

    async postResults(req: Request, res: Response): Promise<void> {
        const results = req?.body?.results;
        try {
            const newResults = await this.lotteryService.addResult(results)
            const response = this.responseHelper.buildOkResponse(newResults);
            res.status(200).json(response);
        } catch (e) {
            const errResponse = this.responseHelper.buildErrorResponse(e.name);
            res.status(400).json(errResponse);
        }
    }
}
