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
    <section className="py-8 bg-isabelline/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto">
            Real reviews from happy customers who found their perfect florists through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-apple hover:shadow-apple-hover transition-all duration-500
                         opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-selective_yellow text-selective_yellow" />
                ))}
              </div>
              <p className="text-lg text-black/80 mb-8 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <h4 className="text-base font-semibold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-black/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
