import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Coffee, Check, Sparkles, Music2, Music, Star, Zap } from 'lucide-react';
import { genAI, isApiConfigured } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SupportBox = () => (
  <Card className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 border-2 border-neutral-200 mb-8">
    <div className="text-center space-y-4">
      <Coffee className="h-12 w-12 mx-auto text-amber-500" />
      <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
      <p className="text-neutral-600 max-w-xl mx-auto">
        Help us maintain and improve our AI songwriting tools by supporting our API & hosting costs. 
        Your contribution helps keep this tool free for everyone! 🙏
      </p>
      <a
        href="https://roihacks.gumroad.com/coffee"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          size="lg" 
          className="text-lg px-8 bg-amber-500 hover:bg-amber-600 text-white"
        >
          <Coffee className="mr-2 h-5 w-5" />
          Buy Us a Coffee ☕
        </Button>
      </a>
    </div>
  </Card>
);

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('pop');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLyrics = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!isApiConfigured()) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const promptText = `Write ${style} style song lyrics about: ${prompt}. 
      Make it creative, with strong rhymes and emotional depth.
      Include a chorus and verses.
      Format with proper line breaks between sections.`;
      
      const result = await model.generateContent(promptText);
      setLyrics(result.response.text().trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the lyrics');
      setLyrics('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-neutral-800 leading-tight">
            Free AI Song Lyrics Generator 🎵
          </h1>
          <p className="text-xl text-neutral-600">
            Create beautiful song lyrics with AI assistance - completely free! ✨
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Music Style
                </label>
                <Select
                  value={style}
                  onValueChange={setStyle}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="folk">Folk</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="r&b">R&B</SelectItem>
                    <SelectItem value="indie">Indie</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="🎵 What should your song be about? Describe your theme, mood, or story..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[150px] text-lg border-2 focus:border-neutral-400"
              />
              
              <Button 
                onClick={generateLyrics}
                disabled={loading || !prompt.trim()}
                className="w-full text-lg py-6 bg-neutral-800 hover:bg-neutral-900 text-white"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Lyrics...
                  </>
                ) : (
                  <>
                    <Music2 className="mr-2 h-5 w-5" />
                    Generate Song Lyrics 🎵
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {lyrics && (
          <div className="space-y-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-neutral-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Your Generated Lyrics</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 hover:bg-neutral-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="prose prose-neutral max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lyrics}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          </div>
        )}

        <SupportBox />

        <div className="space-y-12 mb-16">
          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-neutral-100">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Free AI Song Lyrics Generator: Your Creative Writing Partner 🎵
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-neutral-700 leading-relaxed">
                Welcome to the web's best free AI song lyrics generator! Our advanced AI helps
                you create professional lyrics for any music style - completely free.
                Whether you're writing pop, rock, folk, or R&B, our AI lyrics generator
                has got your back.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="p-6 text-center">
                  <Star className="h-8 w-8 mx-auto text-yellow-500 mb-4" />
                  <h3 className="font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-neutral-600">Generate unlimited lyrics</p>
                </Card>

                <Card className="p-6 text-center">
                  <Zap className="h-8 w-8 mx-auto text-blue-500 mb-4" />
                  <h3 className="font-semibold mb-2">Instant Creation</h3>
                  <p className="text-sm text-neutral-600">Get lyrics in seconds</p>
                </Card>

                <Card className="p-6 text-center">
                  <Music className="h-8 w-8 mx-auto text-green-500 mb-4" />
                  <h3 className="font-semibold mb-2">Multiple Styles</h3>
                  <p className="text-sm text-neutral-600">From pop to jazz</p>
                </Card>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose Our Free Lyrics Generator? 🎵
            </h2>
            <div className="space-y-4">
              <p className="text-neutral-700">
                Our AI song lyrics generator stands out because:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-neutral-600">
                <li>No signup needed - start writing instantly</li>
                <li>Advanced AI for professional-quality lyrics</li>
                <li>Multiple music genres and styles</li>
                <li>Perfect for beginners and pros</li>
                <li>Regular updates to our AI model</li>
                <li>User-friendly interface</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-neutral-100">
            <h2 className="text-2xl font-bold mb-6">
              How to Use Our Lyrics Generator 🎵
            </h2>
            <div className="space-y-4">
              <ol className="list-decimal pl-6 space-y-4 text-neutral-600">
                <li>
                  <strong>Pick Your Style:</strong> Choose from pop, rock, folk,
                  and more
                </li>
                <li>
                  <strong>Set Your Theme:</strong> Tell us what you want to write about
                </li>
                <li>
                  <strong>Generate:</strong> Let our AI create your lyrics
                </li>
                <li>
                  <strong>Customize:</strong> Edit and perfect your song
                </li>
                <li>
                  <strong>Record:</strong> Take your lyrics to the studio
                </li>
              </ol>
            </div>
          </section>

          <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Features for Every Songwriter 🎵
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Music Styles</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Pop Music</li>
                  <li>• Rock</li>
                  <li>• Folk</li>
                  <li>• R&B</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Content Types</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Love Songs</li>
                  <li>• Story Songs</li>
                  <li>• Ballads</li>
                  <li>• Choruses & Hooks</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <SupportBox />
      </div>
    </div>
  );
}