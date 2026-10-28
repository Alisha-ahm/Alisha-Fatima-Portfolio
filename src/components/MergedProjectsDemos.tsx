import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, 
  Search, 
  ShoppingCart, 
  BookOpen, 
  HelpCircle, 
  Music, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Tag, 
  ArrowRight, 
  Clock, 
  Users, 
  Luggage, 
  Ticket,
  Volume2,
  VolumeX,
  Sliders,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

/* 1. Airport Management System (AMS) Demo */
export const AirportManagementDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'departures' | 'arrivals' | 'gates'>('departures');
  const [filterQuery, setFilterQuery] = useState('');
  
  const flights = [
    { id: 'PK-302', dest: 'Islamabad (ISB)', gate: 'G-04', time: '14:30', status: 'Boarding', terminal: 'T1' },
    { id: 'EK-601', dest: 'Dubai (DXB)', gate: 'G-12', time: '15:10', status: 'On Time', terminal: 'T2' },
    { id: 'QR-611', dest: 'Doha (DOH)', gate: 'G-08', time: '15:45', status: 'Gate Open', terminal: 'T1' },
    { id: 'PA-201', dest: 'Lahore (LHE)', gate: 'G-02', time: '16:00', status: 'Scheduled', terminal: 'T1' },
    { id: 'TK-708', dest: 'Istanbul (IST)', gate: 'G-15', time: '16:40', status: 'Delayed', terminal: 'T2' }
  ];

  const gates = [
    { gate: 'G-01', flight: 'PA-104 to Quetta', status: 'Occupied', aircraft: 'Airbus A320' },
    { gate: 'G-02', flight: 'PA-201 to Lahore', status: 'Boarding', aircraft: 'Boeing 737' },
    { gate: 'G-03', flight: 'Free / Available', status: 'Available', aircraft: '—' },
    { gate: 'G-04', flight: 'PK-302 to Islamabad', status: 'Boarding', aircraft: 'Boeing 777' },
    { gate: 'G-08', flight: 'QR-611 to Doha', status: 'Docked', aircraft: 'Airbus A350' },
    { gate: 'G-12', flight: 'EK-601 to Dubai', status: 'Pre-flight', aircraft: 'Boeing 777-300ER' }
  ];

  const filteredFlights = flights.filter(f => 
    f.id.toLowerCase().includes(filterQuery.toLowerCase()) || 
    f.dest.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('departures')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'departures' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Flight Departures
          </button>
          <button
            onClick={() => setActiveTab('gates')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'gates' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Terminal Gates Matrix
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search flight or city..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="px-3 py-1.5 pl-8 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-sky-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {activeTab === 'departures' ? (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Flight ID</th>
                <th className="py-2.5 px-3">Destination</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Gate</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 text-xs">
              {filteredFlights.map((f) => (
                <tr key={f.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-sky-400">{f.id}</td>
                  <td className="py-2.5 px-3 font-sans">{f.dest}</td>
                  <td className="py-2.5 px-3 text-slate-400">{f.time}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                      {f.gate}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      f.status === 'Boarding' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 animate-pulse' :
                      f.status === 'Delayed' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      'bg-sky-950 text-sky-300 border border-sky-800'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {gates.map((g, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sky-400">{g.gate}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                  g.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-300'
                }`}>
                  {g.status}
                </span>
              </div>
              <p className="font-semibold text-slate-200 text-xs">{g.flight}</p>
              <p className="text-[11px] text-slate-400">Craft: {g.aircraft}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* 2. Flight Booking Platform Demo */
export const FlightBookingDemo: React.FC = () => {
  const [selectedSeat, setSelectedSeat] = useState<string>('3B');
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Business'>('Economy');
  const [confirmed, setConfirmed] = useState(false);

  const seats = [
    { id: '1A', type: 'Window', class: 'Business', price: 180, available: true },
    { id: '1B', type: 'Aisle', class: 'Business', price: 180, available: false },
    { id: '2A', type: 'Window', class: 'Business', price: 180, available: true },
    { id: '2B', type: 'Aisle', class: 'Business', price: 180, available: true },
    { id: '3A', type: 'Window', class: 'Economy', price: 95, available: false },
    { id: '3B', type: 'Middle', class: 'Economy', price: 90, available: true },
    { id: '3C', type: 'Aisle', class: 'Economy', price: 95, available: true },
    { id: '4A', type: 'Window', class: 'Economy', price: 95, available: true },
    { id: '4B', type: 'Middle', class: 'Economy', price: 90, available: true },
    { id: '4C', type: 'Aisle', class: 'Economy', price: 95, available: true }
  ];

  const currentSeat = seats.find(s => s.id === selectedSeat) || seats[5];

  const handleBook = () => {
    setConfirmed(true);
    confetti({ particleCount: 40, spread: 60 });
  };

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid md:grid-cols-2 gap-4">
        {/* Seat Map */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200">Interactive Aircraft Cabin Map</span>
            <span className="text-[11px] text-slate-400 font-mono">Boeing 737 Layout</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            {seats.map((seat) => (
              <button
                key={seat.id}
                disabled={!seat.available}
                onClick={() => {
                  setSelectedSeat(seat.id);
                  setConfirmed(false);
                }}
                className={`p-2.5 rounded-lg border text-xs font-bold transition-all ${
                  !seat.available
                    ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                    : selectedSeat === seat.id
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/30 scale-105'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-sky-400'
                }`}
              >
                <div>{seat.id}</div>
                <div className="text-[10px] font-normal opacity-80">${seat.price}</div>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-sky-500 inline-block" /> Selected</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-800 inline-block" /> Available</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-900 opacity-50 inline-block" /> Occupied</span>
          </div>
        </div>

        {/* Selected Fare Summary */}
        <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Route</span>
              <span className="font-bold text-white">Karachi (KHI) → Dubai (DXB)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Selected Seat</span>
              <span className="font-mono font-bold text-sky-400">{currentSeat.id} ({currentSeat.type})</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Cabin Tier</span>
              <span>{currentSeat.class} Class</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Base Ticket Fare</span>
              <span className="font-mono">${currentSeat.price}.00</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Baggage (25kg allowance)</span>
              <span className="text-emerald-400 font-mono">Included ($0)</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800 pt-2 font-bold text-white text-sm">
              <span>Total Fare</span>
              <span className="text-emerald-400 font-mono">${currentSeat.price}.00</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all"
          >
            {confirmed ? "✓ Digital Boarding Pass Issued!" : `Confirm Seat ${currentSeat.id} & Checkout`}
          </button>
        </div>
      </div>
    </div>
  );
};

/* 3. WaveFlow Web Media Player Demo */
export const MediaPlayerDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(30);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/assets/aistudio/guitar_755a5675.mp3');
    audio.loop = true;
    audio.volume = volume / 100;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn(err));
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol / 100;
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[#090d19] border border-purple-500/30 space-y-4 text-xs font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-md">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Acoustic Midnight Groove (Loop)</h4>
            <span className="text-slate-400 text-[11px] font-mono">Original Portfolio Ambient Guitar Session</span>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
          isPlaying ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 animate-pulse' : 'bg-slate-900 text-slate-400'
        }`}>
          {isPlaying ? 'LIVE AUDIO' : 'PAUSED'}
        </span>
      </div>

      {/* Simulated Live Audio Equalizer Bars */}
      <div className="h-16 bg-slate-950 rounded-xl border border-slate-800 p-3 flex items-end justify-between gap-1 overflow-hidden">
        {Array.from({ length: 32 }).map((_, i) => {
          const height = isPlaying ? Math.sin((i + Date.now() / 200) * 0.5) * 35 + 40 : 15;
          return (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-t transition-all duration-150"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Progress scrub bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>0:42</span>
          <span>2:15</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-purple-400"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayback}
            className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center shadow-lg shadow-purple-500/25 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <span className="font-bold text-slate-200 ml-1">
            {isPlaying ? "Pause Sound" : "Listen to Audio"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {volume === 0 ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-20 accent-purple-400"
          />
          <span className="font-mono text-slate-400 text-[10px] w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

/* 4. MasteryHub Quiz Taking Platform Demo */
export const QuizPlatformDemo: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      q: "What is the time complexity of extracting the minimum element from a Min-Heap priority queue?",
      options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
      answer: 1,
      explanation: "Extracting the min takes O(log N) due to bubble-down re-heapification."
    },
    {
      q: "Which AWS service is best suited for deploying Docker containerized web microservices with auto-scaling?",
      options: ["AWS S3", "AWS ECS (Elastic Container Service)", "AWS Route53", "AWS IAM"],
      answer: 1,
      explanation: "AWS ECS manages container lifecycle, health checks, and task cluster auto-scaling."
    },
    {
      q: "In real-time web applications, what is the primary protocol advantage of WebSockets over HTTP polling?",
      options: ["Full-duplex bidirectional stream over a single TCP connection", "Stateless cache headers", "JSON payload compression only", "Server cannot push messages"],
      answer: 0,
      explanation: "WebSockets maintain a persistent full-duplex socket eliminating per-request handshake overhead."
    }
  ];

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === questions[currentIdx].answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs font-sans">
      {!isFinished ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-bold text-amber-400">Technical Quiz Question {currentIdx + 1} of {questions.length}</span>
            <span className="font-mono">Current Score: {score}</span>
          </div>

          <h4 className="text-sm font-semibold text-white leading-relaxed">
            {questions[currentIdx].q}
          </h4>

          <div className="space-y-2">
            {questions[currentIdx].options.map((opt, i) => {
              const isSelected = selectedOpt === i;
              const isCorrect = i === questions[currentIdx].answer;
              let btnClass = "bg-slate-950 border-slate-700 hover:border-slate-500 text-slate-200";

              if (selectedOpt !== null) {
                if (isCorrect) {
                  btnClass = "bg-emerald-950 text-emerald-300 border-emerald-500 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-rose-950 text-rose-300 border-rose-500 font-bold";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 italic">
                {questions[currentIdx].explanation}
              </span>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all"
              >
                {currentIdx < questions.length - 1 ? "Next Question →" : "View Final Score"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center mx-auto text-amber-400 font-bold text-base">
            {score}/{questions.length}
          </div>
          <h4 className="text-base font-bold text-white">Quiz Evaluation Completed!</h4>
          <p className="text-slate-300">
            You achieved an accuracy score of {Math.round((score / questions.length) * 100)}%.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>
      )}
    </div>
  );
};

/* 5. SwiftCart E-Commerce Shopping Cart Demo */
export const ShoppingCartDemo: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Mechanical Coding Keyboard (RGB)", price: 85, qty: 1 },
    { id: 2, name: "Wireless Ergonomic Mouse", price: 45, qty: 2 },
    { id: 3, name: "Dual-Arm Monitor Stand", price: 60, qty: 1 }
  ]);
  const [couponCode, setCouponCode] = useState("ALISHA20");
  const [discountApplied, setDiscountApplied] = useState(true);

  const updateQty = (id: number, delta: number) => {
    setItems(items => items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = discountApplied ? subtotal * 0.20 : 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "ALISHA20" || couponCode.toUpperCase() === "DEV") {
      setDiscountApplied(true);
      confetti({ particleCount: 30, spread: 50 });
    }
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs font-sans">
      <div className="space-y-2">
        <span className="font-bold text-slate-200 block border-b border-slate-800 pb-2">
          Cart Items & Dynamic Quantity Stepper
        </span>
        {items.map((item) => (
          <div key={item.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-200 block">{item.name}</span>
              <span className="text-[11px] text-slate-400 font-mono">${item.price} each</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden font-mono">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300"
                >
                  -
                </button>
                <span className="px-2.5 py-0.5 bg-slate-950 text-white font-bold">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300"
                >
                  +
                </button>
              </div>
              <span className="font-bold text-emerald-400 font-mono w-16 text-right">
                ${item.price * item.qty}.00
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon and Summary */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Promo code (e.g. ALISHA20)"
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
          />
          <button
            onClick={applyCoupon}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold transition-colors"
          >
            Apply Code
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800 space-y-1 text-slate-300">
          <div className="flex justify-between"><span>Subtotal:</span><span className="font-mono">${subtotal}.00</span></div>
          {discountApplied && (
            <div className="flex justify-between text-emerald-400 font-semibold">
              <span>Coupon Discount (20%):</span>
              <span className="font-mono">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-mono">{shipping === 0 ? "Free ($0)" : `$${shipping}.00`}</span>
          </div>
          <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-1.5 text-sm">
            <span>Total Payable:</span>
            <span className="font-mono text-emerald-400">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 6. Ink & Thought Editorial Blog Demo */
export const BlogWebsiteDemo: React.FC = () => {
  const [readingMode, setReadingMode] = useState<'dark' | 'sepia'>('dark');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  return (
    <div className={`p-5 rounded-2xl border transition-colors ${
      readingMode === 'dark' ? 'bg-[#090d16] border-slate-800 text-slate-200' : 'bg-[#1a1714] border-amber-900/50 text-[#e6ded2]'
    }`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs">
        <span className="font-mono text-amber-400 font-bold">5 MIN READ · ARCHITECTURE ESSAY</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setReadingMode(readingMode === 'dark' ? 'sepia' : 'dark')}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono"
          >
            {readingMode === 'dark' ? 'Warm Sepia' : 'Dark Mode'}
          </button>
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono"
          >
            {fontSize === 'normal' ? 'A+' : 'A-'}
          </button>
        </div>
      </div>

      <article className="space-y-3">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
          Why Algorithmic Discipline Matters in Modern Web Applications
        </h3>
        <p className={`leading-relaxed text-slate-300 ${fontSize === 'large' ? 'text-sm' : 'text-xs'}`}>
          When designing single page applications like ParkSense or SmartDesk, the temptation is often to reach for heavy external libraries. But implementing zero-dependency min-heaps for slot allocation and interval-overlap detection directly in vanilla JavaScript unlocks unmatched performance, zero bundle bloat, and total transparency.
        </p>
        <blockquote className="border-l-2 border-amber-400 pl-3 italic text-amber-300 text-xs py-1">
          "True craft isn't about importing more packages; it's about choosing the exact data structure that solves the domain problem effortlessly."
        </blockquote>
      </article>
    </div>
  );
};

/* 7. OmniFilter Instant Search Engine Demo */
export const SearchFilterDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const dataset = [
    { id: 1, name: "ParkSense Smart Parking Manager", category: "Algorithms", latency: "0.2ms", rating: 4.9 },
    { id: 2, name: "SmartDesk Office Hub", category: "IoT & DOM", latency: "0.4ms", rating: 4.9 },
    { id: 3, name: "Aivora CMS AI Publisher", category: "AI & LLM", latency: "1.1ms", rating: 4.8 },
    { id: 4, name: "Uber Clone Real-Time Ride", category: "WebSockets", latency: "0.6ms", rating: 4.9 },
    { id: 5, name: "Fanta 3D Experience", category: "Creative 3D", latency: "0.1ms", rating: 5.0 },
    { id: 6, name: "MyLang Custom Rules Compiler", category: "Compilers", latency: "0.3ms", rating: 4.9 },
    { id: 7, name: "Significo Platform Interface", category: "Frontend", latency: "0.2ms", rating: 4.8 },
    { id: 8, name: "PowerPulse Gym Platform", category: "Frontend", latency: "0.2ms", rating: 4.7 }
  ];

  const filtered = dataset.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to filter instantly across indexed records..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          {['All', 'Algorithms', 'AI & LLM', 'WebSockets', 'Creative 3D', 'Compilers'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                selectedCategory === cat ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
        <table className="w-full text-left font-mono">
          <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="py-2 px-3">Item Name</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Filter Latency</th>
              <th className="py-2 px-3">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200 text-xs">
            {filtered.map(row => (
              <tr key={row.id} className="hover:bg-slate-900/50">
                <td className="py-2.5 px-3 font-semibold text-white">{row.name}</td>
                <td className="py-2.5 px-3"><span className="text-cyan-400">{row.category}</span></td>
                <td className="py-2.5 px-3 text-slate-400">{row.latency}</td>
                <td className="py-2.5 px-3 font-bold text-amber-400">★ {row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
