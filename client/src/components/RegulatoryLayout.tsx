import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

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
  heroChip?: string; // Optional chip text for hero (e.g., "Full Compliance • Jan 2028")
}

export default function RegulatoryLayout({ 
  children, 
  entity, 
  title, 
  subtitle, 
  tabs,
  heroChip 
}: RegulatoryLayoutProps) {
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
      {/* Sticky App Bar (Solid) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-14 px-3">
          {/* Left: Back + Logo */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Link href="/">
              <a className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </a>
            </Link>
            <div className="h-4 w-px bg-neutral-200 mx-2 hidden sm:block" />
            <img 
              src="/CoinsXYZ_HorizontalLogo_BlackWordmark.png" 
              alt="coins.xyz" 
              className="h-5 w-auto"
            />
          </div>

          {/* Right: Currency Segmented Control */}
          <div className="flex items-center">
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
        </div>
      </header>

      {/* Hero Section (Gradient, Non-Sticky) */}
      <section className={`bg-gradient-to-r ${
        entity === 'VASP' 
          ? 'from-blue-600 to-purple-700' 
          : 'from-green-600 to-teal-700'
      }`}>
        <div className="mx-auto max-w-6xl px-3 py-5 md:py-6">
          {heroChip && (
            <span className="inline-flex items-center rounded-xl bg-white/10 text-white text-sm px-3 py-1 ring-1 ring-white/30 mb-3">
              {heroChip}
            </span>
          )}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 font-display">
            {title}
          </h1>
          <p className="text-white/80 text-sm md:text-base">{subtitle}</p>
        </div>
      </section>

      {/* Section Tabs (Solid Surface, Below Hero) */}
      <nav className="bg-white sticky top-14 z-40 border-b">
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
                    className="relative py-3 text-sm text-neutral-700 hover:text-neutral-900 whitespace-nowrap transition-colors"
                    style={{ minHeight: '44px' }}
                  >
                    {tab.label}
                    <span 
                      className={`absolute left-0 right-0 -bottom-px h-0.5 transition-opacity ${
                        activeTab === tab.anchor
                          ? entity === 'VASP'
                            ? 'bg-blue-600 opacity-100'
                            : 'bg-green-600 opacity-100'
                          : 'bg-neutral-900 opacity-0'
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
