import React from 'react';
import { format } from 'date-fns';
import { Play, Pause, SkipBack, SkipForward, Calendar, Clock, Zap } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

const TimelineSlider = ({
  dates,
  activeDateIndex,
  onChange,
  isPlaying,
  onPlayToggle,
  onQuickJump
}) => {
  if (!dates || dates.length === 0) return null;
  const activeDate = dates[activeDateIndex] || dates[0];

  const handleSliderChange = (val) => {
    cyberAudio.playClick();
    onChange(val);
  };

  const handleStep = (direction) => {
    cyberAudio.playClick();
    const nextIdx = Math.max(0, Math.min(dates.length - 1, activeDateIndex + direction));
    onChange(nextIdx);
  };

  const handleDatePicker = (e) => {
    const selectedTime = new Date(e.target.value).getTime();
    if (isNaN(selectedTime)) return;
    // Find closest date in dates array
    let closestIdx = 0;
    let minDiff = Infinity;
    dates.forEach((d, idx) => {
      const diff = Math.abs(d.getTime() - selectedTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    cyberAudio.playAlert();
    onChange(closestIdx);
  };

  return (
    <footer className="timeline-container">
      {/* Play / Step Controls */}
      <div className="timeline-playback-controls">
        <button 
          className="timeline-ctrl-btn" 
          onClick={() => handleStep(-1)}
          title="Step Backward (2h)"
        >
          <SkipBack size={15} />
        </button>

        <button 
          className={`timeline-ctrl-btn play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={() => {
            cyberAudio.playClick();
            onPlayToggle();
          }}
          title={isPlaying ? "Pause Timeline Stream" : "Play Timeline Stream"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button 
          className="timeline-ctrl-btn" 
          onClick={() => handleStep(1)}
          title="Step Forward (2h)"
        >
          <SkipForward size={15} />
        </button>
      </div>

      {/* Main Timeline Slider and Labels */}
      <div className="slider-wrapper">
        <div className="slider-labels">
          <div className="slider-label-left">
            <span>BEGIN: {format(dates[0], 'MM/dd HH:mm')}</span>
          </div>

          <div className="slider-label-center">
            <Clock size={14} color="var(--neon-green)" />
            <span className="active-time-text glitch" data-text={format(activeDate, 'yyyy-MM-dd HH:mm:ss')}>
              {format(activeDate, 'yyyy-MM-dd HH:mm:ss')} (UTC)
            </span>
          </div>

          <div className="slider-label-right">
            <span>NOW: {format(dates[dates.length - 1], 'MM/dd HH:mm')}</span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max={dates.length - 1}
          value={activeDateIndex}
          onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
          className="cyber-slider"
        />
      </div>

      {/* Quick Jump & Calendar Date Jump Section */}
      <div className="timeline-jump-deck">
        <div className="quick-jump-presets">
          <button 
            className="preset-btn"
            onClick={() => {
              cyberAudio.playClick();
              onChange(0);
            }}
          >
            START
          </button>
          <button 
            className="preset-btn"
            onClick={() => {
              cyberAudio.playClick();
              onChange(Math.floor(dates.length / 2));
            }}
          >
            MID-WEEK
          </button>
          <button 
            className="preset-btn live-preset"
            onClick={() => {
              cyberAudio.playAlert();
              onChange(dates.length - 1);
            }}
          >
            <Zap size={11} style={{ marginRight: 2 }} /> LIVE NOW
          </button>
        </div>

        {/* Precise Date-Time input */}
        <div className="date-picker-wrap">
          <Calendar size={13} color="var(--neon-cyan)" />
          <input
            type="datetime-local"
            className="cyber-date-input"
            onChange={handleDatePicker}
            value={format(activeDate, "yyyy-MM-dd'T'HH:mm")}
          />
        </div>
      </div>
    </footer>
  );
};

export default TimelineSlider;
