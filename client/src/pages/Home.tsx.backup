import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator, TrendingUp, Calendar, Info, DollarSign, Wallet, PiggyBank, Coins, AlertCircle, FileText, Lightbulb, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';

export default function Home() {
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
  const [exchangeRate, setExchangeRate] = useState<number>(5.00); // Default fallback
  const [lastUpdated, setLastUpdated] = useState<string>("");
  
  const BRL_TO_USD = 1 / exchangeRate;
  
  // Fetch live exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        if (data.rates && data.rates.BRL) {
          setExchangeRate(data.rates.BRL);
          setLastUpdated(new Date().toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }));
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        // Keep default fallback rate
      }
    };
    
    fetchExchangeRate();
    // Refresh every 30 minutes
    const interval = setInterval(fetchExchangeRate, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  const [btcAmount, setBtcAmount] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");
  const [brzAmount, setBrzAmount] = useState("");

  const formatCurrency = (value: number) => {
    if (currency === 'USD') {
      return `$${(value * BRL_TO_USD).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatCurrencyDetailed = (value: number) => {
    if (currency === 'USD') {
      return `$${(value * BRL_TO_USD).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const calculatePRE = () => {
    const btc = parseFloat(btcAmount) || 0;
    const usdc = parseFloat(usdcAmount) || 0;
    const brz = parseFloat(brzAmount) || 0;

    const btcPRE = btc * 0.08;
    const usdcPRE = usdc * 0.05;
    const brzPRE = brz * 0.02;

    return {
      btc: btcPRE,
      usdc: usdcPRE,
      brz: brzPRE,
      total: btcPRE + usdcPRE + brzPRE,
    };
  };

  const pre = calculatePRE();

  // Timeline data for chart
  const timelineData = [
    {
      date: 'Jul 2026',
      percentage: 25,
      amount: 3500000,
      label: '25%',
    },
    {
      date: 'Jan 2027',
      percentage: 50,
      amount: 7000000,
      label: '50%',
    },
    {
      date: 'Jan 2028',
      percentage: 100,
      amount: 14000000,
      label: '100%',
    },
  ];

  // Regulatory timeline
  const regulatoryTimeline = [
    { date: '2022-2023', event: 'Industry lobbying for clear crypto regulation', type: 'industry' },
    { date: 'Early 2024', event: 'Expectations: Light-touch framework similar to MiCA', type: 'expectation' },
    { date: 'Nov 3, 2025', event: 'BCB SURPRISE: Resolutions 517 & 14 published', type: 'surprise' },
    { date: 'Nov 10, 2025', event: 'Resolutions 519, 520, 521 published (VASPs)', type: 'regulation' },
    { date: 'Feb 2, 2026', event: 'Regulations take effect', type: 'deadline' },
    { date: 'May 4, 2026', event: 'Reporting obligations begin', type: 'deadline' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Coins.xyz Logo */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-black.png" 
                alt="Coins.xyz" 
                className="h-6"
              />
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setCurrency('BRL')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  currency === 'BRL' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                BRL (R$)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  currency === 'USD' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-white border-b sticky top-[57px] z-40">
        <div className="container">
          <div className="flex gap-6 overflow-x-auto py-3 text-sm">
            <button onClick={() => scrollToSection('context')} className="whitespace-nowrap text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Regulatory Context
            </button>
            <button onClick={() => scrollToSection('capital-overview')} className="whitespace-nowrap text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Capital Overview
            </button>
            <button onClick={() => scrollToSection('capital-types')} className="whitespace-nowrap text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Capital Types
            </button>
            <button onClick={() => scrollToSection('timeline')} className="whitespace-nowrap text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Timeline
            </button>
            <button onClick={() => scrollToSection('calculator')} className="whitespace-nowrap text-gray-600 hover:text-blue-600 font-medium transition-colors">
              PRE Calculator
            </button>
            <button onClick={() => scrollToSection('framework')} className="whitespace-nowrap text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Regulatory Framework
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-3">
              Virtual Asset Brokerage<br/>Capital Requirements
            </h1>
            <p className="text-lg text-blue-50 mb-6">
              Comprehensive analysis of regulatory capital needed to operate as a VASP in Brazil
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-4 pb-4">
                  <div className="text-2xl font-bold">{formatCurrency(14000000)}</div>
                  <div className="text-xs text-blue-100">Minimum Capital</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-4 pb-4">
                  <div className="text-2xl font-bold">2-8%</div>
                  <div className="text-xs text-blue-100">Variable PRE Rate</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-4 pb-4">
                  <div className="text-2xl font-bold">2028</div>
                  <div className="text-xs text-blue-100">Full Compliance</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Context Section */}
      <section id="context" className="py-12 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Regulatory Context</h2>
            <p className="text-gray-600">Understanding the BCB's unexpected regulatory approach</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Industry Expectations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-gray-700">
                  The crypto industry expected a <strong>light-touch regulatory framework</strong> similar to the EU's MiCA, focusing primarily on consumer protection and AML/KYC requirements.
                </p>
                <p className="text-gray-700">
                  Most VASPs anticipated minimal capital requirements, allowing smaller players to remain competitive.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  The BCB Surprise
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-gray-700">
                  On <strong>November 3, 2025</strong>, the Central Bank shocked the market by publishing Resolutions 517 & 14 with <strong>stringent capital requirements</strong> comparable to traditional financial institutions.
                </p>
                <p className="text-gray-700">
                  The {formatCurrency(14000000)} minimum capital requirement caught most operators off-guard, forcing industry consolidation.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Regulatory Timeline</CardTitle>
              <CardDescription>Key milestones in Brazil's crypto regulation journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulatoryTimeline.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className={`w-24 flex-shrink-0 text-xs font-semibold ${
                      item.type === 'surprise' ? 'text-red-600' : 
                      item.type === 'regulation' ? 'text-blue-600' : 
                      item.type === 'deadline' ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {item.date}
                    </div>
                    <div className={`flex-1 text-sm p-3 rounded-lg ${
                      item.type === 'surprise' ? 'bg-red-50 border-l-4 border-red-500' :
                      item.type === 'regulation' ? 'bg-blue-50 border-l-4 border-blue-500' :
                      item.type === 'deadline' ? 'bg-purple-50 border-l-4 border-purple-500' :
                      item.type === 'expectation' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                      'bg-gray-50 border-l-4 border-gray-300'
                    }`}>
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Capital Overview Section */}
      <section id="capital-overview" className="py-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Capital Structure Overview</h2>
            <p className="text-gray-600">Understanding the two-component capital requirement model</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-lg mb-2 text-blue-900">
                Fixed Cost Component (PCF)
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">{formatCurrency(4000000)}</div>
              <p className="text-sm text-gray-700">
                Baseline capital for structuring and maintaining operations, regardless of transaction volume.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold text-lg mb-2 text-green-900">
                Operational Activities (PAO)
              </h3>
              <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(10000000)}</div>
              <p className="text-sm text-gray-700">
                Variable component based on intermediation and custody activities performed.
              </p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg border-2 border-blue-300 mb-6">
            <h3 className="font-semibold text-lg mb-2">Total Minimum Capital (CMin)</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">{formatCurrency(14000000)}</div>
            <p className="text-sm text-gray-700">
              PCF ({formatCurrency(4000000)}) + PAO ({formatCurrency(10000000)}) = Required paid-in capital and minimum net equity
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="activities" className="bg-white border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">Activity Categories Details</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Badge className="mt-1">C2</Badge>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Intermediation</h4>
                      <p className="text-xs text-gray-600">
                        Purchase and sale of virtual assets on behalf of third parties, including exchange operations and market making.
                      </p>
                      <div className="mt-2 text-xs font-medium text-blue-600">
                        Reference Value: {formatCurrency(10000000)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Badge className="mt-1">C3</Badge>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">Custody & Administration</h4>
                      <p className="text-xs text-gray-600">
                        Safekeeping of clients' virtual assets, including wallet management and professional asset administration.
                      </p>
                      <div className="mt-2 text-xs font-medium text-green-600">
                        Reference Value: {formatCurrency(6000000)}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Capital Types Section */}
      <section id="capital-types" className="py-12 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Understanding Capital Types</h2>
            <p className="text-gray-600">Clear distinction between different capital requirements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Capital Contribution */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold">Capital Contribution</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(14000000)}</div>
              <p className="text-xs text-gray-700 mb-3">
                <strong>One-time injection</strong> of paid-in capital required to establish the company.
              </p>
              <ul className="text-xs space-y-1 text-gray-600">
                <li className="flex items-start gap-1">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Fully paid in cash</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Gradual: 25% → 50% → 100%</span>
                </li>
              </ul>
            </div>

            {/* Idle Capital */}
            <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <PiggyBank className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold">Idle Capital</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">{formatCurrency(14000000)}</div>
              <p className="text-xs text-gray-700 mb-3">
                <strong>Minimum net equity</strong> that must be maintained at all times.
              </p>
              <ul className="text-xs space-y-1 text-gray-600">
                <li className="flex items-start gap-1">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>Cannot be withdrawn</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span>Verified daily by BCB</span>
                </li>
              </ul>
            </div>

            {/* Available Capital (PRE) */}
            <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold">Available Capital</h3>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">Variable</div>
              <p className="text-xs text-gray-700 mb-3">
                <strong>Daily PRE</strong> based on custody. Additional to {formatCurrency(14000000)}.
              </p>
              <ul className="text-xs space-y-1 text-gray-600">
                <li className="flex items-start gap-1">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>2% BRL / 5% USD / 8% Crypto</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Reported daily before 6 AM</span>
                </li>
              </ul>
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="example" className="bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span className="font-semibold">Example Scenario</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm text-gray-700 mb-3">
                  If Coins.xyz has {formatCurrency(5000000)} in BTC, {formatCurrency(3000000)} in USDC, and {formatCurrency(2000000)} in BRZ under custody:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span>Minimum Capital (Idle):</span>
                    <span className="font-semibold">{formatCurrency(14000000)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span>Daily PRE (BTC 8%):</span>
                    <span className="font-semibold">+ {formatCurrencyDetailed(5000000 * 0.08)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span>Daily PRE (USDC 5%):</span>
                    <span className="font-semibold">+ {formatCurrencyDetailed(3000000 * 0.05)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span>Daily PRE (BRZ 2%):</span>
                    <span className="font-semibold">+ {formatCurrencyDetailed(2000000 * 0.02)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-100 rounded border-2 border-green-300">
                    <span className="font-bold">Total Required:</span>
                    <span className="font-bold text-lg">{formatCurrencyDetailed(14000000 + 400000 + 150000 + 40000)}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Capital Injection Timeline</h2>
            <p className="text-gray-600">Gradual implementation schedule</p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-4 text-center text-sm">Capital Requirement by Date</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" style={{ fontSize: '12px' }} />
                    <YAxis 
                      tickFormatter={(value) => formatCurrency(value)}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelStyle={{ color: '#000' }}
                    />
                    <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                      {timelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="jul2026" className="bg-white border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">1</div>
                    <span className="font-semibold">July 2026 - 25% Required</span>
                  </div>
                  <span className="text-blue-600 font-bold">{formatCurrency(3500000)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pl-9 text-sm text-gray-600">
                  <p className="mb-2">Initial compliance milestone - institutions must prove 25% of minimum capital</p>
                  <div className="text-xs bg-blue-50 p-2 rounded">
                    <strong>Action:</strong> Inject {formatCurrency(3500000)} in paid-in capital
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jan2027" className="bg-white border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">2</div>
                    <span className="font-semibold">January 2027 - 50% Required</span>
                  </div>
                  <span className="text-blue-600 font-bold">{formatCurrency(7000000)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pl-9 text-sm text-gray-600">
                  <p className="mb-2">Mid-point milestone - half of the total minimum capital must be in place</p>
                  <div className="text-xs bg-blue-50 p-2 rounded">
                    <strong>Action:</strong> Inject additional {formatCurrency(3500000)} (total: {formatCurrency(7000000)})
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jan2028" className="bg-white border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">3</div>
                    <span className="font-semibold">January 2028 - 100% Required</span>
                  </div>
                  <span className="text-green-600 font-bold">{formatCurrency(14000000)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pl-9 text-sm text-gray-600">
                  <p className="mb-2">Full compliance deadline - complete minimum capital must be maintained</p>
                  <div className="text-xs bg-green-50 p-2 rounded">
                    <strong>Action:</strong> Inject final {formatCurrency(7000000)} (total: {formatCurrency(14000000)})
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* PRE Calculator Section */}
      <section id="calculator" className="py-12 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">PRE Calculator</h2>
            <p className="text-gray-600">Calculate your daily Required Reference Equity</p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    BTC & Other Crypto (8%)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      {currency === 'BRL' ? 'R$' : '$'}
                    </span>
                    <input
                      type="number"
                      value={btcAmount}
                      onChange={(e) => setBtcAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    USD Stablecoins (5%)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      {currency === 'BRL' ? 'R$' : '$'}
                    </span>
                    <input
                      type="number"
                      value={usdcAmount}
                      onChange={(e) => setUsdcAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    BRL Stablecoins (2%)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      {currency === 'BRL' ? 'R$' : '$'}
                    </span>
                    <input
                      type="number"
                      value={brzAmount}
                      onChange={(e) => setBrzAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
                <h4 className="font-semibold mb-3 text-sm">PRE Breakdown</h4>
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span>BTC & Other Crypto (8%):</span>
                    <span className="font-semibold">{formatCurrencyDetailed(pre.btc)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>USD Stablecoins (5%):</span>
                    <span className="font-semibold">{formatCurrencyDetailed(pre.usdc)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BRL Stablecoins (2%):</span>
                    <span className="font-semibold">{formatCurrencyDetailed(pre.brz)}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-blue-300 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Daily PRE:</span>
                    <span className="font-bold text-xl text-blue-600">
                      {formatCurrencyDetailed(pre.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-100 rounded-lg border-2 border-purple-300">
                    <span className="font-bold text-sm">Total Capital (Min + PRE):</span>
                    <span className="font-bold text-lg text-purple-600">
                      {formatCurrencyDetailed(14000000 + pre.total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded text-xs text-gray-700">
                <strong>Important:</strong> PRE must be covered by your equity in addition to the {formatCurrency(14000000)} minimum. Reported daily to Sisbacen before 6:00 AM.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Regulatory Framework Section */}
      <section id="framework" className="py-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Regulatory Framework</h2>
            <p className="text-gray-600">Published resolutions and ongoing public consultations</p>
          </div>

          {/* Published Resolutions */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Published Resolutions
            </h3>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="res-517-14" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600">Nov 3, 2025</Badge>
                      <span className="font-semibold">Joint Resolution No. 14/2025 & BCB Resolution No. 517/2025</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Capital requirements for Payment Institutions (IPs)</p>
                    <p>Establishes minimum capital requirements ranging from R$ 9.2M to R$ 32.8M for payment institutions, with gradual implementation through 2028.</p>
                    <p className="text-xs text-gray-500">Impact: ~500 IPs affected, estimated 28% will need recapitalization or M&A</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="res-519" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600">Nov 10, 2025</Badge>
                      <span className="font-semibold">BCB Resolution No. 519/2025</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Authorization processes for VASPs and other financial intermediaries</p>
                    <p>Establishes the authorization processes for operating foreign exchange brokers, securities brokers, securities distributors, and virtual asset service providers.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="res-520" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600">Nov 10, 2025</Badge>
                      <span className="font-semibold">BCB Resolution No. 520/2025</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Incorporation and operation of Virtual Asset Service Providers (VASPs)</p>
                    <p>Regulates the incorporation and operation of VASPs and the provision of virtual asset services by other institutions already authorized by the Central Bank.</p>
                    <p className="text-xs text-gray-500">Effective: February 2, 2026 | Reporting obligations: May 4, 2026</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="res-521" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600">Nov 10, 2025</Badge>
                      <span className="font-semibold">BCB Resolution No. 521/2025</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Virtual assets in foreign exchange market framework</p>
                    <p>Includes virtual asset service provider activities within the foreign exchange market framework and defines rules for Brazilian capital abroad and foreign capital in Brazil.</p>
                    <p className="text-xs text-gray-500">International payments/transfers with VAs, self-custody transfers, and fiat-referenced swaps treated as FX operations</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Ongoing Public Consultations */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Ongoing Public Consultations
            </h3>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="cp-109" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-600">Closed</Badge>
                      <span className="font-semibold">CP 109/2024</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> VASP operational framework and authorization requirements</p>
                    <p className="text-xs text-gray-500">Resulted in Resolutions 519 & 520 published Nov 10, 2025</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cp-110" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-600">Closed</Badge>
                      <span className="font-semibold">CP 110/2024</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Authorization of VASPs by Payment Institutions (IPs) - regulatory bridge framework</p>
                    <p className="text-xs text-gray-500">Resulted in regulatory bridge framework in Resolution 520</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cp-111" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-600">Closed</Badge>
                      <span className="font-semibold">CP 111/2024</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Virtual assets in foreign exchange operations - cross-border transaction rules</p>
                    <p className="text-xs text-gray-500">Resulted in Resolution 521 published Nov 10, 2025</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cp-126" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-600">Deadline: Dec 31, 2025</Badge>
                      <span className="font-semibold">CP 126/2025</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Prudential classification of virtual assets and tokens - risk weighting methodology</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cp-119" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-600">Deadline: May 31, 2026</Badge>
                      <span className="font-semibold">CP 119/2025</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Sustainability accounting standards for financial institutions including VASPs</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cp-117" className="bg-white border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-600">Deadline: May 31, 2026</Badge>
                      <span className="font-semibold">CP 117/2025</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Topic:</strong> Naming and denomination rules for financial institutions - brand compliance requirements</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <img src="/logo-white.png" alt="Coins.xyz" className="h-6 mb-3" />
              <p className="text-gray-400 text-sm">
                Regulatory capital analysis for Virtual Asset Service Providers in Brazil.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">References</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>Joint Resolution No. 14/2025</li>
                <li>BCB Resolution No. 517/2025</li>
                <li>BCB Resolution No. 519/2025</li>
                <li>BCB Resolution No. 520/2025</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Contact</h4>
              <p className="text-sm text-gray-400">
                For regulatory compliance and capital requirements, consult with specialized legal and financial advisors.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-400 space-y-2">
            <p>
              {lastUpdated ? `Last updated: ${lastUpdated}` : 'November 11, 2025'} • 
              Live exchange rate: 1 USD = {exchangeRate.toFixed(2)} BRL
            </p>
            <p>© {new Date().getFullYear()} Coins.xyz. All rights reserved. This analysis is for informational purposes only and does not constitute legal or financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
