import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Calendar, Info, DollarSign } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [btcAmount, setBtcAmount] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");
  const [brzAmount, setBrzAmount] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header with Bird */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/bird.png" 
                alt="Bird" 
                className="w-12 h-12 animate-bounce-slow"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Coins.xyz</h1>
                <p className="text-sm text-gray-600">Regulatory Capital Analysis</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              BCB Resolutions 517 & 14/2025
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Virtual Asset Brokerage Capital Requirements
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Comprehensive analysis of regulatory capital needed to operate as a VASP in Brazil
            </p>
            <div className="flex gap-4 justify-center">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">R$ 14M</div>
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
              <TabsTrigger value="calculation">
                <Calculator className="w-4 h-4 mr-2" />
                Calculation
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Calendar className="w-4 h-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="pre-calculator">
                <DollarSign className="w-4 h-4 mr-2" />
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
                      <div className="text-3xl font-bold text-blue-600 mb-2">R$ 4,000,000</div>
                      <p className="text-sm text-gray-700">
                        Baseline capital for structuring and maintaining operations, regardless of transaction volume.
                      </p>
                    </div>
                    <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                      <h3 className="font-semibold text-lg mb-2 text-green-900">
                        Operational Activities (PAO)
                      </h3>
                      <div className="text-3xl font-bold text-green-600 mb-2">R$ 10,000,000</div>
                      <p className="text-sm text-gray-700">
                        Variable component based on intermediation and custody activities performed.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg border-2 border-blue-300">
                    <h3 className="font-semibold text-lg mb-2">Total Minimum Capital (CMin)</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">R$ 14,000,000</div>
                    <p className="text-sm text-gray-700">
                      PCF (R$ 4M) + PAO (R$ 10M) = Required paid-in capital and minimum net equity
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
                          Reference Value: R$ 10,000,000
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
                          Reference Value: R$ 6,000,000
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calculation Tab */}
            <TabsContent value="calculation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Capital Calculation Methodology</CardTitle>
                  <CardDescription>
                    Step-by-step breakdown based on Joint Resolution No. 14/2025
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Formula</h4>
                      <div className="font-mono text-lg bg-white p-3 rounded border">
                        CMin = PCF + PAO
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Components</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Fixed Cost Component (PCF):</span>
                          <span className="font-semibold">R$ 4,000,000.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Operational Activities (PAO):</span>
                          <span className="font-semibold">R$ 10,000,000.00</span>
                        </li>
                        <li className="flex justify-between pt-2 border-t">
                          <span className="font-bold">Total Minimum Capital:</span>
                          <span className="font-bold text-lg text-blue-600">R$ 14,000,000.00</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Important Note
                    </h4>
                    <p className="text-sm text-gray-700">
                      This R$ 14 million requirement differs from the R$ 37.2 million mentioned for traditional securities brokerages (CTVMs). 
                      For VASPs focused on crypto assets, the calculation follows the specific methodology of Joint Resolution No. 14, 
                      resulting in the lower capital requirement.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Variable Capital (PRE)</CardTitle>
                  <CardDescription>
                    Daily capital requirements based on assets under custody
                  </CardDescription>
                </CardHeader>
                <CardContent>
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

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Timeline</CardTitle>
                  <CardDescription>
                    Gradual implementation schedule for minimum capital requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                        <div className="text-2xl font-bold text-blue-600 mb-1">R$ 3,500,000</div>
                        <p className="text-sm text-gray-600">
                          Initial compliance milestone - institutions must prove 25% of minimum capital
                        </p>
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
                        <div className="text-2xl font-bold text-blue-600 mb-1">R$ 7,000,000</div>
                        <p className="text-sm text-gray-600">
                          Mid-point milestone - half of the total minimum capital must be in place
                        </p>
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
                        <div className="text-2xl font-bold text-green-600 mb-1">R$ 14,000,000</div>
                        <p className="text-sm text-gray-600">
                          Full compliance deadline - complete minimum capital must be maintained
                        </p>
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
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
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
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
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
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
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
                        <span className="font-semibold">R$ {pre.btc.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>USD Stablecoins (5%):</span>
                        <span className="font-semibold">R$ {pre.usdc.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BRL Stablecoins (2%):</span>
                        <span className="font-semibold">R$ {pre.brz.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-blue-300">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Total Daily PRE Required:</span>
                        <span className="font-bold text-2xl text-blue-600">
                          R$ {pre.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> This PRE amount must be covered by your company's equity <strong>in addition to</strong> the R$ 14 million minimum capital requirement. 
                      PRE must be calculated and reported daily to Sisbacen before 6:00 AM.
                    </p>
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
              <div className="flex items-center gap-2 mb-4">
                <img src="/bird.png" alt="Bird" className="w-8 h-8 brightness-0 invert" />
                <h3 className="font-bold text-lg">Coins.xyz</h3>
              </div>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
