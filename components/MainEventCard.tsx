import { useRouter } from "next/navigation";
import { useMemo } from "react";

const MainEventCard = ({ event }: any) => {

  const router = useRouter();

    const truncateText = (text: string, limit: any) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};
  const placeholderUrl = `https://placehold.co/400x200/FACC15/78350F?text=Event+${event.id}`;
  const truncatedDescription = useMemo(() => truncateText(event.description, 100), [event.description]);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-amber-300 transform hover:-translate-y-1">
      {/* Placeholder Image */}
      <img
        src={event.image_url}
        alt={`Image for ${event.title}`}
        className="w-full h-80 object-cover"
        onError={(e: any) => { e.target.onerror = null; e.target.src = placeholderUrl; }}
      />
      
      <div className="p-5">
        {/* Title */}
        <h3 className="font-extrabold text-xl mb-2 text-amber-800">
          {event.title}
        </h3>
        
        {/* Metadata */}
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-semibold text-amber-600">Date:</span> {event.date} | 
          <span className="font-semibold text-amber-600"> Location:</span> {event.location}
        </p>

        {/* Description (Truncated) */}
        <p className="text-gray-700 text-base mb-4 min-h-[4.5rem]">
          {truncatedDescription}
        </p>
        
        {/* Action Button */}
        <button
          className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center justify-center"
          onClick={() => router.push(`/events/${event.id}`)}
        >
          Click to View Details
        </button>
      </div>
    </div>
  );
};

export default MainEventCard;