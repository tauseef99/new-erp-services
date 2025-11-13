import React from "react";
import SellerLayout from "../../Pages/layouts/SellerLayout";

export default function PerformanceDashboard() {
  return (
    <SellerLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Seller Performance</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Card - Sidebar */}
          <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#708238] text-white text-xs font-bold px-2 py-1 rounded-full">
                  Level 2
                </div>
              </div>
              
              <div className="w-full mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress to Level 3</span>
                  <span>66%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#708238] h-2 rounded-full" 
                    style={{ width: '66%' }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < 4 ? 'text-[#FFA500]' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-1 text-sm">4.8</span>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center px-2 leading-tight">
                Complete 5 more orders to reach Level 3 and unlock new features
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <MetricCard 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Success Score" 
              value="8" 
              max="10" 
              progress={80}
              status="positive"
            />
            
            <MetricCard 
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
              title="Rating" 
              value="4.8" 
              max="5" 
              progress={96}
              status="positive"
            />
            
            <MetricCard 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              }
              title="Response Rate" 
              value="97%" 
              progress={97}
              status="positive"
            />
            
            <StatCard 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              title="Orders" 
              value="349" 
              target="40"
              trend="up"
            />
            
            <StatCard 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Unique Clients" 
              value="239" 
              target="20"
              trend="up"
            />
            
            <StatCard 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Earnings" 
              value="$13,198.86" 
              target="$10,000"
              trend="up"
            />
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}

function MetricCard({ icon, title, value, max, progress, status }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md">
      <div className="flex items-start">
        <div className="flex items-center justify-center bg-[#708238]/10 text-[#708238] p-2 rounded-lg">
          {icon}
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-800">{value}</span>
            {max && <span className="text-gray-400 text-sm ml-1">/ {max}</span>}
          </div>
          
          <div className="mt-3 flex items-center">
            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-2 rounded-full ${
                  status === "positive" ? "bg-[#708238]" : "bg-[#FFA500]"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-500 ml-2">{progress}%</span>
          </div>
          
          <div className="mt-3 flex items-center">
            <div className={`w-2 h-2 rounded-full ${
              status === "positive" ? "bg-[#708238]" : "bg-[#FFA500]"
            }`}></div>
            <span className="text-xs font-medium text-gray-600 ml-2">
              {status === "positive" 
                ? "✅ Qualifies for next level" 
                : "⚠️ Needs improvement"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, target, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md">
      <div className="flex items-start">
        <div className="flex items-center justify-center bg-[#708238]/10 text-[#708238] p-2 rounded-lg">
          {icon}
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-800">{value}</span>
          </div>
          
          <div className="mt-2 flex items-center">
            <span className={`flex items-center text-sm font-medium ${
              trend === "up" ? "text-[#708238]" : "text-[#FFA500]"
            }`}>
              {trend === "up" ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
              Target: {target}
            </span>
          </div>
          
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#708238]/10 text-[#708238]">
              <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-[#708238]" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
              </svg>
              On track
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}