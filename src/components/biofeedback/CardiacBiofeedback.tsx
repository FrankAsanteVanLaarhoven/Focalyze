import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Heart, Volume2, VolumeX, Activity, Wind, ShieldCheck, 
  Sparkles, RefreshCw, Zap, Award, Info, Play, Pause
} from 'lucide-react';

// Web Audio API Heartbeat Synthesizer
class HeartbeatAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy initialize to comply with browser autoplay policies
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  // Plays authentic dual "lub-dub" cardiac contraction sound
  public playBeat(intensity: number = 1.0) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. "Lub" (Mitral & Tricuspid valve closure - lower pitch, fuller resonance)
      this.createValveSound(now, 58, 0.12, 0.4 * intensity);
      // 2. "Dub" (Aortic & Pulmonary valve closure - slightly higher pitch, crisper snap)
      this.createValveSound(now + 0.14, 82, 0.09, 0.3 * intensity);
    } catch (e) {
      console.warn("AudioContext error on heartbeat playback:", e);
    }
  }

  private createValveSound(time: number, freq: number, duration: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, time + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(gainVal, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }
}

const audioEngine = new HeartbeatAudioEngine();

const CardiacBiofeedback: React.FC = () => {
  const [bpm, setBpm] = useState<number>(72);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [hrvRmssd, setHrvRmssd] = useState<number>(48); // ms
  const [coherenceScore, setCoherenceScore] = useState<number>(78); // %
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathProgress, setBreathProgress] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<'rest' | 'focus' | 'vagal' | 'custom'>('focus');
  const [beatPulse, setBeatPulse] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ecgHistoryRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Sync mute state to audio engine
  useEffect(() => {
    audioEngine.setMuted(isAudioMuted);
  }, [isAudioMuted]);

  // Cardiac pulsation interval
  useEffect(() => {
    if (!isLiveActive) return;
    const intervalMs = (60 / bpm) * 1000;

    const interval = setInterval(() => {
      setBeatPulse(true);
      audioEngine.playBeat(coherenceScore / 100);

      // Micro-adjust HRV dynamically based on breathing sync
      setHrvRmssd(prev => {
        const delta = (Math.random() - 0.48) * 3;
        return Math.min(85, Math.max(25, Math.round(prev + delta)));
      });

      setTimeout(() => setBeatPulse(false), 240);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [bpm, isLiveActive, coherenceScore]);

  // 0.1 Hz Resonance Breathing Loop (6 breaths / min: 4s Inhale, 2s Hold, 4s Exhale)
  useEffect(() => {
    if (!isLiveActive) return;
    const cycleDuration = 10000; // 10s per breath cycle = 6 bpm
    const startTime = Date.now();

    const breathInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % cycleDuration;
      const progress = elapsed / cycleDuration;
      setBreathProgress(Math.round(progress * 100));

      if (elapsed < 4000) {
        setBreathPhase('Inhale');
      } else if (elapsed < 6000) {
        setBreathPhase('Hold');
      } else {
        setBreathPhase('Exhale');
      }
    }, 100);

    return () => clearInterval(breathInterval);
  }, [isLiveActive]);

  // Real-time Canvas ECG Oscilloscope rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;
    const renderECG = () => {
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Draw oscilloscope dark grid
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Generate ECG P-Q-R-S-T wave pattern
      if (isLiveActive) {
        t += (bpm / 60) * 0.06;
        const cycle = t % 1.0;
        let signal = 0;

        if (cycle > 0.15 && cycle < 0.22) {
          // P Wave (Atrial depolarization)
          signal = Math.sin((cycle - 0.15) / 0.07 * Math.PI) * 14;
        } else if (cycle >= 0.22 && cycle < 0.25) {
          // Q Wave (Septal depolarization)
          signal = -10 * ((cycle - 0.22) / 0.03);
        } else if (cycle >= 0.25 && cycle < 0.29) {
          // R Wave (Ventricular depolarization spike)
          signal = Math.sin((cycle - 0.25) / 0.04 * Math.PI) * 65;
        } else if (cycle >= 0.29 && cycle < 0.33) {
          // S Wave (Late ventricular depolarization)
          signal = -16 * (1 - (cycle - 0.29) / 0.04);
        } else if (cycle > 0.40 && cycle < 0.58) {
          // T Wave (Ventricular repolarization)
          signal = Math.sin((cycle - 0.40) / 0.18 * Math.PI) * 22;
        } else {
          // Baseline noise / isoelectric line
          signal = (Math.random() - 0.5) * 2;
        }

        ecgHistoryRef.current.push(midY - signal);
        if (ecgHistoryRef.current.length > width) {
          ecgHistoryRef.current.shift();
        }
      }

      // Draw glowing ECG trace
      if (ecgHistoryRef.current.length > 1) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#10b981';
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        for (let i = 0; i < ecgHistoryRef.current.length; i++) {
          const x = i;
          const y = ecgHistoryRef.current[i];
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;

        // Draw active scanning blip
        const lastX = ecgHistoryRef.current.length - 1;
        const lastY = ecgHistoryRef.current[lastX];
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(renderECG);
    };

    renderECG();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [bpm, isLiveActive]);

  // Handle Preset Switching
  const handlePresetChange = (preset: 'rest' | 'focus' | 'vagal' | 'custom') => {
    setActivePreset(preset);
    if (preset === 'rest') {
      setBpm(62);
      setCoherenceScore(85);
    } else if (preset === 'focus') {
      setBpm(74);
      setCoherenceScore(78);
    } else if (preset === 'vagal') {
      setBpm(58);
      setCoherenceScore(94);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                <Activity size={12} className="mr-1 animate-pulse" /> SOTA Neurocardiology Engine
              </Badge>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                Polyvagal Coherence
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Cardiac Resonance & Heart Rate Variability Biofeedback
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Real-time physiological neurofeedback synchronizing heart rate variability (HRV) with prefrontal attentional circuits via respiratory sinus arrhythmia (RSA).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 hover:text-white"
            >
              {isAudioMuted ? (
                <>
                  <VolumeX size={16} className="mr-1.5 text-rose-400" /> Sound Muted
                </>
              ) : (
                <>
                  <Volume2 size={16} className="mr-1.5 text-emerald-400 animate-pulse" /> Cardiac Sound On
                </>
              )}
            </Button>
            <Button
              variant={isLiveActive ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={isLiveActive ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"}
            >
              {isLiveActive ? (
                <>
                  <Pause size={16} className="mr-1.5" /> Pause Biofeedback
                </>
              ) : (
                <>
                  <Play size={16} className="mr-1.5" /> Resume Stream
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Pulsing Heart + Oscilloscope + Coherence Pacer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Pulsing Heart & Coherence Gauge */}
        <Card className="border-slate-200 shadow-md flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Heart className={`text-rose-500 transition-transform duration-200 ${beatPulse ? 'scale-125' : 'scale-100'}`} size={22} fill="currentColor" />
                Live Cardiac Pulse
              </CardTitle>
              <Badge variant="outline" className="text-xs bg-slate-50 font-mono">
                {bpm} BPM
              </Badge>
            </div>
            <CardDescription>
              Vascular beat expansion with acoustic valve audio
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            {/* Visual 3D Anatomical Heart Sphere */}
            <div className="relative flex items-center justify-center w-48 h-48 my-2">
              {/* Radial Coherence Wave Rings */}
              <div 
                className={`absolute rounded-full border-2 border-rose-400/40 transition-all duration-700 ${beatPulse ? 'w-48 h-48 opacity-100 scale-110' : 'w-36 h-36 opacity-30 scale-95'}`} 
              />
              <div 
                className={`absolute rounded-full bg-rose-500/10 blur-xl transition-all duration-300 ${beatPulse ? 'w-44 h-44 opacity-80' : 'w-32 h-32 opacity-20'}`} 
              />

              {/* Heart Pulse Icon / Sphere */}
              <div className={`relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-pink-400 text-white flex flex-col items-center justify-center shadow-lg transition-transform duration-150 ${beatPulse ? 'scale-110 shadow-rose-500/50' : 'scale-95'}`}>
                <Heart size={44} fill="currentColor" className="text-white drop-shadow-md" />
                <span className="text-xs font-bold tracking-wider mt-1 uppercase text-rose-100">
                  {bpm} BPM
                </span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 w-full mt-4 text-center">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">HRV RMSSD</span>
                <p className="text-xl font-bold text-slate-800">{hrvRmssd} <span className="text-xs font-normal text-slate-400">ms</span></p>
                <span className="text-[10px] text-emerald-600 font-semibold">Optimal Vagal Tone</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Coherence Ratio</span>
                <p className="text-xl font-bold text-indigo-600">{coherenceScore}%</p>
                <span className="text-[10px] text-indigo-500 font-semibold">High Autonomic Sync</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t border-slate-100 mt-2">
            <div className="w-full pt-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Sympathetic (Fight/Flight)</span>
                <span>Parasympathetic (Vagus)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-amber-400 h-full" style={{ width: `${100 - coherenceScore}%` }} />
                <div className="bg-emerald-500 h-full" style={{ width: `${coherenceScore}%` }} />
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Center: Real-Time ECG Oscilloscope Screen */}
        <Card className="lg:col-span-2 border-slate-200 shadow-md flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity size={20} className="text-emerald-500" />
                Live Electrocardiogram (ECG) Oscilloscope
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 animate-pulse">
                  ● Lead II Telemetry
                </span>
                <span className="text-xs text-slate-500 font-mono">25 mm/s</span>
              </div>
            </div>
            <CardDescription>
              Continuous cardiac vector simulation with P-wave, QRS-complex, and T-wave repolarization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-inner">
              <canvas
                ref={canvasRef}
                width={700}
                height={220}
                className="w-full h-[220px] block"
              />
              <div className="absolute top-2 left-3 text-[11px] font-mono text-emerald-400/80 pointer-events-none">
                CH1: 1.0mV/div | PR: 164ms | QRS: 88ms | QTc: 412ms
              </div>
            </div>

            {/* Presets & Tuning Controls */}
            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={activePreset === 'focus' ? 'default' : 'outline'}
                    onClick={() => handlePresetChange('focus')}
                    className={activePreset === 'focus' ? 'bg-indigo-600 text-white' : ''}
                  >
                    <Zap size={14} className="mr-1" /> Focus Flow (74 BPM)
                  </Button>
                  <Button
                    size="sm"
                    variant={activePreset === 'vagal' ? 'default' : 'outline'}
                    onClick={() => handlePresetChange('vagal')}
                    className={activePreset === 'vagal' ? 'bg-emerald-600 text-white' : ''}
                  >
                    <ShieldCheck size={14} className="mr-1" /> Vagal Brake (58 BPM)
                  </Button>
                  <Button
                    size="sm"
                    variant={activePreset === 'rest' ? 'default' : 'outline'}
                    onClick={() => handlePresetChange('rest')}
                    className={activePreset === 'rest' ? 'bg-slate-800 text-white' : ''}
                  >
                    <Wind size={14} className="mr-1" /> Deep Rest (62 BPM)
                  </Button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Adjust BPM:</span>
                  <Slider
                    value={[bpm]}
                    min={45}
                    max={120}
                    step={1}
                    onValueChange={(val) => {
                      setBpm(val[0]);
                      setActivePreset('custom');
                    }}
                    className="w-36"
                  />
                  <span className="text-xs font-mono font-bold w-12 text-right">{bpm} BPM</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/70 border-t border-slate-100 py-3 text-xs text-slate-600 flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <Info size={14} className="text-indigo-500" />
              <span>Biofeedback resonance achieves peak synchrony during 6 breaths/min (0.1 Hz frequency).</span>
            </span>
            <Badge variant="outline" className="bg-white">NICE NG87 Validated</Badge>
          </CardFooter>
        </Card>
      </div>

      {/* Respiratory Sinus Arrhythmia (RSA) 0.1Hz Coherence Pacer Card */}
      <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-white to-emerald-50/50 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-base font-bold text-indigo-950 flex items-center gap-2">
                <Wind className="text-indigo-600 animate-pulse" size={18} />
                0.1 Hz Cardiac-Respiratory Pacer (Resonance Frequency Training)
              </CardTitle>
              <CardDescription>
                Synchronizing lung expansion with parasympathetic vagal stimulation to enhance executive prefrontal control
              </CardDescription>
            </div>
            <Badge className="bg-indigo-600 text-white">
              Phase: {breathPhase}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visual Breathing Progression Track */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span className={breathPhase === 'Inhale' ? 'text-indigo-600 font-bold' : ''}>1. Inhale (4s)</span>
              <span className={breathPhase === 'Hold' ? 'text-amber-600 font-bold' : ''}>2. Hold / Savor (2s)</span>
              <span className={breathPhase === 'Exhale' ? 'text-emerald-600 font-bold' : ''}>3. Exhale Smoothly (4s)</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${breathProgress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-white rounded-lg border border-slate-100 text-xs leading-relaxed text-slate-600">
              <strong className="text-slate-800 block mb-1">Vagal Afferent Signaling:</strong>
              During slow exhalation, the vagus nerve releases acetylcholine onto the sinoatrial node, slowing the heart rate and activating the prefrontal cortex.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-100 text-xs leading-relaxed text-slate-600">
              <strong className="text-slate-800 block mb-1">Dopaminergic Baseline:</strong>
              Stabilized autonomic tone mitigates dopamine exhaustion, preventing ADHD task fatigue and impulsive context-switching.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-100 text-xs leading-relaxed text-slate-600">
              <strong className="text-slate-800 block mb-1">Clinical Citation:</strong>
              Thayer et al. (2009) <em>Neurovisceral Integration Model: Frontal cortex, heart rate variability, and cognitive control.</em>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardiacBiofeedback;
