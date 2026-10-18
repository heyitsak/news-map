import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Terminal, Radio, Shield, Search, ArrowDownCircle, Cpu, Zap } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

const NewsTerminal = ({ newsEvents, activeDate, onSelectEvent, selectedEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterThreat, setFilterThreat] = useState('ALL');
  const contentRef = useRef(null);

  // Filter events up to activeDate
  const visibleEvents = newsEvents
    .filter(event => new Date(event.date) <= activeDate)
    .filter(event => {
      if (filterThreat !== 'ALL' && event.threat !== filterThreat) return false;
      if (searchQuery.trim() === '') return true;
      const q = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.content.toLowerCase().includes(q) ||
        event.source.toLowerCase().includes(q)
      );
    })
    .slice()
    .reverse();

  // Trigger audio on new incoming event
  const prevCountRef = useRef(visibleEvents.length);
  useEffect(() => {
    if (visibleEvents.length > prevCountRef.current) {
      cyberAudio.playIntercept();
    }
    prevCountRef.current = visibleEvents.length;
  }, [visibleEvents.length]);

  return (
    <aside className="terminal-overlay">
      {/* Header bar */}
      <div className="terminal-header">
        <div className="terminal-title">
          <Terminal size={16} color="var(--neon-green)" />
          <span>LIVE_INTERCEPT_STREAM</span>
        </div>
        <div className="terminal-live-badge">
          <Radio size={12} className="glitch" data-text="REC" />
          <span>{visibleEvents.length} SIGNALS</span>
        </div>
      </div>

      {/* Search & Threat Filter Bar */}
      <div className="terminal-filter-bar">
        <div className="search-input-wrap">
          <Search size={13} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="SCAN CIPHER / KEYWORD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="terminal-search-input"
          />
        </div>

        <div className="threat-filter-row">
          {['ALL', 'CRITICAL', 'HIGH', 'ELEVATED'].map((t) => (
            <button
              key={t}
              className={`threat-pill ${filterThreat === t ? 'active' : ''}`}
              onClick={() => {
                cyberAudio.playClick();
                setFilterThreat(t);
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stream List */}
      <div className="terminal-content" ref={contentRef}>
        {visibleEvents.length === 0 ? (
          <div className="terminal-empty-state">
            <Cpu size={24} className="spinning-icon" />
            <span>[NO TELEMETRY MATCHING PARAMETERS]</span>
            <span style={{ fontSize: '0.75em', color: 'var(--text-muted)' }}>
              SCRUB TIMELINE FORWARD OR RESET SEARCH
            </span>
          </div>
        ) : (
          visibleEvents.map((event) => {
            const isSelected = selectedEvent?.id === event.id;
            return (
              <div
                key={event.id}
                className={`news-item ${isSelected ? 'selected' : ''}`}
                style={{
                  borderLeftColor: event.threatData.color,
                  backgroundColor: isSelected ? 'rgba(57, 255, 20, 0.12)' : undefined
                }}
                onClick={() => {
                  cyberAudio.playClick();
                  onSelectEvent(event);
                }}
              >
                <div className="news-item-top">
                  <span
                    className="threat-badge"
                    style={{
                      color: event.threatData.color,
                      borderColor: event.threatData.color,
                      backgroundColor: event.threatData.bg
                    }}
                  >
                    {event.threat}
                  </span>
                  <span className="news-item-time">
                    {format(new Date(event.date), 'MM-dd HH:mm')} // {event.location}
                  </span>
                </div>

                <h4 className="news-item-title">{event.title}</h4>

                <p className="news-item-desc">{event.content}</p>

                <div className="news-item-footer">
                  <span>SRC: {event.source}</span>
                  <span>SIG: {event.hash}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Terminal Telemetry Footer Ticker */}
      <div className="terminal-footer-ticker">
        <span className="ticker-label">DECRYPT_STREAM:</span>
        <marquee className="ticker-text" scrollamount="4">
          // SYS_LOAD: 98.2% // PACKET_BUFFER: OPTIMAL // QUANTUM_LATTICE: SYNCHRONIZED // DEFCON_ACTIVE // SIGINT_FEED_ACTIVE //
        </marquee>
      </div>
    </aside>
  );
};

export default NewsTerminal;
