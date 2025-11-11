import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function VaspAnalysis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </a>
            </Link>
            <img src="/logo-horizontal.png" alt="Coins.xyz" className="h-8" />
          </div>
        </div>
      </header>
      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">VASP Authorization</h1>
          <p className="text-lg text-gray-600 mb-8">
            Coins.xyz Digital Markets Ltda. — Virtual Asset Service Provider under BCB Resolutions 519 & 520/2025
          </p>
          <Card className="border-2 border-blue-200 bg-blue-50/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Status: Grandfathering Preparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Target Authorization</p>
                  <p className="text-2xl font-bold text-blue-600">November 2026</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Minimum Capital</p>
                  <p className="text-2xl font-bold text-green-600">R$ 14M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Coins.xyz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
