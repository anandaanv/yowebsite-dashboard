export class WebsiteInfo {
  adminUrl: string;
  websiteName: string;
  description: string;
  status: string;
  id: number;
}

export class Subscription {
    subscriptionPlan: SubscriptionPlan;
    id: number;
    subscriptionStatus: string;
    purchaseDate: string;
    expiryDate: string;
}

export class SubscriptionPlan {
    type: string;
    durationInDays: number;
    id: number;
    cost: number;
}
