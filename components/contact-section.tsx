import { Mail, Phone, Linkedin, Github, Twitter } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="w-full bg-surface py-[120px] px-6 md:px-20">
      <div className="max-w-[800px] mx-auto">
        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex items-center gap-2 text-sm text-foreground-70">
            <span>⚡</span>
            <span>Réponse en 24h</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground-70">
            <span>🎯</span>
            <span>+15 projets livrés</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground-70">
            <span>⭐</span>
            <span>4.9/5 satisfaction</span>
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground text-center mb-6">
          Prêt à transformer votre business ?
        </h2>

        {/* Subheadline */}
        <div className="text-center mb-10 md:mb-12 max-w-[600px] mx-auto">
          <p className="text-lg md:text-xl text-foreground-70 font-sans mb-2">
            Réservons 30 minutes pour parler de votre vision.
          </p>
          <p className="text-lg md:text-xl text-foreground-70 font-sans">
            Sans engagement. 100% gratuit.
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="flex justify-center mb-10 md:mb-12">
          <a
            href="#contact"
            className="px-8 md:px-12 py-5 md:py-6 rounded-xl bg-accent text-primary-foreground font-semibold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,217,102,0.4)] transition-all duration-300"
          >
            📅 Réserver un appel gratuit
          </a>
        </div>

        {/* Divider */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-base text-foreground-50 font-sans">
            ou écrivez-moi directement :
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16">
          {/* Email Card */}
          <a
            href="mailto:serge@example.com"
            className="glass-subtle rounded-xl p-6 border border-border hover:border-accent hover:shadow-[0_0_20px_rgba(255,217,102,0.2)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface/50 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                <Mail className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
              </div>
              <div>
                <p className="text-sm text-foreground-70 font-sans mb-1">Email</p>
                <p className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  serge@example.com
                </p>
              </div>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href="tel:+229XXXXXXXX"
            className="glass-subtle rounded-xl p-6 border border-border hover:border-accent hover:shadow-[0_0_20px_rgba(255,217,102,0.2)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface/50 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                <Phone className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
              </div>
              <div>
                <p className="text-sm text-foreground-70 font-sans mb-1">Téléphone</p>
                <p className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  +229 XX XX XX XX
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full glass-subtle border border-border flex items-center justify-center hover:border-accent hover:text-accent hover:scale-110 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 text-foreground" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full glass-subtle border border-border flex items-center justify-center hover:border-accent hover:text-accent hover:scale-110 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 text-foreground" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full glass-subtle border border-border flex items-center justify-center hover:border-accent hover:text-accent hover:scale-110 transition-all duration-300"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6 text-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

