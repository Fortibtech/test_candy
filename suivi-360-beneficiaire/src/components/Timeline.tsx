import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

export type TimelineEventProps = {
    date: string;
    title: string;
    description?: string;
    status: 'completed' | 'current' | 'upcoming' | 'alert';
    icon?: React.ReactNode;
};

const Timeline = ({ events }: { events: TimelineEventProps[] }) => {
    return (
        <div className="relative border-l-2 border-primary-200 ml-4 md:ml-6 space-y-8 py-4">
            {events.map((event, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[11px] top-1 bg-white rounded-full p-0.5">
                        {event.status === 'completed' && <CheckCircle2 className="text-primary-500 w-5 h-5" />}
                        {event.status === 'current' && <Circle className="text-secondary-500 fill-secondary-100 w-5 h-5" />}
                        {event.status === 'upcoming' && <Clock className="text-neutral-400 w-5 h-5" />}
                        {event.status === 'alert' && <AlertCircle className="text-red-500 w-5 h-5" />}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h3 className={`text-lg transition-colors font-semibold ${event.status === 'completed' ? 'text-primary-800' :
                                event.status === 'current' ? 'text-secondary-700' :
                                    event.status === 'alert' ? 'text-red-700' : 'text-neutral-600'
                            }`}>
                            {event.title}
                        </h3>
                        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full w-fit">
                            {event.date}
                        </span>
                    </div>
                    {event.description && (
                        <p className="text-neutral-600 text-sm mt-2 leading-relaxed bg-white/50 p-3 rounded-lg border border-primary-50">
                            {event.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Timeline;
