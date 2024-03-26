import {
    RedeemDestAccount,
    SimpleEarnDestAccount,
    SimpleEarnFlexibleRewards,
    SimpleEarnLockedRedemption,
    SimpleEarnSourceAccount,
    SimpleEarnStatus,
    SimpleEarnType,
    SubscribeSourceAccount
} from '../../enum';

export interface getSimpleEarnFlexibleProductListOptions {
    asset?: string;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getSimpleEarnFlexibleProductListResponse {
    rows: getSimpleEarnFlexibleProductListRows[];
    total: number;
}

interface getSimpleEarnFlexibleProductListRows {
    asset: string;
    latestAnnualPercentageRate: string;
    tierAnnualPercentageRate: tierAnnualPercentageRate;
    airDropPercentageRate: string;
    canPurchase: boolean;
    canRedeem: boolean;
    isSoldOut: boolean;
    hot: boolean;
    minPurchaseAmount: string;
    productId: string;
    subscriptionStartTime: string;
    status: SimpleEarnStatus;
}

export interface getSimpleEarnLockedProductListOptions {
    asset?: string;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getSimpleEarnLockedProductListResponse {
    rows: getSimpleEarnLockedProductListRows[];
    total: number;
}

interface getSimpleEarnLockedProductListRows {
    projectId: string;
    detail: lockedProductDetails;
    quota: lockedProductQuota;
}

interface lockedProductDetails {
    asset: string;
    rewardAsset: string;
    duration: number;
    renewable: boolean;
    isSoldOut: boolean;
    apr: string;
    status: string;
    subscriptionStartTime: string;
    extraRewardAsset: string;
    extraRewardAPR: string;
}

interface lockedProductQuota {
    totalPersonalQuota: string;
    minimum: string;
}

export interface subscribeFlexibleProductOptions {
    autoSubscribe?: boolean;
    sourceAccount?: SubscribeSourceAccount;
    recvWindow?: number;
}

export interface subscribeFlexibleProductResponse {
    purchaseId: number;
    success: boolean;
}

export interface subscribeLockedProductOptions {
    autoSubscribe?: boolean;
    sourceAccount?: SubscribeSourceAccount;
    recvWindow?: number;
}

export interface subscribeLockedProductResponse {
    purchaseId: number;
    positionId: string;
    success: boolean;
}

export interface redeemFlexibleProductOptions {
    redeemAll?: boolean;
    amount?: number;
    destAccount?: RedeemDestAccount;
    recvWindow?: number;
}

export interface redeemFlexibleProductResponse {
    redeemId: number;
    success: boolean;
}

export interface redeemLockedProductOptions {
    recvWindow?: number;
}

export interface redeemLockedProductResponse {
    redeemId: number;
    success: boolean;
}

export interface getFlexibleProductPositionOptions {
    asset?: string;
    productId?: string;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getFlexibleProductPositionResponse {
    rows: getFlexibleProductPositionRows[];
    total: number;
}

interface getFlexibleProductPositionRows {
    totalAmount: string;
    tierAnnualPercentageRate: tierAnnualPercentageRate;
    latestAnnualPercentageRate: string;
    yesterdayAirdropPercentageRate: string;
    asset: string;
    airDropAsset: string;
    canRedeem: boolean;
    collateralAmount: string;
    productId: string;
    yesterdayRealTimeRewards: string;
    cumulativeBonusRewards: string;
    cumulativeRealTimeRewards: string;
    cumulativeTotalRewards: string;
    autoSubscribe: boolean;
}

interface tierAnnualPercentageRate {
    '0-5BTC': number;
    '5-10BTC': number;
}

export interface getLockedProductPositionOptions {
    asset?: string;
    positionId?: string;
    projectId?: string;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getLockedProductPositionResponse {
    rows: getLockedProductPositionRows[];
    total: number;
}

interface getLockedProductPositionRows {
    positionId: string;
    projectId: string;
    asset: string;
    amount: string;
    purchaseTime: string;
    duration: string;
    accrualDays: string;
    rewardAsset: string;
    APY: string;
    isRenewable: boolean;
    isAutoRenew: boolean;
    redeemDate: string;
}

export interface simpleAccountOptions {
    recvWindow?: number;
}

export interface simpleAccountResponse {
    totalAmountInBTC: string;
    totalAmountInUSDT: string;
    totalFlexibleAmountInBTC: string;
    totalFlexibleAmountInUSDT: string;
    totalLockedInBTC: string;
    totalLockedInUSDT: string;
}

export interface getFlexibleSubscriptionRecordOptions {
    productId?: string;
    purchaseId?: string;
    asset?: string;
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getFlexibleSubscriptionRecordResponse {
    rows: getFlexibleSubscriptionRecordRows[];
    total: number;
}

interface getFlexibleSubscriptionRecordRows {
    amount: string;
    asset: string;
    time: number;
    purchaseId: number;
    type: SimpleEarnType;
    sourceAccount: SimpleEarnSourceAccount;
    amtFromSpot: string;
    amtFromFunding: string;
    status: SimpleEarnStatus;
}

export interface getLockedSubscriptionRecordOptions {
    purchaseId?: string;
    asset?: string;
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getLockedSubscriptionRecordResponse {
    rows: getLockedSubscriptionRecordRows[];
    total: number;
}

interface getLockedSubscriptionRecordRows {
    positionId: string;
    purchaseId: number;
    time: number;
    asset: string;
    amount: string;
    lockPeriod: string;
    type: SimpleEarnType;
    sourceAccount: SimpleEarnSourceAccount;
    amtFromSpot: string;
    amtFromFunding: string;
    status: SimpleEarnStatus;
}

export interface getFlexibleRedemptionRecordOptions {
    productId?: string;
    redeemId?: string;
    asset?: string;
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
}

export interface getFlexibleRedemptionRecordResponse {
    rows: getFlexibleRedemptionRecordRows[];
    total: number;
}

interface getFlexibleRedemptionRecordRows {
    amount: string;
    asset: string;
    time: number;
    projectId: string;
    redeemId: number;
    destAccount: SimpleEarnDestAccount;
    status: string;
}

export interface getLockedRedemptionRecordOptions {
    positionId?: string;
    redeemId?: string;
    asset?: string;
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getLockedRedemptionRecordResponse {
    rows: getLockedRedemptionRecordRows[];
    total: number;
}

interface getLockedRedemptionRecordRows {
    positionId: string;
    redeemId: number;
    time: number;
    asset: string;
    lockPeriod: string;
    amount: string;
    type: SimpleEarnLockedRedemption;
    deliverDate: string;
    status: string;
}

export interface getFlexibleRewardsHistoryOptions {
    productId?: string;
    asset?: string;
    startTime?: number;
    endTime?: number;
}

export interface getFlexibleRewardsHistoryResponse {
    rows: getFlexibleRewardsHistoryRows[];
    total: number;
}

interface getFlexibleRewardsHistoryRows {
    asset: string;
    rewards: string;
    projectId: string;
    type: SimpleEarnFlexibleRewards;
    time: number;
}

export interface getLockedRewardsHistoryOptions {
    positionId?: string;
    asset?: string;
    startTime?: number;
    endTime?: number;
    size?: number;
    recvWindow?: number;
}

export interface getLockedRewardsHistoryResponse {
    rows: getLockedRewardsHistoryRows[];
    total: number;
}

interface getLockedRewardsHistoryRows {
    positionId: string;
    time: number;
    asset: string;
    lockPeriod: string;
    amount: string;
}

export interface setFlexibleAutoSubscribeOptions {
    recvWindow?: number;
}

export interface setFlexibleAutoSubscribeResponse {
    success: boolean;
}

export interface setLockedAutoSubscribeOptions {
    recvWindow?: number;
}

export interface setLockedAutoSubscribeResponse {
    success: boolean;
}

export interface getFlexiblePersonalLeftQuotaOptions {
    recvWindow?: number;
}

export interface getFlexiblePersonalLeftQuotaResponse {
    leftPersonalQuota: string;
}

export interface getLockedPersonalLeftQuotaOptions {
    recvWindow?: number;
}

export interface getLockedPersonalLeftQuotaResponse {
    leftPersonalQuota: string;
}

export interface getFlexibleSubscriptionPreviewOptions {
    recvWindow?: number;
}

export interface getFlexibleSubscriptionPreviewResponse {
    totalAmount: string;
    rewardAsset: string;
    airDropAsset: string;
    estDailyBonusRewards: string;
    estDailyRealTimeRewards: string;
    estDailyAirdropRewards: string;
}

export interface getLockedSubscriptionPreviewOptions {
    autoSubscribe?: boolean;
    recvWindow?: number;
}

export interface getLockedSubscriptionPreviewResponse {
    rewardAsset: string;
    totalRewardAmt: string;
    extraRewardAsset: string;
    estTotalExtraRewardAmt: string;
    nextPay: string;
    nextPayDate: string;
    valueDate: string;
    rewardsEndDate: string;
    deliverDate: string;
    nextSubscriptionDate: string;
}

export interface getRateHistoryOptions {
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getRateHistoryResponse {
    rows: getRateHistoryRows[];
    total: number;
}

interface getRateHistoryRows {
    productId: string;
    asset: string;
    annualPercentageRate: string;
    time: number;
}

export interface getCollateralRecordOptions {
    productId?: string;
    startTime?: number;
    endTime?: number;
    current?: number;
    size?: number;
    recvWindow?: number;
}

export interface getCollateralRecordResponse {
    rows: getCollateralRecordRows[];
    total: number;
}

interface getCollateralRecordRows {
    amount: string;
    productId: string;
    asset: string;
    createTime: number;
    type: string;
    productName: string;
    orderId: number;
}
