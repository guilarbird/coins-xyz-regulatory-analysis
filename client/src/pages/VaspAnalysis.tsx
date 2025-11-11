import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Scale, DollarSign, TrendingUp, Calculator, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
// Logo handled directly in JSX
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function VaspAnalysis() {
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </a>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <img src="/CoinsXYZ_HorizontalLogo_BlackWordmark.png" alt="Coins.xyz" className="h-7" />
            </div>
            
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setCurrency('BRL')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  currency === 'BRL' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                BRL (R$)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
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
              <p className="text-2xl font-bold font-display">{formatCurrency(14000000)}</p>
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
            <TabsList className="grid w-full grid-cols-4 bg-white border">
              <TabsTrigger value="capital">Capital Structure</TabsTrigger>
              <TabsTrigger value="pre">PRE Calculator</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="checklist">Compliance</TabsTrigger>
            </TabsList>

            {/* Capital Structure Tab */}
            <TabsContent value="capital" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Capital Structure Overview</CardTitle>
                  <CardDescription>Two-component capital requirement model for VASPs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-600 text-white rounded-lg p-2">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg font-display">Fixed Cost Component (PCF)</h3>
                      </div>
                      <p className="text-3xl font-bold text-blue-600 mb-2 font-display">{formatCurrency(4000000)}</p>
                      <p className="text-sm text-gray-700">Baseline capital for structuring and maintaining operations, regardless of transaction volume.</p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-600 text-white rounded-lg p-2">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg font-display">Operational Activities (PAO)</h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600 mb-2 font-display">{formatCurrency(10000000)}</p>
                      <p className="text-sm text-gray-700">Variable component based on intermediation and custody activities performed.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-2 font-display">Total Minimum Capital (CMin)</h3>
                    <p className="text-4xl font-bold text-purple-600 mb-2 font-display">{formatCurrency(14000000)}</p>
                    <p className="text-sm text-gray-700">PCF (R$4,000,000) + PAO (R$10,000,000) = Required paid-in capital and minimum net equity</p>
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
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-600 text-white rounded-full p-1.5">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display">Capital Contribution</h4>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mb-2 font-display">{formatCurrency(14000000)}</p>
                      <p className="text-sm text-gray-700 mb-3">One-time injection of paid-in capital required to establish the company.</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Fully paid in cash</li>
                        <li>• Gradual: 25% → 50% → 100%</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-purple-600 text-white rounded-full p-1.5">
                          <Scale className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display">Idle Capital</h4>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 mb-2 font-display">{formatCurrency(14000000)}</p>
                      <p className="text-sm text-gray-700 mb-3">Minimum net equity that must be maintained at all times.</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Cannot be withdrawn</li>
                        <li>• Verified daily by BCB</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-600 text-white rounded-full p-1.5">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display">Available Capital</h4>
                      </div>
                      <p className="text-2xl font-bold text-green-600 mb-2 font-display">Variable</p>
                      <p className="text-sm text-gray-700 mb-3">Daily PRE based on custody. Additional to R$14,000,000.</p>
                      <ul className="text-xs text-gray-600 space-y-1">
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
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Other Crypto (R$)</label>
                        <input
                          type="number"
                          value={custodyCrypto}
                          onChange={(e) => setCustodyCrypto(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">8% PRE rate</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 font-display">PRE Calculation Breakdown</h4>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-700">BRL Stablecoins:</span>
                          <span className="font-semibold">{formatCurrency(custodyBRL)} × 2% = {formatCurrency(preBRL)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">USD Stablecoins:</span>
                          <span className="font-semibold">{formatCurrency(custodyUSD)} × 5% = {formatCurrency(preUSD)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Other Crypto:</span>
                          <span className="font-semibold">{formatCurrency(custodyCrypto)} × 8% = {formatCurrency(preCrypto)}</span>
                        </div>
                      </div>
                      <div className="border-t-2 border-blue-300 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold font-display">Total Daily PRE:</span>
                          <span className="text-3xl font-bold text-blue-600 font-display">{formatCurrency(totalPRE)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Important:</strong> This PRE must be calculated and reported daily before 6 AM. It is <strong>additional</strong> to the minimum capital requirement of R$14,000,000.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Capital Injection Timeline</CardTitle>
                  <CardDescription>Gradual implementation schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={capitalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="amount" fill="#3b82f6" name="Capital Required">
                          {capitalData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : '#3b82f6'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    {capitalData.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-lg p-4">
                        <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-600' : 'bg-green-600'
                        }`}>
                          {milestone.percentage}%
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 font-display">{milestone.date}</p>
                          <p className="text-2xl font-bold text-gray-900 font-display">{formatCurrency(milestone.amount)}</p>
                        </div>
                        <Badge variant="outline" className={
                          index === 0 ? 'border-blue-500 text-blue-700' :
                          index === 1 ? 'border-blue-600 text-blue-800' :
                          'border-green-600 text-green-800'
                        }>
                          {milestone.label} Required
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Checklist Tab */}
            <TabsContent value="checklist" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">VASP Authorization Checklist</CardTitle>
                  <CardDescription>Key requirements for BCB authorization under Resolutions 519, 520 & 521</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="capital">
                      <AccordionTrigger className="font-semibold">Capital Requirements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Minimum paid-in capital: R$ 14,000,000 (gradual until Jan 2028)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Daily PRE calculation and reporting (before 6 AM)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                            <span>External audit verification of capital (blocker)</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="governance">
                      <AccordionTrigger className="font-semibold">Corporate Governance</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <span>Bylaws amendment (Joffre Asia as controller) - in progress</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Board of directors with qualified members</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Compliance officer designation</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="policies">
                      <AccordionTrigger className="font-semibold">Policies & Procedures</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>AML/CFT policy (PLD/FTP)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>KYC procedures</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Cybersecurity and data protection policy</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Custody and segregation procedures</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="business">
                      <AccordionTrigger className="font-semibold">Business Plan</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                            <span><strong>Critical blocker:</strong> Comprehensive business plan aligned with BCB requirements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Market analysis and competitive positioning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Financial projections (3-5 years)</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tech">
                      <AccordionTrigger className="font-semibold">Technology & Infrastructure</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Secure custody infrastructure (cold/hot wallets)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Transaction monitoring systems</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Disaster recovery and business continuity plans</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
