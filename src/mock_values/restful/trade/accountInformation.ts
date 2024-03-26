import { AccountSnapshotType, Permissions, RestTradeTypes } from '../../../../src/index';

export const mockResponse: RestTradeTypes.accountInformationResponse = {
    'makerCommission': 15,
    'takerCommission': 15,
    'buyerCommission': 0,
    'sellerCommission': 0,
    'commissionRates': {
        'maker': '0.00150000',
        'taker': '0.00150000',
        'buyer': '0.00000000',
        'seller': '0.00000000'
    },
    'canTrade': true,
    'canWithdraw': true,
    'canDeposit': true,
    'brokered': false,
    'requireSelfTradePrevention': false,
    'preventSor': false,
    'updateTime': 123456789,
    'accountType': AccountSnapshotType.SPOT,
    'balances': [
        {
            'asset': 'BTC',
            'free': '4723846.89208129',
            'locked': '0.00000000'
        },
        {
            'asset': 'LTC',
            'free': '4763368.68006011',
            'locked': '0.00000000'
        }
    ],
    'permissions': [
        Permissions.SPOT
    ],
    'uid': 354937868
};
