import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Maximize2 } from 'lucide-react';

const MOMENTS = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/concert1/800/1000',
    title: 'Neon Nights',
    photographer: 'Sarah Jenkins',
    cols: 1,
    rows: 2,
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/crowd2/1200/800',
    title: 'The Great Gathering',
    photographer: 'Mike Alwen',
    cols: 2,
    rows: 1,
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/artist3/800/800',
    title: 'Solo Performance',
    photographer: 'Davide O.',
    cols: 1,
    rows: 1,
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/light4/800/1200',
    title: 'Laser Symphony',
    photographer: 'TechVis',
    cols: 1,
    rows: 2,
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/dance5/800/800',
    title: 'Rhythm & Flow',
    photographer: 'Elena R.',
    cols: 1,
    rows: 1,
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/fest6/1200/800',
    title: 'Open Air Vibes',
    photographer: 'DroneShotz',
    cols: 2,
    rows: 1,
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/art7/800/1000',
    title: 'Digital Gallery',
    photographer: 'Artsy Studio',
    cols: 1,
    rows: 2,
  },
];

const Moments: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <header className="mb-20 text-center">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-indigo-600 font-mono text-sm uppercase tracking-widest mb-4"
        >
          Archive 2024
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-9xl font-display font-bold text-slate-900 tracking-tighter"
        >
          CAPTURED<br/><span className="text-slate-200">MOMENTS</span>
        </motion.h1>
      </header>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
        {MOMENTS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className={`relative group rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
              item.cols === 2 ? 'md:col-span-2' : 'md:col-span-1'
            } ${item.rows === 2 ? 'row-span-2' : 'row-span-1'}`}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
               <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-display font-bold text-2xl">{item.title}</h3>
                  <p className="text-slate-300 text-sm font-medium">by {item.photographer}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                     <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
                        <Heart size={18} />
                     </button>
                     <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-colors">
                        <Share2 size={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Top Right Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white">
                  <Maximize2 size={16} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
         <p className="text-slate-400 text-sm font-medium mb-4">View complete gallery on Instagram</p>
         <button className="text-indigo-600 font-bold hover:text-slate-900 transition-colors border-b border-indigo-600 hover:border-slate-900 pb-0.5">
            @EventHorizon.Live
         </button>
      </div>
    </motion.div>
  );
};

export default Moments;