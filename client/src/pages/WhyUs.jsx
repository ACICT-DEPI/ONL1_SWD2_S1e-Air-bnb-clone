import { Link } from "react-router-dom";
import Clock from "../ui/icons/Clock";
import Dollar from "../ui/icons/Dollar";
import Globe from "../ui/icons/Globe";
import Heart from "../ui/icons/Heart";
import Home from "../ui/icons/Home";
import Shield from "../ui/icons/Shield";
import StarIcon from "../ui/icons/StarIcon";
import UserIcon from "../ui/icons/UserIcon";

const features = [
  {
    icon: Home,
    title: "Unique Stays",
    description:
      "Discover one-of-a-kind places to stay, from treehouses to luxury villas.",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description:
      "Book with confidence knowing your reservation is protected by our secure system.",
  },
  {
    icon: Heart,
    title: "Superb Hospitality",
    description:
      "Experience exceptional service from our verified and rated hosts.",
  },
  {
    icon: UserIcon,
    title: "Community Driven",
    description:
      "Join a global community of travelers sharing authentic experiences.",
  },
  {
    icon: Globe,
    title: "Worldwide Locations",
    description: "Access properties in over 190+ countries around the world.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Get assistance anytime, anywhere with our dedicated support team.",
  },
  {
    icon: Dollar,
    title: "Best Price Guarantee",
    description: "Find the best rates with our price matching policy.",
  },
  {
    icon: StarIcon,
    title: "Verified Reviews",
    description:
      "Read genuine reviews from real guests who've stayed at our properties.",
  },
];

const stats = [
  { number: "2M+", label: "Happy Guests" },
  { number: "150K+", label: "Listed Properties" },
  { number: "190+", label: "Countries" },
  { number: "4.8/5", label: "Average Rating" },
];

const testimonials = [
  {
    text: "The most amazing vacation rental experience I've ever had. The host was incredibly welcoming and the property exceeded all expectations.",
    author: "Sarah Thompson",
    location: "New York, USA",
    rating: 5,
  },
  {
    text: "Booking was seamless and the customer support team was extremely helpful throughout our stay. Will definitely use again!",
    author: "David Chen",
    location: "London, UK",
    rating: 5,
  },
  {
    text: "Found a unique beachfront property that made our honeymoon absolutely perfect. Thank you for making it special!",
    author: "Maria Garcia",
    location: "Barcelona, Spain",
    rating: 5,
  },
];

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex flex-col items-center text-center">
      <div className="bg-rose-100 p-3 rounded-full mb-4">
        <Icon className="h-6 w-6 text-rose-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="bg-rose-50 rounded-lg p-6 text-center">
    <div className="text-3xl font-bold text-rose-600 mb-2">{number}</div>
    <div className="text-gray-700">{label}</div>
  </div>
);

const TestimonialCard = ({ text, author, location, rating }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 mb-4 italic">
      <q>{text}</q>
    </p>
    <div className="font-semibold">{author}</div>
    <div className="text-gray-500 text-sm">{location}</div>
  </div>
);

const WhyUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why millions of travelers choose our platform for their
            unforgettable stays around the world.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-rose-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-6">
            Join millions of happy travelers and find your perfect stay today.
          </p>
          <Link
            to={"/"}
            className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
