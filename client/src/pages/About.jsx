const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Landing />
      <Content />
    </div>
  );
};

const Landing = () => {
  return (
    <div
      className="bg-cover bg-center h-[60vh] flex items-center justify-center text-white text-center bg-gradient-to-b from-gray-800 to-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)), url('About.webp')`,
      }}
    >
      <h1 className="text-5xl font-bold">About Us</h1>
    </div>
  );
};

const Content = () => {
  return (
    <div className="p-12 text-center">
      <h2 className="text-4xl font-semibold text-red-500 mb-4">Our Story</h2>
      <p className="text-lg leading-relaxed text-gray-600 max-w-4xl mx-auto mb-8">
        Founded in 2008, we started with the simple idea of allowing travelers
        to connect with hosts around the world. Our mission has always been
        about creating memorable experiences for travelers and promoting a sense
        of belonging anywhere you go. Our founders started with air mattresses
        on their apartment floor, and it evolved into a global phenomenon,
        bridging the gap between travelers and hosts around the world.
      </p>
      <p className="text-lg leading-relaxed text-gray-600 max-w-4xl mx-auto mb-8">
        With millions of hosts and guests, we strive to bring people together
        and make communities stronger through travel. We believe in making
        people feel like they are part of something bigger. Whether it's a cozy
        apartment in the heart of the city or a remote villa overlooking the
        ocean, we want our guests to feel at home wherever they go. Our
        community is built on trust, authenticity, and experiences that last a
        lifetime.
      </p>
      <p className="text-lg leading-relaxed text-gray-600 max-w-4xl mx-auto mb-8">
        Core is more than just a place to stay. It's a community of people
        looking to make meaningful connections, share cultures, and experience
        something out of the ordinary. We’re proud of the positive impact we’ve
        made in local communities and our role in promoting a deeper
        understanding of the world. By connecting people, Core makes it easier
        to experience the world through someone else’s eyes, embracing diversity
        and adventure.
      </p>
      <h2 className="text-4xl font-semibold text-red-500 mb-4">
        Meet Our Team
      </h2>
      <TeamSection />
    </div>
  );
};

const TeamSection = () => {
  const teamMembers = [
    { name: "Yousef Hamed", image: "/Yousef.png" },
    { name: "Ahmed Hamdy", image: "/hamdy.jpg" },
    { name: "Ahmed Zain", image: "/zain.jpg" },
    { name: "Ahmed Mohamed", image: "https://via.placeholder.com/120" },
    { name: "Mostafa ElDiesel", image: "/mostafa.png" },
    { name: "Mostafa Montaser", image: "/montasr.png" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {teamMembers.map((member, index) => (
        <TeamMember key={index} name={member.name} image={member.image} />
      ))}
    </div>
  );
};

const TeamMember = ({ name, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <img
        className="w-28 h-28 rounded-full mx-auto object-cover mb-4"
        src={image}
        alt={`Team Member ${name}`}
      />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    </div>
  );
};

export default About;
