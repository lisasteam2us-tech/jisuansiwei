import React, { useRef, useState, useEffect } from 'react';
import { X, RotateCcw, Trash2, Edit3, Eraser, Highlighter, Check, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionStem?: string;
  taskNumber?: number;
}

type DrawMode = 'pen' | 'brush' | 'highlighter' | 'eraser';

export const ScratchpadModal: React.FC<ScratchpadModalProps> = ({
  isOpen,
  onClose,
  questionStem = '草稿推演',
  taskNumber = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<DrawMode>('pen');
  const [color, setColor] = useState<string>('#07C160');
  const [history, setHistory] = useState<ImageData[]>([]);

  const colors = [
    { name: '探索绿', value: '#07C160' },
    { name: '极客蓝', value: '#3b82f6' },
    { name: '活力黄', value: '#f59e0b' },
    { name: '警示红', value: '#ef4444' },
    { name: '沉稳黑', value: '#1e293b' },
  ];

  // Initialize Canvas
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas resolution
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Background grid paper styling
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw faint graph paper lines
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < rect.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      // Save initial state
      const initial = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initial]);
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), state]);
  };

  const handleUndo = () => {
    sounds.playTap();
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previous = newHistory[newHistory.length - 1];
    ctx.putImageData(previous, 0, 0);
    setHistory(newHistory);
  };

  const handleClear = () => {
    sounds.playRobot();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Redraw faint graph grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = 0; x < rect.width; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    saveHistory();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (mode === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 20;
      ctx.globalAlpha = 1.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else if (mode === 'highlighter') {
      ctx.strokeStyle = color;
      ctx.lineWidth = 18;
      ctx.globalAlpha = 0.35;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'round';
    } else if (mode === 'brush') {
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.globalAlpha = 1.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else {
      // Pen
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveHistory();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] border-4 border-[#07C160] shadow-[0_16px_0_0_#006d33] w-full max-w-3xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#f0fdf4] px-6 py-4 border-b-3 border-[#bbf7d0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#07C160] flex items-center justify-center text-white font-black shadow-xs">
              📝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-[#006d33]">探险草稿纸 · 演算画板</span>
                <span className="bg-[#FFD54F] text-[#574500] text-xs font-black px-2.5 py-0.5 rounded-full border border-[#f59e0b]">
                  任务 #{taskNumber}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1 max-w-md font-medium">
                {questionStem}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-600 border-2 border-gray-200 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-[#fafaf9] px-6 py-3 border-b-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
          {/* Tool selectors */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playTap();
                setMode('pen');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                mode === 'pen'
                  ? 'bg-[#07C160] text-white border-[#006d33] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>细铅笔</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setMode('brush');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                mode === 'brush'
                  ? 'bg-[#07C160] text-white border-[#006d33] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>粗画笔</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setMode('highlighter');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                mode === 'highlighter'
                  ? 'bg-[#07C160] text-white border-[#006d33] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Highlighter className="w-3.5 h-3.5" />
              <span>荧光笔</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setMode('eraser');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border-2 cursor-pointer transition-all ${
                mode === 'eraser'
                  ? 'bg-[#07C160] text-white border-[#006d33] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>橡皮擦</span>
            </button>
          </div>

          {/* Color palette */}
          {mode !== 'eraser' && (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
              <span className="text-xs font-bold text-gray-500">颜色:</span>
              <div className="flex items-center gap-1.5">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      sounds.playTap();
                      setColor(c.value);
                    }}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                      color === c.value
                        ? 'border-black scale-110 shadow-xs'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions: Undo, Clear */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              title="撤销上一步"
              className="p-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 disabled:opacity-40 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleClear}
              title="清空画板"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-xs cursor-pointer transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>清空</span>
            </button>
          </div>
        </div>

        {/* Canvas Drawing Area */}
        <div className="relative w-full h-[420px] bg-white cursor-crosshair overflow-hidden touch-none">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full block"
          />
        </div>

        {/* Footer */}
        <div className="bg-[#f0fdf4] px-6 py-3 border-t-2 border-[#bbf7d0] flex items-center justify-between">
          <span className="text-xs text-gray-500 font-bold flex items-center gap-1.5">
            💡 支持随时用铅笔、荧光笔圈画或画图推演，关闭后草稿将保留在当前关卡。
          </span>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="bg-[#07C160] text-white px-6 py-2 rounded-full font-black text-sm shadow-[0_3px_0_0_#006d33] hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            <span>推演完毕，返回答题</span>
          </button>
        </div>
      </div>
    </div>
  );
};
