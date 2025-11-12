import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Scale, DollarSign, TrendingUp, Calculator, CheckCircle2, AlertCircle, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
// Logo handled directly in JSX
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function VaspAnalysis() {
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
  const [exchangeRate, setExchangeRate] = useState(5.00);
  const [custodyBRL, setCustodyBRL] = useState(100000000);
  const [custodyUSD, setCustodyUSD] = useState(50000000);
  const [custodyCrypto, setCustodyCrypto] = useState(200000000);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        if (data.rates && data.rates.BRL) {
          setExchangeRate(data.rates.BRL);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };

    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value / exchangeRate);
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const capitalData = [
    { date: 'Jul 2026', amount: 3500000, percentage: 25, label: '25%' },
    { date: 'Jan 2027', amount: 7000000, percentage: 50, label: '50%' },
    { date: 'Jan 2028', amount: 14000000, percentage: 100, label: '100%' }
  ];

  const preBRL = custodyBRL * 0.02;
  const preUSD = custodyUSD * 0.05;
  const preCrypto = custodyCrypto * 0.08;
  const totalPRE = preBRL + preUSD + preCrypto;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <a className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </a>
              </Link>

            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
              <button
                onClick={() => setCurrency('BRL')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  currency === 'BRL' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                BRL (R$)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  currency === 'USD' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                USD ($)
              </button>
            </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="gradient-reddish text-white py-12">
        <div className="container max-w-7xl">
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-4">
            Virtual Asset Service Provider
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 font-display">VASP Analysis</h1>
          <p className="text-xl text-white/90 mb-6">Coins.xyz Digital Markets Ltda. — BCB Resolutions 519, 520 & 521</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/80 mb-1">Minimum Capital</p>
              <p className="text-xl md:text-2xl font-bold font-display break-words">{formatCurrency(14000000)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/80 mb-1">Target Filing</p>
              <p className="text-2xl font-bold font-display">Nov 2026</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/80 mb-1">Full Compliance</p>
              <p className="text-2xl font-bold font-display">Jan 2028</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="container max-w-7xl">
          <Tabs defaultValue="capital" className="space-y-6">
            {/* Tab Navigation */}
            <div className="sticky top-[64px] z-30 bg-white border-b shadow-sm -mx-4 px-4 py-4 mb-16">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg">
                <TabsTrigger value="capital" className="bg-blue-500 hover:bg-blue-600 data-[state=active]:bg-blue-700 text-white transition-all min-h-[48px] px-4 py-3 rounded-lg shadow-sm">Capital Structure</TabsTrigger>
                <TabsTrigger value="pre" className="bg-purple-500 hover:bg-purple-600 data-[state=active]:bg-purple-700 text-white transition-all min-h-[48px] px-4 py-3 rounded-lg shadow-sm">PRE Calculator</TabsTrigger>
                <TabsTrigger value="timeline" className="bg-cyan-500 hover:bg-cyan-600 data-[state=active]:bg-cyan-700 text-white transition-all min-h-[48px] px-4 py-3 rounded-lg shadow-sm">Timeline</TabsTrigger>
                <TabsTrigger value="checklist" className="bg-indigo-500 hover:bg-indigo-600 data-[state=active]:bg-indigo-700 text-white transition-all min-h-[48px] px-4 py-3 rounded-lg shadow-sm">Compliance</TabsTrigger>
              </TabsList>
            </div>

            {/* Capital Structure Tab */}
            <TabsContent value="capital" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Capital Structure Overview</CardTitle>
                  <CardDescription>Two-component capital requirement model for VASPs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-600 text-white rounded-lg p-2">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg font-display text-gray-900 dark:text-gray-100">Fixed Cost Component (PCF)</h3>
                      </div>
                      <p className="text-3xl font-bold text-blue-600 mb-2 font-display">{formatCurrency(4000000)}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Baseline capital for structuring and maintaining operations, regardless of transaction volume.</p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-600 text-white rounded-lg p-2">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg font-display text-gray-900 dark:text-gray-100">Operational Activities (PAO)</h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600 mb-2 font-display">{formatCurrency(10000000)}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Variable component based on intermediation and custody activities performed.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-2 font-display text-gray-900 dark:text-gray-100">Total Minimum Capital (CMin)</h3>
                    <p className="text-4xl font-bold text-purple-600 mb-2 font-display">{formatCurrency(14000000)}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">PCF (R$4,000,000) + PAO (R$10,000,000) = Required paid-in capital and minimum net equity</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Understanding Capital Types</CardTitle>
                  <CardDescription>Clear distinction between different capital requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-600 text-white rounded-full p-1.5">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display">Capital Contribution</h4>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mb-2 font-display">{formatCurrency(14000000)}</p>
                      <p className="text-sm text-gray-700 mb-3">One-time injection of paid-in capital required to establish the company.</p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Fully paid in cash</li>
                        <li>• Gradual: 25% → 50% → 100%</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-purple-600 text-white rounded-full p-1.5">
                          <Scale className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display text-gray-900 dark:text-gray-100">Idle Capital</h4>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 mb-2 font-display">{formatCurrency(14000000)}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Minimum net equity that must be maintained at all times.</p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Cannot be withdrawn</li>
                        <li>• Verified daily by BCB</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-600 text-white rounded-full p-1.5">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display text-gray-900 dark:text-gray-100">Available Capital</h4>
                      </div>
                      <p className="text-2xl font-bold text-green-600 mb-2 font-display">Variable</p>
                      <p className="text-sm text-gray-700 mb-3">Daily PRE based on custody. Additional to R$14,000,000.</p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 2% BRL / 5% USD / 8% Crypto</li>
                        <li>• Reported daily before 6 AM</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PRE Calculator Tab */}
            <TabsContent value="pre" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Calculator className="w-5 h-5" />
                    PRE Calculator
                  </CardTitle>
                  <CardDescription>Calculate daily Patrimônio de Referência Exigido based on assets under custody</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">BRL Stablecoins (R$)</label>
                        <input
                          type="number"
                          value={custodyBRL}
                          onChange={(e) => setCustodyBRL(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">2% PRE rate</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">USD Stablecoins (R$)</label>
                        <input
                          type="number"
                          value={custodyUSD}
                          onChange={(e) => setCustodyUSD(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">5% PRE rate</p>
(Content truncated due to size limit. Use page ranges or line ranges to read remaining content)