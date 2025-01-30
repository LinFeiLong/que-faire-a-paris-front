import { fetchEventById } from '@/services/events';
import Image from 'next/image';
import Link from 'next/link';

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await fetchEventById(params.id);

  if (!event) {
    return <div className="min-h-screen p-8 text-center">Événement non trouvé</div>;
  }

  // Convertir les tags en tableau s'ils sont sous forme de chaîne
  const tags = event.fields.tags ?
    (Array.isArray(event.fields.tags) ? event.fields.tags : event.fields.tags.split(';'))
    : [];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Retour aux événements
        </Link>

        {event.fields.cover_url && (
          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={event.fields.cover_url}
              alt={event.fields.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-6">{event.fields.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {event.fields.date_start && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Date</h2>
                <p>
                  Du {new Date(event.fields.date_start).toLocaleDateString()}
                  {event.fields.date_end &&
                    ` au ${new Date(event.fields.date_end).toLocaleDateString()}`
                  }
                </p>
              </div>
            )}

            {event.fields.address_name && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Lieu</h2>
                <p>{event.fields.address_name}</p>
                {event.fields.address_street && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {event.fields.address_street}
                  </p>
                )}
              </div>
            )}

            {event.fields.price_type && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Tarif</h2>
                <p>{event.fields.price_type}</p>
              </div>
            )}
          </div>

          <div>
            {event.fields.lead_text && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="whitespace-pre-wrap">{event.fields.lead_text}</p>
              </div>
            )}

            {tags.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 