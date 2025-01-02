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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium mb-2 tracking-tight font-mono">What Our Customers Say</h2>
          <p className="text-sm text-gray-600 font-mono max-w-xl mx-auto">
            Real reviews from happy customers who found their perfect florists through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-0.5 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs text-gray-600 mb-3 font-mono leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center space-x-2">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-medium font-mono">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 font-mono">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};