import { Card } from "@/components/ui/card";
import { Music2, Heart, Music, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            About AI Song Lyrics Generator 🎵
          </h1>
          <p className="text-xl text-gray-600">
            Empowering songwriters with AI-powered lyrics generation
          </p>
        </div>
        
        <div className="gradient-border mb-16">
          <div className="p-8 text-center">
            <p className="text-xl leading-relaxed text-gray-700">
              Welcome to AI Song Lyrics Generator, where we combine cutting-edge AI technology
              with musical creativity to help you create professional song lyrics. Our platform
              makes it easy to generate unique verses, choruses, and hooks for any genre. 🎵
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Music2 className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission 🎵</h2>
              <p className="text-gray-600">
                Making professional songwriting accessible to everyone through
                AI-powered generation and creative assistance.
              </p>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Values ❤️</h2>
              <p className="text-gray-600">
                We believe in empowering artists with technology while respecting
                and preserving the authenticity of musical expression.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-12 mb-16">
          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Music className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">How It Works 🎵</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Our AI platform combines advanced language models with musical knowledge
              to help you create unique song lyrics. Choose your genre, theme, and style,
              and let our AI assist you in crafting professional verses and choruses.
            </p>
          </section>

          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">Our Commitment 🤝</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We're dedicated to providing the best AI songwriting tools while
              maintaining the integrity of musical expression. Our platform is continuously
              improved based on songwriter feedback and industry trends.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}