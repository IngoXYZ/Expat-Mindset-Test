
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserForm from '@/components/user-form';
import { MapPin, Users, TrendingUp, Globe, Brain, DollarSign, Target, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Emigrant Mindset Test
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Find out in just 5 minutes how well you are mentally and emotionally prepared for emigration.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">15</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Questions</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">8</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Categories</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">5</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Minutes</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">100%</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Free</p>
            </div>
          </div>

          {/* Categories Preview in 2 rows */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Brain className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Willingness to Change</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Adaptability</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Risk Tolerance</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Globe className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Growth Mindset</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Conformity vs. Rebel</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Financial Situation</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Value Compass</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Need for Security</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* User Form Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-black mb-4">Start Your Test Now</CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Enter your details to receive your personal assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <UserForm />
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
