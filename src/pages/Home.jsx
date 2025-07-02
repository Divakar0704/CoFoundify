import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Users, MessageSquare, TrendingUp, Star, Search } from 'lucide-react';
import { ideas } from '../data/sampleData';
import IdeaCard from '../components/IdeaCard';

const Home = () => {
  const featuredIdeas = ideas.slice(0, 3);

  const features = [
    {
      icon: Lightbulb,
      title: 'Share Your Ideas',
      description: 'Post your startup ideas, side projects, or community initiatives and get feedback from the community.'
    },
    {
      icon: Users,
      title: 'Find Collaborators',
      description: 'Connect with developers, designers, marketers, and investors who share your vision.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Chat directly with potential co-founders and build meaningful professional relationships.'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your ideas, track connections, and watch your network grow.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Active Ideas' },
    { value: '1,200+', label: 'Entrepreneurs' },
    { value: '250+', label: 'Successful Matches' },
    { value: '₹50L+', label: 'Funding Connected' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect. Collaborate. <span className="text-yellow-300">Create.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              The focused platform where Indian entrepreneurs connect with co-founders, investors, and collaborators to turn ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/post-idea"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Lightbulb className="h-5 w-5" />
                <span>Post Your Idea</span>
              </Link>
              <Link
                to="/ideas"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Explore Ideas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How CoFoundify Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to connect with the right people and build your dream project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ideas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Trending Ideas
            </h2>
            <p className="text-gray-600">
              Discover the hottest projects looking for collaborators
            </p>
          </div>
          <Link
            to="/ideas"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>View all ideas</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Turn Your Idea into Reality?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who are already building the future. 
              Your next co-founder is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
              >
                Get Started Free
              </Link>
              <Link
                to="/collaborators"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Meet Collaborators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;