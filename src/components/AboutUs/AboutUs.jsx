import Titles from "../Titles/Titles";

const AboutUs = () => {
    return (
        <div>
            <Titles title="About Us" subTitle="Who we are" />
            <div className="relative">
                {/* Blurred Image */}
                <img
                    src="https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Right Image 1"
                    className="h-full w-full object-cover rounded-xl filter blur-sm"
                />

                {/* Clear Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                    <h2 className="text-4xl font-bold">
                        We are a team of passionate music enthusiasts provides
                        various types of music instruments learning classes with
                        professional teachers.
                    </h2>
                    <p className="mt-5 text-xl">
                        We are a team of passionate music enthusiasts who
                        believe in the power of music. We are dedicated to help
                        whom are interested in music and share our knowledge. We
                        privide our services to our customers. We provide them a
                        lot of music instruments classes and also privide them
                        the best teachers. Also they have option to choose their
                        favourite teachers. Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Explicabo rem ratione ipsa
                        iusto dolorem. Veritatis voluptate error optio repellat
                        sunt. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Explicabo voluptate eveniet magni rerum eius enim
                        quod aut. Sunt, laborum voluptatem?
                    </p>
                </div>
            </div>
        </div>
    );
};
export default AboutUs;
