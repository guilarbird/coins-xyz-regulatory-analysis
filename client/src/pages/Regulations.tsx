import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ExternalLink, FileText, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO } from "@/const";

export default function Regulations() {
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
              <img src={APP_LOGO} alt="Coins.xyz" className="h-7" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="gradient-iris-blue text-white py-12">
        <div className="container max-w-7xl">
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-4">
            Regulatory Framework
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 font-display">BCB Regulations</h1>
          <p className="text-xl text-white/90">Comprehensive overview of Brazilian Central Bank resolutions and public consultations</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl space-y-8">
          {/* Published Resolutions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <FileText className="w-5 h-5" />
                Published Resolutions
              </CardTitle>
              <CardDescription>Official BCB resolutions regulating VASPs and Payment Institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="res-519">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-blue-500 text-blue-700">Nov 10, 2025</Badge>
                      <span>Resolution BCB nº 519</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Establishes the authorization processes for operating foreign exchange brokers, securities brokers, securities distributors, and virtual asset service providers.
                      </p>
                      <a
                        href="https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=519"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Official Document
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="res-520">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-blue-500 text-blue-700">Nov 10, 2025</Badge>
                      <span>Resolution BCB nº 520</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Regulates the incorporation and operation of Virtual Asset Service Providers (VASPs) and the provision of virtual asset services by other institutions already authorized to operate by the Central Bank of Brazil.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                        <p className="font-semibold text-blue-900 mb-1">Key Provisions:</p>
                        <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                          <li>Minimum capital: R$ 14,000,000 for brokerage operations</li>
                          <li>Daily PRE reporting requirements</li>
                          <li>Custody and segregation standards</li>
                        </ul>
                      </div>
                      <a
                        href="https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=520"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Official Document
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="res-521">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-blue-500 text-blue-700">Nov 10, 2025</Badge>
                      <span>Resolution BCB nº 521</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Includes virtual asset service provider activities within the foreign exchange market framework and defines the rules applicable to Brazilian capital abroad and foreign capital in Brazil.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                        <p className="font-semibold text-blue-900 mb-1">What's New:</p>
                        <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                          <li>International payments/transfers with Virtual Assets treated as foreign-exchange operations</li>
                          <li>Transfers to self-custody wallets explicitly regulated</li>
                          <li>Asset swaps referenced to fiat currency covered</li>
                        </ul>
                      </div>
                      <a
                        href="https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=521"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Official Document
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="res-517">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-green-500 text-green-700">Nov 3, 2025</Badge>
                      <span>Resolution BCB nº 517</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Establishes the methodology for calculating minimum capital requirements for Payment Institutions, including the technology-intensive component.
                      </p>
                      <a
                        href="https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=517"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Official Document
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="res-14">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-green-500 text-green-700">Nov 3, 2025</Badge>
                      <span>Joint Resolution BCB/CVM nº 14</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Joint resolution between BCB and CVM establishing capital requirements for Payment Institutions. Increased minimum capital from R$ 1M to R$ 9.2M for technology-intensive operations.
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                        <p className="font-semibold text-green-900 mb-1">Impact:</p>
                        <ul className="text-gray-700 space-y-1 ml-4 list-disc">
                          <li>~500 Payment Institutions affected</li>
                          <li>Estimated 28% will need recapitalization or M&A</li>
                          <li>Gradual implementation: 25% (Jul 2026) → 100% (Jan 2028)</li>
                        </ul>
                      </div>
                      <a
                        href="https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20Conjunta&numero=14"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Official Document
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Public Consultations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Clock className="w-5 h-5" />
                Public Consultations
              </CardTitle>
              <CardDescription>BCB public consultations that shaped the current regulatory framework</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="cp-109">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-gray-400 text-gray-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Closed
                      </Badge>
                      <span>CP 109/2024 — VASPs Authorization</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Public consultation on authorization processes for Virtual Asset Service Providers. Closed on February 28, 2024.
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Result: Incorporated into Resolution BCB 519/2025 (published Nov 10, 2025)
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cp-110">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-gray-400 text-gray-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Closed
                      </Badge>
                      <span>CP 110/2024 — VASP Authorization by IPs</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Public consultation on authorization of VASPs by Payment Institutions. Closed on February 28, 2024.
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Result: Incorporated into Resolution BCB 520/2025 (published Nov 10, 2025)
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cp-111">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-gray-400 text-gray-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Closed
                      </Badge>
                      <span>CP 111/2024 — Virtual Assets in FX Market</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Public consultation on including virtual assets within the foreign exchange market framework. Closed on February 28, 2024.
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Result: Incorporated into Resolution BCB 521/2025 (published Nov 10, 2025)
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cp-126">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Open
                      </Badge>
                      <span>CP 126/2025 — Prudential Classification of VAs/Tokens</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Public consultation on prudential classification of virtual assets and tokens for risk management purposes.
                      </p>
                      <p className="text-sm font-semibold text-blue-900">
                        Deadline: December 31, 2025
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cp-119">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Open
                      </Badge>
                      <span>CP 119/2025 — Sustainability Accounting</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Public consultation on sustainability accounting standards for regulated financial institutions.
                      </p>
                      <p className="text-sm font-semibold text-blue-900">
                        Deadline: May 31, 2025
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cp-117">
                  <AccordionTrigger className="font-semibold">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Open
                      </Badge>
                      <span>CP 117/2025 — Denomination Rules</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Public consultation on naming and denomination rules for financial institutions (e.g., restrictions on using "bank" in brand names).
                      </p>
                      <p className="text-sm font-semibold text-blue-900">
                        Deadline: May 31, 2025
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Key Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Key Implementation Dates</CardTitle>
              <CardDescription>Critical deadlines for regulatory compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="font-semibold text-gray-900">Regulations Take Effect</span>
                  <Badge className="bg-blue-600 text-white">February 2, 2026</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="font-semibold text-gray-900">Reporting Obligations Begin</span>
                  <Badge className="bg-green-600 text-white">May 4, 2026</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <span className="font-semibold text-gray-900">VASP Authorization Deadline</span>
                  <Badge className="bg-purple-600 text-white">November 2026</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <span className="font-semibold text-gray-900">Full Capital Compliance</span>
                  <Badge className="bg-orange-600 text-white">January 2028</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
