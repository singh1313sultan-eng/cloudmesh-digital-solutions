export type Currency = 'NZD' | 'USD' | 'AUD' | 'EUR' | 'GBP';

export interface CurrencyRate {
  symbol: string;
  rate: number; // relative to NZD
  code: Currency;
}

export type SolutionType = 
  | 'website'
  | 'business-portal'
  | 'food-saas'
  | 'crm-dashboard'
  | 'mobile-app'
  | 'custom-suite';

export interface ScopeOption {
  id: string;
  name: string;
  description: string;
  baseWeeks: number;
  baseCostNZD: number;
}

export interface AddonFeature {
  id: string;
  name: string;
  category: string;
  weeks: number;
  costNZD: number;
}

export interface FoodMenuItem {
  id: string;
  name: string;
  category: 'pizzas' | 'bowls' | 'drinks' | 'sides';
  price: number;
  description: string;
  prepTimeMinutes: number;
  calories: string;
  isPopular?: boolean;
}

export interface KitchenTicket {
  id: string;
  orderNumber: string;
  customerName: string;
  items: { name: string; quantity: number; notes?: string }[];
  total: number;
  status: 'new' | 'preparing' | 'ready' | 'dispatched';
  timestamp: string;
  tableOrDelivery: string;
}

export interface CRMDeal {
  id: string;
  client: string;
  company: string;
  value: number;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed';
  probability: number;
  assignee: string;
  lastActivity: string;
  region: string;
}

export interface PortalDocument {
  id: string;
  title: string;
  category: string;
  size: string;
  updatedAt: string;
  status: 'Approved' | 'Review Required' | 'Signed';
  version: string;
}

export interface ProjectInquiry {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  solutionType: SolutionType;
  budgetRange: string;
  timeline: string;
  projectNotes: string;
  estimatedCostDisplay?: string;
}
