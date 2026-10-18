import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Wifi, Volume2, VolumeX, Globe, Radio, Cpu, FastForward } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

const CyberHUD = ({
  activeDate,
  totalEventsCount,
  visibleEventsCount,
  criticalCount,
  selectedCategory,
  onSelectCategory,
  categories,
  playbackSpeed,
  onSpeedToggle,
  isPlaying,
  onPlayToggle
}) => {
  const [clockUtc, setClockUtc] = useState('');
  const [clockLocal, setClockLocal] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [netSpeed, setNetSpeed] = useState('4.82 TB/s');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockUtc(now.toUTCString().replace('GMT', 'UTC'));
      setClockLocal(now.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuate telemetry bandwidth
  useEffect(() => {
    const interval = setInterval(() => {
      const val = (Math.random() * 2 + 3.8).toFixed(2);
      setNetSpeed(`${val} TB/s`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    cyberAudio.muted = nextState;
    if (!nextState) {
      cyberAudio.playClick();
    }
  };

  return (
    <header className="cyber-hud-header">
      {/* Top Banner & Status */}
      <div className="hud-top-bar">
        <div className="hud-brand">
          <div className="brand-icon">
            <Radio className="hud-pulse-icon" size={20} color="var(--neon-green)" />
          </div>
          <div className="brand-text">
            <span className="brand-title glitch" data-text="CYBER.SIGINT // GLOBAL INTELLIGENCE">
              CYBER.SIGINT // GLOBAL INTELLIGENCE
            </span>
            <span className="brand-subtitle">ORBITAL GEO-SPATIAL THREAT MONITORING SYSTEM v4.2</span>
          </div>
        </div>

        {/* Center Live Telemetry Gauges */}
        <div className="hud-telemetry">
          <div className="telemetry-box">
            <span className="telemetry-label">SYSTEM STATUS</span>
            <span className="telemetry-val" style={{ color: 'var(--neon-green)' }}>
              <Activity size={13} style={{ display: 'inline', marginRight: 4 }} />
              ONLINE [ACTIVE]
            </span>
          </div>

          <div className="telemetry-box">
            <span className="telemetry-label">DEFCON LEVEL</span>
            <span className="telemetry-val" style={{ color: criticalCount > 0 ? 'var(--neon-red)' : 'var(--neon-cyan)' }}>
              <ShieldAlert size={13} style={{ display: 'inline', marginRight: 4 }} />
              {criticalCount > 3 ? 'DEFCON 1' : criticalCount > 0 ? 'DEFCON 2' : 'DEFCON 3'}
            </span>
          </div>

          <div className="telemetry-box">
            <span className="telemetry-label">SIGINT THROUGHPUT</span>
            <span className="telemetry-val" style={{ color: 'var(--neon-cyan)' }}>
              <Wifi size={13} style={{ display: 'inline', marginRight: 4 }} />
              {netSpeed}
            </span>
          </div>

          <div className="telemetry-box">
            <span className="telemetry-label">INTERCEPTED EVENTS</span>
            <span className="telemetry-val" style={{ color: '#fff' }}>
              <Globe size={13} style={{ display: 'inline', marginRight: 4 }} />
              {visibleEventsCount} / {totalEventsCount}
            </span>
          </div>
        </div>

        {/* Right Tools & Clock */}
        <div className="hud-right-deck">
          <div className="clock-display">
            <div className="clock-utc">UTC: {clockUtc.split(' ').slice(4, 5).join('') || '00:00:00'}</div>
            <div className="clock-local">LOCAL: {clockLocal}</div>
          </div>

          <button 
            className={`hud-btn ${isPlaying ? 'active' : ''}`}
            onClick={() => {
              cyberAudio.playClick();
              onPlayToggle();
            }}
            title="Toggle Live Playback Stream"
          >
            {isPlaying ? 'PAUSE' : 'STREAM'}
          </button>

          <button 
            className="hud-btn"
            onClick={() => {
              cyberAudio.playClick();
              onSpeedToggle();
            }}
            title="Playback Speed"
          >
            <FastForward size={14} style={{ marginRight: 4 }} />
            {playbackSpeed}x
          </button>

          <button 
            className="hud-btn icon-btn"
            onClick={toggleSound}
            title={isMuted ? "Unmute Cyber SFX" : "Mute Cyber SFX"}
          >
            {isMuted ? <VolumeX size={16} color="#888" /> : <Volume2 size={16} color="var(--neon-green)" />}
          </button>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="hud-category-bar">
        <span className="category-label">INTEL FILTER:</span>
        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                cyberAudio.playClick();
                onSelectCategory(cat);
              }}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default CyberHUD;
