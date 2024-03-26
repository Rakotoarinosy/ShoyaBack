import { RestSubAccountTypes } from '../../../../src/index';

export const mockResponse: RestSubAccountTypes.getSubAccountAssetsForMasterAccountResponse = {
    'balances':[
        {
            'asset':'ADA',
            'free':10000,
            'locked':0
        },
        {
            'asset':'BNB',
            'free':10003,
            'locked':0
        },
        {
            'asset':'BTC',
            'free':11467.6399,
            'locked':0
        },
        {
            'asset':'ETH',
            'free':10004.995,
            'locked':0
        },
        {
            'asset':'USDT',
            'free':11652.14213,
            'locked':0
        }
    ]
};

