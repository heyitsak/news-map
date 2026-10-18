import React, { useState, useEffect, useMemo } from 'react';
import CyberMap from './components/CyberMap';
import TimelineSlider from './components/TimelineSlider';
import NewsTerminal from './components/NewsTerminal';
import CyberHUD from './components/CyberHUD';
import { generateNewsDatabase, generateDateSteps, CATEGORIES } from './data/mockNews';
import './cyber-theme.css';

function App() {
  // Generate static database once
  const newsDatabase = useMemo(() => generateNewsDatabase(), []);
  const dateSteps = useMemo(() => generateDateSteps(newsDatabase), [newsDatabase]);

  // Start with the latest date index so the map and terminal are immediately brimming with live data!
  const [activeDateIndex, setActiveDateIndex] = useState(() => Math.max(0, dateSteps.length - 1));
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 2x, 5x, 10x

  const activeDate = dateSteps[activeDateIndex] || new Date();

  // Filter events by selected category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'ALL') return newsDatabase;
    return newsDatabase.filter(e => e.category === selectedCategory);
  }, [newsDatabase, selectedCategory]);

  // Count active critical events up to activeDate
  const criticalCount = useMemo(() => {
    return filteredEvents.filter(
      e => new Date(e.date) <= activeDate && e.threat === 'CRITICAL'
    ).length;
  }, [filteredEvents, activeDate]);

  const visibleEventsCount = useMemo(() => {
    return filteredEvents.filter(e => new Date(e.date) <= activeDate).length;
  }, [filteredEvents, activeDate]);

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying) return;

    // Interval inversely proportional to speed: 1x = 2000ms, 2x = 1000ms, 5x = 400ms, 10x = 200ms
    const intervalMs = Math.max(150, Math.floor(2000 / playbackSpeed));

    const timer = setInterval(() => {
      setActiveDateIndex((prev) => {
        if (prev < dateSteps.length - 1) {
          return prev + 1;
        } else {
          // Loop back or stay at end
          return 0;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, dateSteps.length]);

  const handleSpeedToggle = () => {
    const speeds = [1, 2, 5, 10];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="app-container">
      {/* Scanline CRT overlay */}
      <div className="scanlines"></div>

      {/* Cyber HUD Header */}
      <CyberHUD
        activeDate={activeDate}
        totalEventsCount={filteredEvents.length}
        visibleEventsCount={visibleEventsCount}
        criticalCount={criticalCount}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={CATEGORIES}
        playbackSpeed={playbackSpeed}
        onSpeedToggle={handleSpeedToggle}
        isPlaying={isPlaying}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
      />

      {/* Main Tactical Map Viewport */}
      <div className="main-viewport">
        <CyberMap
          newsEvents={filteredEvents}
          activeDate={activeDate}
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
        />

        {/* Live Intercept Signal Feed Terminal */}
        <NewsTerminal
          newsEvents={filteredEvents}
          activeDate={activeDate}
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
        />
      </div>

      {/* Bottom Timeline Control Deck */}
      <TimelineSlider
        dates={dateSteps}
        activeDateIndex={activeDateIndex}
        onChange={setActiveDateIndex}
        isPlaying={isPlaying}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
      />
    </div>
  );
}

export default App;
