import React from 'react';
import { Shield, Zap, Eye, RefreshCw, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Our Mission
          </h1>
          <p className="mt-6 text-xl text-blue-200 max-w-3xl mx-auto">
            We believe in a more transparent and privacy-respecting web. Our tool helps website owners and visitors understand tracking practices.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Story</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why We Built This Tool
            </p>
          </div>

          <div className="mt-10">
            <div className="prose prose-lg text-gray-500 mx-auto">
              <p>
                In today's digital landscape, websites collect vast amounts of data through various tracking mechanisms. 
                Many website owners aren't fully aware of all the tracking elements present on their sites, 
                especially when using third-party services and tools.
              </p>
              <p>
                Our Website Tracking Analyzer was created to bridge this knowledge gap. We provide a simple way to 
                analyze any website and uncover all tracking elements, from cookies to JavaScript trackers, 
                while also measuring their impact on website performance.
              </p>
              <p>
                Our mission is to promote transparency and help website owners make informed decisions about the 
                tracking technologies they employ, especially in light of increasing privacy regulations like GDPR and CCPA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What We Stand For
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">Privacy</h3>
                <p className="mt-2 text-base text-gray-500">
                  We believe in respecting user privacy and helping websites comply with privacy regulations.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">Transparency</h3>
                <p className="mt-2 text-base text-gray-500">
                  We promote transparency in how websites collect and use visitor data.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">Performance</h3>
                <p className="mt-2 text-base text-gray-500">
                  We help identify how tracking affects website performance and user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The People Behind the Tool
            </p>
          </div>

          <div className="mt-10">
            <div className="prose prose-lg text-gray-500 mx-auto">
              <p>
                Our team consists of privacy advocates, web developers, and data analysts passionate about creating a 
                more transparent web experience. We combine technical expertise with a deep understanding of privacy 
                regulations to provide accurate and actionable insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to analyze your website?</span>
            <span className="block text-blue-200">Get started with our tool today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                Start analyzing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;