
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { ArrowRight, Target, TrendingUp, Shield, BarChart3, Cpu, Zap, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();

    const [triggerError, setTriggerError] = useState(false);

  if (triggerError) {
    // This error will be caught by your Sentry ErrorBoundary
    throw new Error("Demo Sentry error from Home page");
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="FinAI Logo" className="w-12 h-12 object-contain" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{APP_TITLE}</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/signin')}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            AI-Powered Financial Planning
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-7xl font-extrabold text-gray-900 leading-tight">
              Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Financial Freedom</span>
            </h1>
            <p className="text-2xl font-medium text-gray-600 max-w-3xl mx-auto">
              Let AI guide you through 8 strategic steps to build wealth, manage risk, and achieve your financial goals.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center gap-4 pt-4">
            <Button 
              onClick={() => navigate('/journey')}
              size="lg" 
              className="gap-2 text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Start Your 8-Step Journey
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

                    {/* Sentry Demo Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setTriggerError(true)}
              className="text-sm px-4 py-2 rounded-md border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 transition"
            >
              Trigger Sentry Error (Demo)
            </button>
          </div>


          {/* Trust Indicators */}
          <div className="flex justify-center gap-8 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>5 Min Setup</span>
            </div>
          </div>
        </div>

        {/* Hero Visualization */}
        <div className="mt-20 relative rounded-3xl p-12 flex items-center justify-center min-h-[450px] overflow-hidden border border-blue-200 shadow-2xl bg-gradient-to-br from-white via-blue-50 to-indigo-50">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Grid Lines */}
          <div className="absolute inset-0 p-8">
            <div className="h-full w-full relative">
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 opacity-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="col-span-5 border-t border-gray-400"></div>
                ))}
              </div>

              {/* Graph Line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <polyline 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,80 20,60 40,75 60,40 80,55 100,20" 
                />
              </svg>

              {/* AI Indicator */}
              <div className="absolute top-[15%] right-[18%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <Cpu className="w-16 h-16 text-blue-600 relative drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Overlay Text */}
          <div className="relative z-10 text-center space-y-6 bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-blue-100">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Intelligent Financial Planning</h3>
            <p className="text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
              Analyze your data, assess your risk, and generate a personalized investment plan in minutes with AI-powered insights.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-t border-blue-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">Your 8-Step Financial Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A comprehensive roadmap designed to guide you through every aspect of financial planning</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Cash Flow", desc: "Track income & expenses", icon: Cpu },
              { step: 2, title: "Net Worth", desc: "Assets & liabilities", icon: Target },
              { step: 3, title: "Goals", desc: "Set financial targets", icon: Shield },
              { step: 4, title: "Risk", desc: "Assess your profile", icon: TrendingUp },
              { step: 5, title: "Protection", desc: "Emergency & insurance", icon: Shield },
              { step: 6, title: "Plan", desc: "AI recommendations", icon: Cpu },
              { step: 7, title: "Track", desc: "Monthly monitoring", icon: TrendingUp },
              { step: 8, title: "Status", desc: "Financial dashboard", icon: BarChart3 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step}
                  className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center hover:scale-105"
                >
                  <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-blue-600 mb-2">Step {item.step}</p>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white border-t border-blue-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">Why Choose FinAI Planner?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful features designed for your financial success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1">
              <div className="inline-block p-4 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Personalized Plans</h3>
              <p className="text-gray-600 leading-relaxed">AI-driven recommendations tailored to your unique financial profile and goals.</p>
            </div>

            <div className="group bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1">
              <div className="inline-block p-4 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">Monitor your financial health with comprehensive dashboards and real-time insights.</p>
            </div>

            <div className="group bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1">
              <div className="inline-block p-4 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-colors mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Comprehensive Coverage</h3>
              <p className="text-gray-600 leading-relaxed">Covering all aspects: from funds to crypto, insurance to retirement planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Finances?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">Take the first step towards financial freedom with FinAI Planner. Start your 8-step journey today.</p>
          <Button 
            onClick={() => navigate('/journey')}
            size="lg" 
            className="gap-2 text-lg px-10 py-7 bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
          >
            Start Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt="FinAI Logo" className="w-8 h-8 object-contain" />
                <span className="font-bold text-white">{APP_TITLE}</span>
              </div>
              <p className="text-sm">AI-powered financial planning for your future.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 {APP_TITLE}. All rights reserved. AI-Powered for your financial clarity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
