import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-32 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
            Get in touch with us to discuss your next big idea.
          </p>
        </div>
      </section>

      <ContactSection />
      
      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-background relative border-t border-border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center group cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <i className="bi bi-geo-alt-fill text-2xl text-white"></i>
            </div>
            <h4 className="text-xl font-bold text-foreground">Find Us in Gazipur</h4>
            <p className="text-muted-foreground italic">E 93/8, 3rd Floor, Harinal Road, East Joydevpur</p>
          </div>
        </div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
      </section>
    </div>
  );
}
