import React from 'react';

export const BookshelfIllustration: React.FC = () => {
  return (
    <div className="w-full aspect-square rounded-[24px] overflow-hidden bg-gradient-to-b from-[#e1f5fe] to-[#b3e5fc] flex flex-col items-center justify-between p-4 relative border-4 border-white shadow-inner select-none">
      {/* Background Room Details */}
      <div className="absolute top-2 left-3 text-xs text-[#0288d1]/60 font-bold">Contact</div>
      
      {/* Top Header Badge "3 BOOKShelf 3" */}
      <div className="flex flex-col items-center mt-1 z-10">
        <div className="w-11 h-11 rounded-full bg-[#0288d1] border-2 border-white shadow-md flex items-center justify-center text-white font-extrabold text-2xl">
          3
        </div>
        <div className="text-[#01579b] font-black text-sm tracking-wider uppercase mt-0.5">
          BOOKShelf 3
        </div>
      </div>

      {/* Wooden Bookshelf */}
      <div className="w-full max-w-[290px] sm:max-w-[320px] bg-[#d79a5b] rounded-2xl p-2.5 shadow-lg border-4 border-[#b97a38] flex flex-col gap-2 relative mt-1">
        {/* Layer 1 */}
        <div className="relative bg-[#f8d7a4] rounded-lg p-1.5 flex items-end justify-between min-h-[56px] border-b-4 border-[#c48443]">
          {/* Left Layer Number Tag */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#ff7043] rounded-md border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-sm">
            1
          </div>
          {/* Books on Layer 1 */}
          <div className="flex items-end gap-1 ml-4 w-full justify-around pr-1">
            <div className="w-6 h-11 bg-[#ef5350] rounded-t-sm flex items-center justify-center text-[9px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              ABC
            </div>
            <div className="w-5 h-9 bg-[#42a5f5] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              123
            </div>
            <div className="w-7 h-12 bg-[#66bb6a] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              ANIMALS
            </div>
            <div className="w-5 h-10 bg-[#ab47bc] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              123
            </div>
            <div className="w-6 h-11 bg-[#ffa726] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              STORIES
            </div>
            <div className="w-6 h-10 bg-[#26a69a] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              STORIES
            </div>
            <div className="w-6 h-12 bg-[#29b6f6] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              READING
            </div>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="relative bg-[#f8d7a4] rounded-lg p-1.5 flex items-end justify-between min-h-[56px] border-b-4 border-[#c48443]">
          {/* Left Layer Number Tag */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#42a5f5] rounded-md border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-sm">
            2
          </div>
          {/* Books on Layer 2 */}
          <div className="flex items-end gap-1.5 ml-4 w-full justify-around pr-1">
            <div className="w-7 h-12 bg-[#ff7043] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              SCIENCE
            </div>
            <div className="w-6 h-11 bg-[#7e57c2] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              HISTORY
            </div>
            <div className="w-7 h-10 bg-[#ffca28] rounded-t-sm flex items-center justify-center text-[8px] font-black text-[#5d4037] [writing-mode:vertical-rl] shadow-xs">
              GEOGRAPHY
            </div>
            <div className="w-6 h-12 bg-[#8d6e63] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              NATURE
            </div>
            <div className="w-7 h-11 bg-[#1e88e5] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              SPACE
            </div>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="relative bg-[#f8d7a4] rounded-lg p-1.5 flex items-end justify-between min-h-[56px] border-b-4 border-[#c48443]">
          {/* Left Layer Number Tag */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#26a69a] rounded-md border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-sm">
            3
          </div>
          {/* Books on Layer 3 */}
          <div className="flex items-end gap-1 ml-4 w-full justify-around pr-1">
            <div className="w-7 h-12 bg-[#ec407a] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              ADVENTURE
            </div>
            <div className="w-6 h-10 bg-[#42a5f5] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              MATH
            </div>
            <div className="w-6 h-11 bg-[#ffb74d] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              ART
            </div>
            <div className="w-5 h-9 bg-[#ab47bc] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              MUSIC
            </div>
            <div className="w-5 h-10 bg-[#26a69a] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              MUSIC
            </div>
            <div className="w-7 h-12 bg-[#ef5350] rounded-t-sm flex items-center justify-center text-[8px] font-black text-white [writing-mode:vertical-rl] shadow-xs">
              READ
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Floor & Lamp */}
      <div className="w-full flex justify-between items-end px-2 pt-1">
        {/* Lamp on table */}
        <div className="flex flex-col items-center opacity-85">
          <div className="w-5 h-3 bg-[#4fc3f7] rounded-t-full shadow-xs"></div>
          <div className="w-0.5 h-3 bg-[#90a4ae]"></div>
          <div className="w-3 h-1 bg-[#78909c] rounded-full"></div>
        </div>
        {/* Floor Line */}
        <div className="h-1 bg-[#81d4fa]/50 w-32 rounded-full"></div>
      </div>
    </div>
  );
};
