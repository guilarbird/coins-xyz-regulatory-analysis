import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Tab {
  label: string;
  anchor: string;
  route?: string;
}

interface KPIChip {
  label: string;
  value: string;
  fullValue?: string; // Full value for desktop (e.g., "R$ 9.200.000")
}

interface RegulatoryLayoutProps {
  children: ReactNode;
  entity: 'VASP' | 'IP';
  title: string;
  subtitle: string;
  tabs: Tab[];
  kpiChips: KPIChip[]; // 3 KPI chips for hero
}

export default function RegulatoryLayout({ 
  children, 
  entity, 
  title, 
  subtitle, 
  tabs,
  kpiChips 
}: RegulatoryLayoutProps) {
  const [location, setLocation] = useLocation();
  const { currency, setCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveTab(hash);
    } else {
      setActiveTab(tabs[0]?.anchor || 'overview');
    }
  }, [location, tabs]);

  const handleTabClick = (tab: Tab) => {
    if (tab.route) {
      setLocation(tab.route);
    } else {
      const element = document.getElementById(tab.anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${tab.anchor}`);
        setActiveTab(tab.anchor);
      }
    }
  };

  const toggleEntity = () => {
    const targetRoute = entity === 'VASP' ? '/ip' : '/vasp';
    
    const aliasMap: Record<string, string> = {
      'overview': 'overview',
      'capital': 'capital',
      'timeline': 'timeline',
      'pre-calculator': 'gradual-implementation',
      'gradual-implementation': 'pre-calculator',
      'compliance': 'requirements',
      'requirements': 'compliance'
    };
    
    const targetAnchor = aliasMap[activeTab] || 'overview';
    setLocation(`${targetRoute}#${targetAnchor}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header (No Logo) */}
      <header className="sticky top-0 z-50 h-14 bg-white/95 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl h-full px-3 flex items-center justify-between">
          {/* Left: Back Button */}
          <Link href="/">
            <a className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </a>
          </Link>

          {/* Right: Currency Segmented Control */}
          <div className="inline-flex rounded-full border bg-white">
            <button
              onClick={() => setCurrency('BRL')}
              aria-selected={currency === 'BRL'}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                currency === 'BRL'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              BRL (R$)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              aria-selected={currency === 'USD'}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                currency === 'USD'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with 3-Up KPI Grid */}
      <section className={`bg-gradient-to-br ${
        entity === 'VASP' 
          ? 'from-[#0A67FF] to-[#37C464]' 
          : 'from-[#0A67FF] to-[#37C464]'
      }`}>
        <div className="mx-auto max-w-6xl px-3 py-6">
          <h1 className="text-white text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="text-white/85 text-sm mt-1">{subtitle}</p>

          {/* 3-Up Responsive KPI Grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {kpiChips.map((chip, index) => (
              <div 
                key={index}
                className="rounded-2xl ring-1 ring-white/25 bg-white/10 px-4 py-3 text-white min-w-[220px]"
              >
                <div className="text-xs uppercase tracking-wide opacity-80">{chip.label}</div>
                <div className="font-semibold leading-tight mt-1">
                  {chip.fullValue ? (
                    <>
                      <span className="hidden md:inline text-[clamp(18px,3.2vw,28px)]">{chip.fullValue}</span>
                      <span className="md:hidden text-[clamp(18px,4.5vw,24px)]">{chip.value}</span>
                    </>
                  ) : (
                    <span className="text-[clamp(18px,3.2vw,28px)]">{chip.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Tabs (Solid White Surface) */}
      <nav className="bg-white border-b sticky top-14 z-40">
        <div className="mx-auto max-w-6xl px-3">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {/* Entity Toggle */}
            <div className="flex-shrink-0 flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5">
              <button
                onClick={toggleEntity}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  entity === 'VASP'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                VASP
              </button>
              <button
                onClick={toggleEntity}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  entity === 'IP'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                IP
              </button>
            </div>

            {/* Tabs with Underline Indicator */}
            <ul 
              role="tablist" 
              className="flex gap-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {tabs.map((tab) => (
                <li key={tab.anchor}>
                  <button
                    role="tab"
                    aria-selected={activeTab === tab.anchor}
                    aria-controls={tab.anchor}
                    onClick={() => handleTabClick(tab)}
                    data-active={activeTab === tab.anchor}
                    className={`relative py-3 text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.anchor
                        ? 'text-neutral-900 font-medium'
                        : 'text-neutral-700 hover:text-neutral-900'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    {tab.label}
                    <span 
                      className={`absolute left-0 right-0 -bottom-px h-0.5 bg-neutral-900 transition-opacity ${
                        activeTab === tab.anchor ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-2">
        {children}
      </main>
    </div>
  );
}
