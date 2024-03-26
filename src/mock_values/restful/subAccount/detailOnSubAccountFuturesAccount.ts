import { RestSubAccountTypes } from '../../../../src/index';

export const mockResponse: RestSubAccountTypes.detailOnSubAccountFuturesAccountResponse = {
    'email': 'abc@test.com',
    'asset': 'USDT',
    'assets': [{
        'asset': 'USDT',
        'initialMargin': '0.00000000',
        'maintenanceMargin': '0.00000000',
        'marginBalance': '0.88308000',
        'maxWithdrawAmount': '0.88308000',
        'openOrderInitialMargin': '0.00000000',
        'positionInitialMargin': '0.00000000',
        'unrealizedProfit': '0.00000000',
        'walletBalance': '0.88308000'
    }
    ],
    'canDeposit': true,
    'canTrade': true,
    'canWithdraw': true,
    'feeTier': 2,
    'maxWithdrawAmount': '0.88308000',
    'totalInitialMargin': '0.00000000',
    'totalMaintenanceMargin': '0.00000000',
    'totalMarginBalance': '0.88308000',
    'totalOpenOrderInitialMargin': '0.00000000',
    'totalPositionInitialMargin': '0.00000000',
    'totalUnrealizedProfit': '0.00000000',
    'totalWalletBalance': '0.88308000',
    'updateTime': 1576756674610
};
