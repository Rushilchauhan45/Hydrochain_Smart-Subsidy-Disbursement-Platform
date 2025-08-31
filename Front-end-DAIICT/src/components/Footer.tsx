
import React from 'react';
import { Droplets, Github, Twitter, Linkedin, Mail, MapPin, Phone, Globe, ArrowRight, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-12 sm:mb-16">
          <Card className="simple-card bg-surface-elevated/50 border-border/30">
            <div className="p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
                Stay Updated with Hydrochain
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest updates on green hydrogen subsidies, blockchain innovations, and platform developments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-input border-border focus:border-primary-green flex-1"
                />
                <Button className="btn-primary w-full sm:w-auto">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand & Description */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Enhanced Logo */}
            <Logo size="lg" variant="footer" logoStyle="modern" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Revolutionizing green hydrogen subsidies through blockchain technology. 
              We provide transparent, automated, and efficient subsidy disbursement 
              for sustainable energy projects worldwide.
            </p>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h5 className="font-medium text-foreground">Connect With Us</h5>
              <div className="flex space-x-3">
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary-green hover:bg-surface-elevated transition-all duration-200">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary-green hover:bg-surface-elevated transition-all duration-200">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary-green hover:bg-surface-elevated transition-all duration-200">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary-green hover:bg-surface-elevated transition-all duration-200">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Platform</h4>
            <div className="space-y-3 text-sm">
              <a href="#dashboard" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Dashboard
              </a>
              <a href="#smart-contracts" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Smart Contracts
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                API Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Developer Tools
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Integration Guide
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Whitepaper
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Case Studies
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Support Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Community Forum
              </a>
            </div>
          </div>

          {/* Company & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                About Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Careers
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                News & Press
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary-green transition-colors duration-200 hover:translate-x-1 transform">
                Partners
              </a>
            </div>
            
            {/* Contact Info */}
            <div className="pt-4 space-y-2">
              <h5 className="font-medium text-foreground text-xs uppercase tracking-wide">Contact</h5>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>hello@hydrochain.io</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Globe className="h-3 w-3" />
                <span>www.hydrochain.io</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary-green">$2.5B+</div>
              <div className="text-xs text-muted-foreground">Total Subsidies Managed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary-green">147</div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary-green">25+</div>
              <div className="text-xs text-muted-foreground">Countries Served</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary-green">99.9%</div>
              <div className="text-xs text-muted-foreground">Platform Uptime</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <p>© 2025 Hydrochain. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary-green transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary-green transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary-green transition-colors">Cookie Policy</a>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>for sustainable energy</span>
              <Zap className="h-4 w-4 text-primary-green" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
