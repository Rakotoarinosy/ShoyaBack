import { RestSimpleEarnTypes } from '../../../../src/index';

export const mockResponse: RestSimpleEarnTypes.getRateHistoryResponse = {
    'rows': [
        {
            'productId': 'BUSD001',
            'asset': 'BUSD',
            'annualPercentageRate': '0.00006408',
            'time': 1577233578000
        }
    ],
    'total': 1
};
