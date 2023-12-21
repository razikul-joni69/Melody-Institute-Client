import Titles from "../Titles/Titles";

const UpcomingEvents = () => {
    return (
        <div className="container mx-auto">
            <Titles title="Upcoming Events" subTitle="Our Upcoming Events" />
            <div className="flex gap-5">
                {/* Left side */}
                <div className="flex-none relative w-1/2">
                    <div className="relative h-full">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/024/927/954/non_2x/young-adults-playing-classical-music-on-string-instruments-at-concert-generated-by-ai-free-photo.jpg"
                            alt="Left Image"
                            className="h-full w-full object-cover rounded-xl"
                        />
                        <div className="absolute bottom-0 left-0 bg-black text-white p-2 rounded-bl-xl">
                            Classical Music Event
                        </div>
                        <div className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-br-xl">
                            Time: To Be Announced
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col gap-5 w-1/2">
                    <div className="flex-grow relative">
                        <img
                            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9wJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D"
                            alt="Right Image 1"
                            className="h-full w-full object-cover rounded-xl"
                        />
                        <div className="absolute bottom-0 left-0 bg-black text-white p-2 rounded-bl-xl">
                            Pop Music Event
                        </div>
                        <div className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-br-xl">
                            Time: To Be Announced
                        </div>
                    </div>
                    <div className="flex-grow relative">
                        <img
                            src="https://images.unsplash.com/photo-1546708770-589dab7b22c7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9jayUyMG11c2ljfGVufDB8fDB8fHww"
                            alt="Right Image 2"
                            className="h-full w-full object-cover rounded-xl"
                        />
                        <div className="absolute bottom-0 left-0 bg-black text-white p-2 rounded-bl-xl">
                            Rock Music Event
                        </div>
                        <div className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-br-xl">
                            Time: To Be Announced
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpcomingEvents;
