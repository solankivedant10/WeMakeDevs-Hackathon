import React from 'react';

interface SafetyBadgeProps {
    status: 'approved' | 'pending' | 'issues' | 'running';
    details?: string;
}

export default function SafetyBadge({ status, details }: SafetyBadgeProps) {
    const statusConfig = {
        approved: {
            icon: '✅',
            label: 'CodeRabbit: APPROVED',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/40',
            textColor: 'text-emerald-300',
            shadowColor: 'shadow-emerald-500/20',
        },
        pending: {
            icon: '⏳',
            label: 'CodeRabbit: PENDING',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/40',
            textColor: 'text-yellow-300',
            shadowColor: 'shadow-yellow-500/20',
        },
        issues: {
            icon: '⚠️',
            label: 'CodeRabbit: ISSUES FOUND',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/40',
            textColor: 'text-red-300',
            shadowColor: 'shadow-red-500/20',
        },
        running: {
            icon: '🤖',
            label: 'CodeRabbit: ANALYZING',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/40',
            textColor: 'text-purple-300',
            shadowColor: 'shadow-purple-500/20',
        },
    };

    const config = statusConfig[status];

    return (
        <div
            className={`
        flex items-center gap-3 px-6 py-4 rounded-2xl
        glass-strong border-2 shadow-xl
        ${config.bgColor} ${config.borderColor} ${config.shadowColor}
        transition-all duration-300 hover:scale-105
      `}
            title={details}
        >
            <span className="text-2xl">{config.icon}</span>
            <span className={`${config.textColor} font-bold text-lg mono`}>
                {config.label}
            </span>
            {status === 'running' && (
                <div className="animate-spin w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full ml-2"></div>
            )}
        </div>
    );
}
