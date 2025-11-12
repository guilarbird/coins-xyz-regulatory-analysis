import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';

interface Tab {
  label: string;
  anchor: string;
  route?: string; // For external routes like /regulatory-framework
}

interface RegulatoryLayoutProps {
  children: ReactNode;
  entity: 'VASP' | 'IP';
  title: string;
  subtitle: string;
  tabs: Tab[];
}

export default function RegulatoryLayout({ children, entity, title, subtitle, tabs }: RegulatoryLayoutProps) {
  const [location, setLocation] = useLocation();
  const { currency, setCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState('');

  // Update active tab based on hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveTab(hash);
    } else {
      setActiveTab('overview');
    }
  }, [location]);

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
    
    // Alias map for section preservation
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
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Left: Breadcrumb */}
            <Link href="/">
              <a className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
                <span className="text-gray-400">/</span>
                <span className="text-sm font-semibold text-gray-900">{entity}</span>
              </a>
            </Link>
            
            {/* Right: Currency Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setCurrency('BRL')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  currency === 'BRL'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                BRL (R$)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-8 md:py-12">
        <div className="container max-w-7xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-display">{title}</h1>
          <p className="text-blue-100 text-sm md:text-base">{subtitle}</p>
        </div>
      </section>

      {/* Sticky Sub-menu (Tabs) */}
      <div className="sticky top-16 md:top-18 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-3">
            {/* Entity Toggle */}
            <div className="flex-shrink-0 flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
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

            {/* Tabs */}
            <div 
              role="tablist" 
              className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory'
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.anchor}
                  role="tab"
                  aria-selected={activeTab === tab.anchor}
                  aria-controls={tab.anchor}
                  onClick={() => handleTabClick(tab)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.anchor
                      ? entity === 'VASP'
                        ? 'bg-blue-600 text-white'
                        : 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    minWidth: '44px',
                    minHeight: '44px',
                    scrollSnapAlign: 'start'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Fade edges for overflow indication */}
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white/90 to-transparent pointer-events-none"></div>
      </div>

      {/* Content */}
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
