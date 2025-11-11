import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Calendar, TrendingUp, FileText, Scale, DollarSign, CheckCircle2, Clock, AlertCircle, Sparkles } from "lucide-react";
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

  const milestones: Array<{
    date: string;
    title: string;
    status: "completed" | "in-progress" | "upcoming" | "planned";
    description: string;
  }> = [
    {
      date: "Nov 13, 2025",
      title: "Joffre Asia CNPJ Registration",
      status: "in-progress" as const,
      description: "Formalization as controlling shareholder of Digital Markets & Global Trading"
    },
    {
      date: "Nov 17, 2025",
      title: "Bitso Controller Joins",
      status: "upcoming" as const,
      description: "Financial controller from Bitso joining to support compliance readiness"
    },
    {
      date: "Q4 2025",
      title: "Business Plan Completion",
      status: "in-progress" as const,
      description: "Comprehensive business plan aligned with BCB requirements for dual-license strategy"
    },
    {
      date: "Q1 2026",
      title: "External Audit",
      status: "upcoming" as const,
      description: "Capital verification and financial audit before authorization filing"
    },
    {
      date: "Nov 2026",
      title: "VASP & IP Authorization Filing",
      status: "planned" as const,
      description: "Submit authorization requests to BCB for both licenses"
    }
  ];

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

      {/* Roadmap Timeline - Top Priority */}
      <RoadmapTimeline milestones={milestones} />

      {/* Hero Section with Reddish Gradient */}
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
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Total Capital Required</p>
                <p className="text-2xl md:text-3xl font-bold font-display">{formatCurrency(23200000)}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Dual Licenses</p>
                <p className="text-2xl md:text-3xl font-bold font-display">VASP + EMI</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Target Filing</p>
                <p className="text-2xl md:text-3xl font-bold font-display">Nov 2026</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-sm text-white/80 mb-1">Full Compliance</p>
                <p className="text-2xl md:text-3xl font-bold font-display">Jan 2028</p>
              </div>
            </div>
        </div>
      </section>

      {/* Corporate Restructure Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold font-display">Corporate Restructure</h2>
          </div>
          
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-xl font-display">Joffre Ortigas Asia Holdings as Controller</CardTitle>
              <CardDescription>
                <strong>JO Asia</strong> is being formalized as the controlling shareholder of both Coins.xyz Digital Markets and Coins.xyz Global Trading, replacing Joffre BR Holdings. This restructure is being coordinated with MCZ Law Firm support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Structure Diagram - JO Asia Prominent */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200">
                  <div className="flex flex-col items-center gap-6">
                    {/* JO Asia - Prominent Controller */}
                    <div className="gradient-reddish text-white px-8 py-6 rounded-2xl font-display font-bold text-2xl shadow-lg border-4 border-white">
                      <div className="text-center">
                        <p className="text-sm font-normal opacity-90 mb-1">Controlling Entity</p>
                        <p>Joffre Ortigas Asia Holdings</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-blue-500 rounded-full"></div>
                      <div className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border-2 border-gray-200">Controls</div>
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-gray-300 rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 w-full">
                      <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4 text-center">
                        <p className="font-semibold text-blue-900 mb-1 font-display">Coins.xyz Digital Markets Ltda.</p>
                        <Badge className="bg-blue-600 text-white">VASP License</Badge>
                        <p className="text-sm text-blue-700 mt-2">Virtual Asset Service Provider</p>
                      </div>
                      
                      <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 text-center">
                        <p className="font-semibold text-green-900 mb-1 font-display">Coins.xyz Global Trading Ltda.</p>
                        <Badge className="bg-green-600 text-white">EMI License</Badge>
                        <p className="text-sm text-green-700 mt-2">Electronic Money Institution</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status Update */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 gradient-warm border-2 border-red-200 rounded-lg p-4">
                    <Clock className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">In Progress</p>
                      <p className="text-sm text-gray-600">CNPJ registration of Joffre Asia with BCB</p>
                      <p className="text-xs text-gray-500 mt-1">Expected: Nov 13, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 gradient-cool border-2 border-blue-200 rounded-lg p-4">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Bylaws Amendment</p>
                      <p className="text-sm text-gray-600">Adding Joffre Asia as controller, removing Joffre BR Holdings</p>
                      <p className="text-xs text-gray-500 mt-1">MCZ Law Firm coordination</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Combined Capital Injection */}
      <section className="py-12 bg-white">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <DollarSign className="w-7 h-7 text-purple-600" />
            <h2 className="text-3xl font-bold font-display">Combined Capital Injection</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <Scale className="w-5 h-5 text-blue-600" />
                  VASP Capital
                </CardTitle>
                <CardDescription>Coins.xyz Digital Markets</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600 mb-2 font-display">{formatCurrency(14000000)}</p>
                <p className="text-sm text-gray-600">Virtual Asset Service Provider minimum capital requirement</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <Building2 className="w-5 h-5 text-green-600" />
                  EMI Capital
                </CardTitle>
                <CardDescription>Coins.xyz Global Trading</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 mb-2 font-display">{formatCurrency(9200000)}</p>
                <p className="text-sm text-gray-600">Payment Institution minimum capital requirement</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Total Required
                </CardTitle>
                <CardDescription>Combined dual-license strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600 mb-2 font-display">{formatCurrency(23200000)}</p>
                <p className="text-sm text-gray-600">Gradual implementation schedule until Jan 2028</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Calendar className="w-5 h-5 text-purple-600" />
                Capital Injection Timeline
              </CardTitle>
              <CardDescription>Phased implementation schedule coordinated with regulatory milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Q4 2025 - Initial Injection */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-32">
                    <p className="text-sm font-semibold text-gray-900">Q4 2025</p>
                    <p className="text-xs text-gray-600">Dec 2025</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full mt-1 bg-green-500"></div>
                  </div>
                  <div className="flex-1 pb-4 border-l-2 border-gray-200 pl-4 -ml-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">Initial Capital Injection</p>
                      <Badge className="bg-green-100 text-green-700">R$ 5.000.000</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">First phase covering business plan preparation and initial compliance setup</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">VASP: R$ 3M</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">EMI: R$ 2M</span>
                    </div>
                  </div>
                </div>

                {/* Q2 2026 - Pre-Audit Injection */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-32">
                    <p className="text-sm font-semibold text-gray-900">Q2 2026</p>
                    <p className="text-xs text-gray-600">May 2026</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full mt-1 bg-blue-500"></div>
                  </div>
                  <div className="flex-1 pb-4 border-l-2 border-gray-200 pl-4 -ml-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">Pre-Audit Capital Injection</p>
                      <Badge className="bg-blue-100 text-blue-700">R$ 8.000.000</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Second phase before external audit for BCB verification</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">VASP: R$ 5M</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">EMI: R$ 3M</span>
                    </div>
                  </div>
                </div>

                {/* Q4 2026 - Authorization Filing Injection */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-32">
                    <p className="text-sm font-semibold text-gray-900">Q4 2026</p>
                    <p className="text-xs text-gray-600">Nov 2026</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full mt-1 bg-blue-500"></div>
                  </div>
                  <div className="flex-1 pb-4 border-l-2 border-gray-200 pl-4 -ml-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">Authorization Filing Injection</p>
                      <Badge className="bg-blue-100 text-blue-700">R$ 6.000.000</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Third phase for VASP & IP authorization filing with BCB</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">VASP: R$ 3.5M</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">EMI: R$ 2.5M</span>
                    </div>
                  </div>
                </div>

                {/* Q1 2028 - Final Compliance Injection */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-32">
                    <p className="text-sm font-semibold text-gray-900">Q1 2028</p>
                    <p className="text-xs text-gray-600">Jan 2028</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full mt-1 bg-gray-400"></div>
                  </div>
                  <div className="flex-1 pl-4 -ml-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">Final Compliance Injection</p>
                      <Badge className="bg-purple-100 text-purple-700">R$ 4.200.000</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Final phase to reach full compliance and operational readiness</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">VASP: R$ 2.5M</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">EMI: R$ 1.7M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="mt-6 pt-6 border-t-2 border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Capital Injection</p>
                    <p className="text-3xl font-bold text-purple-600 font-display">{formatCurrency(23200000)}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Timeline</p>
                    <p className="text-2xl font-semibold text-gray-900 font-display">Q4 2025 → Q1 2028</p>
                  </div>
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
          
          {/* Team Recognition */}
          <Card className="w-full mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="font-display">Team Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-purple-100">
                  <div className="bg-purple-600 text-white rounded-full p-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Daniel Hott — Outstanding Performance</p>
                    <p className="text-gray-700 text-sm mb-2">Delivering exceptional support on internal/external client onboarding, processing licensing requirements, and regulatory coordination. Team capacity reaching point where intern-level support may be beneficial.</p>
                    <Badge className="bg-purple-100 text-purple-700">Key Contributor</Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-blue-100">
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
          
          {/* Milestones Timeline */}
          <Card className="w-full border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="font-display">Critical Path Milestones</CardTitle>
              <CardDescription>Key dates and deliverables for dual-license authorization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-28">
                      <p className="text-sm font-semibold text-gray-900">{milestone.date}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        milestone.status === 'in-progress' ? 'bg-red-500 animate-pulse' :
                        milestone.status === 'upcoming' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1 pb-4 border-l-2 border-gray-200 pl-4 -ml-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{milestone.title}</p>
                        <Badge variant="outline" className={
                          milestone.status === 'in-progress' ? 'border-red-500 text-red-700' :
                          milestone.status === 'upcoming' ? 'border-blue-500 text-blue-700' :
                          'border-gray-400 text-gray-700'
                        }>
                          {milestone.status === 'in-progress' ? 'In Progress' :
                           milestone.status === 'upcoming' ? 'Upcoming' : 'Planned'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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

      {/* Quick Navigation to Detailed Analysis */}
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
                        <Scale className="w-6 h-6 text-blue-600" />
                        VASP Analysis
                      </span>
                      <ArrowRight className="w-6 h-6 text-blue-600" />
                    </CardTitle>
                    <CardDescription>Coins.xyz Digital Markets Ltda.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">Virtual Asset Service Provider authorization, capital structure (R$ 14M), compliance requirements, and regulatory framework under BCB Resolutions 519, 520, 521.</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-700">Capital Requirements</Badge>
                      <Badge className="bg-blue-100 text-blue-700">PRE Calculator</Badge>
                      <Badge className="bg-blue-100 text-blue-700">Compliance Checklist</Badge>
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
                        <Building2 className="w-6 h-6 text-green-600" />
                        Payment Institution (EMI)
                      </span>
                      <ArrowRight className="w-6 h-6 text-green-600" />
                    </CardTitle>
                    <CardDescription>Coins.xyz Global Trading Ltda.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">Electronic Money Institution authorization, capital structure (R$ 9.2M), operational requirements, and regulatory framework under BCB Resolutions 517 & Joint Resolution 14/2025.</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-700">Capital Structure</Badge>
                      <Badge className="bg-green-100 text-green-700">Gradual Implementation</Badge>
                      <Badge className="bg-green-100 text-green-700">EMI Requirements</Badge>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/regulations">
              <a>
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  View Complete Regulatory Framework
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/CoinsXYZ_HorizontalLogo_WhiteWordmark.png" alt="Coins.xyz" className="h-6" />
              <div className="text-sm text-gray-400">
                <p>© 2025 Coins.xyz. All rights reserved.</p>
                <p className="text-xs mt-1">Confidential executive dashboard — For internal use only</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p className="font-semibold text-white mb-1">
                {lastUpdate || 'November 11, 2025'} • Exchange rate: 1 USD = {exchangeRate.toFixed(2)} BRL
              </p>
              <p className="text-xs">Live feed • Updates every 30 minutes</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
