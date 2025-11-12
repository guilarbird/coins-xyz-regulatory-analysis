import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Calendar, TrendingUp, FileText, Scale, DollarSign, CheckCircle2, Clock, AlertCircle, Sparkles, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { APP_LOGO } from "@/const";
import RoadmapTimeline from "@/components/RoadmapTimeline";

export default function Home() {
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
  const [exchangeRate, setExchangeRate] = useState(5.00);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        if (data.rates && data.rates.BRL) {
          setExchangeRate(data.rates.BRL);
          setLastUpdate(new Date().toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }));
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
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value / exchangeRate);
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Thread A — IP (Payment Institution) 〔green〕
  const threadIP: Array<{
    date: string;
    title: string;
    status: "in-progress" | "upcoming" | "planned";
    description: string;
    regulatoryCutoff: string;
    capital?: string;
    badge: string;
    whyThisMilestone: string;
  }> = [
    {
      date: "Dec 01, 2025",
      title: "IP Authorization Preparation",
      status: "in-progress",
      description: "Opens BCB docket and aligns governance so the IP dossier can be assembled without rework.",
      regulatoryCutoff: "start dossier before Jan 2026",
      badge: "IP",
      whyThisMilestone: "Opens BCB docket and aligns governance so the IP dossier can be assembled without rework."
    },
    {
      date: "Jan 05, 2026",
      title: "Business Plan Completion (IP)",
      status: "in-progress",
      description: "Mandatory artifact; defines products, risk, PRE assumptions, and controls for auditor/BCB review.",
      regulatoryCutoff: "BP attached to pre-audit pack",
      badge: "IP",
      whyThisMilestone: "Mandatory artifact; defines products, risk, PRE assumptions, and controls for auditor/BCB review."
    },
    {
      date: "Feb 28, 2026",
      title: "Partial Capital Injection (IP)",
      status: "upcoming",
      description: "Jan–Feb 2026 window. Meets fixed/cumulative capital for pre-audit checks and financial capacity before filing.",
      regulatoryCutoff: "capital on books for pre-audit",
      capital: "R$ 2.0M",
      badge: "IP",
      whyThisMilestone: "Meets fixed/cumulative capital for pre-audit checks and financial capacity before filing."
    },
    {
      date: "Mar 15, 2026",
      title: "IP Filing (Target)",
      status: "upcoming",
      description: "Starts BCB review early on a clean dossier while VASP work runs in parallel.",
      regulatoryCutoff: "IP authorization filing deadline",
      badge: "IP",
      whyThisMilestone: "Starts BCB review early on a clean dossier while VASP work runs in parallel."
    },
    {
      date: "May 01, 2026",
      title: "Pre-Audit Capital Injection (IP)",
      status: "upcoming",
      description: "Tops up to auditor-required cumulative amount at audit date. Cumulative: R$ 5.0M",
      regulatoryCutoff: "capital on books for audit start in Jun",
      capital: "R$ 3.0M",
      badge: "IP",
      whyThisMilestone: "Tops up to auditor-required cumulative amount at audit date."
    },
    {
      date: "Nov 01, 2026",
      title: "Authorization Filing Injection (Both)",
      status: "planned",
      description: "Aligns paid-in capital to final PRE/exposure at filing, avoiding conditional approvals. IP: R$ 2.5M, Cumulative: R$ 7.5M",
      regulatoryCutoff: "full capital evidenced at filing",
      capital: "R$ 2.5M",
      badge: "IP",
      whyThisMilestone: "Aligns paid-in capital to final PRE/exposure at filing, avoiding conditional approvals."
    },
    {
      date: "Jan 15, 2028",
      title: "Final Compliance Injection (Both)",
      status: "planned",
      description: "Post-authorization top-up to match initial operating scale and ensure year-one compliance. IP: R$ 1.7M, Cumulative: R$ 9.2M",
      regulatoryCutoff: "residual adjustments closed",
      capital: "R$ 1.7M",
      badge: "IP",
      whyThisMilestone: "Post-authorization top-up to match initial operating scale and ensure year-one compliance."
    }
  ];

  // Thread B — VASP 〔blue〕
  const threadVASP: Array<{
    date: string;
    title: string;
    status: "in-progress" | "upcoming" | "planned";
    description: string;
    regulatoryCutoff: string;
    capital?: string;
    badge: string;
    whyThisMilestone: string;
  }> = [
    {
      date: "Feb 28, 2026",
      title: "Partial Capital Injection (VASP)",
      status: "upcoming",
      description: "Jan–Feb 2026 window. Brings VASP to baseline so auditors can validate controls and PRE.",
      regulatoryCutoff: "capital on books for pre-audit",
      capital: "R$ 3.0M",
      badge: "VASP",
      whyThisMilestone: "Brings VASP to baseline so auditors can validate controls and PRE."
    },
    {
      date: "May 01, 2026",
      title: "Pre-Audit Capital Injection (VASP)",
      status: "upcoming",
      description: "Ensures VASP cumulative capital matches the level to be attested. Cumulative: R$ 8.0M",
      regulatoryCutoff: "capital on books for audit start in Jun",
      capital: "R$ 5.0M",
      badge: "VASP",
      whyThisMilestone: "Ensures VASP cumulative capital matches the level to be attested."
    },
    {
      date: "Jun 01, 2026",
      title: "External Audit Window (VASP)",
      status: "upcoming",
      description: "Jun 01 – Sep 30, 2026. Independent audit evidence; required in filing package.",
      regulatoryCutoff: "audit completed before filing",
      badge: "VASP",
      whyThisMilestone: "Independent audit evidence; required in filing package."
    },
    {
      date: "Nov 01, 2026",
      title: "VASP Authorization Deadline",
      status: "planned",
      description: "Regulatory deadline for VASP authorization filing with BCB. VASP: R$ 3.5M, Cumulative: R$ 11.5M",
      regulatoryCutoff: "VASP authorization deadline",
      capital: "R$ 3.5M",
      badge: "VASP",
      whyThisMilestone: "Aligns paid-in capital to final PRE/exposure at filing, avoiding conditional approvals."
    },
    {
      date: "Jan 15, 2028",
      title: "Final Compliance Injection (Both)",
      status: "planned",
      description: "Post-authorization top-up to match initial operating scale and ensure year-one compliance. VASP: R$ 2.5M, Cumulative: R$ 14.0M",
      regulatoryCutoff: "residual adjustments closed",
      capital: "R$ 2.5M",
      badge: "VASP",
      whyThisMilestone: "Post-authorization top-up to match initial operating scale and ensure year-one compliance."
    }
  ];

  const milestones = [...threadIP, ...threadVASP].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Currency Toggle */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/CoinsXYZ_HorizontalLogo_BlackWordmark.png" alt="Coins.xyz" className="h-8" />
              <div className="hidden sm:block">
                <p className="text-xs text-gray-500">Executive Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
        </div>
      </header>

      {/* Executive Dashboard - Hero Section with Reddish Gradient */}
      <section className="gradient-reddish text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/vector-x.png" alt="" className="absolute top-10 right-10 w-32 h-32 rotate-12" />
          <img src="/vector-x.png" alt="" className="absolute bottom-10 left-10 w-24 h-24 -rotate-12" />
        </div>
        
        <div className="container max-w-7xl relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                Brazil Regulatory Compliance
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display">
              Executive Dashboard
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-display">
              Joffre Ortigas Asia Holdings → Coins.xyz Digital Markets & Global Trading
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Total Capital Required</p>
                <p className="text-2xl md:text-3xl font-bold font-display">{formatCurrency(23200000)}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Dual Licenses</p>
                <p className="text-2xl md:text-3xl font-bold font-display">VASP + IP</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Target IP Filing</p>
                <p className="text-xl md:text-2xl font-bold font-display">15 Mar 2026</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">VASP Authorization Deadline</p>
                <p className="text-xl md:text-2xl font-bold font-display">01 Nov 2026</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Full Compliance</p>
                <p className="text-2xl md:text-3xl font-bold font-display">Jan 2028</p>
              </div>
            </div>
        </div>
      </section>

      {/* Detailed License Analysis - Elevated Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 font-display">Detailed License Analysis</h2>
            <p className="text-gray-600">Explore specific requirements and compliance details for each license</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/vasp">
              <a>
                <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer h-full bg-gradient-to-br from-blue-50 to-white">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between font-display">
                      <span className="flex items-center gap-2">
                        <Scale className="w-5 h-5 text-blue-600" />
                        VASP Analysis
                      </span>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </CardTitle>
                    <CardDescription>Coins.xyz Digital Markets Ltda.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">Virtual Asset Service Provider authorization under BCB Resolutions 519, 520, 521.</p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/vasp#capital"><a><Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">Capital Requirements</Badge></a></Link>
                      <Link href="/vasp#pre"><a><Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">PRE Calculator</Badge></a></Link>
                      <Link href="/vasp#compliance"><a><Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">Compliance Checklist</Badge></a></Link>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
            
            <Link href="/ip">
              <a>
                <Card className="border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all cursor-pointer h-full bg-gradient-to-br from-green-50 to-white">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between font-display">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-green-600" />
                        Payment Institution (IP)
                      </span>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </CardTitle>
                    <CardDescription>Coins.xyz Global Trading Ltda.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">Payment Institution authorization under BCB Resolution 517 & Joint Resolution 14/2025.</p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/ip#capital"><a><Badge className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">Capital Structure</Badge></a></Link>
                      <Link href="/ip#gradual"><a><Badge className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">Gradual Implementation</Badge></a></Link>
                      <Link href="/ip#requirements"><a><Badge className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer">IP Requirements</Badge></a></Link>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/regulations">
              <a>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="w-4 h-4" />
                  View Complete Regulatory Framework
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Milestones Timeline - Section 2 */}
      <RoadmapTimeline milestones={milestones} />

      {/* Corporate Restructure - Short */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold font-display">Corporate Restructure</h2>
          </div>
          
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <div className="flex gap-6 items-center">
                {/* Compact diagram thumbnail */}
                <div className="flex-shrink-0 bg-white rounded-lg p-4 border-2 border-gray-200 w-48">
                  <div className="flex flex-col items-center gap-2">
                    <div className="gradient-reddish text-white px-3 py-2 rounded-lg text-xs font-bold text-center">
                      JO Asia Holdings
                    </div>
                    <div className="w-0.5 h-6 bg-gray-300"></div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="bg-blue-100 border border-blue-300 rounded p-1 text-center">
                        <p className="text-[10px] font-semibold text-blue-900">VASP</p>
                      </div>
                      <div className="bg-green-100 border border-green-300 rounded p-1 text-center">
                        <p className="text-[10px] font-semibold text-green-900">IP</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Summary text */}
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold mb-2">Joffre Ortigas Asia Holdings as Controller</p>
                  <p className="text-sm text-gray-700 mb-2">JO Asia is being formalized as the controlling shareholder of both Coins.xyz Digital Markets (VASP) and Coins.xyz Global Trading (IP), replacing Joffre BR Holdings.</p>
                  <p className="text-xs text-gray-600">CNPJ registration in progress (Expected: Nov 13, 2025) • Bylaws amendment coordinated with MCZ Law Firm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Capital Injection Timeline - Compact */}
      <section className="py-12 bg-white">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold font-display">Capital Injection Timeline</h2>
              </div>
              <p className="text-sm text-gray-600">Phased schedule aligned to audit & filing windows</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold rounded-full bg-purple-600 text-white">Both</button>
              <button className="px-3 py-1.5 text-xs font-semibold rounded-full border border-blue-300 text-blue-600 hover:bg-blue-50">IP</button>
              <button className="px-3 py-1.5 text-xs font-semibold rounded-full border border-green-300 text-green-600 hover:bg-green-50">VASP</button>
            </div>
          </div>
          
          {/* Compact Timeline Visualization */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white" style={{maxHeight: '320px'}}>
            <CardContent className="p-6">
              {/* Compact horizontal timeline */}
              <div className="relative">
                {/* Timeline bar */}
                <div className="absolute top-12 left-0 right-0 h-1 bg-purple-200"></div>
                
                {/* Milestones */}
                <div className="grid grid-cols-5 gap-2 relative">
                  {/* Jan-Feb 2026 (Both) */}
                  <Link href="/ip#capital"><a className="flex flex-col items-center group cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-purple-600 mb-2 group-hover:scale-125 transition-transform z-10"></div>
                    <p className="text-xs font-semibold text-center mb-1">Jan–Feb 2026</p>
                    <p className="text-xs text-gray-600 text-center mb-1">Partial Injection</p>
                    <div className="flex flex-col gap-0.5">
                      <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5">IP: R$ 2.0M</Badge>
                      <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5">VASP: R$ 3.0M</Badge>
                    </div>
                  </a></Link>
                  
                  {/* May 2026 (Both) */}
                  <Link href="/vasp#capital"><a className="flex flex-col items-center group cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-purple-600 mb-2 group-hover:scale-125 transition-transform z-10"></div>
                    <p className="text-xs font-semibold text-center mb-1">01 May 2026</p>
                    <p className="text-xs text-gray-600 text-center mb-1">Pre-Audit</p>
                    <div className="flex flex-col gap-0.5">
                      <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5">IP: R$ 3.0M</Badge>
                      <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5">VASP: R$ 5.0M</Badge>
                    </div>
                  </a></Link>
                  
                  {/* Jun-Sep 2026 (VASP Audit) */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-400 mb-2"></div>
                    <p className="text-xs font-semibold text-center mb-1">Jun–Sep 2026</p>
                    <p className="text-xs text-gray-600 text-center mb-1">Audit Window</p>
                    <Badge className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0.5">VASP Only</Badge>
                  </div>
                  
                  {/* Nov 2026 (Both) */}
                  <Link href="/vasp#compliance"><a className="flex flex-col items-center group cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-purple-600 mb-2 group-hover:scale-125 transition-transform z-10"></div>
                    <p className="text-xs font-semibold text-center mb-1">Nov 2026</p>
                    <p className="text-xs text-gray-600 text-center mb-1">Authorization Filing</p>
                    <div className="flex flex-col gap-0.5">
                      <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5">IP: R$ 2.5M</Badge>
                      <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5">VASP: R$ 3.5M</Badge>
                    </div>
                  </a></Link>
                  
                  {/* Jan 2028 (Both) */}
                  <Link href="/ip#requirements"><a className="flex flex-col items-center group cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-purple-600 mb-2 group-hover:scale-125 transition-transform z-10"></div>
                    <p className="text-xs font-semibold text-center mb-1">Jan 2028</p>
                    <p className="text-xs text-gray-600 text-center mb-1">Final Compliance</p>
                    <div className="flex flex-col gap-0.5">
                      <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5">IP: R$ 1.7M</Badge>
                      <Badge className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5">VASP: R$ 2.5M</Badge>
                    </div>
                  </a></Link>
                </div>
              </div>
              
              {/* Summary footer */}
              <div className="mt-6 pt-4 border-t border-purple-200 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-600">Total Capital Required</p>
                  <p className="text-xl font-bold text-purple-600 font-display">{formatCurrency(23200000)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Timeline Span</p>
                  <p className="text-lg font-semibold text-gray-900 font-display">Q1 2026 → Q1 2028</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team & Milestones */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-7 h-7 text-purple-600" />
            <h2 className="text-3xl font-bold font-display">Team & Key Milestones</h2>
          </div>
          
          {/* Team Updates */}
          <Card className="w-full border-2 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="font-display">Team Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="bg-purple-600 text-white rounded-full p-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Daniel Hott — Outstanding Performance</p>
                    <p className="text-gray-700 text-sm mb-2">Delivering exceptional support on internal/external client onboarding, processing licensing requirements, and regulatory coordination. Team capacity reaching point where intern-level support may be beneficial.</p>
                    <Badge className="bg-purple-100 text-purple-700">Key Contributor</Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="bg-blue-600 text-white rounded-full p-2">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Nov 17, 2025: Bitso Controller Joining</p>
                    <p className="text-gray-700 text-sm mb-2">Financial controller from Bitso joining to strengthen compliance readiness and financial controls ahead of BCB authorization process.</p>
                    <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Structural & Legal Tasks */}
          <div className="w-full mb-12">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-display mb-2">Structural & Legal Tasks</h3>
              <p className="text-gray-600">Prerequisites for regulatory authorization and capital compliance</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Bylaws Amendment */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Bylaws Amendment
                  </CardTitle>
                  <CardDescription>Controller change to Joffre Ortigas Asia</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-red-100 text-red-700 border-red-300 border mb-4">In Progress</Badge>
                  <p className="text-sm text-gray-700 mb-3">Updates cap-table to Joffre Ortigas Asia Holdings; prerequisite for audit sign-off, RDE-IED and BCB filings.</p>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span>Remove Joffre BR from structure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span>Formalize JO Asia as controller</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span>Board approval & registration</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-xs text-gray-700"><span className="font-bold">Why this milestone:</span> Updates cap-table to Joffre Ortigas Asia; prerequisite for audit sign-off, RDE-IED and BCB filings.</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Controller/CNPJ Registration */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Controller/CNPJ Registration
                  </CardTitle>
                  <CardDescription>BCB registration for fit-and-proper checks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-300 border mb-4">Expected: 13 Nov 2025</Badge>
                  <p className="text-sm text-gray-700 mb-3">Enables fit-and-proper checks; hard dependency for IP/VASP submissions.</p>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>CNPJ registration with BCB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>Fit-and-proper documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>Controller formalization</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-xs text-gray-700"><span className="font-bold">Why this milestone:</span> Enables fit-and-proper checks; hard dependency for IP/VASP submissions.</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* RDE-IED Registration */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <Globe className="w-5 h-5 text-green-600" />
                    RDE-IED (FDI) Registration
                  </CardTitle>
                  <CardDescription>Foreign Direct Investment legalization</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-gray-100 text-gray-700 border-gray-300 border mb-4">Pending</Badge>
                  <p className="text-sm text-gray-700 mb-3">Legalizes foreign inflows so capital counts toward regulatory totals and can be audited.</p>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>Bylaws updated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>Capitalization docs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>Board minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>Proof of remittance</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-xs text-gray-700"><span className="font-bold">Why this milestone:</span> Legalizes foreign inflows so capital counts toward regulatory totals and can be audited.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Dual-Thread Timeline */}
          <div className="w-full">
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-display mb-2">Regulatory Timeline</h3>
              <p className="text-gray-600">Two parallel authorization threads with exact dates and regulatory cutoffs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Thread A — IP (Payment Institution) 〔green〕 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="text-lg font-bold font-display text-green-700">Thread A — IP (Payment Institution)</h4>
                    <p className="text-xs text-gray-600">Payment Institution Authorization</p>
                  </div>
                </div>

                <div className="relative space-y-4 pl-4">
                  {/* Vertical connector */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-green-200"></div>

                  {threadIP.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Dot connector */}
                      <div className={`absolute -left-[18px] top-4 w-2 h-2 rounded-full ${
                        item.status === 'in-progress' ? 'bg-green-600 animate-pulse' :
                        item.status === 'upcoming' ? 'bg-green-500' :
                        'bg-green-300'
                      }`}></div>

                      <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-sm font-semibold text-gray-700">{item.date}</p>
                          <Badge className={`${
                            item.status === 'in-progress' ? 'bg-green-100 text-green-700 border-green-300' :
                            item.status === 'upcoming' ? 'bg-green-50 text-green-600 border-green-200' :
                            'bg-gray-100 text-gray-600 border-gray-300'
                          } border`}>
                            {item.status === 'in-progress' ? 'In Progress' :
                             item.status === 'upcoming' ? 'Upcoming' : 'Planned'}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-bold text-gray-900">{item.title}</h5>
                            <Badge className="bg-green-100 text-green-700 text-xs">{item.badge}</Badge>
                          </div>
                          {item.capital && (
                            <p className="text-lg font-bold text-green-600 font-display mb-2">{item.capital}</p>
                          )}
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>

                        <div className="flex items-start gap-2 pt-3 border-t border-gray-200">
                          <Scale className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600"><span className="font-semibold">Regulatory cutoff:</span> {item.regulatoryCutoff}</p>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-700"><span className="font-bold">Why this milestone:</span> {item.whyThisMilestone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thread B — VASP 〔blue〕 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  <div>
                    <h4 className="text-lg font-bold font-display text-blue-700">Thread B — VASP</h4>
                    <p className="text-xs text-gray-600">Virtual Asset Service Provider Authorization</p>
                  </div>
                </div>

                <div className="relative space-y-4 pl-4">
                  {/* Vertical connector */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                  {threadVASP.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Dot connector */}
                      <div className={`absolute -left-[18px] top-4 w-2 h-2 rounded-full ${
                        item.status === 'in-progress' ? 'bg-blue-600 animate-pulse' :
                        item.status === 'upcoming' ? 'bg-blue-500' :
                        'bg-blue-300'
                      }`}></div>

                      <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-sm font-semibold text-gray-700">{item.date}</p>
                          <Badge className={`${
                            item.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                            item.status === 'upcoming' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            'bg-gray-100 text-gray-600 border-gray-300'
                          } border`}>
                            {item.status === 'in-progress' ? 'In Progress' :
                             item.status === 'upcoming' ? 'Upcoming' : 'Planned'}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-bold text-gray-900">{item.title}</h5>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">{item.badge}</Badge>
                          </div>
                          {item.capital && (
                            <p className="text-lg font-bold text-blue-600 font-display mb-2">{item.capital}</p>
                          )}
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>

                        <div className="flex items-start gap-2 pt-3 border-t border-gray-200">
                          <Scale className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600"><span className="font-semibold">Regulatory cutoff:</span> {item.regulatoryCutoff}</p>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-700"><span className="font-bold">Why this milestone:</span> {item.whyThisMilestone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Capital Map Table */}
            <div className="mt-12">
              <div className="mb-6">
                <h4 className="text-xl font-bold font-display mb-2">Capital Map Table</h4>
                <p className="text-sm text-gray-600">Auto-calculated breakdown per entity and combined totals</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-md">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="text-left p-3 text-xs font-bold text-gray-700">Entity</th>
                      <th className="text-left p-3 text-xs font-bold text-gray-700">Milestone</th>
                      <th className="text-left p-3 text-xs font-bold text-gray-700">Date/Window</th>
                      <th className="text-right p-3 text-xs font-bold text-gray-700">Amount (R$)</th>
                      <th className="text-right p-3 text-xs font-bold text-gray-700">Cumulative (Entity)</th>
                      <th className="text-center p-3 text-xs font-bold text-gray-700">Type</th>
                      <th className="text-center p-3 text-xs font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {/* IP Thread */}
                    <tr className="border-b border-gray-200 hover:bg-green-50">
                      <td className="p-3"><Badge className="bg-green-100 text-green-700 text-xs">IP</Badge></td>
                      <td className="p-3 text-gray-900">Partial Capital Injection</td>
                      <td className="p-3 text-gray-600">Jan–Feb 2026</td>
                      <td className="p-3 text-right font-bold text-green-600">R$ 2.000.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 2.000.000</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-100 text-purple-700 text-xs">Capital Injection</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700 text-xs">Upcoming</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-green-50">
                      <td className="p-3"><Badge className="bg-green-100 text-green-700 text-xs">IP</Badge></td>
                      <td className="p-3 text-gray-900">IP Filing (Target)</td>
                      <td className="p-3 text-gray-600">15 Mar 2026</td>
                      <td className="p-3 text-right font-bold text-green-600">—</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 2.000.000</td>
                      <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700 text-xs">Filing</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700 text-xs">Upcoming</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-green-50">
                      <td className="p-3"><Badge className="bg-green-100 text-green-700 text-xs">IP</Badge></td>
                      <td className="p-3 text-gray-900">Pre-Audit Capital Injection</td>
                      <td className="p-3 text-gray-600">01 May 2026</td>
                      <td className="p-3 text-right font-bold text-green-600">R$ 3.000.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 5.000.000</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-100 text-purple-700 text-xs">Capital Injection</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700 text-xs">Upcoming</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-green-50">
                      <td className="p-3"><Badge className="bg-green-100 text-green-700 text-xs">IP</Badge></td>
                      <td className="p-3 text-gray-900">Authorization Filing Injection</td>
                      <td className="p-3 text-gray-600">Nov 2026</td>
                      <td className="p-3 text-right font-bold text-green-600">R$ 2.500.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 7.500.000</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-100 text-purple-700 text-xs">Capital Injection</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-gray-100 text-gray-700 text-xs">Planned</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-green-50">
                      <td className="p-3"><Badge className="bg-green-100 text-green-700 text-xs">IP</Badge></td>
                      <td className="p-3 text-gray-900">Final Compliance Injection</td>
                      <td className="p-3 text-gray-600">Jan 2028</td>
                      <td className="p-3 text-right font-bold text-green-600">R$ 1.700.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 9.200.000</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-100 text-purple-700 text-xs">Capital Injection</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-gray-100 text-gray-700 text-xs">Planned</Badge></td>
                    </tr>
                    
                    {/* VASP Thread */}
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-3"><Badge className="bg-blue-100 text-blue-700 text-xs">VASP</Badge></td>
                      <td className="p-3 text-gray-900">Partial Capital Injection</td>
                      <td className="p-3 text-gray-600">Jan–Feb 2026</td>
                      <td className="p-3 text-right font-bold text-blue-600">R$ 3.000.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 3.000.000</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-100 text-purple-700 text-xs">Capital Injection</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700 text-xs">Upcoming</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-3"><Badge className="bg-blue-100 text-blue-700 text-xs">VASP</Badge></td>
                      <td className="p-3 text-gray-900">Pre-Audit Capital Injection</td>
                      <td className="p-3 text-gray-600">01 May 2026</td>
                      <td className="p-3 text-right font-bold text-blue-600">R$ 5.000.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 8.000.000</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-100 text-purple-700 text-xs">Capital Injection</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700 text-xs">Upcoming</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-3"><Badge className="bg-blue-100 text-blue-700 text-xs">VASP</Badge></td>
                      <td className="p-3 text-gray-900">External Audit Window</td>
                      <td className="p-3 text-gray-600">01 Jun – 30 Sep 2026</td>
                      <td className="p-3 text-right font-bold text-blue-600">—</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 8.000.000</td>
                      <td className="p-3 text-center"><Badge className="bg-orange-100 text-orange-700 text-xs">Audit Window</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700 text-xs">Upcoming</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-3"><Badge className="bg-blue-100 text-blue-700 text-xs">VASP</Badge></td>
                      <td className="p-3 text-gray-900">VASP Authorization Deadline</td>
                      <td className="p-3 text-gray-600">01 Nov 2026</td>
                      <td className="p-3 text-right font-bold text-blue-600">R$ 3.500.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 11.500.000</td>
                      <td className="p-3 text-center"><Badge className="bg-red-100 text-red-700 text-xs">Deadline</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-gray-100 text-gray-700 text-xs">Planned</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-3"><Badge className="bg-blue-100 text-blue-700 text-xs">VASP</Badge></td>
                      <td className="p-3 text-gray-900">Final Compliance Injection</td>
                      <td className="p-3 text-gray-600">Jan 2028</td>
                      <td className="p-3 text-right font-bold text-blue-600">R$ 2.500.000</td>
                      <td className="p-3 text-right font-semibold text-gray-700">R$ 14.000.000</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-100 text-purple-700 text-xs">Capital Injection</Badge></td>
                      <td className="p-3 text-center"><Badge className="bg-gray-100 text-gray-700 text-xs">Planned</Badge></td>
                    </tr>
                    
                    {/* Combined Total */}
                    <tr className="bg-purple-100 border-t-2 border-purple-300">
                      <td className="p-3" colSpan={3}><span className="font-bold text-purple-900">Combined Total (IP + VASP)</span></td>
                      <td className="p-3 text-right font-bold text-purple-900">R$ 23.200.000</td>
                      <td className="p-3 text-right font-bold text-purple-900">—</td>
                      <td className="p-3 text-center"><Badge className="bg-purple-200 text-purple-900 text-xs">Total</Badge></td>
                      <td className="p-3 text-center">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Footer with controller info and legend */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">Corporate Structure</h5>
                  <p className="text-sm text-gray-600">Controller: <span className="font-semibold">Joffre Ortigas Asia Holdings</span> → Coins.xyz Digital Markets (VASP) | Coins.xyz Global Trading (IP)</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-2">Legend</h5>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600">Blue = VASP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Green = IP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Scale className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-600">⚖️ = Regulatory Deadline</span>
                    </div>
                  </div>
                  {lastUpdate && (
                    <p className="text-xs text-gray-500 mt-2">Last updated: {lastUpdate} | FX: 1 USD = {exchangeRate.toFixed(2)} BRL</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Blockers */}
      <section className="py-12 bg-white">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="w-7 h-7 text-red-600" />
            <h2 className="text-3xl font-bold font-display">Current Blockers</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-red-200 gradient-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <FileText className="w-5 h-5 text-red-600" />
                  Business Plan Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">Comprehensive business plan aligned with BCB requirements for both VASP and Payment Institution authorization applications.</p>
                <Badge className="gradient-angular text-white border-0">Critical Path</Badge>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-red-200 gradient-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                  External Audit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">Capital verification and financial audit required before authorization filing. Coordinated with capital injection timeline.</p>
                <Badge className="gradient-angular text-white border-0">Critical Path</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Footer - Discreet */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="py-3 md:py-4 text-xs text-neutral-500 dark:text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-2">
            <div>© 2025 Coins.xyz</div>
            <div className="text-center">Confidential executive dashboard — internal use only</div>
            <div className="text-right">Updated {lastUpdate || 'Nov 11, 2025'} • USD/BRL {exchangeRate.toFixed(2)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
