export interface ExchangeLocker {
  id: number;
  pinDeposit: string;
  pinRetrieve: string;
  state: string;
  userDepositId: number;
  userRetrieveId: number;
  lockerId: number;
  exchangeId: number;
}

export interface CreateExchangeLockerDto {
  pinDeposit: string;
  pinRetrieve: string;
  state: string;
  userDepositId: number;
  userRetrieveId: number;
  lockerId: number;
  exchangeId: number;
}

export interface UpdateExchangeLockerDto {
  exchangeId: number;
  state: string;
  stateExchange: string;
}

export interface ExchangeLockerDetailsByUser {
  pinDeposit: string;
  pinRetrieve: string;
  lockerDepositId: string;
  lockerRetrieveId: string;
  location: {
    districtId: number;
    districtName: string;
    departmentId: number;
    departmentName: string;
    countryId: number;
    countryName: string;
  };
  stateExchangeLockerDeposit: string;
  stateExchangeLockerRetrieve: string;
}
