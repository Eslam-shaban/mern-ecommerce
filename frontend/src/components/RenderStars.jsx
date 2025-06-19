import { Star } from "lucide-react"; // or use any star icon you prefer

const RenderStars = (rating) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => {
                const fill = Math.min(Math.max(rating - i, 0), 1); // 0 to 1

                return (
                    <div key={i} className="relative w-6 h-6">
                        {/* Background gray star */}
                        <Star className="text-gray-300 w-full h-full" />

                        {/* Clipped yellow star on top */}
                        <div
                            className="absolute top-0 left-0 h-full overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                        >
                            <Star className="text-yellow-400 w-full h-full" />
                        </div>
                    </div>
                );
            })}
        </div>
    );

};

export default RenderStars;
