import React, { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Clock, 
  Zap, 
  MapPin, 
  Building, 
  Users, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  Printer, 
  Check, 
  Plus, 
  ArrowRight, 
  Gauge, 
  FileText, 
  ExternalLink, 
  RotateCw, 
  Sparkles, 
  Activity, 
  DollarSign, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project } from '../types';

/* =========================================================================
   PARKSENSE INTERACTIVE SIMULATOR (Smart Parking Management System)
   Live App: https://park-sense-2026.netlify.app/
   ========================================================================= */

interface SlotItem {
  id: string;
  floor: number;
  number: number;
  type: 'standard' | 'ev' | 'disabled';
  status: 'free' | 'occupied' | 'reserved';
  plate?: string;
  vehicleType?: 'car' | 'suv' | 'ev' | 'bike';
  timeParked?: string;
  distanceFromEntrance: number; // for min-heap allocation
}

export const ParkSenseDemo: React.FC<{ project: Project }> = ({ project }) => {
  const [activeFloor, setActiveFloor] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'map' | 'billing' | 'analytics' | 'specs'>('map');
  const [carLaneAnimating, setCarLaneAnimating] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Vehicle Entry State
  const [plateInput, setPlateInput] = useState<string>('KHI-8921');
  const [vehicleType, setVehicleType] = useState<'car' | 'suv' | 'ev' | 'bike'>('car');
  const [lastTicket, setLastTicket] = useState<{
    id: string;
    plate: string;
    slotId: string;
    floor: number;
    time: string;
    type: string;
  } | null>(null);

  // Selected Slot for Inspection / Checkout
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);
  const [receiptModal, setReceiptModal] = useState<{
    ticketId: string;
    plate: string;
    slotId: string;
    durationMinutes: number;
    baseFee: number;
    surgeFee: number;
    totalFee: number;
    paymentMethod: 'card' | 'cash' | 'wallet';
  } | null>(null);

  // Canvas ref for drawing realistic QR Code Ticket
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initializing 3-Floor realistic slot data
  const [slots, setSlots] = useState<SlotItem[]>(() => {
    const list: SlotItem[] = [];
    for (let f = 1; f <= 3; f++) {
      for (let s = 1; s <= 16; s++) {
        const slotType: 'standard' | 'ev' | 'disabled' = 
          s <= 2 ? 'disabled' : (s >= 13 ? 'ev' : 'standard');
        
        let status: 'free' | 'occupied' | 'reserved' = 'free';
        let plate: string | undefined = undefined;
        let vehicle: 'car' | 'suv' | 'ev' | 'bike' | undefined = undefined;
        let time: string | undefined = undefined;

        if (s % 3 === 0 || (f === 1 && s <= 8)) {
          status = 'occupied';
          plate = `PAK-${1000 + f * 50 + s}`;
          vehicle = slotType === 'ev' ? 'ev' : (s % 2 === 0 ? 'car' : 'suv');
          time = `${8 + f}:15 AM`;
        } else if (s === 11) {
          status = 'reserved';
          plate = `RES-${200 + s}`;
          vehicle = 'car';
          time = 'Reserved for 2:30 PM';
        }

        list.push({
          id: `F${f}-${s < 10 ? '0' : ''}${s}`,
          floor: f,
          number: s,
          type: slotType,
          status,
          plate,
          vehicleType: vehicle,
          timeParked: time,
          distanceFromEntrance: (f - 1) * 30 + s * 3
        });
      }
    }
    return list;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // Occupancy metrics
  const totalSlots = slots.length;
  const occupiedSlotsCount = slots.filter(s => s.status === 'occupied').length;
  const reservedSlotsCount = slots.filter(s => s.status === 'reserved').length;
  const freeSlotsCount = slots.filter(s => s.status === 'free').length;
  const occupancyPercentage = Math.round(((occupiedSlotsCount + reservedSlotsCount) / totalSlots) * 100);

  // Dynamic Surge Pricing formula: if occupancy >= 80%, +20% surge
  const isSurgeActive = occupancyPercentage >= 80;
  const isDiscountActive = occupancyPercentage <= 30;

  // Draw QR pattern on canvas whenever a ticket is issued
  useEffect(() => {
    if (!lastTicket || !qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 100, 100);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(8, 8, 24, 24);
    ctx.clearRect(12, 12, 16, 16);
    ctx.fillRect(16, 16, 8, 8);

    ctx.fillRect(68, 8, 24, 24);
    ctx.clearRect(72, 12, 16, 16);
    ctx.fillRect(76, 16, 8, 8);

    ctx.fillRect(8, 68, 24, 24);
    ctx.clearRect(12, 72, 16, 16);
    ctx.fillRect(16, 76, 8, 8);

    let seed = 0;
    for (let i = 0; i < lastTicket.id.length; i++) {
      seed += lastTicket.id.charCodeAt(i);
    }
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 12; c++) {
        if ((r < 4 && c < 4) || (r < 4 && c > 7) || (r > 7 && c < 4)) continue;
        const val = Math.sin(seed * (r + 1) + c * 3);
        if (val > 0) {
          ctx.fillRect(36 + c * 2.5, 36 + r * 2.5, 2.5, 2.5);
        }
      }
    }
  }, [lastTicket]);

  // Live Simulation loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSlots(prev => {
        const next = [...prev];
        const action = Math.random() > 0.4 ? 'arrive' : 'depart';

        if (action === 'arrive') {
          const freeSlots = next.filter(s => s.status === 'free').sort((a, b) => a.distanceFromEntrance - b.distanceFromEntrance);
          if (freeSlots.length > 0) {
            const target = freeSlots[0];
            const randomPlate = `SIM-${Math.floor(1000 + Math.random() * 9000)}`;
            const types: ('car' | 'suv' | 'ev' | 'bike')[] = ['car', 'car', 'suv', 'ev', 'bike'];
            const chosenType = target.type === 'ev' ? 'ev' : types[Math.floor(Math.random() * types.length)];
            
            target.status = 'occupied';
            target.plate = randomPlate;
            target.vehicleType = chosenType;
            target.timeParked = 'Just now';
            showToast(`Vehicle ${randomPlate} parked at nearest slot ${target.id}`);
          }
        } else {
          const occupied = next.filter(s => s.status === 'occupied');
          if (occupied.length > 0) {
            const target = occupied[Math.floor(Math.random() * occupied.length)];
            const releasedPlate = target.plate;
            target.status = 'free';
            target.plate = undefined;
            target.vehicleType = undefined;
            target.timeParked = undefined;
            showToast(`Vehicle ${releasedPlate} departed slot ${target.id}`);
          }
        }
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Vehicle Entry Handler
  const handleParkVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateInput.trim()) {
      showToast("Please enter a valid license plate number");
      return;
    }

    const eligibleSlots = slots
      .filter(s => {
        if (s.status !== 'free') return false;
        if (vehicleType === 'ev' && s.type !== 'ev') return false;
        return true;
      })
      .sort((a, b) => a.distanceFromEntrance - b.distanceFromEntrance);

    if (eligibleSlots.length === 0) {
      showToast("Lot full! No available slot matching vehicle requirements.");
      return;
    }

    const assigned = eligibleSlots[0];

    setCarLaneAnimating(true);
    setTimeout(() => setCarLaneAnimating(false), 1200);

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSlots(prev => prev.map(s => {
      if (s.id === assigned.id) {
        return {
          ...s,
          status: 'occupied',
          plate: plateInput.toUpperCase(),
          vehicleType,
          timeParked: nowTime
        };
      }
      return s;
    }));

    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastTicket({
      id: ticketId,
      plate: plateInput.toUpperCase(),
      slotId: assigned.id,
      floor: assigned.floor,
      time: nowTime,
      type: vehicleType.toUpperCase()
    });

    setActiveFloor(assigned.floor);

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 }
    });

    showToast(`Success! ${plateInput.toUpperCase()} parked at Slot ${assigned.id} (Floor ${assigned.floor})`);
    setPlateInput(`KHI-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  // Exit & Billing Calculation Engine
  const handleCheckoutSlot = (slot: SlotItem) => {
    if (slot.status !== 'occupied') return;

    const durationMinutes = 135;
    const hours = Math.ceil(durationMinutes / 60);

    const baseRates: Record<string, number> = {
      bike: 2,
      car: 5,
      suv: 7,
      ev: 6
    };
    const rate = baseRates[slot.vehicleType || 'car'] || 5;
    const baseFee = hours * rate;

    const surgeFee = isSurgeActive ? baseFee * 0.2 : 0;
    const totalFee = Math.min(25, baseFee + surgeFee);

    setReceiptModal({
      ticketId: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
      plate: slot.plate || 'UNKNOWN',
      slotId: slot.id,
      durationMinutes,
      baseFee,
      surgeFee,
      totalFee,
      paymentMethod: 'card'
    });
  };

  const handleCompletePayment = () => {
    if (!receiptModal) return;
    setSlots(prev => prev.map(s => {
      if (s.id === receiptModal.slotId) {
        return {
          ...s,
          status: 'free',
          plate: undefined,
          vehicleType: undefined,
          timeParked: undefined
        };
      }
      return s;
    }));
    showToast(`Payment of $${receiptModal.totalFee.toFixed(2)} received. Receipt generated for ${receiptModal.plate}.`);
    setReceiptModal(null);
    setSelectedSlot(null);
  };

  const currentFloorSlots = slots.filter(s => s.floor === activeFloor);

  return (
    <div className="space-y-6 text-slate-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-950 border border-emerald-500/80 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Bar: Problem Statement & Live Link Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase">
              Live Production Single Page App
            </span>
            <span className="text-xs text-emerald-400 font-mono">park-sense-2026.netlify.app</span>
          </div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            ParkSense: Smart Parking Management System
          </h4>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Eliminates time drivers waste searching for parking and prevents operator revenue loss via automated min-heap slot allocation, QR-ticket generation, dynamic surge pricing, and live canvas analytics. Built in pure vanilla JavaScript with localStorage persistence.
          </p>
        </div>

        <a
          href="https://park-sense-2026.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
        >
          <span>Launch Deployed App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Control Tabs & Dynamic Surge Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'map' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Parking Grid
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'billing' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Entry & QR Ticket
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'analytics' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Forecasting & Analytics
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'specs' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Algorithms (Big-O)
          </button>
        </div>

        {/* Dynamic Pricing Surge State */}
        <div className="flex items-center gap-3">
          {isSurgeActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-xs font-bold animate-pulse">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Surge Pricing Active (+20%)
            </span>
          ) : isDiscountActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold">
              <DollarSign className="w-3.5 h-3.5 text-blue-400" />
              Off-Peak Discount (-10%)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              Standard Rates Active
            </span>
          )}

          {/* Simulation Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              isSimulating
                ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Stop Traffic Simulation' : 'Start Live Simulation'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards with Animated Count-Up Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Occupancy</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-white">{occupancyPercentage}%</span>
            <span className={`text-[10px] ${occupancyPercentage >= 80 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {occupancyPercentage >= 80 ? 'Surge' : 'Optimal'}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${occupancyPercentage >= 80 ? 'bg-rose-500' : 'bg-emerald-400'}`} 
              style={{ width: `${occupancyPercentage}%` }} 
            />
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Vehicles Today</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-cyan-400">{occupiedSlotsCount + 34}</span>
            <span className="text-[10px] text-cyan-300">Live</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">across all 3 floors</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Revenue Today</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">$1,485</span>
            <span className="text-[10px] text-emerald-300">USD</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">+18% vs avg</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Avg Duration</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-amber-400">2h 15m</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Grace applied</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Free Slots</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">{freeSlotsCount}</span>
            <span className="text-[10px] text-slate-400">/ {totalSlots}</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Instant dispatch</span>
        </div>
      </div>

      {/* TAB 1: Live Parking Grid across 3 Floors */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          {/* Floor Tab Selector & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Floor Level:</span>
              {[1, 2, 3].map(floorNum => (
                <button
                  key={floorNum}
                  onClick={() => setActiveFloor(floorNum)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeFloor === floorNum
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Floor {floorNum} ({slots.filter(s => s.floor === floorNum && s.status === 'free').length} Free)
                </button>
              ))}
            </div>

            {/* Color Legend */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Free
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Occupied
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Reserved
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> EV Slot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" /> Disabled
              </span>
            </div>
          </div>

          {/* Animated Driving Lane simulation */}
          <div className="relative h-8 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center px-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              ENTRY LANE & SENSOR BARRIER
            </span>
            <div className="absolute inset-y-0 left-0 flex items-center justify-center w-full">
              <div className="w-full border-t border-dashed border-slate-700" />
            </div>
            {carLaneAnimating && (
              <div className="absolute left-0 animate-ping flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <Car className="w-5 h-5 fill-current" />
                <span className="text-[10px]">Assigning Nearest Free Slot via Min-Heap...</span>
              </div>
            )}
          </div>

          {/* Parking Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            {currentFloorSlots.map(slot => {
              const isOccupied = slot.status === 'occupied';
              const isReserved = slot.status === 'reserved';
              const isEV = slot.type === 'ev';
              const isDisabled = slot.type === 'disabled';

              let bgColor = 'bg-emerald-950/40 border-emerald-500/50 hover:border-emerald-400 text-emerald-300';
              if (isOccupied) {
                bgColor = 'bg-rose-950/40 border-rose-500/60 hover:border-rose-400 text-rose-300';
              } else if (isReserved) {
                bgColor = 'bg-amber-950/40 border-amber-500/60 hover:border-amber-400 text-amber-300';
              } else if (isEV) {
                bgColor = 'bg-blue-950/40 border-blue-500/60 hover:border-blue-400 text-blue-300';
              } else if (isDisabled) {
                bgColor = 'bg-slate-900 border-slate-700 hover:border-slate-600 text-slate-400';
              }

              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-[1.03] select-none ${bgColor}`}
                  title={`Slot ${slot.id}: ${slot.status.toUpperCase()}`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                    <span>{slot.id}</span>
                    {isEV ? (
                      <Zap className="w-3 h-3 text-blue-400" />
                    ) : isDisabled ? (
                      <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-300">DIS</span>
                    ) : (
                      <span className="text-[10px]">{slot.status === 'free' ? 'FREE' : 'IN'}</span>
                    )}
                  </div>

                  <div className="my-2 text-center">
                    <Car className={`w-6 h-6 mx-auto ${isOccupied ? 'fill-current opacity-90' : 'opacity-30'}`} />
                  </div>

                  <div className="text-[10px] font-mono truncate">
                    {slot.plate ? (
                      <span className="font-bold text-white block">{slot.plate}</span>
                    ) : (
                      <span className="text-slate-500">Available</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Slot Inspector */}
          {selectedSlot && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-base">
                  {selectedSlot.id}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    Slot {selectedSlot.id} ({selectedSlot.type.toUpperCase()})
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-mono ${
                      selectedSlot.status === 'free' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                    }`}>
                      {selectedSlot.status}
                    </span>
                  </h5>
                  <p className="text-xs text-slate-400">
                    Floor {selectedSlot.floor} · Distance: {selectedSlot.distanceFromEntrance}m · Vehicle: {selectedSlot.plate || 'None'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedSlot.status === 'occupied' && (
                  <button
                    onClick={() => handleCheckoutSlot(selectedSlot)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Calculate Fee & Checkout</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Vehicle Entry & Canvas QR Ticket Generator */}
      {activeTab === 'billing' && (
        <div className="grid md:grid-cols-12 gap-6">
          {/* Entry Form */}
          <div className="md:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Car className="w-4 h-4" />
              <span>Vehicle Arrival & Automated Slot Assignment</span>
            </div>
            
            <form onSubmit={handleParkVehicle} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  License Plate Number
                </label>
                <input
                  type="text"
                  value={plateInput}
                  onChange={(e) => setPlateInput(e.target.value)}
                  placeholder="e.g. KHI-8921"
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Vehicle Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['car', 'suv', 'ev', 'bike'] as const).map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setVehicleType(type)}
                      className={`p-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        vehicleType === type
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="text-emerald-400 font-bold block">Algorithm Allocation Preview:</span>
                <p>System evaluates all available slots across 3 floors using min-heap distance ordering to park at the optimal entrance proximity.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Assign Nearest Slot (Min-Heap Priority Queue)</span>
              </button>
            </form>
          </div>

          {/* Generated Canvas QR Ticket */}
          <div className="md:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-300">Generated Digital Parking Ticket</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                  Canvas QR Code
                </span>
              </div>

              {lastTicket ? (
                <div className="bg-white text-slate-950 p-5 rounded-xl border border-slate-300 space-y-4 font-sans max-w-sm mx-auto shadow-xl">
                  <div className="text-center border-b border-dashed border-slate-300 pb-3">
                    <h5 className="font-extrabold text-base tracking-tight text-slate-900">PARKSENSE LOTS</h5>
                    <p className="text-[10px] text-slate-500">Automated Smart Parking System</p>
                    <span className="text-xs font-mono font-bold text-emerald-600 block mt-1">{lastTicket.id}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs space-y-1">
                      <p><span className="text-slate-500">Plate:</span> <strong className="font-mono text-sm">{lastTicket.plate}</strong></p>
                      <p><span className="text-slate-500">Slot:</span> <strong className="text-emerald-600 text-sm">{lastTicket.slotId}</strong> (Floor {lastTicket.floor})</p>
                      <p><span className="text-slate-500">Type:</span> <strong>{lastTicket.type}</strong></p>
                      <p><span className="text-slate-500">In Time:</span> <strong>{lastTicket.time}</strong></p>
                    </div>

                    <div className="p-1.5 bg-white border border-slate-300 rounded-lg shadow-sm">
                      <canvas ref={qrCanvasRef} width={80} height={80} className="w-20 h-20" />
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300 pt-3 text-center text-[10px] text-slate-500">
                    <p>Grace Period: 10 mins free · Scan at exit lane</p>
                  </div>
                </div>
              ) : (
                <div className="h-56 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                  <FileText className="w-8 h-8 text-slate-600" />
                  <p className="text-xs">No active ticket generated yet. Enter plate above to park.</p>
                </div>
              )}
            </div>

            {lastTicket && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Ticket</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Forecasting & Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Peak-Hour Prediction Engine (Weighted Moving Average)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                94% Confidence Indicator
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-cyan-950/40 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-cyan-400 font-mono">Predicted Peak Window: 05:30 PM – 07:30 PM</span>
                <h5 className="text-lg font-bold text-white">Expected Occupancy at 6:00 PM: 87% (Likely FULL)</h5>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  Calculated using past 7-day weighted occupancy curves for current weekday. Dynamic pricing engine will automatically trigger +20% surge rates when occupancy crosses 80%.
                </p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
                <span className="text-xs text-slate-400 block">Surge Forecast</span>
                <span className="text-xl font-extrabold text-rose-400">HIGH DEMAND</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400">Hourly Occupancy Trend</span>
              <div className="h-32 flex items-end gap-1.5 pt-4">
                {[35, 45, 60, 75, 88, 92, 85, 70, 50, 40].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className={`w-full rounded-t transition-all ${val > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] text-slate-500 font-mono">{i + 9}h</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400">Vehicle Type Distribution</span>
              <div className="space-y-2 pt-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Standard Sedans (52%)</span>
                    <span>31 vehicles</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full w-[52%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>SUVs & 4x4 (26%)</span>
                    <span>16 vehicles</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[26%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Electric Vehicles / EV (14%)</span>
                    <span>8 vehicles</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[14%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Motorbikes (8%)</span>
                    <span>5 vehicles</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[8%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400">Rules-Based Fee Engine</span>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1.5 text-slate-300">
                <p>• Grace Period: 10 mins ($0.00)</p>
                <p>• Standard Car Rate: $5.00 / hour</p>
                <p>• SUV Rate: $7.00 / hour</p>
                <p>• EV Charging Rate: $6.00 / hour</p>
                <p>• Daily Cap: Max $25.00</p>
                <p className="text-rose-400">• Overstay Penalty: +$10.00</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Core Algorithms */}
      {activeTab === 'specs' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Engineered Algorithms & Time Complexity Breakdown
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              ParkSense is built from the ground up without external libraries to demonstrate high-performance client-side data structures and algorithmic efficiency:
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                {
                  name: "Nearest-Slot Allocation (Min-Heap)",
                  complexity: "O(log N)",
                  desc: "Prioritizes distance metric from entrance barrier to allocate nearest available slot dynamically."
                },
                {
                  name: "Reservation Conflict Detection",
                  complexity: "O(N)",
                  desc: "Detects overlapping time intervals to guarantee zero double bookings across all slots."
                },
                {
                  name: "Rules-Chaining Billing Engine",
                  complexity: "O(1)",
                  desc: "Applies 10-minute grace window, vehicle type base rates, surge multiplier, and daily maximum caps in constant time."
                },
                {
                  name: "Weighted Moving Average Predictor",
                  complexity: "O(K)",
                  desc: "Calculates forecasted peak demand curves by weighing historical weekday occupancy windows."
                },
                {
                  name: "Hash Map Barcode & Plate Index",
                  complexity: "O(1)",
                  desc: "Instant lookup of ticket barcodes and plate state from client-side indexed storage."
                }
              ].map((algo, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{algo.name}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {algo.complexity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{algo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Receipt Modal */}
      {receiptModal && (
        <div className="p-5 rounded-xl bg-slate-900 border border-emerald-500/60 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h5 className="text-sm font-bold text-white">Exit Gate Billing & Payment Processing</h5>
            </div>
            <span className="text-xs font-mono text-emerald-400">{receiptModal.ticketId}</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block">Plate Number:</span>
              <span className="text-white font-bold text-sm">{receiptModal.plate}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Slot ID:</span>
              <span className="text-cyan-400 font-bold text-sm">{receiptModal.slotId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Total Duration:</span>
              <span className="text-white font-bold">{receiptModal.durationMinutes} mins (3 hrs billed)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1.5 font-sans border border-slate-800">
            <div className="flex justify-between text-slate-300">
              <span>Base Hourly Rate:</span>
              <span>${receiptModal.baseFee.toFixed(2)}</span>
            </div>
            {receiptModal.surgeFee > 0 && (
              <div className="flex justify-between text-rose-400">
                <span>Dynamic Surge Surcharge (+20%):</span>
                <span>+${receiptModal.surgeFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-slate-800 text-sm">
              <span>Total Amount Due:</span>
              <span>${receiptModal.totalFee.toFixed(2)} USD</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Payment:</span>
              {(['card', 'cash', 'wallet'] as const).map(method => (
                <button
                  key={method}
                  onClick={() => setReceiptModal({ ...receiptModal, paymentMethod: method })}
                  className={`px-3 py-1 rounded text-xs uppercase font-bold transition-colors ${
                    receiptModal.paymentMethod === method
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setReceiptModal(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompletePayment}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-md shadow-emerald-500/25"
              >
                Process & Release Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SMARTDESK INTERACTIVE SIMULATOR (Smart Office Management System)
   Live App: https://smartofficedesk.netlify.app/
   ========================================================================= */

interface OfficeRoom {
  id: string;
  name: string;
  capacity: number;
  status: 'free' | 'occupied' | 'reserved';
  meetingTitle?: string;
  acOn: boolean;
  lightsOn: boolean;
  idleMinutes: number;
}

interface HotDesk {
  id: string;
  team: 'Engineering' | 'Design' | 'Product' | 'Marketing';
  status: 'free' | 'occupied' | 'reserved';
  occupant?: string;
}

interface KanbanItem {
  id: string;
  title: string;
  room: string;
  priority: 'critical' | 'high' | 'medium';
  status: 'open' | 'progress' | 'resolved';
}

export const SmartDeskDemo: React.FC<{ project: Project }> = ({ project }) => {
  const [activeRole, setActiveRole] = useState<'admin' | 'employee' | 'maintenance'>('admin');
  const [activeTab, setActiveTab] = useState<'floormap' | 'energy' | 'kanban' | 'attendance' | 'algorithms'>('floormap');
  const [toast, setToast] = useState<string | null>(null);

  // Live Digital Clock & Attendance State
  const [currentTime, setCurrentTime] = useState<string>('09:42:15 AM');
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(true);
  const [attendanceLog, setAttendanceLog] = useState<{ time: string; status: string }[]>([
    { time: '09:04 AM', status: 'On-Time Check-In' }
  ]);

  // Office Conference Rooms
  const [rooms, setRooms] = useState<OfficeRoom[]>([
    { id: 'R1', name: 'Boardroom Alpha', capacity: 14, status: 'occupied', meetingTitle: 'Executive Strategy Sprint', acOn: true, lightsOn: true, idleMinutes: 0 },
    { id: 'R2', name: 'Focus Pod 1', capacity: 4, status: 'free', acOn: false, lightsOn: false, idleMinutes: 8 },
    { id: 'R3', name: 'Meeting Room Beta', capacity: 8, status: 'reserved', meetingTitle: 'Client Product Demo (2:00 PM)', acOn: true, lightsOn: true, idleMinutes: 0 },
    { id: 'R4', name: 'Innovation Lounge', capacity: 10, status: 'free', acOn: false, lightsOn: false, idleMinutes: 12 }
  ]);

  // Hot Desks
  const [desks, setDesks] = useState<HotDesk[]>([
    { id: 'D-101', team: 'Engineering', status: 'occupied', occupant: 'Alex M.' },
    { id: 'D-102', team: 'Engineering', status: 'free' },
    { id: 'D-103', team: 'Engineering', status: 'occupied', occupant: 'Sara K.' },
    { id: 'D-104', team: 'Engineering', status: 'free' },
    { id: 'D-201', team: 'Design', status: 'occupied', occupant: 'Tariq H.' },
    { id: 'D-202', team: 'Design', status: 'free' },
    { id: 'D-203', team: 'Product', status: 'reserved', occupant: 'Zainab N.' },
    { id: 'D-204', team: 'Marketing', status: 'free' }
  ]);

  // Energy Saved counter (kWh)
  const [energySavedKWh, setEnergySavedKWh] = useState<number>(18.6);

  // Maintenance Tickets Kanban Board
  const [tickets, setTickets] = useState<KanbanItem[]>([
    { id: 'TCK-101', title: 'HVAC Temperature sensor calibration in Pod 1', room: 'Focus Pod 1', priority: 'critical', status: 'open' },
    { id: 'TCK-102', title: 'Desk 102 dual monitor power socket loose', room: 'Engineering Hub', priority: 'high', status: 'progress' },
    { id: 'TCK-103', title: 'Conference Alpha HDMI 4K projection display cable', room: 'Boardroom Alpha', priority: 'medium', status: 'resolved' },
    { id: 'TCK-104', title: 'Smart lock battery replacement', room: 'Innovation Lounge', priority: 'high', status: 'open' }
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRooms(prev => prev.map(r => {
        if (r.status === 'free' && (r.acOn || r.lightsOn)) {
          setEnergySavedKWh(prevKwh => +(prevKwh + 0.4).toFixed(1));
          showToast(`IoT Energy Saver: Auto shut down AC & lights in ${r.name} (Idle > 5m)`);
          return { ...r, acOn: false, lightsOn: false };
        }
        return r;
      }));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAttendance = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isCheckedIn) {
      setIsCheckedIn(false);
      setAttendanceLog(prev => [{ time: timeStr, status: 'Checked Out' }, ...prev]);
      showToast(`Checked out at ${timeStr}. Attendance log updated.`);
    } else {
      setIsCheckedIn(true);
      setAttendanceLog(prev => [{ time: timeStr, status: 'Checked In (Active)' }, ...prev]);
      showToast(`Checked in at ${timeStr}. Status: On-Time.`);
      confetti({ particleCount: 20, spread: 40 });
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Employee,Date,CheckIn,Status\nAlisha Fatima,2026-10-23,09:04 AM,On-Time\nAlex M.,2026-10-23,08:55 AM,On-Time";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "smartdesk_attendance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("SmartDesk attendance report exported as CSV.");
  };

  const handleAdvanceTicket = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'open' ? 'progress' : (t.status === 'progress' ? 'resolved' : 'open');
        return { ...t, status: nextStatus };
      }
      return t;
    }));
    showToast("Kanban ticket status transitioned.");
  };

  const handleSmartDeskRecommendation = () => {
    const freeEngDesk = desks.find(d => d.team === 'Engineering' && d.status === 'free');
    if (freeEngDesk) {
      showToast(`Smart Algorithm Recommended Desk ${freeEngDesk.id} near Engineering teammates!`);
    } else {
      const anyFree = desks.find(d => d.status === 'free');
      if (anyFree) {
        showToast(`Recommended next optimal free desk: ${anyFree.id} (${anyFree.team})`);
      }
    }
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-sky-950 border border-sky-500/80 text-sky-200 px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner: Problem Statement & Live Link */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-sky-500 text-slate-950 text-[10px] font-extrabold uppercase">
              Live Production Single Page App
            </span>
            <span className="text-xs text-sky-400 font-mono">smartofficedesk.netlify.app</span>
          </div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            SmartDesk: Smart Office Management System
          </h4>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Centralizes conference room bookings, hot-desk assignments, employee attendance, drag-and-drop maintenance Kanban tickets, and automated IoT energy conservation. Built with vanilla JS modules, SVG floor plans, and CSS glassmorphism.
          </p>
        </div>

        <a
          href="https://smartofficedesk.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all hover:scale-105 shadow-lg shadow-sky-500/25"
        >
          <span>Launch Deployed App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* User Roles & Tab Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('floormap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'floormap' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Office Floor Plan (SVG)
          </button>
          <button
            onClick={() => setActiveTab('energy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'energy' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            IoT Energy Saver
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'kanban' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Maintenance Kanban
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'attendance' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Attendance & Clock
          </button>
          <button
            onClick={() => setActiveTab('algorithms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'algorithms' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Algorithms (Big-O)
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden sm:inline">Role:</span>
          {(['admin', 'employee', 'maintenance'] as const).map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-2.5 py-1 rounded text-xs font-bold uppercase transition-all ${
                activeRole === role
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Employees Present</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-white">42</span>
            <span className="text-[10px] text-emerald-400">/ 48 (87.5%)</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Live check-in sync</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Rooms Occupied</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-sky-400">
              {rooms.filter(r => r.status === 'occupied').length} / {rooms.length}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Conflict detection active</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Open Tickets</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-amber-400">
              {tickets.filter(t => t.status !== 'resolved').length}
            </span>
            <span className="text-[10px] text-rose-400">1 Critical</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Priority auto-sorted</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Energy Saved Today</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">{energySavedKWh}</span>
            <span className="text-[10px] text-emerald-300 font-mono">kWh</span>
          </div>
          <span className="text-[10px] text-emerald-400 block mt-1">IoT smart auto-off</span>
        </div>
      </div>

      {/* TAB 1: Interactive Office Floor Map */}
      {activeTab === 'floormap' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Floor 3 - Engineering & Executive Wing</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-mono">
                Interactive Map
              </span>
            </div>

            <button
              onClick={handleSmartDeskRecommendation}
              className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/50 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Desk Suggestion (Algorithm)</span>
            </button>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
                CONFERENCE ROOMS & FOCUS PODS
              </span>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {rooms.map(room => {
                  let badgeBg = 'bg-emerald-950 border-emerald-500/50 text-emerald-300';
                  if (room.status === 'occupied') {
                    badgeBg = 'bg-rose-950 border-rose-500/50 text-rose-300';
                  } else if (room.status === 'reserved') {
                    badgeBg = 'bg-amber-950 border-amber-500/50 text-amber-300';
                  }

                  return (
                    <div
                      key={room.id}
                      className={`p-4 rounded-xl border bg-slate-900/90 transition-all hover:scale-[1.02] flex flex-col justify-between ${
                        room.status === 'occupied' ? 'border-rose-500/40' : (room.status === 'reserved' ? 'border-amber-500/40' : 'border-emerald-500/40')
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white">{room.name}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${badgeBg}`}>
                            {room.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">Capacity: {room.capacity} seats</p>
                        {room.meetingTitle && (
                          <p className="text-xs text-sky-300 font-medium mt-1 truncate">
                            {room.meetingTitle}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Zap className={`w-3.5 h-3.5 ${room.acOn ? 'text-amber-400' : 'text-slate-600'}`} />
                          AC: {room.acOn ? 'ON' : 'OFF'}
                        </span>
                        {room.status === 'free' ? (
                          <button
                            onClick={() => {
                              setRooms(prev => prev.map(r => r.id === room.id ? { ...r, status: 'reserved', meetingTitle: 'Quick Sync (Ad-Hoc)' } : r));
                              showToast(`Booked ${room.name} with conflict check validation.`);
                            }}
                            className="text-xs font-bold text-sky-400 hover:text-sky-300"
                          >
                            + Book Room
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setRooms(prev => prev.map(r => r.id === room.id ? { ...r, status: 'free', meetingTitle: undefined } : r));
                              showToast(`Freed ${room.name}. Energy simulation will auto-shut devices if left idle.`);
                            }}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            Release
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-3">
                OPEN HOT-DESK PODS (ENGINEERING & DESIGN)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
                {desks.map(desk => {
                  const isOccupied = desk.status === 'occupied';
                  return (
                    <div
                      key={desk.id}
                      className={`p-3 rounded-xl border flex flex-col justify-between transition-all select-none ${
                        isOccupied 
                          ? 'bg-rose-950/30 border-rose-500/40 text-rose-300' 
                          : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                        <span>{desk.id}</span>
                        <span className="text-[9px] px-1 rounded bg-slate-900 text-slate-400">{desk.team.slice(0, 3)}</span>
                      </div>

                      <div className="my-2 text-center text-xs font-bold truncate">
                        {desk.occupant ? desk.occupant : 'Open'}
                      </div>

                      <button
                        onClick={() => {
                          setDesks(prev => prev.map(d => {
                            if (d.id === desk.id) {
                              const nextStatus = d.status === 'free' ? 'occupied' : 'free';
                              return { ...d, status: nextStatus, occupant: nextStatus === 'occupied' ? 'You' : undefined };
                            }
                            return d;
                          }));
                          showToast(`Desk ${desk.id} updated.`);
                        }}
                        className="text-[10px] text-center font-bold text-sky-400 hover:underline"
                      >
                        {desk.status === 'free' ? 'Claim Desk' : 'Vacate'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IoT Smart Energy Conservation */}
      {activeTab === 'energy' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-emerald-400 font-mono">Automated IoT Sustainability Engine</span>
              <h5 className="text-base font-bold text-white">Smart Idle Detection & Power Optimization</h5>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                When rooms become unoccupied for longer than 5 minutes, SmartDesk automatically dispatches power-down commands to virtual HVAC and lighting zones, logging cumulative kWh savings.
              </p>
            </div>
            <div className="text-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block font-medium">Logged Savings Today</span>
              <span className="text-2xl font-black text-emerald-400">{energySavedKWh} kWh</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {rooms.map(room => (
              <div key={room.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h6 className="text-sm font-bold text-white">{room.name}</h6>
                  <p className="text-xs text-slate-400">Status: {room.status} · Idle: {room.idleMinutes}m</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setRooms(prev => prev.map(r => r.id === room.id ? { ...r, acOn: !r.acOn } : r));
                      showToast(`Toggled AC in ${room.name}`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      room.acOn ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    AC: {room.acOn ? 'ON' : 'OFF'}
                  </button>

                  <button
                    onClick={() => {
                      setRooms(prev => prev.map(r => r.id === room.id ? { ...r, lightsOn: !r.lightsOn } : r));
                      showToast(`Toggled Lights in ${room.name}`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      room.lightsOn ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    Lights: {room.lightsOn ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Maintenance Tickets Kanban Board */}
      {activeTab === 'kanban' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-white">Facility Maintenance Kanban Board</span>
              <p className="text-[11px] text-slate-400">Click any card button to advance status through the pipeline</p>
            </div>
            <button
              onClick={() => {
                const newId = `TCK-${Math.floor(100 + Math.random() * 900)}`;
                setTickets(prev => [
                  { id: newId, title: 'Smart Sensor Calibration', room: 'Boardroom Alpha', priority: 'high', status: 'open' },
                  ...prev
                ]);
                showToast("New ticket added to Priority Queue!");
              }}
              className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Raise Ticket</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {(['open', 'progress', 'resolved'] as const).map(col => {
              const colTickets = tickets.filter(t => t.status === col);
              const colTitle = col === 'open' ? 'Open Issues' : (col === 'progress' ? 'In Progress' : 'Resolved');

              return (
                <div key={col} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white uppercase">{colTitle}</span>
                    <span className="text-xs font-mono text-slate-500">({colTickets.length})</span>
                  </div>

                  <div className="space-y-2.5">
                    {colTickets.map(ticket => (
                      <div
                        key={ticket.id}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400">{ticket.id}</span>
                          <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            ticket.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                            ticket.priority === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <h6 className="text-xs font-medium text-slate-200">{ticket.title}</h6>
                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="text-slate-500">{ticket.room}</span>
                          <button
                            onClick={() => handleAdvanceTicket(ticket.id)}
                            className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                          >
                            <span>Move</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Attendance & Digital Clock */}
      {activeTab === 'attendance' && (
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5 text-center flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">Smart Office Clock-In Terminal</span>
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-widest py-2">
                {currentTime}
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                Status: {isCheckedIn ? 'Checked In (Active)' : 'Checked Out'}
              </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleToggleAttendance}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  isCheckedIn 
                    ? 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/20' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                {isCheckedIn ? 'Log Check-Out' : 'Log Check-In'}
              </button>

              <button
                onClick={handleExportCSV}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Attendance Report (CSV)</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-6 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h5 className="text-xs font-bold text-white uppercase">Today's Attendance Timeline</h5>
              <span className="text-[10px] text-slate-500 font-mono">Verified Records</span>
            </div>

            <div className="space-y-2.5">
              {attendanceLog.map((item, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">{item.status}</span>
                  </div>
                  <span className="font-mono text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Core Algorithms */}
      {activeTab === 'algorithms' && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-400" />
            SmartDesk Algorithmic Architecture & Time Complexity
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Engineered using modular vanilla JavaScript ES6 with zero heavy framework overhead:
          </p>

          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Booking Conflict Detection</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  O(N)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interval overlap algorithm that scans existing reservations to block concurrent room collisions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Priority Queue Dispatch</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  O(log N)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sorts maintenance tickets by urgency (Critical & High priority first) for prompt staff dispatch.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Smart Desk Suggestion</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  O(D)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recommends optimal available hot-desks based on team alignment and past seating patterns.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
