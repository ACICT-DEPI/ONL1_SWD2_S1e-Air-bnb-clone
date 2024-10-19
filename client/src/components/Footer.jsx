const Footer = () => {
  return (
    <footer className="bg-[#EFF0F2] 2xl:container mx-auto px-2 py-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6 gap-10">
        <div>
          <span className="text-primary uppercase font-bold text-3xl mb-2 inline-block">
            core
          </span>
          <p className="text-sm">
            CORE is your trusted platform for finding the perfect accommodation,
            whether you&#39;re looking for hotels, flats, hostels, or villas. We
            offer a seamless and user-friendly experience.
          </p>
        </div>
        <div>
          <span className="uppercase font-semibold text-xl mb-2 inline-block">
            Company
          </span>
          <p className="mb-2">About us</p>
          <p>Contact us</p>
        </div>
        <div>
          <span className="uppercase font-semibold text-xl mb-2 inline-block">
            Help Center
          </span>
          <p className="mb-2">Find a Property</p>
          <p className="mb-2">Host a Property</p>
          <p>Why us?</p>
        </div>
        <div>
          <span className="uppercase font-semibold text-xl mb-2 inline-block">
            Contact Info
          </span>
          <p className="mb-2">Phono: 19077</p>
          <p className="mb-2">Email:company@gmail.com</p>
          <p>Location: 100 Smart Street, LA, USA</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6 gap-4">
        <div className="font-semibold">
          © 2024 CoreProperties.com | All rights reserved
        </div>
        <div className="font-semibold">
          Created with love by CoreProperties.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
