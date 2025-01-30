import Image from 'next/image';
import Link from 'next/link';
import { ParisEvent } from '@/types/Event';

export default function EventCard({ event }: { event: ParisEvent }) {
  return (
    <Link href={`/event/${event.recordid}`}>
      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
        {event.fields.cover_url && (
          <div className="relative h-48 w-full">
            <Image
              src={event.fields.cover_url}
              alt={event.fields.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{event.fields.title}</h2>
          {event.fields.address_name && (
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              📍 {event.fields.address_name}
            </p>
          )}
          {event.fields.date_start && (
            <p className="text-gray-600 dark:text-gray-300">
              📅 {new Date(event.fields.date_start).toLocaleDateString()}
            </p>
          )}
          {event.fields.price_type && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              💶 {event.fields.price_type}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
} 