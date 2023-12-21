import Titles from "../Titles/Titles";

const OurVision = () => {
    return (
        <div>
            <Titles
                title="Our Vision"
                subTitle="Our Vision to the next generation"
            />
            {/* src="https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" */}
            <div
                className="relative h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                }}
            >
                <div className="absolute inset-y-0 left-0 md:flex items-center justify-center bg-black bg-opacity-75 text-white w-full p-5">
                    {/* Left side (Text) */}
                    <div>
                        <div className="w-full">
                            <h2 className="text-4xl font-bold mb-4">
                                Our Vision is to the next generation of music
                                enthusiasts with a vision of the future.
                            </h2>
                            <p className="text-lg">
                                Our vision is to create a platform where new
                                music enthusiasts can connect with each other
                                and share their passion for music. We believe
                                that music has the power to change the world. We
                                are dedicated to helping those who are
                                interested in music and sharing our knowledge.
                            </p>
                        </div>
                    </div>

                    <div className="w-full">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1661963556004-edab28fa1305?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Right Image"
                            className="max-w-full h-auto rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OurVision;
