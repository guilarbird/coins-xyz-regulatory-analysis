import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, DollarSign, TrendingUp, CheckCircle2, AlertCircle, Banknote, Calendar, Clock, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
// Logo handled directly in JSX
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function IpAnalysis() {
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
  const [exchangeRate, setExchangeRate] = useState(5.00);

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
    { date: 'Jul 2026', amount: 2300000, percentage: 25, label: '25%' },
    { date: 'Jan 2027', amount: 4600000, percentage: 50, label: '50%' },
    { date: 'Jan 2028', amount: 9200000, percentage: 100, label: '100%' }
  ];

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
      <section className="gradient-iris-green text-white py-12">
        <div className="container max-w-7xl">
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-4">
            Payment Institution — Electronic Money
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 font-display">EMI Analysis</h1>
          <p className="text-xl text-white/90 mb-6">Coins.xyz Global Trading Ltda. — BCB Resolutions 517 & 14/2025</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/80 mb-1">Minimum Capital</p>
              <p className="text-2xl font-bold font-display">{formatCurrency(9200000)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/80 mb-1">Target Filing</p>
              <p className="text-2xl font-bold font-display">Q4 2026</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white/80 mb-1">Full Compliance</p>
              <p className="text-2xl font-bold font-display">Jan 2028</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl">
          <Tabs defaultValue="capital" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border">
              <TabsTrigger value="capital">Capital Structure</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="checklist">Compliance</TabsTrigger>
            </TabsList>

            {/* Capital Structure Tab */}
            <TabsContent value="capital" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Capital Structure Overview</CardTitle>
                  <CardDescription>Two-component capital requirement model for Payment Institutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-600 text-white rounded-lg p-2">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg font-display">Initial Cost Component (PCI)</h3>
                      </div>
                      <p className="text-3xl font-bold text-blue-600 mb-2 font-display">{formatCurrency(1000000)}</p>
                      <p className="text-sm text-gray-700">Baseline capital for initial structuring and setup.</p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-600 text-white rounded-lg p-2">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg font-display">Technology Component (PTI)</h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600 mb-2 font-display">{formatCurrency(8200000)}</p>
                      <p className="text-sm text-gray-700">Technology-intensive operations and infrastructure requirements.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-2 font-display">Total Minimum Capital (CMin)</h3>
                    <p className="text-4xl font-bold text-purple-600 mb-2 font-display">{formatCurrency(9200000)}</p>
                    <p className="text-sm text-gray-700">PCI (R$1,000,000) + PTI (R$8,200,000) = Required paid-in capital and minimum net equity</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Understanding Capital Types</CardTitle>
                  <CardDescription>Clear distinction between different capital requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-600 text-white rounded-full p-1.5">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display">Capital Contribution</h4>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mb-2 font-display">{formatCurrency(9200000)}</p>
                      <p className="text-sm text-gray-700 mb-3">One-time injection of paid-in capital required to establish the EMI.</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Fully paid in cash</li>
                        <li>• Gradual: 25% → 50% → 100%</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-purple-600 text-white rounded-full p-1.5">
                          <Banknote className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold font-display">Idle Capital</h4>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 mb-2 font-display">{formatCurrency(9200000)}</p>
                      <p className="text-sm text-gray-700 mb-3">Minimum net equity that must be maintained at all times.</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Cannot be withdrawn</li>
                        <li>• Verified daily by BCB</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Unlike VASPs, Payment Institutions do not have variable PRE requirements based on custody. The capital requirement is fixed at R$ 9.2M.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Target className="w-5 h-5" />
                    IP Authorization Roadmap
                  </CardTitle>
                  <CardDescription>
                    Detailed schedule for Coins.xyz Global Trading authorization as Payment Institution (EMI + Payment Account + BaaS + Indirect PIX)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="font-bold text-red-900 font-display">Critical Deadline: April 30, 2026</p>
                        <p className="text-sm text-red-700">BACEN Protocol Submission via SISORF</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Phase 0 */}
                    <div className="border-2 border-yellow-200 rounded-xl overflow-hidden">
                      <div className="bg-yellow-100 px-4 py-3 border-b border-yellow-200">
                        <h3 className="font-bold text-lg font-display">Phase 0: Immediate Actions</h3>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start gap-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold font-display">S1: CNPJ Joffre Asia via CDNR</h4>
                              <Badge className="bg-yellow-600 text-white">IN PROGRESS</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">CDNR registration + CNPJ generation for Joffre Ortigas Asia Holdings</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div><span className="font-semibold">Timeline:</span> Nov 13, 2025 (1 day)</div>
                              <div><span className="font-semibold">Responsible:</span> Accounting</div>
                              <div><span className="font-semibold">Regulatory:</span> Resolution BCB 278/2022</div>
                              <div><span className="font-semibold text-red-600">Status:</span> BLOCKING</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phase 1 */}
                    <div className="border-2 border-blue-200 rounded-xl overflow-hidden">
                      <div className="bg-blue-100 px-4 py-3 border-b border-blue-200">
                        <h3 className="font-bold text-lg font-display">Phase 1: Corporate Restructuring & Capitalization</h3>
                        <p className="text-sm text-blue-700">Nov 18 - Dec 20, 2025</p>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">S2: Transfer of Shares + Corporate Purpose</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">3rd Contract Amendment (14 days)</p>
                          <p className="text-xs text-gray-500">Legal/MCZ • CC 1.057; BCB 80/21</p>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">S3: Calculation of Minimum Capital (CMR)</h4>
                            <Badge className="bg-orange-600 text-white">CRITICAL</Badge>
                          </div>
                          <p className="text-xs text-gray-700 mb-1">MRC calculation per new methodology (EME + BaaS + PIX) — 5 days</p>
                          <p className="text-xs text-gray-500">Financial • Resolution BCB 517/25</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">S4: Increase in Share Capital</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Value TBD (7 days)</p>
                          <p className="text-xs text-gray-500">Legal/MCZ • CC 1.081-1.082</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">S5: Integration Increase</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Capital stock contribution (4 days)</p>
                          <p className="text-xs text-gray-500">Financial • Res. Conj. 14/25</p>
                        </div>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="border-2 border-green-200 rounded-xl overflow-hidden">
                      <div className="bg-green-100 px-4 py-3 border-b border-green-200">
                        <h3 className="font-bold text-lg font-display">Phase 2: Governance & Documentation</h3>
                        <p className="text-sm text-green-700">Jan 6 - Feb 20, 2026</p>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">S6: Election of Administrators</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">AGE + documentation (7 days)</p>
                          <p className="text-xs text-gray-500">Legal • IN 103/21 art. 6º XI</p>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">S7: Audit Selection</h4>
                            <Badge className="bg-red-600 text-white">BLOCKER</Badge>
                          </div>
                          <p className="text-xs text-gray-700 mb-1">RFP + assessment (21 days)</p>
                          <p className="text-xs text-gray-500">Financial • IN 103/21 art. 6º XVII</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">S8: Hiring Audit</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Contract signing (7 days)</p>
                          <p className="text-xs text-gray-500">Legal/Financial • NBC TA 210</p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">P1: Policy Review</h4>
                            <Badge className="bg-green-600 text-white">READY</Badge>
                          </div>
                          <p className="text-xs text-gray-700 mb-1">Final validation (14 days)</p>
                          <p className="text-xs text-gray-500">Compliance • Resolution BCB 80/21</p>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">P2: Business Plan</h4>
                            <Badge className="bg-red-600 text-white">BLOCKER</Badge>
                          </div>
                          <p className="text-xs text-gray-700 mb-1">Complete elaboration (45 days)</p>
                          <p className="text-xs text-gray-500">Board of Directors • IN 103/21 art. 6º VI</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">T1: Technical Validation Coins.ph</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Documentation structure (14 days)</p>
                          <p className="text-xs text-gray-500">CTO • Already operating</p>
                        </div>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="border-2 border-purple-200 rounded-xl overflow-hidden">
                      <div className="bg-purple-100 px-4 py-3 border-b border-purple-200">
                        <h3 className="font-bold text-lg font-display">Phase 3: Final Submission</h3>
                        <p className="text-sm text-purple-700">Apr 14 - Apr 30, 2026</p>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">F1: SISORF Consolidation</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Forms + attachments (10 days)</p>
                          <p className="text-xs text-gray-500">Legal • IN BCB 103/21</p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">F2: Final Validation</h4>
                            <Badge variant="outline">PENDING</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Compliance checklist (3 days)</p>
                          <p className="text-xs text-gray-500">Compliance</p>
                        </div>

                        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm font-display">F3: BACEN PROTOCOL 🎯</h4>
                            <Badge className="bg-purple-600 text-white">DEADLINE</Badge>
                          </div>
                          <p className="text-xs text-gray-700 mb-1">Upload SISORF (1 day) — April 30, 2026</p>
                          <p className="text-xs text-gray-500">Legal • IN BCB 103/21</p>
                        </div>
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
                  <CardTitle className="font-display">EMI Authorization Checklist</CardTitle>
                  <CardDescription>Key requirements for BCB authorization under Resolutions 517 & 14/2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="capital">
                      <AccordionTrigger className="font-semibold">Capital Requirements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Minimum paid-in capital: R$ 9,200,000 (gradual until Jan 2028)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Daily capital verification by BCB</span>
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
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>CNPJ registration for Joffre Asia (expected Wednesday)</span>
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
                            <span>Electronic money issuance procedures</span>
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
                            <span>Market analysis for payment services</span>
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
                            <span>Payment processing infrastructure</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Transaction monitoring and fraud detection systems</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Disaster recovery and business continuity plans</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>Integration with Brazilian payment systems (PIX, TED, DOC)</span>
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
