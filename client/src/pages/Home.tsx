import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Calendar, Info, DollarSign, Wallet, PiggyBank, Coins } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const BRL_TO_USD = 0.20; // Approximate exchange rate

export default function Home() {
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Coins.xyz Logo */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/logo-black.png" 
                alt="Coins.xyz" 
                className="h-8"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrency('BRL')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    currency === 'BRL' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  BRL (R$)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    currency === 'USD' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  USD ($)
                </button>
              </div>
              <Badge variant="outline" className="text-sm">
                BCB Resolutions 517 & 14/2025
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">
              Virtual Asset Brokerage<br/>Capital Requirements
            </h1>
            <p className="text-xl text-blue-50 mb-8">
              Comprehensive analysis of regulatory capital needed to operate as a VASP in Brazil
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">{formatCurrency(14000000)}</div>
                  <div className="text-sm text-blue-100">Minimum Capital</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">2-8%</div>
                  <div className="text-sm text-blue-100">Variable PRE Rate</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">2028</div>
                  <div className="text-sm text-blue-100">Full Compliance</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">
                <Info className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="capital-types">
                <Wallet className="w-4 h-4 mr-2" />
                Capital Types
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Calendar className="w-4 h-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="pre-calculator">
                <Calculator className="w-4 h-4 mr-2" />
                PRE Calculator
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Capital Structure Overview
                  </CardTitle>
                  <CardDescription>
                    Understanding the two-component capital requirement model
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
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
                  <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg border-2 border-blue-300">
                    <h3 className="font-semibold text-lg mb-2">Total Minimum Capital (CMin)</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{formatCurrency(14000000)}</div>
                    <p className="text-sm text-gray-700">
                      PCF ({formatCurrency(4000000)}) + PAO ({formatCurrency(10000000)}) = Required paid-in capital and minimum net equity
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Categories</CardTitle>
                  <CardDescription>
                    Required operational activities for Virtual Asset Brokerage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Badge className="mt-1">C2</Badge>
                      <div>
                        <h4 className="font-semibold mb-1">Intermediation</h4>
                        <p className="text-sm text-gray-600">
                          Purchase and sale of virtual assets on behalf of third parties, including exchange operations and market making.
                        </p>
                        <div className="mt-2 text-sm font-medium text-blue-600">
                          Reference Value: {formatCurrency(10000000)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Badge className="mt-1">C3</Badge>
                      <div>
                        <h4 className="font-semibold mb-1">Custody & Administration</h4>
                        <p className="text-sm text-gray-600">
                          Safekeeping of clients' virtual assets, including wallet management and professional asset administration.
                        </p>
                        <div className="mt-2 text-sm font-medium text-green-600">
                          Reference Value: {formatCurrency(6000000)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Capital Types Tab */}
            <TabsContent value="capital-types" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Capital Types</CardTitle>
                  <CardDescription>
                    Clear distinction between different capital requirements and their purposes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Capital Contribution */}
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-600 rounded-lg">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg">Capital Contribution</h3>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-3">{formatCurrency(14000000)}</div>
                      <p className="text-sm text-gray-700 mb-4">
                        <strong>One-time injection</strong> of paid-in capital required to establish the company. This is the initial investment shareholders must contribute.
                      </p>
                      <ul className="text-xs space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Must be fully paid in cash (moeda corrente)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Gradual implementation: 25% by Jul/2026, 50% by Jan/2027, 100% by Jan/2028</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Becomes part of company's equity</span>
                        </li>
                      </ul>
                    </div>

                    {/* Idle Capital */}
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-600 rounded-lg">
                          <PiggyBank className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg">Idle Capital</h3>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-3">{formatCurrency(14000000)}</div>
                      <p className="text-sm text-gray-700 mb-4">
                        <strong>Minimum net equity</strong> that must be maintained at all times. This capital cannot be distributed as dividends or withdrawn.
                      </p>
                      <ul className="text-xs space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span>Must remain in company accounts permanently</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span>Can be invested in permitted assets (e.g., government bonds)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span>Verified daily by BCB through Sisbacen</span>
                        </li>
                      </ul>
                    </div>

                    {/* Available Capital (PRE) */}
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-600 rounded-lg">
                          <Coins className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg">Available Capital</h3>
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-3">Variable</div>
                      <p className="text-sm text-gray-700 mb-4">
                        <strong>Daily PRE requirement</strong> calculated based on assets under custody. This is <strong>additional</strong> to the {formatCurrency(14000000)} minimum.
                      </p>
                      <ul className="text-xs space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>2% of BRL stablecoins in custody</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>5% of USD stablecoins in custody</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>8% of other crypto assets in custody</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>Reported daily to Sisbacen before 6:00 AM</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Example Scenario
                    </h4>
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
                        <span className="font-bold">Total Required Capital:</span>
                        <span className="font-bold text-lg">{formatCurrencyDetailed(14000000 + 400000 + 150000 + 40000)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Capital Injection Timeline</CardTitle>
                  <CardDescription>
                    Gradual implementation schedule for minimum capital requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Interactive Chart */}
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-4 text-center">Capital Requirement by Date</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis 
                          tickFormatter={(value) => formatCurrency(value)}
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

                  {/* Timeline Details */}
                  <div className="space-y-6">
                    <div className="relative pl-8 pb-8 border-l-2 border-blue-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        1
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">July 2026</h4>
                          <Badge>25% Required</Badge>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(3500000)}</div>
                        <p className="text-sm text-gray-600 mb-3">
                          Initial compliance milestone - institutions must prove 25% of minimum capital
                        </p>
                        <div className="text-xs text-gray-500 bg-white p-2 rounded">
                          <strong>Action:</strong> Inject {formatCurrency(3500000)} in paid-in capital
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l-2 border-blue-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        2
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">January 2027</h4>
                          <Badge>50% Required</Badge>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(7000000)}</div>
                        <p className="text-sm text-gray-600 mb-3">
                          Mid-point milestone - half of the total minimum capital must be in place
                        </p>
                        <div className="text-xs text-gray-500 bg-white p-2 rounded">
                          <strong>Action:</strong> Inject additional {formatCurrency(3500000)} (total: {formatCurrency(7000000)})
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
                        3
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">January 2028</h4>
                          <Badge className="bg-green-600">100% Required</Badge>
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-1">{formatCurrency(14000000)}</div>
                        <p className="text-sm text-gray-600 mb-3">
                          Full compliance deadline - complete minimum capital must be maintained
                        </p>
                        <div className="text-xs text-gray-500 bg-white p-2 rounded">
                          <strong>Action:</strong> Inject final {formatCurrency(7000000)} (total: {formatCurrency(14000000)})
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PRE Calculator Tab */}
            <TabsContent value="pre-calculator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>PRE Calculator</CardTitle>
                  <CardDescription>
                    Calculate your daily Required Reference Equity based on assets under custody
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        BTC & Other Crypto (8%)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          {currency === 'BRL' ? 'R$' : '$'}
                        </span>
                        <input
                          type="number"
                          value={btcAmount}
                          onChange={(e) => setBtcAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        USD Stablecoins (5%)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          {currency === 'BRL' ? 'R$' : '$'}
                        </span>
                        <input
                          type="number"
                          value={usdcAmount}
                          onChange={(e) => setUsdcAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        BRL Stablecoins (2%)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          {currency === 'BRL' ? 'R$' : '$'}
                        </span>
                        <input
                          type="number"
                          value={brzAmount}
                          onChange={(e) => setBrzAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold mb-4">PRE Breakdown</h4>
                    <div className="space-y-2 text-sm mb-4">
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
                    <div className="pt-4 border-t border-blue-300">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">Total Daily PRE Required:</span>
                        <span className="font-bold text-2xl text-blue-600">
                          {formatCurrencyDetailed(pre.total)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300">
                        <span className="font-bold">Total Capital Required (Minimum + PRE):</span>
                        <span className="font-bold text-xl text-purple-600">
                          {formatCurrencyDetailed(14000000 + pre.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Important:</strong> The PRE amount ({formatCurrencyDetailed(pre.total)}) must be covered by your company's equity <strong>in addition to</strong> the {formatCurrency(14000000)} minimum capital requirement. 
                      PRE must be calculated and reported daily to Sisbacen before 6:00 AM.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Asset Type</th>
                          <th className="text-left p-3">PRE Rate</th>
                          <th className="text-left p-3">Risk Level</th>
                          <th className="text-left p-3">Example</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b">
                          <td className="p-3 font-medium">BRL Stablecoins</td>
                          <td className="p-3"><Badge variant="outline">2%</Badge></td>
                          <td className="p-3"><Badge className="bg-green-100 text-green-800">Low</Badge></td>
                          <td className="p-3 text-gray-600">BRZ, cREAL</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">USD Stablecoins</td>
                          <td className="p-3"><Badge variant="outline">5%</Badge></td>
                          <td className="p-3"><Badge className="bg-yellow-100 text-yellow-800">Medium</Badge></td>
                          <td className="p-3 text-gray-600">USDC, USDT</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Other Crypto Assets</td>
                          <td className="p-3"><Badge variant="outline">8%</Badge></td>
                          <td className="p-3"><Badge className="bg-red-100 text-red-800">High</Badge></td>
                          <td className="p-3 text-gray-600">BTC, ETH, Altcoins</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src="/logo-white.png" alt="Coins.xyz" className="h-8 mb-4" />
              <p className="text-gray-400 text-sm">
                Regulatory capital analysis for Virtual Asset Service Providers in Brazil.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">References</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Joint Resolution No. 14/2025</li>
                <li>BCB Resolution No. 517/2025</li>
                <li>BCB Resolution No. 519/2025</li>
                <li>BCB Resolution No. 520/2025</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
                For more information about regulatory compliance and capital requirements, 
                consult with legal and financial advisors specialized in Brazilian crypto regulations.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>Analysis prepared by Manus AI • November 11, 2025</p>
            <p className="text-xs mt-2">Exchange rate: 1 USD = {(1/BRL_TO_USD).toFixed(2)} BRL (approximate)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
