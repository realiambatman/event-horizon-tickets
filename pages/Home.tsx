import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Event } from '../types';
import { Search, SlidersHorizontal, ArrowDown } from 'lucide-react';

interface HomeProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const Home: React.FC<HomeProps> = ({ events, onEventSelect }) => {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];

  return (
    <div ref={containerRef} className="w-full bg-slate-50 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
        
        {/* Animated Background Text */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
          <h1 className="text-[20vw] font-display font-bold leading-none tracking-tighter text-slate-900 whitespace-nowrap">
            EVENT HORIZON
          </h1>
        </div>

        <div className="z-10 max-w-5xl pt-20 md:pt-0">
          <RevealText className="text-5xl md:text-8xl lg:text-9xl font-display font-bold text-slate-900 tracking-tighter leading-[0.9] mb-6 md:mb-8">
            EXPERIENCE <br /> THE UNFORGETTABLE
          </RevealText>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center max-w-2xl"
          >
            <p className="text-base md:text-xl text-slate-500 font-light leading-relaxed max-w-sm md:max-w-none">
              Curating the world's most immersive events. From underground neon symphonies to floating art galas.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById('featured');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium text-sm tracking-wide hover:bg-indigo-600 transition-colors duration-300 whitespace-nowrap w-full md:w-auto"
            >
              EXPLORE EVENTS
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Image Parallax with Bug Fix (Rounded Overflow) */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute right-[-10%] top-[10%] w-[60%] h-[80%] z-0 hidden lg:block opacity-90"
        >
          {/* Important: Add rounded corners and overflow hidden to the wrapper to clip the gradient */}
          <div className="relative w-full h-full rounded-l-[4rem] overflow-hidden shadow-2xl">
            <motion.img 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src="https://picsum.photos/seed/architecture/1200/1600" 
              className="object-cover w-full h-full"
              alt="Hero" 
            />
            {/* Overlay Gradient Now Properly Clipped */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* --- MARQUEE STRIP --- */}
      <div className="w-full bg-slate-900 py-6 overflow-hidden flex items-center transform -rotate-1 origin-left z-20 relative shadow-2xl">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {[...Array(6)].map((_, i) => (
             <span key={i} className="text-4xl md:text-5xl font-display font-bold text-transparent stroke-text tracking-widest opacity-80">
               LIVE CONCERTS • ART EXHIBITIONS • TECH SUMMITS • 
             </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.5);
        }
      `}</style>


      {/* --- FEATURED EVENT (Magazine Style) --- */}
      <section id="featured" className="py-32 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-slate-200 pb-6">
          <RevealText className="text-4xl md:text-5xl font-display font-bold text-slate-900">
            THIS WEEK'S <span className="text-indigo-600">HIGHLIGHT</span>
          </RevealText>
          <p className="text-slate-500 mb-2 font-mono text-sm uppercase tracking-widest">Curated by Event Horizon</p>
        </div>

        {events.length > 0 && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] group cursor-pointer overflow-hidden rounded-3xl shadow-xl" onClick={() => onEventSelect(events[0])}>
             <motion.img 
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.7 }}
               src={events[0].image} 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                <motion.span 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="bg-indigo-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider w-fit mb-4"
                >
                  {events[0].category}
                </motion.span>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-display font-bold text-white mb-2"
                >
                  {events[0].title}
                </motion.h2>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-6 text-slate-300 font-medium"
                >
                   <span>{events[0].date}</span>
                   <span className="w-1 h-1 bg-slate-500 rounded-full"/>
                   <span>{events[0].location}</span>
                   <span className="w-1 h-1 bg-slate-500 rounded-full"/>
                   <span className="text-white border-b border-white pb-0.5 group-hover:text-indigo-400 group-hover:border-indigo-400 transition-colors">Book Now</span>
                </motion.div>
             </div>
          </div>
        )}
      </section>

      {/* --- EVENT LIST (With Search & Filter) --- */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
         
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <h3 className="text-3xl font-display font-bold text-slate-900">Upcoming Events</h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search events..." 
                   className="pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64 transition-all"
                 />
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                 {categories.map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                       selectedCategory === cat 
                         ? 'bg-slate-900 text-white shadow-lg' 
                         : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
            </div>
         </div>

         {/* Filtered List */}
         <div className="grid grid-cols-1 gap-0 min-h-[400px]">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventListItem key={event.id} event={event} index={index} onClick={() => onEventSelect(event)} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                 <Search size={48} className="mb-4 opacity-20" />
                 <p className="text-lg font-medium">No events found matching your criteria.</p>
                 <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-4 text-indigo-600 font-bold hover:underline">
                   Clear Filters
                 </button>
              </div>
            )}
         </div>
         
         {filteredEvents.length > 0 && (
           <div className="flex justify-center mt-16">
              <button className="flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors">
                 <span className="text-xs font-bold uppercase tracking-widest">Load More</span>
                 <ArrowDown size={20} className="animate-bounce" />
              </button>
           </div>
         )}
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-32 bg-slate-900 text-center px-6">
          <RevealText className="text-5xl md:text-8xl font-display font-bold text-white mb-8">
            DON'T MISS OUT
          </RevealText>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
              Join thousands of others discovering the next big experience.
            </p>
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start Your Journey
            </button>
          </motion.div>
      </section>

    </div>
  );
};

// --- SUBCOMPONENTS ---

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({ children, className }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
       <motion.span className="inline-block" variants={{
          hidden: { opacity: 0, y: 50, rotateX: 20 },
          visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
       }}>
         {children}
       </motion.span>
    </motion.div>
  );
};

interface EventListItemProps {
  event: Event;
  onClick: () => void;
  index: number;
}

const EventListItem: React.FC<EventListItemProps> = ({ event, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group relative border-b border-slate-100 py-12 cursor-pointer hover:bg-slate-50 transition-colors duration-500"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 relative z-10">
        <div className="flex-1">
          <span className="block text-xs font-mono text-indigo-600 mb-2 uppercase tracking-wider">{event.category}</span>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
            {event.title}
          </h3>
        </div>
        
        <div className="flex flex-col md:items-end text-slate-500 group-hover:text-slate-800 transition-colors">
          <span className="text-xl md:text-2xl font-light">{event.date}</span>
          <span className="text-sm">{event.location}</span>
        </div>

        <div className="md:w-40 text-right">
           <span className="text-xl font-bold text-slate-900 group-hover:scale-110 inline-block transition-transform duration-300">
             ₹{event.price.toLocaleString('en-IN')}
           </span>
        </div>
      </div>

      {/* Hover Image Reveal */}
      <motion.img 
        src={event.image}
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 object-cover rounded-lg shadow-2xl pointer-events-none z-20 hidden lg:block"
      />
    </motion.div>
  );
}

export default Home;