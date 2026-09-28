import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  LayoutDashboard, 
  Globe, 
  Smartphone, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ChefHat, 
  ShoppingBag, 
  Bell, 
  Users, 
  Search,
  ArrowRight,
  Send,
  Eye,
  Check,
  MapPin,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';
import { SolutionType } from '../types/index.ts';
import { CloudMeshLogo } from './CloudMeshLogo.tsx';

interface InteractiveShowcaseProps {
  activeTab: SolutionType;
  setActiveTab: (tab: SolutionType) => void;
  onOpenInquiry: (solutionName?: string) => void;
}

interface DemoOrderItem {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface KitchenTicketDemo {
  id: string;
  customerName: string;
  items: string[];
  type: 'Pickup Window' | 'Dine-in Table' | 'Takeaway Cart';
  status: 'New' | 'Preparing' | 'Ready for Pickup';
}

interface CustomerLead {
  id: string;
  name: string;
  service: string;
  status: 'New Inquiry' | 'In Progress' | 'Completed';
  date: string;
}

const MENU_ITEMS: DemoOrderItem[] = [
  {
    id: 'item-1',
    name: 'Artisan Angus Smash Burger',
    category: 'Mains',
    description: 'Double beef patty, melted cheddar, house pickle relish on toasted brioche.'
  },
  {
    id: 'item-2',
    name: 'Woodfired Mozzarella & Basil Pizza',
    category: 'Mains',
    description: 'Crushed San Marzano tomatoes, fresh mozzarella, extra virgin olive oil.'
  },
  {
    id: 'item-3',
    name: 'Crispy Sea Salt Rosemary Fries',
    category: 'Sides',
    description: 'Hand-cut agria potatoes tossed with rosemary and flaky sea salt.'
  },
  {
    id: 'item-4',
    name: 'Cold Brew Crafted Iced Coffee',
    category: 'Drinks',
    description: 'Slow-steeped organic coffee served chilled over ice.'
  }
];

export const InteractiveShowcase: React.FC<InteractiveShowcaseProps> = ({
  activeTab,
  setActiveTab,
  onOpenInquiry
}) => {
  // Food demo state
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>({ 'item-1': 1, 'item-3': 1 });
  const [tickets, setTickets] = useState<KitchenTicketDemo[]>([
    {
      id: 'T-101',
      customerName: 'Liam R.',
      items: ['1x Artisan Angus Smash Burger', '1x Crispy Sea Salt Rosemary Fries'],
      type: 'Takeaway Cart',
      status: 'Preparing'
    },
    {
      id: 'T-102',
      customerName: 'Sarah M.',
      items: ['1x Woodfired Mozzarella & Basil Pizza'],
      type: 'Pickup Window',
      status: 'New'
    }
  ]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Portal demo state
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<CustomerLead[]>([
    { id: 'L-1', name: 'Auckland Flooring Co', service: 'Full Business Website', status: 'New Inquiry', date: 'Today' },
    { id: 'L-2', name: 'Harbor Street Cafe & Cart', service: 'Food Ordering Mobile App', status: 'In Progress', date: 'Yesterday' },
    { id: 'L-3', name: 'Apex Logistics NZ', service: 'Staff & Order Admin Portal', status: 'Completed', date: 'This week' },
    { id: 'L-4', name: 'Kōwhai Bakery', service: 'Takeaway Menu & Kitchen App', status: 'In Progress', date: 'This week' }
  ]);

  // Mobile Owner App simulator state
  const [cartOpen, setCartOpen] = useState(true);
  const [pushNotification, setPushNotification] = useState<string | null>(null);

  const toggleItemQuantity = (id: string, delta: number) => {
    setSelectedItems(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleSendOrder = () => {
    const itemNames = Object.entries(selectedItems).map(([id, qty]) => {
      const item = MENU_ITEMS.find(m => m.id === id);
      return `${qty}x ${item?.name || 'Item'}`;
    });

    if (itemNames.length === 0) return;

    const newTicket: KitchenTicketDemo = {
      id: `T-${Math.floor(100 + Math.random() * 900)}`,
      customerName: 'Demo Customer',
      items: itemNames,
      type: 'Takeaway Cart',
      status: 'New'
    };

    setTickets(prev => [newTicket, ...prev]);
    setSelectedItems({});
    setAlertMessage('Order sent instantly to the kitchen display screen!');
    setTimeout(() => setAlertMessage(null), 4000);
  };

  const handleAdvanceStatus = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id !== ticketId) return t;
        if (t.status === 'New') return { ...t, status: 'Preparing' };
        if (t.status === 'Preparing') {
          setAlertMessage(`Alert sent to ${t.customerName}: Your order is ready for pickup!`);
          setTimeout(() => setAlertMessage(null), 4000);
          return { ...t, status: 'Ready for Pickup' };
        }
        return t;
      })
    );
  };

  const triggerMobileNotification = (text: string) => {
    setPushNotification(text);
    setTimeout(() => setPushNotification(null), 4000);
  };

  const filteredLeads = leads.filter(
    l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="interactive-showcase" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with traveling dot anchor */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
              <span
                id="dot-anchor-showcase"
                className="w-2.5 h-2.5 rounded-sm border border-sky-500/40 dark:border-sky-400/40 rotate-45 inline-block shrink-0"
                aria-hidden="true"
              />
              <span>Interactive Test Environment</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Try Out Real Software Interfaces
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Click through functional previews of the websites, admin portals, and food ordering mobile apps we build.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Interactive Demo
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('food-saas')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'food-saas'
                ? 'bg-sky-600 text-white dark:bg-sky-400 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Food Shop & Food Cart App
          </button>

          <button
            onClick={() => setActiveTab('business-portal')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'business-portal'
                ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Business Admin Portal
          </button>

          <button
            onClick={() => setActiveTab('website')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'website'
                ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Modern Business Website
          </button>

          <button
            onClick={() => setActiveTab('mobile-app')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'mobile-app'
                ? 'bg-sky-600 text-white dark:bg-sky-400 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Owner Mobile Dashboard
          </button>
        </div>

        {/* Global Alert Notification Banner */}
        {alertMessage && (
          <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-600/50 rounded-lg text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 shadow-sm animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-medium">{alertMessage}</span>
          </div>
        )}

        {/* TAB 1: FOOD SHOP & CART APP */}
        {activeTab === 'food-saas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Customer Menu & Cart */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    Customer Digital Menu
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Customers scan QR code at counter, food cart window, or order ahead on phone
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded">
                  Direct Ordering
                </span>
              </div>

              <div className="space-y-3">
                {MENU_ITEMS.map(item => {
                  const qty = selectedItems[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.description}</div>
                        <span className="inline-block mt-1 text-[11px] font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-xs">
                            <button
                              onClick={() => toggleItemQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-900 dark:text-white w-4 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => toggleItemQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleItemQuantity(item.id, 1)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                          >
                            Add to Order
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleSendOrder}
                  disabled={Object.keys(selectedItems).length === 0}
                  className={`w-full py-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    Object.keys(selectedItems).length > 0
                      ? 'bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 shadow-md active:scale-95'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  Place Order & Transmit to Kitchen Display Screen
                </button>
              </div>
            </div>

            {/* Right: Kitchen Display Screen (KDS) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Kitchen Display Screen</h3>
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Kitchen / Counter View
                </span>
              </div>

              <div className="space-y-3">
                {tickets.map(ticket => (
                  <div
                    key={ticket.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {ticket.customerName} ({ticket.type})
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          ticket.status === 'New'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                            : ticket.status === 'Preparing'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      {ticket.items.map((itemStr, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"></span>
                          <span>{itemStr}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 flex items-center justify-between">
                      {ticket.status === 'New' && (
                        <button
                          onClick={() => handleAdvanceStatus(ticket.id)}
                          className="w-full py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors"
                        >
                          Mark as Preparing →
                        </button>
                      )}
                      {ticket.status === 'Preparing' && (
                        <button
                          onClick={() => handleAdvanceStatus(ticket.id)}
                          className="w-full py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
                        >
                          Ready for Customer Pickup (Send Alert) ✓
                        </button>
                      )}
                      {ticket.status === 'Ready for Pickup' && (
                        <div className="w-full py-1.5 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg">
                          Customer alerted for collection
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => onOpenInquiry('Food Shop / Cart App')}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  Need this for your food shop or food cart? Contact us →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUSINESS ADMIN PORTAL */}
        {activeTab === 'business-portal' && (
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Business Admin Portal Dashboard
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Manage incoming customer inquiries, orders, staff, and records in one secure hub
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter inquiries..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Quick Status Cards without numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Operational Status</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active & Taking Requests
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Customer Records</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  Synchronized in Cloud
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Team Access</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  Owner & Staff Logins
                </div>
              </div>
            </div>

            {/* Table of requests */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Recent Customer Inquiries & Orders</div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {filteredLeads.map(lead => (
                  <div key={lead.id} className="p-4 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{lead.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{lead.service}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400">{lead.date}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          lead.status === 'New Inquiry'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                            : lead.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Need specific custom forms or inventory tracking for your business?</span>
              <button
                onClick={() => onOpenInquiry('Business Admin Portal')}
                className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Discuss Custom Portal Setup →
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MODERN BUSINESS WEBSITE PREVIEW */}
        {activeTab === 'website' && (
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Website Layout Preview
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  How your modern business website appears to customers on mobile and desktop
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded">
                Custom Styled for Your Brand
              </span>
            </div>

            {/* Simulated mini website browser window */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950">
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono ml-2">https://yourbusiness.co.nz</span>
              </div>

              {/* Simulated website header with brand logo */}
              <div className="bg-white dark:bg-slate-900 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <CloudMeshLogo size="sm" />
                <div className="hidden sm:flex items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span className="text-slate-900 dark:text-white font-semibold">Home</span>
                  <span>About</span>
                  <span>Services</span>
                  <span>Locations</span>
                  <span className="px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold text-[11px]">
                    Get in Touch
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 bg-white dark:bg-slate-950">
                <div className="max-w-xl space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full">
                    <CloudMeshLogo size="sm" showText={false} />
                    <span>Custom Brand Design & Fast Delivery</span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Premium Quality Services & Direct Customer Support
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Clear explanation of your services, client testimonials, opening hours, and direct call-to-action buttons.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md">
                      Contact Our Team
                    </button>
                    <button className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md">
                      Our Services
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Physical Location
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Auckland, New Zealand</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Direct Calling
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">One-tap mobile call button</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Working Hours
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Updated opening schedule</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => onOpenInquiry('Custom Website')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Ready to get your website built? Tell us about your business →
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: OWNER MOBILE APP SIMULATOR */}
        {activeTab === 'mobile-app' && (
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  <Smartphone className="w-4 h-4" />
                  <span>Business Owner Mobile App</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Run your food cart or shop right from your pocket.
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  As a business owner, you don't want to sit in front of a laptop all day. We build clean mobile apps so you can open or pause ordering, review incoming customer tickets, and alert customers when orders are ready directly from your smartphone.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Accepting Orders Online</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Toggle off when kitchen is busy or food cart closes</div>
                    </div>
                    <button
                      onClick={() => setCartOpen(!cartOpen)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                        cartOpen ? 'bg-emerald-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {cartOpen ? 'OPEN' : 'PAUSED'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Broadcast Alert to Customers</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Send an instant alert to waiting patrons</div>
                    </div>
                    <button
                      onClick={() => triggerMobileNotification('Fresh batch of Burgers & Pizzas ready for collection!')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:text-slate-950 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      Test Push Alert
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenInquiry('Food Shop / Cart App')}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:text-slate-950 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Build an App for My Business →
                  </button>
                </div>
              </div>

              {/* Mobile Phone Mockup Viewport */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] bg-slate-900 text-white rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 relative">
                  {/* Phone camera notch */}
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3"></div>

                  {/* Simulated push banner */}
                  {pushNotification && (
                    <div className="p-2.5 mb-2 rounded-xl bg-sky-500 text-white text-[11px] shadow-lg animate-bounce">
                      <div className="font-bold flex items-center gap-1.5">
                        <CloudMeshLogo size="sm" showText={false} />
                        CloudMesh Food Cart Alert
                      </div>
                      <div className="text-[10px] mt-0.5">{pushNotification}</div>
                    </div>
                  )}

                  <div className="bg-slate-950 rounded-[28px] p-4 space-y-3 min-h-[380px] flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold">Harbor Food Cart</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cartOpen ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                          {cartOpen ? 'OPEN' : 'CLOSED'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-[10px] text-slate-400">Active Kitchen Orders</div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                          Orders in preparation
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-[10px] text-slate-400">Pickup Queue</div>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Ready for collection at window
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <CloudMeshLogo size="sm" showText={false} />
                      <span>CloudMesh Mobile Suite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
