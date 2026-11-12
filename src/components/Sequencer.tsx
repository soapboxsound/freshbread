"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STEPS = 16;

const TRACKS = [
  { name: "Kick", type: "kick" },
  { name: "Snare", type: "snare" },
  { name: "HiHat", type: "hihat" },
  { name: "Clap", type: "clap" },
  { name: "Bass", type: "bass" },
  { name: "Arp 1", type: "arp1" },
  { name: "Arp 2", type: "arp2" },
] as const;

const PATTERNS: Record<string, number[][]> = {
  "Fresh Bread": [
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  ],
  "Classic 808": [
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  Trap: [
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

const PATTERN_NAMES = Object.keys(PATTERNS);
const CM_ROOT = 65.41;
const ARP_POOL_1 = [155.56, 174.61, 196.0, 207.65, 233.08, 261.63, 293.66, 311.13, 349.23, 392.0];
const ARP_POOL_2 = [65.41, 73.42, 77.78, 87.31, 98.0, 103.83, 116.54, 130.81, 146.83, 155.56];

function blankGrid() {
  return TRACKS.map(() => Array(STEPS).fill(false) as boolean[]);
}

export function Sequencer() {
  const [open, setOpen] = useState(false);
  const [grid, setGrid] = useState(blankGrid);
  const [pattern, setPattern] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [playStep, setPlayStep] = useState(-1);

  const audioRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timers = useRef<{ schedule?: ReturnType<typeof setTimeout>; visual?: number }>({});
  const seq = useRef({
    step: 0,
    next: 0,
    start: 0,
    playing: false,
    grid: blankGrid(),
    bpm: 90,
  });
  const arp1 = useRef(0);
  const arp2 = useRef(4);

  const loadPattern = useCallback((idx: number) => {
    const pat = PATTERNS[PATTERN_NAMES[idx]];
    const next = TRACKS.map((_, ti) => pat[ti].map((v) => v === 1));
    setPattern(idx);
    setGrid(next);
    seq.current.grid = next;
  }, []);

  useEffect(() => {
    loadPattern(0);
  }, [loadPattern]);

  const ensureAudio = useCallback(async () => {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioRef.current || audioRef.current.state === "closed") {
      audioRef.current = new Ctx({ latencyHint: "interactive" });
      masterRef.current = audioRef.current.createGain();
      masterRef.current.gain.value = 1;
      masterRef.current.connect(audioRef.current.destination);
    }
    if (audioRef.current.state === "suspended") await audioRef.current.resume();
    return audioRef.current;
  }, []);

  const out = () => masterRef.current!;

  const trigger = useCallback((ti: number, t: number) => {
    const ctx = audioRef.current;
    if (!ctx || !masterRef.current) return;
    const when = Math.max(t, ctx.currentTime + 0.005);
    const type = TRACKS[ti].type;

    if (type === "kick") {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(out());
      o.frequency.setValueAtTime(150, when);
      o.frequency.exponentialRampToValueAtTime(0.01, when + 0.5);
      g.gain.setValueAtTime(1, when);
      g.gain.exponentialRampToValueAtTime(0.001, when + 0.5);
      o.start(when);
      o.stop(when + 0.5);
    }
    if (type === "snare" || type === "hihat") {
      const dur = type === "snare" ? 0.15 : 0.05;
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, type === "snare" ? 2 : 3);
      const src = ctx.createBufferSource();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      f.type = "highpass";
      f.frequency.value = type === "snare" ? 1000 : 7000;
      src.buffer = buf;
      src.connect(f);
      f.connect(g);
      g.connect(out());
      g.gain.setValueAtTime(type === "snare" ? 0.6 : 0.4, when);
      if (type === "snare") g.gain.exponentialRampToValueAtTime(0.001, when + dur);
      src.start(when);
    }
    if (type === "clap") {
      for (let i = 0; i < 3; i++) {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / d.length, 1.5);
        const src = ctx.createBufferSource();
        const g = ctx.createGain();
        src.buffer = buf;
        src.connect(g);
        g.connect(out());
        g.gain.setValueAtTime(0.5, when + i * 0.01);
        src.start(when + i * 0.01);
      }
    }
    if (type === "bass") {
      const decay = 0.7;
      const sub = ctx.createOscillator();
      const harm = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const master = ctx.createGain();
      sub.type = "sine";
      harm.type = "sine";
      sub.frequency.setValueAtTime(CM_ROOT, when);
      harm.frequency.setValueAtTime(CM_ROOT * 2, when);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, when);
      filter.frequency.exponentialRampToValueAtTime(180, when + decay);
      const sg = ctx.createGain();
      const hg = ctx.createGain();
      sg.gain.value = 0.8;
      hg.gain.value = 0.15;
      sub.connect(sg);
      harm.connect(hg);
      sg.connect(filter);
      hg.connect(filter);
      filter.connect(master);
      master.connect(out());
      master.gain.setValueAtTime(0.7, when);
      master.gain.exponentialRampToValueAtTime(0.001, when + decay);
      sub.start(when);
      sub.stop(when + decay);
      harm.start(when);
      harm.stop(when + decay);
    }
    if (type === "arp1" || type === "arp2") {
      const pool = type === "arp1" ? ARP_POOL_1 : ARP_POOL_2;
      if (type === "arp1") {
        const step = Math.random() < 0.7 ? 1 : Math.random() < 0.5 ? 2 : -1;
        arp1.current = (arp1.current + step + pool.length) % pool.length;
      } else {
        const step = Math.random() < 0.6 ? -1 : Math.random() < 0.5 ? 0 : 1;
        arp2.current = (arp2.current + step + pool.length) % pool.length;
      }
      const freq = pool[type === "arp1" ? arp1.current : arp2.current];
      const decay = type === "arp1" ? 0.35 : 0.9;
      const master = ctx.createGain();
      master.gain.setValueAtTime(type === "arp1" ? 0.22 : 0.2, when);
      master.gain.exponentialRampToValueAtTime(0.001, when + decay);
      master.connect(out());
      if (type === "arp1") {
        [-6, 0, 6].forEach((d) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sawtooth";
          o.frequency.setValueAtTime(freq * Math.pow(2, d / 1200), when);
          g.gain.value = 0.2;
          o.connect(g);
          g.connect(master);
          o.start(when);
          o.stop(when + decay);
        });
      } else {
        [[1, 0.65], [2, 0.18], [3, 0.09]].forEach(([ratio, amp]) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sine";
          o.frequency.setValueAtTime(freq * ratio, when);
          g.gain.setValueAtTime(amp * 0.35, when);
          g.gain.exponentialRampToValueAtTime(0.001, when + decay / ratio);
          o.connect(g);
          g.connect(master);
          o.start(when);
          o.stop(when + decay);
        });
      }
    }
  }, []);

  const stop = useCallback(() => {
    seq.current.playing = false;
    setPlaying(false);
    setPlayStep(-1);
    if (timers.current.schedule) clearTimeout(timers.current.schedule);
    if (timers.current.visual) cancelAnimationFrame(timers.current.visual);
    document.body.classList.remove("seq-live", "seq-kick");
  }, []);

  const start = useCallback(async () => {
    const ctx = await ensureAudio();
    if (!ctx) return;
    seq.current.playing = true;
    seq.current.step = 0;
    seq.current.start = ctx.currentTime + 0.05;
    seq.current.next = seq.current.start;
    seq.current.bpm = bpm;
    setPlaying(true);

    TRACKS.forEach((_, ti) => {
      if (seq.current.grid[ti][0]) trigger(ti, seq.current.start);
    });
    seq.current.step = 1;
    seq.current.next = seq.current.start + 60 / seq.current.bpm / 4;

    const schedule = () => {
      if (!seq.current.playing || !audioRef.current) return;
      const c = audioRef.current;
      const stepDur = 60 / seq.current.bpm / 4;
      while (seq.current.next < c.currentTime + 0.1) {
        const step = seq.current.step;
        const when = Math.max(seq.current.next, c.currentTime + 0.005);
        TRACKS.forEach((_, ti) => {
          if (seq.current.grid[ti][step]) trigger(ti, when);
        });
        seq.current.step = (seq.current.step + 1) % STEPS;
        seq.current.next += stepDur;
      }
      timers.current.schedule = setTimeout(schedule, 25);
    };

    const visuals = () => {
      if (!seq.current.playing || !audioRef.current) return;
      const stepDur = 60 / seq.current.bpm / 4;
      const current = Math.floor(Math.max(0, audioRef.current.currentTime - seq.current.start) / stepDur) % STEPS;
      setPlayStep(current);
      if (current % 4 === 0 || seq.current.grid[0][current]) {
        document.body.classList.add("seq-live");
        if (seq.current.grid[0][current]) document.body.classList.add("seq-kick");
        window.setTimeout(() => document.body.classList.remove("seq-live", "seq-kick"), 160);
      }
      timers.current.visual = requestAnimationFrame(visuals);
    };

    schedule();
    visuals();
  }, [bpm, ensureAudio, trigger]);

  useEffect(() => {
    seq.current.grid = grid;
  }, [grid]);

  useEffect(() => {
    seq.current.bpm = bpm;
  }, [bpm]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stop();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  const konami = useMemo(
    () => ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
    [],
  );
  const ki = useRef(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      ki.current = e.key === konami[ki.current] ? ki.current + 1 : e.key === konami[0] ? 1 : 0;
      if (ki.current === konami.length) {
        ki.current = 0;
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [konami]);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-7 left-7 z-30 flex h-4 w-4 items-center justify-center"
        aria-label="Open sequencer"
        title="Open Sequencer"
        onPointerDown={() => {
          ensureAudio();
          setOpen(true);
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent/25 transition group-hover:bg-accent/70 hover:scale-125 hover:bg-accent/70" />
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-[4px] transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            stop();
            setOpen(false);
          }
        }}
      >
        <div
          className="relative max-h-[88vh] w-[90vw] max-w-[780px] overflow-y-auto border border-[#2a2724] bg-panel p-8 text-left text-[#f0edea] shadow-[0_24px_80px_rgba(0,0,0,0.35)] max-md:w-full max-md:max-w-none max-md:border-x-0 max-md:border-b-0 max-md:p-5 max-md:pt-10"
          onPointerDown={() => ensureAudio()}
        >
          <button
            type="button"
            className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center font-mono text-2xl font-light text-[#7a746e] transition hover:text-warm"
            aria-label="Close sequencer"
            onClick={() => {
              stop();
              setOpen(false);
            }}
          >
            ×
          </button>

          <div className="mb-7 flex items-center justify-between pr-9">
            <div className="font-mono text-[11px] tracking-[0.28em] text-warm uppercase before:mr-3 before:inline-block before:h-px before:w-6 before:bg-warm/45 before:align-middle before:content-['']">
              808 Sequencer
            </div>
            <div className="text-[11px] font-semibold tracking-[0.04em] text-[#f0edea]/45 lowercase">
              fresh bread
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {PATTERN_NAMES.map((name, idx) => (
              <button
                key={name}
                type="button"
                className={`border px-3 py-1.5 font-mono text-[8px] tracking-[0.12em] uppercase transition ${
                  pattern === idx
                    ? "border-accent bg-accent/20 text-[#9eb6d8]"
                    : "border-accent/35 text-[#f0edea]/40 hover:border-accent/70 hover:text-[#f0edea]/75"
                }`}
                onClick={() => {
                  ensureAudio();
                  loadPattern(idx);
                }}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {TRACKS.map((track, ti) => {
              const melodic = track.type === "arp1" || track.type === "arp2";
              return (
                <div key={track.name} className="flex items-center gap-2">
                  <div
                    className={`w-11 shrink-0 text-right font-mono text-[9px] tracking-[0.14em] uppercase ${
                      melodic ? "text-warm" : "text-[#7a746e]"
                    }`}
                  >
                    {track.name}
                  </div>
                  <div className="flex min-w-0 flex-1 gap-1">
                    {grid[ti].map((on, si) => (
                      <button
                        key={si}
                        type="button"
                        aria-label={`${track.name} step ${si + 1}`}
                        className={`relative h-7 min-w-0 flex-1 border transition ${
                          si % 4 === 0 && si > 0 ? "before:absolute before:-left-[3px] before:top-0 before:bottom-0 before:w-px before:bg-accent/35 before:content-['']" : ""
                        } ${
                          playStep === si
                            ? melodic
                              ? "border-warm bg-warm/40"
                              : "border-white bg-white"
                            : on
                              ? melodic
                                ? "border-warm bg-warm"
                                : "border-accent bg-accent"
                              : melodic
                                ? "border-[#2a241c] bg-[#1a1612]"
                                : "border-[#2e2b28] bg-[#1c1a19]"
                        }`}
                        onClick={() => {
                          ensureAudio();
                          setGrid((prev) => {
                            const next = prev.map((row) => [...row]);
                            next[ti][si] = !next[ti][si];
                            seq.current.grid = next;
                            return next;
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button
              type="button"
              className={`border px-5 py-2 font-mono text-[9px] tracking-[0.2em] uppercase transition ${
                playing
                  ? "border-warm bg-warm text-panel"
                  : "border-warm/45 text-warm hover:bg-warm hover:text-panel"
              }`}
              onPointerDown={(e) => {
                e.preventDefault();
                if (playing) stop();
                else start();
              }}
            >
              {playing ? "Stop" : "Play"}
            </button>
            <button
              type="button"
              className="border border-warm/45 px-5 py-2 font-mono text-[9px] tracking-[0.2em] text-warm uppercase transition hover:bg-warm hover:text-panel"
              onClick={() => {
                stop();
                const empty = blankGrid();
                setGrid(empty);
                seq.current.grid = empty;
              }}
            >
              Clear
            </button>
            <label className="ml-auto flex items-center gap-2.5 font-mono text-[9px] tracking-[0.18em] text-[#7a746e] uppercase">
              BPM
              <input
                type="number"
                min={40}
                max={200}
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value, 10) || 90)}
                className="w-11 border-0 border-b border-warm/45 bg-transparent text-center font-mono text-[13px] text-[#f0edea] outline-none"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
