import { RestTradeTypes } from '../../../../src/index';

export const mockOrderLimit: RestTradeTypes.getCurrentOrderCountUsageResponse[] = [
    {
        'rateLimitType': 'ORDERS',
        'interval': 'SECOND',
        'intervalNum': 10,
        'limit': 50,
        'count': 0
    },
    {
        'rateLimitType': 'ORDERS',
        'interval': 'DAY',
        'intervalNum': 1,
        'limit': 160000,
        'count': 0
    }
];