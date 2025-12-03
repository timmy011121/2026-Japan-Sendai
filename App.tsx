
import React, { useState, useEffect, useRef } from 'react';
import { flights, itineraryData as initialItineraryData, packingList as initialChecklist } from './data';
import { ItemType, ChecklistItem, ItineraryItem, DayPlan } from './types';
import { getSpotInfo } from './services/geminiService';
import { AIModal } from './components/AIModal';

// --- Components ---

const TabButton = ({ active, icon, label, onClick }: { active: boolean; icon: string; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center w-full relative group h-full"
  >
    {/* Active Glow Background: Reduced height to fit new nav bar */}
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[48px] rounded-[24px] transition-all duration-500 ease-out ${active ? 'bg-white/15 opacity-100 scale-100' : 'bg-transparent opacity-0 scale-75'}`}></div>
    
    {/* Icon: Scaled 30% up */}
    <i className={`${icon} text-xl mb-1 relative z-10 transition-all duration-300 scale-[1.3] origin-center ${active ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-y-0.5' : 'text-white/40 group-hover:text-white/60'}`}></i>
    
    {/* Label: Size unchanged */}
    <span className={`text-[10px] font-bold tracking-wide relative z-10 transition-all duration-300 ${active ? 'text-white' : 'text-white/40'}`}>{label}</span>
  </button>
);

const SectionHeader = ({ title, icon, action }: { title: string; icon: string; action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-6 px-2 animate-fade-in">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <i className={`${icon} text-lg bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70`}></i>
      </div>
      <h2 className="text-2xl font-bold text-glass-primary tracking-tight drop-shadow-sm">{title}</h2>
    </div>
    {action && <div>{action}</div>}
  </div>
);

const FlightCard = ({ flight }: { flight: any }) => (
  <div className="glass-panel p-6 mb-5 relative group overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.15)] cursor-default">
    {/* Decorative sheen */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold shadow-sm group-hover:bg-white/20 transition-colors">
            {flight.airline}
          </span>
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 mt-3 drop-shadow-lg tracking-tight font-sans">
            {flight.number}
          </div>
        </div>
        <div className="text-right">
          <div className="text-glass-secondary text-sm font-semibold tracking-wide">{flight.date}</div>
          <div className="text-xs text-emerald-300 mt-1 font-bold flex items-center justify-end gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 w-fit ml-auto">
            <i className="fa-solid fa-suitcase"></i> {flight.baggage}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm bg-black/5 rounded-2xl p-5 backdrop-blur-sm border border-white/10 shadow-inner relative overflow-hidden group-hover:bg-black/10 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-slow"></div>
        <div className="text-center z-10">
           <div className="text-2xl font-bold text-white">{flight.route.split('➔')[0].trim()}</div>
           <div className="text-white/40 text-xs mt-1 font-medium">{flight.terminal.split('/')[0]}</div>
        </div>
        <div className="flex-1 px-6 flex flex-col items-center z-10">
          <div className="text-xs text-glass-secondary mb-2 font-mono">{flight.time}</div>
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent relative">
             <i className="fa-solid fa-plane text-sm text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform"></i>
          </div>
        </div>
        <div className="text-center z-10">
           <div className="text-2xl font-bold text-white">{flight.route.split('➔')[1].trim()}</div>
           <div className="text-white/40 text-xs mt-1 font-medium">{flight.terminal.split('/')[1]}</div>
        </div>
      </div>
    </div>
  </div>
);

const ItineraryCard = ({ item, onAskAI, isLast }: { item: ItineraryItem; onAskAI: (name: string) => void; isLast: boolean }) => {
  let iconClass = 'fa-solid fa-location-dot';
  let colorClass = 'text-cyan-300'; 
  let bgGradient = 'from-cyan-500/20 to-blue-500/5';
  
  if (item.type === ItemType.Food) {
    iconClass = 'fa-solid fa-utensils';
    colorClass = 'text-orange-300';
    bgGradient = 'from-orange-500/20 to-red-500/5';
  } else if (item.type === ItemType.Transport) {
    iconClass = 'fa-solid fa-train-subway';
    colorClass = 'text-emerald-300';
    bgGradient = 'from-emerald-500/20 to-teal-500/5';
  } else if (item.type === ItemType.Hotel) {
    iconClass = 'fa-solid fa-bed';
    colorClass = 'text-indigo-300';
    bgGradient = 'from-indigo-500/20 to-violet-500/5';
  } else if (item.type === ItemType.Flight) {
    iconClass = 'fa-solid fa-plane-departure';
    colorClass = 'text-rose-300';
    bgGradient = 'from-rose-500/20 to-pink-500/5';
  }

  const showMap = item.type === ItemType.Spot || item.type === ItemType.Food || item.type === ItemType.Hotel;
  const showAI = item.type === ItemType.Spot;

  // Unified styling with Checklist panel: glass-panel
  const panelClass = 'glass-panel p-5 hover:bg-white/10 transition-all duration-300 group overflow-hidden border border-white/10';

  return (
    <div className="relative pl-8 pb-12">
      {/* Connecting Vertical Line */}
      {!isLast && (
        <div className={`absolute left-[-1px] top-2 bottom-[-8px] w-[2px] z-0 ${item.isImportant ? 'bg-gradient-to-b from-cyan-400 to-cyan-400/20' : 'bg-gradient-to-b from-white/20 to-white/5'}`}></div>
      )}
      
      {/* Dot Decoration */}
      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 z-10 ${item.isImportant ? 'bg-cyan-400 shadow-cyan-400/50 scale-110' : 'bg-white/10 backdrop-blur-md'}`}></div>
      
      <div className={panelClass}>
        {/* Subtle background gradient hint */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${bgGradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -translate-y-10 translate-x-10`}></div>
        
        <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-bold font-mono px-2 py-1 rounded-md backdrop-blur-md border border-white/10 ${item.isImportant ? 'bg-cyan-500/20 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'bg-white/5 text-white/50'}`}>
                  {item.time}
              </span>
              {item.duration && (
                <span className="text-xs text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 shadow-sm">
                  <i className="fa-regular fa-clock mr-1 text-[10px]"></i>{item.duration}
                </span>
              )}
              {item.price && (
                <span className="text-xs text-yellow-300 font-bold bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20 shadow-sm ml-auto">
                  {item.price}
                </span>
              )}
            </div>
            
            <h4 className="font-bold text-glass-primary text-lg flex items-start gap-3 drop-shadow-md mt-2">
             <div className={`mt-1 p-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-inner shrink-0`}>
                <i className={`${iconClass} ${colorClass} text-sm filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`}></i>
             </div>
             {item.title}
            </h4>
            
            {item.note && (
            <p className="text-glass-secondary text-sm mt-3 leading-relaxed pl-1">
                {item.note}
            </p>
            )}

            {(showMap || showAI) && (
            <div className="flex flex-wrap gap-3 mt-5">
                {showMap && (
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location || item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button px-4 py-2 rounded-xl text-xs font-bold text-white/90 hover:text-white flex items-center gap-2"
                >
                    <i className="fa-solid fa-map-location-dot text-emerald-300 drop-shadow"></i> 地圖
                </a>
                )}
                
                {showAI && (
                <button
                    onClick={() => onAskAI(item.location || item.title)}
                    className="glass-button px-4 py-2 rounded-xl text-xs font-bold text-white/90 hover:text-white flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/30"
                >
                    <i className="fa-solid fa-wand-magic-sparkles text-purple-300 drop-shadow-[0_0_5px_rgba(216,180,254,0.6)]"></i> AI 導遊
                </button>
                )}
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'itinerary' | 'checklist' | 'info'>('home');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  // Itinerary State
  const [itinerary, setItinerary] = useState<DayPlan[]>(initialItineraryData);
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize with the first day selected
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [day10Plan, setDay10Plan] = useState<'A' | 'B'>('A');
  
  // AI Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [aiTitle, setAiTitle] = useState('');
  const [aiContent, setAiContent] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Nav Visibility
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll ref for horizontal itinerary strip
  const dateStripRef = useRef<HTMLDivElement>(null);

  // Backup type translation
  const typeMap: Record<string, string> = {
    lunch: '午餐',
    dinner: '晚餐',
    dessert: '甜點',
    cafe: '咖啡廳'
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('tohoku_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(savedTheme);
    } else {
       document.documentElement.classList.add('dark');
    }

    const savedChecklist = localStorage.getItem('tohoku_checklist_v2');
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    }
    
    // Attempt to load saved itinerary order
    const savedItinerary = localStorage.getItem('tohoku_itinerary_v1');
    if (savedItinerary) {
        setItinerary(JSON.parse(savedItinerary));
    }

    const targetDate = new Date('2026-01-12T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays > 0 ? diffDays : 0);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling Down
        setIsNavVisible(false);
      } else {
        // Scrolling Up
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('tohoku_checklist_v2', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('tohoku_itinerary_v1', JSON.stringify(itinerary));
  }, [itinerary]);

  // Scroll active day into view when selected
  // FIX: Use container scroll instead of scrollIntoView to prevent page jumping
  useEffect(() => {
    if (dateStripRef.current) {
        const container = dateStripRef.current;
        const activeBtn = container.children[selectedDayIndex] as HTMLElement;
        
        if (activeBtn) {
            // Calculate position to center the element in the container
            const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }
  }, [selectedDayIndex]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('tohoku_theme', newTheme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
  };

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleAskAI = async (spotName: string) => {
    setAiTitle(spotName);
    setAiContent('');
    setAiLoading(true);
    setModalOpen(true);
    
    const result = await getSpotInfo(spotName);
    setAiContent(result);
    setAiLoading(false);
  };

  // --- Edit Logic ---

  const moveItem = (dayIndex: number, itemToMove: ItineraryItem, direction: 'up' | 'down') => {
    const newItinerary = [...itinerary];
    const dayItems = newItinerary[dayIndex].items;
    
    const currentIndex = dayItems.indexOf(itemToMove);
    if (currentIndex === -1) return;

    let targetIndex = -1;
    if (direction === 'up') {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (!dayItems[i].plan || dayItems[i].plan === itemToMove.plan || !itemToMove.plan) {
                targetIndex = i;
                break;
            }
        }
    } else {
        for (let i = currentIndex + 1; i < dayItems.length; i++) {
             if (!dayItems[i].plan || dayItems[i].plan === itemToMove.plan || !itemToMove.plan) {
                targetIndex = i;
                break;
            }
        }
    }

    if (targetIndex !== -1) {
        [dayItems[currentIndex], dayItems[targetIndex]] = [dayItems[targetIndex], dayItems[currentIndex]];
        setItinerary(newItinerary);
    }
  };

  const updateTime = (dayIndex: number, itemToUpdate: ItineraryItem, newTime: string) => {
      const newItinerary = [...itinerary];
      const item = newItinerary[dayIndex].items.find(i => i === itemToUpdate);
      if (item) {
          item.time = newTime;
          setItinerary(newItinerary);
      }
  };

  // --- Views ---

  const renderHome = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
       {/* Removed Weather Glass Widget */}

       {/* Countdown Glass */}
       <div className="glass-panel p-6 flex justify-between items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-pulse"></div>
               <span className="text-glass-secondary text-[10px] uppercase tracking-widest font-bold">Departure</span>
            </div>
            <div className="text-glass-primary font-bold text-xl drop-shadow-md">2026.01.12</div>
          </div>
          <div className="relative z-10 flex flex-col items-end">
             <div className="flex items-baseline gap-1 text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 to-emerald-500 drop-shadow-sm">
                <span className="text-6xl font-black tracking-tighter">{daysRemaining}</span>
                <span className="text-sm font-bold opacity-80 mb-2">DAYS</span>
             </div>
          </div>
       </div>

       {/* Flights */}
       <div>
         <SectionHeader title="航班資訊" icon="fa-solid fa-plane-up" />
         {flights.map((f, i) => <FlightCard key={i} flight={f} />)}
       </div>

       {/* Glass Tiles */}
       <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setActiveTab('itinerary')} className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 text-left group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-500/30 transition-colors"></div>
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.1)] backdrop-blur-md">
                <i className="fa-solid fa-map text-blue-200 text-2xl drop-shadow"></i>
             </div>
             <span className="text-glass-primary font-bold block text-lg relative z-10">查看行程</span>
             <p className="text-glass-secondary text-xs mt-1 relative z-10 font-medium">12 Days Plan</p>
          </button>
          <button onClick={() => setActiveTab('checklist')} className="glass-panel p-6 hover:bg-white/10 transition-all duration-300 text-left group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full group-hover:bg-emerald-500/30 transition-colors"></div>
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.1)] backdrop-blur-md">
                <i className="fa-solid fa-suitcase text-emerald-200 text-2xl drop-shadow"></i>
             </div>
             <span className="text-glass-primary font-bold block text-lg relative z-10">行李清單</span>
             <p className="text-glass-secondary text-xs mt-1 relative z-10 font-medium">Checklist</p>
          </button>
       </div>
    </div>
  );

  const renderItinerary = () => {
    const activeDay = itinerary[selectedDayIndex];
    const hasPlans = activeDay.items.some(i => i.plan);
    const filteredItems = activeDay.items.filter(item => !item.plan || item.plan === day10Plan);

    return (
      <div className="pb-28 animate-fade-in">
        {/* Header with Edit Toggle */}
        <SectionHeader 
            title="每日行程" 
            icon="fa-regular fa-calendar-days" 
            action={
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all ${isEditing ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}
                >
                    {isEditing ? <><i className="fa-solid fa-check mr-1"></i> 完成</> : <><i className="fa-solid fa-pen mr-1"></i> 編輯</>}
                </button>
            }
        />

        {/* Horizontal Date Strip - Sticky Wrapper */}
        <div className="sticky top-[68px] z-30 pb-4 pt-2 -mx-5 px-5 bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-sm mb-6 transition-all duration-300">
            <div 
              ref={dateStripRef}
              className="flex overflow-x-auto no-scrollbar gap-3 px-1 snap-x"
            >
              {itinerary.map((day, idx) => {
                const isSelected = selectedDayIndex === idx;
                
                // Visual style for Day Badges in the Strip - Unified Red for all days
                const activeGradient = 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/40';

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`snap-center shrink-0 rounded-2xl p-3 min-w-[70px] flex flex-col items-center justify-center border transition-all duration-300 ${isSelected ? `${activeGradient} border-white/20 text-white scale-105 shadow-lg` : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-80">{day.dayLabel}</span>
                    <span className="text-xl font-bold leading-tight mt-0.5">{day.date.split('/')[2]}</span>
                  </button>
                );
              })}
            </div>
        </div>

        {/* Content Area for Selected Day */}
        <div className="animate-fade-in">
           {/* City Header & Weather */}
           <div className="mb-6 px-2">
             <h3 className="text-2xl font-bold text-white drop-shadow-md">{activeDay.city}</h3>
             <p className="text-sm font-mono text-white/60 mt-1 mb-4">{activeDay.date}</p>
             
             {/* Weather Card */}
             {activeDay.weather && (
               <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
                 <div className="relative w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-200 border border-white/10 shadow-inner">
                   <i className={`fa-solid ${activeDay.weather.icon} text-xl drop-shadow`}></i>
                 </div>
                 <div className="relative">
                   <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-0.5">
                     {activeDay.weather.location} • Weather
                   </div>
                   <div className="flex items-baseline gap-2">
                     <span className="text-2xl font-black text-white">{activeDay.weather.temp}</span>
                     <span className="text-sm font-bold text-white/80">{activeDay.weather.condition}</span>
                   </div>
                 </div>
               </div>
             )}
           </div>

           {hasPlans && (
            <div className="flex p-1.5 bg-black/20 rounded-2xl mb-6 mx-1 border border-white/5 backdrop-blur-md shadow-inner relative overflow-hidden">
                <div className={`absolute top-1.5 bottom-1.5 rounded-xl bg-white/10 border border-white/10 shadow-lg backdrop-blur-md transition-all duration-300 w-[calc(50%-6px)] ${day10Plan === 'A' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}></div>
                <button 
                onClick={() => setDay10Plan('A')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all relative z-10 ${day10Plan === 'A' ? 'text-cyan-200' : 'text-white/40 hover:text-white/70'}`}
                >
                方案 A: 河口湖
                </button>
                <button 
                onClick={() => setDay10Plan('B')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all relative z-10 ${day10Plan === 'B' ? 'text-cyan-200' : 'text-white/40 hover:text-white/70'}`}
                >
                方案 B: 東京市區
                </button>
            </div>
           )}

           <div>
              {filteredItems.map((item, idx) => (
                  <div key={idx} className="transition-all duration-300">
                      {isEditing ? (
                          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 mb-4">
                              <div className="flex flex-col gap-1">
                                  <button 
                                      onClick={() => moveItem(selectedDayIndex, item, 'up')}
                                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-colors"
                                  >
                                      <i className="fa-solid fa-chevron-up text-xs"></i>
                                  </button>
                                  <button 
                                      onClick={() => moveItem(selectedDayIndex, item, 'down')}
                                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-colors"
                                  >
                                      <i className="fa-solid fa-chevron-down text-xs"></i>
                                  </button>
                              </div>
                              <div className="flex-1 min-w-0">
                                  <input 
                                      type="text" 
                                      value={item.time} 
                                      onChange={(e) => updateTime(selectedDayIndex, item, e.target.value)}
                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 mb-1"
                                  />
                                  <div className="text-sm font-bold text-white/80 truncate">{item.title}</div>
                              </div>
                          </div>
                      ) : (
                          // Itinerary Card now uses standardized glass-panel styling
                          <ItineraryCard 
                            item={item} 
                            onAskAI={handleAskAI} 
                            isLast={idx === filteredItems.length - 1} 
                          />
                      )}
                  </div>
              ))}
           </div>

           {activeDay.backupDining.length > 0 && !isEditing && (
              <div className="mt-10 pt-8 border-t border-white/10 border-dashed relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 text-[10px] text-white/60 uppercase tracking-widest backdrop-blur-xl shadow-lg">
                  Backup Options
                </div>
                <h5 className="text-xs font-bold text-glass-secondary mb-5 flex items-center gap-2 pl-2">
                  <i className="fa-solid fa-utensils text-white/30"></i>
                  候補美食 & 甜點
                </h5>
                <div className="grid grid-cols-1 gap-3">
                  {activeDay.backupDining.map((food, fIdx) => (
                    <div key={fIdx} className="glass-panel p-4 flex items-center justify-between hover:bg-white/15 transition-all group bg-white/5 border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full shadow-[0_0_8px] border border-white/20 ${food.type === 'dessert' ? 'bg-pink-400 shadow-pink-400/50' : 'bg-orange-400 shadow-orange-400/50'}`}></div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-glass-primary font-bold text-sm group-hover:translate-x-1 transition-transform">{food.name}</span>
                                {food.category && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white/70 whitespace-nowrap">
                                        {food.category}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-glass-secondary">
                                <span className="uppercase tracking-wide font-bold text-white/50">{typeMap[food.type] || food.type}</span>
                                {food.note && <span className="text-white/30">•</span>}
                                {food.note && <span className="opacity-80">{food.note}</span>}
                            </div>
                          </div>
                        </div>
                        
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.name + ' ' + activeDay.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all border border-white/10 shadow-sm hover:shadow-md hover:scale-110"
                        >
                          <i className="fa-solid fa-map-location-dot text-sm"></i>
                        </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  };

  const renderChecklist = () => {
    const categories = Array.from(new Set(checklist.map(i => i.category)));
    const progress = Math.round((checklist.filter(i => i.checked).length / checklist.length) * 100);

    return (
      <div className="pb-24 animate-fade-in">
        <SectionHeader title="行前準備" icon="fa-solid fa-clipboard-check" />
        
        <div className="mb-8 glass-panel p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full"></div>
          
          <div className="flex justify-between text-sm mb-4 relative z-10">
            <span className="text-glass-secondary font-bold tracking-wide">Packing Progress</span>
            <span className="text-cyan-300 font-black text-xl drop-shadow-sm">{progress}%</span>
          </div>
          
          <div className="relative z-10 w-full bg-black/20 rounded-full h-4 overflow-hidden border border-white/5 shadow-inner backdrop-blur-sm">
            <div 
                className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(34,211,238,0.6)] relative overflow-hidden" 
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #22d3ee, #3b82f6)' }}
            >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map(cat => (
            <div key={cat} className="glass-panel p-5 hover:bg-white/10 transition-colors duration-300">
              <h3 className="text-glass-primary font-bold text-xs uppercase tracking-[0.15em] mb-4 border-b border-white/10 pb-3 flex items-center gap-2 opacity-80">
                 <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_white]"></div>
                 {cat}
              </h3>
              <div className="space-y-2">
                {checklist.filter(i => i.category === cat).map(item => (
                  <label key={item.id} className="flex items-center p-3.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all group border border-transparent hover:border-white/5 active:scale-98">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={item.checked} 
                        onChange={() => toggleCheck(item.id)}
                        className="peer appearance-none w-6 h-6 rounded-lg border border-white/30 checked:bg-gradient-to-br checked:from-cyan-400 checked:to-blue-500 checked:border-transparent transition-all bg-white/5 shadow-inner"
                      />
                      <i className="fa-solid fa-check text-xs text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity drop-shadow-sm scale-0 peer-checked:scale-100 duration-200"></i>
                    </div>
                    <span className={`ml-4 text-sm font-medium transition-all duration-300 ${item.checked ? 'text-white/20 line-through decoration-white/20' : 'text-glass-primary group-hover:text-white'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInfo = () => (
    <div className="pb-24 animate-fade-in">
      <SectionHeader title="實用資訊" icon="fa-solid fa-circle-info" />
      
      <div className="space-y-5">
        {/* Removed Theme Toggle */}

        <div className="glass-panel p-6 relative overflow-hidden">
           <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-500/10 blur-3xl rounded-full"></div>
           
           <h3 className="text-glass-primary font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-4 relative z-10">
             <div className="p-1.5 bg-rose-500/20 rounded-lg border border-rose-500/30">
                <i className="fa-solid fa-phone text-rose-400 drop-shadow-[0_0_5px_rgba(251,113,133,0.5)] text-sm"></i>
             </div>
             緊急聯絡
           </h3>
           <div className="space-y-5 relative z-10">
              <div className="flex justify-between items-center group">
                <span className="text-glass-secondary font-medium group-hover:text-white transition-colors">警察局</span>
                <a href="tel:110" className="glass-button px-4 py-2 rounded-xl text-white font-mono font-bold text-lg hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-200">110</a>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-glass-secondary font-medium group-hover:text-white transition-colors">救護車/火警</span>
                <a href="tel:119" className="glass-button px-4 py-2 rounded-xl text-white font-mono font-bold text-lg hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-200">119</a>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-glass-secondary font-medium group-hover:text-white transition-colors">外交部旅外救助</span>
                <a href="tel:+81-3-3280-7111" className="glass-button px-4 py-2 rounded-xl text-white font-mono font-bold text-sm hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-200">+81-3-3280-7111</a>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Removed Prohibited Items Link */}
          
          <a href="https://vjw-lp.digital.go.jp/zh-hant/" target="_blank" className="glass-panel p-5 flex items-center justify-between hover:bg-white/10 transition-all group active:scale-98">
             <span className="flex items-center gap-5">
               <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shadow-lg">
                 <i className="fa-solid fa-qrcode text-purple-300 drop-shadow"></i>
               </div>
               <span className="text-glass-primary font-bold text-lg">Visit Japan Web</span>
             </span>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <i className="fa-solid fa-chevron-right text-white/50 group-hover:text-white text-xs"></i>
             </div>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#121212] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-100 pb-24 transition-colors duration-500 relative overflow-x-hidden`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-md mx-auto min-h-screen relative z-10 shadow-2xl bg-black/20 backdrop-blur-sm border-x border-white/5">
        
        {/* Header - Sticky */}
        <header className="sticky top-0 z-40 px-6 py-5 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-lg transition-all duration-300">
           <div>
              <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 drop-shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-mountain-sun text-lg text-white"></i>
                TOHOKU
              </h1>
              <p className="text-[10px] font-bold text-glass-secondary tracking-[0.2em] uppercase mt-0.5">Winter Trip 2026</p>
           </div>
           {/* Removed Theme Toggle Button from Header */}
        </header>

        {/* Main Content */}
        <main className="p-5 min-h-[calc(100vh-80px)]">
           {activeTab === 'home' && renderHome()}
           {activeTab === 'itinerary' && renderItinerary()}
           {activeTab === 'checklist' && (
             <div className="pb-24 animate-fade-in">
               <SectionHeader title="行李清單" icon="fa-solid fa-clipboard-check" />
               <div className="space-y-3">
                 {checklist.map(item => (
                   <div 
                    key={item.id} 
                    onClick={() => toggleCheck(item.id)}
                    className={`glass-panel p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-all border border-white/10 group ${item.checked ? 'bg-emerald-500/10 border-emerald-500/20' : ''}`}
                   >
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-inner ${item.checked ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] scale-110' : 'border-white/20 bg-black/20 group-hover:border-white/40'}`}>
                       {item.checked && <i className="fa-solid fa-check text-xs text-white drop-shadow-md"></i>}
                     </div>
                     <div className="flex-1">
                        <span className={`text-base font-bold transition-all ${item.checked ? 'text-emerald-200 line-through decoration-emerald-500/50 decoration-2 opacity-70' : 'text-glass-primary'}`}>
                          {item.text}
                        </span>
                        <div className="text-[10px] font-bold tracking-wider uppercase mt-0.5 opacity-60 flex items-center gap-1">
                           <span className={`w-1.5 h-1.5 rounded-full ${item.checked ? 'bg-emerald-500/50' : 'bg-white/30'}`}></span>
                           {item.category}
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
               
               {/* Progress Bar */}
               <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[400px] bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20">
                  <div className="flex justify-between text-xs font-bold text-white mb-2">
                     <span className="text-glass-secondary">Progress</span>
                     <span>{Math.round((checklist.filter(i => i.checked).length / checklist.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-500 ease-out"
                       style={{ width: `${(checklist.filter(i => i.checked).length / checklist.length) * 100}%` }}
                     ></div>
                  </div>
               </div>
             </div>
           )}
           {activeTab === 'info' && (
              <div className="animate-fade-in">
                  <SectionHeader title="旅遊資訊" icon="fa-solid fa-circle-info" />
                  <div className="glass-panel p-6 text-center text-glass-secondary">
                      <i className="fa-solid fa-person-digging text-4xl mb-4 opacity-50"></i>
                      <p>建置中...</p>
                  </div>
              </div>
           )}
        </main>

        {/* Bottom Nav */}
        <nav className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : 'translate-y-full'}`}>
           <div className="max-w-md mx-auto">
             <div className="bg-black/60 backdrop-blur-xl border-t border-white/10 pb-safe pt-2 px-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
               <div className="grid grid-cols-4 h-16 items-center">
                 <TabButton active={activeTab === 'home'} icon="fa-solid fa-house" label="Home" onClick={() => setActiveTab('home')} />
                 <TabButton active={activeTab === 'itinerary'} icon="fa-solid fa-map-location-dot" label="Plan" onClick={() => setActiveTab('itinerary')} />
                 <TabButton active={activeTab === 'checklist'} icon="fa-solid fa-list-check" label="List" onClick={() => setActiveTab('checklist')} />
                 <TabButton active={activeTab === 'info'} icon="fa-solid fa-circle-info" label="Info" onClick={() => setActiveTab('info')} />
               </div>
             </div>
           </div>
        </nav>

        {/* AI Modal */}
        <AIModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={aiTitle} 
          content={aiContent} 
          isLoading={aiLoading} 
        />
        
      </div>
    </div>
  );
}
