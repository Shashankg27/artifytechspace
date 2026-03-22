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
      
      {/* Google Map Section */}
      <section className="py-24 bg-background relative border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">Visit Our <span className="text-gradient-primary">Workspace</span></h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  Experience our creative environment firsthand. We're located in the heart of Gazipur, ready to collaborate on your next innovation.
                </p>
              </div>
              <div className="md:w-1/2 flex md:justify-end">
                <div className="glass p-4 rounded-2xl flex items-center space-x-3 border border-border/50 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <i className="bi bi-geo-alt-fill text-lg"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</p>
                    <p className="text-xs font-semibold">East Joydevpur, Gazipur</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              {/* Decorative elements around map */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent blur-2xl opacity-50 -z-10 group-hover:opacity-75 transition-opacity" />
              
              <div className="w-full h-[450px] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl relative">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src="https://maps.google.com/maps?q=E%2093/8,%203rd%20Floor,%20Harinal%20Road,%20East%20Joydevpur,%20Gazipur&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
