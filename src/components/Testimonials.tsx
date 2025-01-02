import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Happy Customer",
      image: "/lovable-uploads/17a727e6-79a4-4a37-881d-6132a46827ee.png",
      text: "The flowers were absolutely stunning and arrived right on time. The local florist really understood what I was looking for!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Regular Client",
      image: "/lovable-uploads/2e9cbcc7-b4e1-4fdb-bb65-b58f0afd8976.png",
      text: "I've been using this service for all my special occasions. The quality and creativity of the arrangements never disappoint.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Event Planner",
      image: "/lovable-uploads/3a13efed-e228-490b-b760-f9ff83ae9659.png",
      text: "As an event planner, I need reliable florists. This platform connects me with the best local talent every time.",
      rating: 5
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Real reviews from happy customers who found their perfect florists through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 font-light leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};