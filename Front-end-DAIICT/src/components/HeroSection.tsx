
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, TrendingUp, Users, Zap, Pause, Square, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HeroSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play when modal opens and video is loaded
  useEffect(() => {
    if (isVideoModalOpen && videoRef.current && !videoError) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented, user needs to interact first');
        }
      };
      playVideo();
    }
  }, [isVideoModalOpen, videoError]);

  const handlePlayPause = async () => {
    if (videoRef.current && !videoError) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          await videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Error controlling video:', error);
      }
    }
  };

  const handleStop = () => {
    if (videoRef.current && !videoError) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleCloseModal = () => {
    handleStop();
    setIsVideoModalOpen(false);
    setVideoError(false);
    setIsVideoLoading(true);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError(true);
    console.error('Failed to load video: /Hydrochain_Platform.mp4');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 lg:pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8 fade-in text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Hydrochain
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-primary-green font-semibold">
                Smart Subsidy Disbursement Platform
              </p>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Automating Green Hydrogen Subsidies with Blockchain Transparency and Real-time Monitoring
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="btn-primary hover-lift w-full sm:w-auto">
                Launch Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-secondary hover-lift w-full sm:w-auto"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center card-hover p-4 sm:p-0">
                <div className="text-xl sm:text-2xl font-bold text-primary-green">$2.5B</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total Subsidies</div>
              </div>
              <div className="text-center card-hover p-4 sm:p-0">
                <div className="text-xl sm:text-2xl font-bold text-primary-green">147</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center card-hover p-4 sm:p-0">
                <div className="text-xl sm:text-2xl font-bold text-primary-green">99.9%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Transparency</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual Card */}
          <div className="relative slide-in mt-8 lg:mt-0">
            <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden">
              {/* Clean Smart Contract Visualization */}
              <Card className="simple-card p-4 sm:p-6 h-full">
                <div className="space-y-3 sm:space-y-4 h-full flex flex-col justify-center">
                  <div className="text-center mb-4 sm:mb-6">
                    <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-primary-green mx-auto mb-2" />
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">Smart Contract Flow</h3>
                  </div>
                  
                  {/* Flow Steps */}
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { icon: <Users className="h-4 w-4 sm:h-6 sm:w-6" />, text: "Government approves subsidy" },
                      { icon: <Zap className="h-4 w-4 sm:h-6 sm:w-6" />, text: "Smart contract deploys" },
                      { icon: <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6" />, text: "Milestones auto-verified" },
                      { icon: <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />, text: "Funds released automatically" }
                    ].map((step, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 simple-card hover-lift"
                      >
                        <div className="text-primary-green flex-shrink-0">
                          {step.icon}
                        </div>
                        <span className="text-xs sm:text-sm text-foreground">{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold">
                Hydrochain Platform Demo
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseModal}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="relative bg-black min-h-[300px] flex items-center justify-center">
            {isVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading Hydrochain Platform Demo...</p>
                </div>
              </div>
            )}
            
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-white text-center p-8">
                  <X className="h-16 w-16 mx-auto mb-4 text-red-400" />
                  <p className="text-lg mb-2">Failed to load video</p>
                  <p className="text-sm opacity-80">Please check if Hydrochain_Platform.mp4 exists in the public folder</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-white text-black hover:bg-gray-200"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full h-auto max-h-[70vh]"
              loop
              playsInline
              muted
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              style={{ display: isVideoLoading || videoError ? 'none' : 'block' }}
            >
              <source 
                src="/Hydrochain_Platform.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls Overlay - Only show when video is loaded and no error */}
            {!isVideoLoading && !videoError && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="flex items-center justify-center space-x-6">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handlePlayPause}
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                    title={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleStop}
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                    title="Stop and restart video"
                  >
                    <Square className="h-8 w-8" />
                  </Button>
                  
                  <div className="text-white text-center">
                    <div className="text-sm font-medium">
                      {isPlaying ? '▶ Playing' : '⏸ Paused'}
                    </div>
                    <div className="text-xs opacity-80">
                      Auto-loop enabled
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
