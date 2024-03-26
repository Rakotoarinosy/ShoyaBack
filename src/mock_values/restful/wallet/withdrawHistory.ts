import { RestWalletTypes } from '../../../../src/index';

export const mockResponse: RestWalletTypes.withdrawHistoryResponse[] = [
    {
        'id': 'b6ae22b3aa844210a7041aee7589627c',
        'amount': '8.91000000',
        'transactionFee': '0.004',
        'coin': 'USDT',
        'status': 6,
        'address': '0x94df8b352de7f46f64b01d3666bf6e936e44ce60',
        'txId': '0xb5ef8c13b968a406cc62a93a8bd80f9e9a906ef1b3fcf20a2e48573c17659268',
        'applyTime': '2019-10-12 11:12:02',
        'network': 'ETH',
        'transferType': 0,
        'withdrawOrderId': 'WITHDRAWtest123',
        'info': 'The address is not valid. Please confirm with the recipient',
        'confirmNo': 3,
        'walletType': 1,
        'txKey': '',
        'completeTime': '2023-03-23 16:52:41'
    },
    {
        'id': '156ec387f49b41df8724fa744fa82719',
        'amount': '0.00150000',
        'transactionFee': '0.004',
        'coin': 'BTC',
        'status': 6,
        'address': '1FZdVHtiBqMrWdjPyRPULCUceZPJ2WLCsB',
        'txId': '60fd9007ebfddc753455f95fafa808c4302c836e4d1eebc5a132c36c1d8ac354',
        'applyTime': '2019-09-24 12:43:45',
        'network': 'BTC',
        'transferType': 0,
        'info': '',
        'confirmNo': 2,
        'walletType': 1,
        'txKey': '',
        'completeTime': '2023-03-23 16:52:41'
    }
];
