'use client';
import { useState, useEffect } from 'react';
import { fetchEvents } from '@/services/events';
import EventCard from '@/components/EventCard';
import { ParisEvent } from '@/types/Event';

const PRICE_TYPES = ['Gratuit', 'Payant', 'Tarif réduit'];
const COMMON_TAGS = ['Concert', 'Exposition', 'Théâtre', 'Sport', 'Enfants'];

export default function Home() {
  const [events, setEvents] = useState<ParisEvent[]>([]);
  const [search, setSearch] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await fetchEvents({
          search,
          dateStart,
          dateEnd,
          priceTypes: selectedPrices,
          tags: selectedTags,
        });
        setEvents(response.records);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(loadEvents, 300);
    return () => clearTimeout(debounce);
  }, [search, dateStart, dateEnd, selectedPrices, selectedTags]);

  const handlePriceToggle = (price: string) => {
    setSelectedPrices(prev =>
      prev.includes(price)
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setDateStart('');
    setDateEnd('');
    setSelectedPrices([]);
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Que faire à Paris ?</h1>
          {(dateStart || dateEnd || selectedPrices.length > 0 || selectedTags.length > 0) && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 
                dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <div className="space-y-4">
          <input
            type="search"
            placeholder="Rechercher un événement..."
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date de début</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date de fin</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Tarifs</label>
            <div className="flex flex-wrap gap-2">
              {PRICE_TYPES.map((price) => (
                <button
                  key={price}
                  onClick={() => handlePriceToggle(price)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors
                    ${selectedPrices.includes(price)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Catégories</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors
                    ${selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Aucun événement trouvé
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.recordid} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
