import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDroppable
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight,
  Plus,
  Sparkles,
  Loader2,
  MoreVertical
} from 'lucide-react';

const COLUMNS = [
  { id: 'saved', title: 'Saved', color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { id: 'applied', title: 'Applied', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { id: 'shortlisted', title: 'Shortlisted', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { id: 'interview', title: 'Interview', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { id: 'offered', title: 'Offered', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { id: 'rejected', title: 'Rejected', color: 'bg-rose-50 text-rose-700 border-rose-100' },
];

const ItemCard = ({ item, isOverlay }) => (
  <div className={`bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${isOverlay ? 'shadow-2xl rotate-2 scale-105 cursor-grabbing' : 'cursor-grab active:cursor-grabbing'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
        <Briefcase className="h-5 w-5 text-brand" />
      </div>
      <div className="flex flex-col items-end gap-2">
        {item.boosted && (
          <div className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[7px] font-black uppercase tracking-[0.15em] flex items-center gap-1 shadow-lg shadow-indigo-100">
            <Sparkles className="w-2.5 h-2.5 fill-white" /> Boosted
          </div>
        )}
        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
    
    <div className="space-y-1">
      <h4 className="font-black text-gray-900 text-sm leading-tight group-hover:text-brand transition-colors">{item.role}</h4>
      <p className="text-gray-500 text-[11px] font-bold">{item.company}</p>
      {item.stipend && (
        <p className="text-emerald-600 text-[10px] font-black mt-1 uppercase tracking-wider">{item.stipend}</p>
      )}
    </div>
    
    <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between text-[9px] text-gray-400 font-bold uppercase tracking-wider">
      <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-brand/60" /> {item.location}</span>
      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {item.date}</span>
    </div>
  </div>
);

const SortableItem = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ItemCard item={item} />
    </div>
  );
};

const DroppableColumn = ({ col, items, children }) => {
  const { setNodeRef } = useDroppable({
    id: col.id,
  });

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      <div className={`p-3 rounded-t-2xl font-bold text-sm mb-3 flex items-center justify-between ${col.color}`}>
        {col.title}
        <span className="bg-white/50 px-2 py-0.5 rounded-lg text-xs">{items.length}</span>
      </div>
      <div 
        ref={setNodeRef}
        className="flex-1 bg-gray-100/50 rounded-b-2xl p-2 space-y-3"
      >
        <SortableContext id={col.id} items={items} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </div>
    </div>
  );
};

const Applications = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Mock Data for Hackathon Demo Persistence
  const getInitialItems = () => {
    const saved = localStorage.getItem('applicationTracker');
    if (saved) return JSON.parse(saved);
    return {
      saved: [
        { id: '1', role: 'Backend Developer Intern', company: 'Google', location: 'Remote', date: 'Mar 20, 2026', boosted: true },
        { id: '4', role: 'Systems Engineer', company: 'Microsoft', location: 'Remote', date: 'Mar 10, 2026', boosted: true },
      ],
      applied: [],
      shortlisted: [
        { id: '2', role: 'Full Stack Intern', company: 'Meta', location: 'Hybrid', date: 'Mar 22, 2026', boosted: false },
      ],
      interview: [],
      offered: [
        { id: '5', role: 'Summer Research Fellowship (SRFP)', company: 'IIT Delhi', location: 'New Delhi', date: 'Apr 03, 2026', boosted: false, stipend: '₹2,000/week' },
      ],
      rejected: [],
    };
  };

  const [items, setItems] = useState(() => {
    const initial = getInitialItems();
    
    // 1. Force remove specific IDs to prevent duplicates/incorrect states
    // id 3: Node.js Developer (requested to remove)
    // id 4: Systems Engineer Microsoft (requested to be in saved)
    // id 5: IIT Delhi SRFP (requested to be in offered)
    Object.keys(initial).forEach(key => {
      if (Array.isArray(initial[key])) {
        initial[key] = initial[key].filter(item => 
          item.id !== '3' && 
          item.id !== '4' && 
          item.id !== '5' &&
          !item.role?.includes('IIT Delhi') && // Robust check
          !item.company?.includes('IIT Delhi')
        );
      }
    });

    // 2. Force add/relocate entries to their correct columns
    initial.offered = [
      ...initial.offered,
      { id: '5', role: 'Summer Research Fellowship (SRFP)', company: 'IIT Delhi', location: 'New Delhi', date: 'Apr 03, 2026', boosted: false, stipend: '₹2,000/week' }
    ];

    initial.saved = [
      ...initial.saved,
      { id: '4', role: 'Systems Engineer', company: 'Microsoft', location: 'Remote', date: 'Mar 10, 2026', boosted: true }
    ];

    return initial;
  });
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('applicationTracker', JSON.stringify(items));
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeContainer = Object.keys(items).find(key => items[key].some(item => item.id === activeId));
    const overContainer = Object.keys(items).find(key => key === overId) || 
                          Object.keys(items).find(key => items[key].some(item => item.id === overId));

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.findIndex((item) => item.id === activeId);
      const overIndex = overItems.findIndex((item) => item.id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      const itemToMove = activeItems[activeIndex];
      if (!itemToMove) return prev;

      return {
        ...prev,
        [activeContainer]: activeItems.filter((item) => item.id !== activeId),
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          itemToMove,
          ...overItems.slice(newIndex)
        ]
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = Object.keys(items).find(key => items[key].some(item => item.id === activeId));
    const overContainer = Object.keys(items).find(key => key === overId) || 
                          Object.keys(items).find(key => items[key].some(item => item.id === overId));

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      setActiveId(null);
      return;
    }

    const activeIndex = items[activeContainer].findIndex((item) => item.id === activeId);
    const overIndex = items[overContainer].findIndex((item) => item.id === overId);

    if (activeIndex !== overIndex) {
      setItems((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  };

  const findItem = (items, id) => {
    for (const container in items) {
      const item = items[container].find(i => i.id === id);
      if (item) return item;
    }
    return null;
  };

  const stats = {
    applied: items.applied.length + items.shortlisted.length + items.interview.length + items.offered.length,
    inProgress: items.shortlisted.length + items.interview.length,
    offers: items.offered.length
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Application Tracker</h1>
              <p className="text-sm text-gray-500 font-bold mt-1 uppercase tracking-widest">Pipeline & Deadlines Management</p>
            </div>
            <div className="flex bg-white p-5 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50 gap-10">
              <div className="text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Applied</p>
                <p className="text-3xl font-black text-gray-900 leading-none">{stats.applied}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">In Progress</p>
                <p className="text-3xl font-black text-brand leading-none">{stats.inProgress}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Offers</p>
                <p className="text-3xl font-black text-emerald-600 leading-none">{stats.offers}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 h-full min-h-[600px]">
                {COLUMNS.map((col) => (
                  <DroppableColumn key={col.id} col={col} items={items[col.id]}>
                    {items[col.id].map((item) => (
                      <SortableItem key={item.id} item={item} />
                    ))}
                  </DroppableColumn>
                ))}
              </div>
              
              <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                  styles: { active: { opacity: '0.5' } }
                })
              }}>
                {activeId ? <ItemCard item={findItem(items, activeId)} isOverlay /> : null}
              </DragOverlay>
            </DndContext>
          )}
        </div>
      </main>
    </div>
  );
};

export default Applications;