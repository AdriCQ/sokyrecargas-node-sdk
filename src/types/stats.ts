export interface IUserStats {
  transactions: number;
  credits: number;
  recharges: number;
}

export interface IDashboardStats {
  users: {
    all: number;
    verified: number;
  };
  recharges: {
    all: number;
    completed: number;
    pending: number;
    canceled: number;
  };
  transactions: {
    all: number;
    top_up: number;
    refund: number;
    completed: number;
    pending: number;
  };
}
