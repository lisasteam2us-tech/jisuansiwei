import React from 'react';
import { sounds } from '../utils/audio';
import { RotateCcw, AlertTriangle, X, Check, Sparkles, UserCheck, Trash2 } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: (startNewTestImmediately?: boolean) => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sounds.playTap();
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-[32px] max-w-md w-full border-4 border-[#efeded] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col p-6 sm:p-7 gap-5 animate-in zoom-in-95 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <span>初始化全部测试数据</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                为下一位学员准备全新的测评环境
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reset Detail Info */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2.5 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>执行初始化后，将清理以下数据：</span>
          </div>
          <ul className="space-y-1.5 pl-5 list-disc text-slate-700">
            <li><strong>已选答案与答题草稿：</strong>清空所有题目的作答记录与解析锁定状态</li>
            <li><strong>四维能力画像与评分：</strong>重置雷达图、同龄击败率与错题统计</li>
            <li><strong>报告与证书定制信息：</strong>重置学员姓名与勋章解锁记录</li>
            <li><strong>答题倒计时：</strong>恢复初始 12 分 45 秒完整计时</li>
          </ul>
          <p className="text-[11px] text-amber-800 font-medium pt-1 border-t border-amber-200/60">
            💡 提示：适合多名学员在同一台电脑/平板上轮流测试，避免数据交叉污染。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer text-center"
          >
            取消
          </button>
          <button
            onClick={() => {
              sounds.playLockSuccess();
              onConfirmReset(false);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-black text-white bg-[#07C160] hover:brightness-110 shadow-md shadow-[#07C160]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>确认重置并返回大厅</span>
          </button>
        </div>
      </div>
    </div>
  );
};
