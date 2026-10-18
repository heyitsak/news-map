import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup
} from 'react-simple-maps';
import { Crosshair, ShieldAlert, Radio, X, MapPin } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CyberMap = ({ newsEvents, activeDate, onSelectEvent, selectedEvent }) => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [mapPosition, setMapPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  // Filter events up to the active date
  const visibleEvents = newsEvents.filter(event => new Date(event.date) <= activeDate);

  const handleMarkerClick = (event) => {
    cyberAudio.playAlert();
    onSelectEvent(event);
  };

  return (
    <div className="map-container">
      {/* Tactical Radar HUD overlay */}
      <div className="map-hud-overlay">
        <div className="hud-corner top-left">
          <span>LAT/LON GRID: 60°N / 120°W</span>
          <span>SENSOR: SAT-OPS-09</span>
        </div>
        <div className="hud-corner top-right">
          <span>ZOOM: {mapPosition.zoom.toFixed(1)}x</span>
          <span>TARGET LOCK: {selectedEvent ? selectedEvent.id : 'NONE'}</span>
        </div>
        <div className="hud-corner bottom-left">
          <span>PROJECTION: EQUIRADIAL SIGINT</span>
        </div>
      </div>

      {/* Radar sweep animation background circle */}
      <div className="radar-sweep-center"></div>

      <ComposableMap
        projectionConfig={{ scale: 145, center: [0, 20] }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ZoomableGroup
          zoom={mapPosition.zoom}
          center={mapPosition.coordinates}
          onMoveEnd={(pos) => setMapPosition(pos)}
          maxZoom={4}
          minZoom={1}
        >
          {/* Countries / Landmass Vector Grids */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(8, 28, 12, 0.4)"
                  stroke="rgba(57, 255, 20, 0.35)"
                  strokeWidth={0.6}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "rgba(57, 255, 20, 0.15)", stroke: "rgba(0, 240, 255, 0.8)", outline: "none", cursor: 'crosshair' },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Cyber Vector Attack Lines connecting source to target */}
          {visibleEvents.slice(-12).map((event) => {
            if (!event.target) return null;
            return (
              <Line
                key={`line-${event.id}`}
                from={[event.lng, event.lat]}
                to={[event.target[1], event.target[0]]}
                stroke={event.threatData.color}
                strokeWidth={1}
                strokeDasharray="3 3"
                style={{
                  default: { opacity: 0.6 },
                }}
              />
            );
          })}

          {/* Map Event Markers */}
          {visibleEvents.map((event) => {
            const eventTime = new Date(event.date).getTime();
            const activeTime = activeDate.getTime();
            const ageHours = (activeTime - eventTime) / (1000 * 60 * 60);
            const isFresh = ageHours < 6;
            const isSelected = selectedEvent?.id === event.id;

            const color = isSelected ? '#ffffff' : event.threatData.color;
            const radius = isSelected ? 8 : isFresh ? 6 : 4;

            return (
              <Marker 
                key={event.id} 
                coordinates={[event.lng, event.lat]}
                onClick={() => handleMarkerClick(event)}
                onMouseEnter={() => {
                  setHoveredEvent(event);
                  cyberAudio.playIntercept();
                }}
                onMouseLeave={() => setHoveredEvent(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Tactical Outer Pulsing Ring */}
                {isFresh && (
                  <circle r={radius * 2.5} fill="none" stroke={color} strokeWidth={1} opacity={0.8}>
                    <animate attributeName="r" from={radius} to={radius * 4.5} dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Target Crosshair on Selected or Fresh */}
                {isSelected && (
                  <g>
                    <line x1={-12} y1={0} x2={12} y2={0} stroke="#fff" strokeWidth={1} />
                    <line x1={0} y1={-12} x2={0} y2={12} stroke="#fff" strokeWidth={1} />
                    <circle r={14} fill="none" stroke="var(--neon-red)" strokeWidth={1} strokeDasharray="2 2" />
                  </g>
                )}

                {/* Core Marker Node */}
                <circle 
                  r={radius} 
                  fill={color} 
                  stroke="#000" 
                  strokeWidth={1.5}
                  style={{
                    filter: `drop-shadow(0 0 6px ${color})`
                  }}
                />

                {/* City Tag Label */}
                {(isFresh || isSelected) && (
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      fill: color,
                      fontWeight: "bold",
                      pointerEvents: "none",
                      textShadow: "0 0 4px #000"
                    }}
                  >
                    {event.location.split(',')[0]}
                  </text>
                )}
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Target Lock Dossier Card when an event is selected */}
      {selectedEvent && (
        <div className="target-dossier-card">
          <div className="dossier-header">
            <span className="dossier-threat" style={{ backgroundColor: selectedEvent.threatData.color }}>
              {selectedEvent.threat}
            </span>
            <span className="dossier-title">TARGET DOSSIER // {selectedEvent.hash}</span>
            <button className="dossier-close" onClick={() => onSelectEvent(null)}>
              <X size={14} />
            </button>
          </div>
          <div className="dossier-body">
            <h3 className="dossier-event-title">{selectedEvent.title}</h3>
            <div className="dossier-meta">
              <div><MapPin size={12} /> {selectedEvent.location}</div>
              <div><Radio size={12} /> SOURCE: {selectedEvent.source}</div>
              <div>IP: <span style={{ color: 'var(--neon-cyan)' }}>{selectedEvent.ipVector}</span></div>
              <div>RATE: <span style={{ color: 'var(--neon-green)' }}>{selectedEvent.packetRate}</span></div>
            </div>
            <p className="dossier-desc">{selectedEvent.content}</p>
          </div>
        </div>
      )}

      {/* Hover tooltip for quick preview */}
      {hoveredEvent && !selectedEvent && (
        <div 
          className="map-hover-tooltip"
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
          }}
        >
          <div style={{ color: hoveredEvent.threatData.color, fontWeight: 'bold' }}>
            [{hoveredEvent.threat}] {hoveredEvent.location}
          </div>
          <div style={{ color: '#fff', fontSize: '0.9em' }}>{hoveredEvent.title}</div>
        </div>
      )}
    </div>
  );
};

export default CyberMap;
