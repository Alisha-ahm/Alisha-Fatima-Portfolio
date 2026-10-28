import React, { useState } from 'react';
import { Project } from '../types';
import { X, Sparkles, Navigation, Send, Play, CheckCircle2, RotateCw, ExternalLink, Activity, Terminal } from 'lucide-react';
import { ParkSenseDemo, SmartDeskDemo } from './SmartProjectsDemos';
import { 
  AirportManagementDemo, 
  FlightBookingDemo, 
  MediaPlayerDemo, 
  QuizPlatformDemo, 
  ShoppingCartDemo, 
  BlogWebsiteDemo, 
  SearchFilterDemo 
} from './MergedProjectsDemos';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
  initialTab?: 'video' | 'sandbox';
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose, initialTab = 'video' }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'video' | 'sandbox'>(
    project.videoUrl ? initialTab : 'sandbox'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-[#0e1422] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800 bg-[#121a2d]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white flex flex-wrap items-center gap-2">
                {project.title}
                {project.liveUrl && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Live Production App
                  </span>
                )}
                <span className="text-xs px-2.5 py-0.5 rounded-full font-sans bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  {activeTab === 'video' ? 'Recorded Demo Video' : 'Interactive Sandbox'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-sans">{project.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 text-xs font-bold transition-all hover:scale-105 shadow-sm"
                title="Launch live deployed project in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Live App</span>
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors"
                title="Open raw video URL"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video Link</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs (Video vs Interactive Sandbox) */}
        {project.videoUrl && (
          <div className="shrink-0 px-4 sm:px-6 py-2.5 bg-[#0a0f1d] border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'video'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Video Demo</span>
              </button>
              <button
                onClick={() => setActiveTab('sandbox')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'sandbox'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Interactive Sandbox</span>
              </button>
            </div>

            <a
              href={project.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono hover:underline"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* Video Player Tab */}
          {activeTab === 'video' && project.videoUrl && (
            <div className="space-y-4">
              {project.videoPlatform === 'direct' ? (
                /* Native MP4 Video Player */
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl relative">
                    <video
                      key={project.videoUrl}
                      src={project.videoUrl}
                      controls
                      autoPlay
                      className="w-full max-h-[480px] object-contain mx-auto bg-black"
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Direct High Definition Project Walkthrough Video
                    </span>
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-semibold"
                    >
                      <span>Open Full Video in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Jumpshare / External Video Card */
                <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#070b14] border border-cyan-500/30 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/20">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80 font-mono">
                      Jumpshare Video Stream
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      Watch {project.title} Video Recording
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                      Click the button below to watch the live recording demonstrating real-time features, application architecture, and interface responsiveness.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Video on Jumpshare</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Direct Link: {project.videoUrl}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Interactive Sandbox Tab */}
          {activeTab === 'sandbox' && (
            <div>
              {project.demoType === 'parksense' && <ParkSenseDemo project={project} />}
              {project.demoType === 'smartdesk' && <SmartDeskDemo project={project} />}
              {project.demoType === 'cms' && <AivoraCmsDemo />}
              {project.demoType === 'ride' && <UberCloneDemo />}
              {project.demoType === 'fanta' && <Fanta3DDemo />}
              {project.demoType === 'compiler' && <CompilerDemo />}
              {project.demoType === 'gym' && <GymDemo />}
              {project.demoType === 'significo' && <SignificoDemo />}
              {project.demoType === 'ams' && <AirportManagementDemo />}
              {project.demoType === 'flight' && <FlightBookingDemo />}
              {project.demoType === 'media' && <MediaPlayerDemo />}
              {project.demoType === 'quiz' && <QuizPlatformDemo />}
              {project.demoType === 'cart' && <ShoppingCartDemo />}
              {project.demoType === 'blog' && <BlogWebsiteDemo />}
              {project.demoType === 'search' && <SearchFilterDemo />}
              {project.demoType === 'general' && <GeneralProjectDemo project={project} />}
            </div>
          )}

          {/* Project Architecture Highlights */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Key Engineering Highlights & Algorithms
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-4 sm:px-6 py-4 bg-[#0a0f1d] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all hover:scale-105 shadow-md shadow-emerald-500/25"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Live Deployed App</span>
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 text-xs font-semibold transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Open Video Link</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Interactive Sandbox 1: Aivora CMS */
const AivoraCmsDemo: React.FC = () => {
  const [prompt, setPrompt] = useState("Launch an announcement article for our upcoming scalable cloud architecture update.");
  const [output, setOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [activeTab, setActiveTab] = useState<'generate' | 'embeddings'>('generate');

  const handleGenerate = () => {
    setIsGenerating(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(
        "Headline: Next Generation Cloud Architecture Launched for High Concurrency Workflows\n\n" +
        "Summary: Today we are excited to unveil our upgraded containerized infrastructure. Powered by Docker and AWS ECS, our services achieve horizontal auto scaling with zero downtime. Vector embeddings index incoming content in real time, delivering rapid semantic search capabilities across millions of enterprise assets."
      );
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <button 
            onClick={() => setActiveTab('generate')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'generate' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            AI Content Assistant
          </button>
          <button 
            onClick={() => setActiveTab('embeddings')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'embeddings' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Vector Embeddings Explorer
          </button>
        </div>
        <span className="text-xs text-cyan-400 font-mono">LangChain + RAG Engine</span>
      </div>

      {activeTab === 'generate' ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block">Editorial Prompt Input</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 text-xs p-3 rounded-lg border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="Enter instructions for AI CMS writer..."
            />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Creativity Index: {temperature}</span>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.1" 
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-24 accent-cyan-400"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg text-xs transition-colors"
            >
              {isGenerating ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Orchestrating LLM Pipeline..." : "Generate AI Editorial Draft"}
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Live CMS Publishing Preview</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  Ready to Publish
                </span>
              </div>
              {output ? (
                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {output}
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-center text-xs text-slate-500">
                  <Sparkles className="w-6 h-6 text-slate-600 mb-2" />
                  Click Generate to run the simulated Aivora LLM orchestration pipeline
                </div>
              )}
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Tokens: 142</span>
              <span>Model Latency: 320ms</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
          <p className="text-cyan-400 font-sans font-semibold text-sm">RAG Knowledge Retrieval Pipeline</p>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-amber-400">Document Query Vector [384 dims]:</span>
            <p className="text-slate-400 text-[11px] truncate">[0.0412, -0.1982, 0.4421, 0.0817, -0.1294, 0.7712, ...]</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-emerald-400">Top Semantic Match #1: CMS Publishing Guide</span>
              <span className="text-slate-400">Cosine Similarity: 0.942</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-emerald-400">Top Semantic Match #2: AWS Cloud Scaling Specs</span>
              <span className="text-slate-400">Cosine Similarity: 0.887</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Interactive Sandbox 2: Uber Clone */
const UberCloneDemo: React.FC = () => {
  const [pickup, setPickup] = useState("Garden East, Karachi");
  const [destination, setDestination] = useState("PECHS Block 6, Shahrah-e-Faisal");
  const [vehicle, setVehicle] = useState<'standard' | 'comfort' | 'premier'>('comfort');
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'matched' | 'enroute'>('idle');

  const requestRide = () => {
    setRideStatus('searching');
    setTimeout(() => {
      setRideStatus('matched');
      setTimeout(() => {
        setRideStatus('enroute');
      }, 1500);
    }, 1200);
  };

  const getFare = () => {
    if (vehicle === 'standard') return "PKR 450";
    if (vehicle === 'comfort') return "PKR 620";
    return "PKR 850";
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Interactive Booking Controls */}
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-400" />
            OpenCage Geocoding & Route Dispatch
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Pickup Location</label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-700 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Destination Address</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-700 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs text-slate-400 block mb-1.5">Vehicle Tier Selection</label>
            <div className="grid grid-cols-3 gap-2">
              {(['standard', 'comfort', 'premier'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setVehicle(type)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium capitalize border transition-all ${
                    vehicle === type 
                      ? 'bg-blue-600/30 text-blue-300 border-blue-500' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">Estimated Fare</span>
            <span className="font-heading font-bold text-base text-cyan-300">{getFare()}</span>
          </div>

          <button
            onClick={requestRide}
            disabled={rideStatus !== 'idle'}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
          >
            {rideStatus === 'idle' && <Send className="w-4 h-4" />}
            {rideStatus === 'idle' && "Dispatch Ride Request via Socket.IO"}
            {rideStatus === 'searching' && "Broadcasting to Nearby Drivers..."}
            {rideStatus === 'matched' && "Driver Accepted Booking!"}
            {rideStatus === 'enroute' && "Captain Approaching in 3 Mins"}
          </button>
        </div>

        {/* Live Simulation Map & WebSocket Feed */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Socket.IO Telemetry Stream
              </span>
              <span className="text-slate-500 font-mono text-[11px]">Port 3000 / wss</span>
            </div>

            {/* Visual Simulated Map Display */}
            <div className="relative h-44 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Simulated Route Line */}
              <div className="relative w-full h-full flex flex-col justify-between">
                <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50" />
                  <span>Pickup: {pickup.split(',')[0]}</span>
                </div>

                <div className="pl-1.5">
                  <div className="h-14 border-l-2 border-dashed border-blue-500/40 ml-1" />
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-lg shadow-emerald-500/50" />
                  <span>Dropoff: {destination.split(',')[0]}</span>
                </div>
              </div>

              {rideStatus !== 'idle' && (
                <div className="absolute inset-x-4 bottom-3 p-2 bg-slate-900/90 border border-cyan-500/40 rounded-lg text-center backdrop-blur-sm">
                  <p className="text-xs text-cyan-300 font-semibold">
                    {rideStatus === 'searching' && "Negotiating driver handshakes..."}
                    {rideStatus === 'matched' && "Driver assigned: Toyota Corolla (Silver)"}
                    {rideStatus === 'enroute' && "Live GPS tracking active (lat: 24.8607, lon: 67.0011)"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Ping: 28ms</span>
            <span>OpenCage Status: OK (200)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Interactive Sandbox 3: Fanta 3D Experience */
const Fanta3DDemo: React.FC = () => {
  const [flavor, setFlavor] = useState<'orange' | 'grape' | 'strawberry'>('orange');
  const [rotation, setRotation] = useState(0);

  const flavorColors = {
    orange: { bg: "from-orange-500 to-amber-600", accent: "#f97316", name: "Classic Orange Blast" },
    grape: { bg: "from-purple-600 to-indigo-700", accent: "#a855f7", name: "Wild Grape Fizz" },
    strawberry: { bg: "from-pink-600 to-rose-700", accent: "#ec4899", name: "Sweet Strawberry Splash" }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden">
        <div className="flex justify-center gap-3 mb-6">
          {(['orange', 'grape', 'strawberry'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFlavor(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                flavor === f ? 'bg-white text-slate-950 shadow-lg scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {f} Flavor
            </button>
          ))}
        </div>

        {/* 3D Simulated Bottle Stage */}
        <div className="relative h-56 flex items-center justify-center perspective-1000">
          <div
            className="w-32 h-48 rounded-3xl bg-gradient-to-br shadow-2xl transition-transform duration-300 ease-out flex flex-col items-center justify-between p-4 border border-white/20 preserve-3d"
            style={{
              background: `linear-gradient(135deg, ${flavorColors[flavor].accent}, #000)`,
              transform: `rotateY(${rotation}deg) rotateX(8deg)`,
              boxShadow: `0 20px 50px ${flavorColors[flavor].accent}40`
            }}
          >
            <div className="w-10 h-3 rounded-full bg-white/40 border border-white/60" />
            <div className="text-center font-heading font-black text-2xl tracking-widest text-white drop-shadow-md">
              FANTA
              <span className="block text-[10px] font-sans font-normal tracking-normal text-white/80 uppercase">
                {flavor}
              </span>
            </div>
            <div className="text-[9px] text-white/60 font-mono">3D GSAP MESH</div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span>3D Orbit Rotation:</span>
            <input
              type="range"
              min="-180"
              max="180"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-40 accent-orange-400"
            />
            <span className="font-mono">{rotation}°</span>
          </div>
          <button
            onClick={() => setRotation((prev) => (prev + 90) % 360)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-white transition-colors"
          >
            Spin 90°
          </button>
        </div>
      </div>
    </div>
  );
};

/* Interactive Sandbox 4: Rules Compiler */
const CompilerDemo: React.FC = () => {
  const [rule, setRule] = useState('user.experienceYears >= 2 AND user.skills INCLUDES "React"');
  const [userData, setUserData] = useState('{\n  "name": "Alisha Fatima",\n  "experienceYears": 3,\n  "skills": ["React", "JavaScript", "Docker", "AWS"]\n}');
  const [evalResult, setEvalResult] = useState<boolean | null>(true);

  const runEvaluation = () => {
    try {
      const parsedUser = JSON.parse(userData);
      let passed = true;
      if (rule.includes('experienceYears >= 2')) {
        passed = passed && parsedUser.experienceYears >= 2;
      }
      if (rule.includes('skills INCLUDES "React"')) {
        passed = passed && Array.isArray(parsedUser.skills) && parsedUser.skills.includes('React');
      }
      setEvalResult(passed);
    } catch {
      setEvalResult(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              Dynamic Rule Expression
            </label>
            <span className="text-[11px] text-slate-500 font-mono">AST Grammar v1.4</span>
          </div>
          <input
            type="text"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            className="w-full bg-slate-950 p-2.5 rounded-lg border border-purple-800/60 text-xs font-mono text-purple-200 focus:outline-none focus:border-purple-400"
          />

          <label className="text-xs font-semibold text-slate-400 block pt-1">
            Runtime Mock Payload (JSON)
          </label>
          <textarea
            rows={5}
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 focus:outline-none focus:border-purple-400"
          />

          <button
            onClick={runEvaluation}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Parse AST & Evaluate Rule Dynamic Logic
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              Compiler Execution Telemetry
            </span>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Lexical Tokens:</span>
                <span className="font-mono text-cyan-300">IDENTIFIER, GTE, NUMBER, AND, INCLUDE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">AST Validation:</span>
                <span className="font-mono text-emerald-400">Valid Syntax Tree</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-slate-300 font-medium">Evaluation Outcome:</span>
                <span className={`font-heading font-bold text-sm px-2.5 py-0.5 rounded ${
                  evalResult ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {evalResult ? "RULE PASSED (TRUE)" : "RULE FAILED (FALSE)"}
                </span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-3">
            Execution completed in 0.042ms with memory isolation.
          </p>
        </div>
      </div>
    </div>
  );
};

/* Interactive Sandbox 5: Gym Platform */
const GymDemo: React.FC = () => {
  const [weight, setWeight] = useState(68);
  const [height, setHeight] = useState(172);

  const calculateBmi = () => {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-heading font-bold text-slate-100 text-sm">Interactive Gym Fitness Calculator</h4>
          <p className="text-xs text-slate-400">Built with responsive HTML, CSS, and modern dynamic JavaScript</p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-pink-950 text-pink-300 border border-pink-800">
          PowerPulse Engine
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-2">
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <div className="flex justify-between mb-1 text-slate-300">
              <span>Body Weight:</span>
              <span className="font-mono text-pink-400">{weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="140"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-300">
              <span>Height:</span>
              <span className="font-mono text-pink-400">{height} cm</span>
            </div>
            <input
              type="range"
              min="140"
              max="210"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-center items-center text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Calculated BMI Score</span>
          <span className="font-heading text-4xl font-extrabold text-pink-400">{calculateBmi()}</span>
          <span className="text-xs text-emerald-400 font-medium mt-1">Normal Healthy Range</span>
          <span className="text-[11px] text-slate-500 mt-2">Recommended: 3 weekly cardio sessions and hypertrophy split</span>
        </div>
      </div>
    </div>
  );
};

/* Interactive Sandbox 6: Significo Demo */
const SignificoDemo: React.FC = () => {
  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-heading font-bold text-slate-100 text-sm">Significo Design System Components</h4>
        <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
          React Components
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all text-xs">
          <span className="text-emerald-400 font-bold block mb-1">01. Fluid Navigation</span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Dynamic scroll response with blur backdrop and responsive mobile drawer transitions.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all text-xs">
          <span className="text-emerald-400 font-bold block mb-1">02. Modern Data Grid</span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Accessible, keyboard navigable cards engineered for high information clarity.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all text-xs">
          <span className="text-emerald-400 font-bold block mb-1">03. Micro Transitions</span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Subtle scale and elevation feedback on user clicks and hovers with zero frame drops.
          </p>
        </div>
      </div>
    </div>
  );
};

/* General Demo for Systems Projects */
const GeneralProjectDemo: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
      <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
        <Activity className="w-4 h-4" />
        <span>System Architecture & Data Modeling Overview</span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        {project.description}
      </p>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
        <p className="text-cyan-300">Deployment Paradigm: Dockerized Microservice Architecture</p>
        <p>Database Integrity: ACID Compliant transactional schema with indexed query pipelines</p>
        <p>Security: Role based authentication tokens with permission validation middleware</p>
      </div>
    </div>
  );
};
