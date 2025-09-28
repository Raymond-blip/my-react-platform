"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AiChat } from "@/components/ai-chat"
import { AiCodePreview } from "@/components/ai-code-preview"
import { PromptSuggestions } from "@/components/prompt-suggestions"
import { Badge } from "@/components/ui/badge"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Bot, Sparkles, Zap, History } from "lucide-react"
import { motion } from "framer-motion"

interface GeneratedComponent {
  id: string
  prompt: string
  code: string
  timestamp: Date
  title: string
}

export default function AiBuilderPage() {
  const [generatedComponents, setGeneratedComponents] = useState<GeneratedComponent[]>([])
  const [currentComponent, setCurrentComponent] = useState<GeneratedComponent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleComponentGenerated = (component: GeneratedComponent) => {
    setGeneratedComponents((prev) => [component, ...prev])
    setCurrentComponent(component)
  }

  const handlePromptSubmit = (prompt: string) => {
    setIsGenerating(true)
    fetch('/api/generate-component', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to generate component');
        const data = await res.json();
        const newComponent: GeneratedComponent = {
          id: Date.now().toString(),
          prompt,
          code: data.code,
          timestamp: new Date(),
          title: extractTitleFromPrompt(prompt),
        };
        handleComponentGenerated(newComponent);
      })
      .catch(() => {
        // fallback to mock if error
        const newComponent: GeneratedComponent = {
          id: Date.now().toString(),
          prompt,
          code: generateMockComponent(prompt),
          timestamp: new Date(),
          title: extractTitleFromPrompt(prompt),
        };
        handleComponentGenerated(newComponent);
      })
      .finally(() => setIsGenerating(false));
  }

  const generateMockComponent = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase()

    if (lowerPrompt.includes("button")) {
      return `import React from 'react';

function CustomButton({ children, variant = 'primary', size = 'medium', onClick }) {
  const baseStyles = {
    padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: 'white',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onClick={onClick}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {children}
    </button>
  );
}

// Example usage
function App() {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <CustomButton variant="primary" size="small">
        Small Primary
      </CustomButton>
      <CustomButton variant="secondary" size="medium">
        Medium Secondary
      </CustomButton>
      <CustomButton variant="outline" size="large">
        Large Outline
      </CustomButton>
    </div>
  );
}

export default App;`
    }

    if (lowerPrompt.includes("card") || lowerPrompt.includes("profile")) {
      return `import React from 'react';

function ProfileCard({ name, title, avatar, bio, stats }) {
  return (
    <div style={{
      maxWidth: '400px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      margin: '20px'
    }}>
      {/* Header with gradient background */}
      <div style={{
        height: '120px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '4px solid white',
          overflow: 'hidden'
        }}>
          <img 
            src={avatar || 'https://via.placeholder.com/80'} 
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '50px 20px 20px' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>
          {name}
        </h2>
        <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '16px' }}>
          {title}
        </p>
        <p style={{ margin: '0 0 20px 0', color: '#888', lineHeight: '1.5' }}>
          {bio}
        </p>
        
        {/* Stats */}
        {stats && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            borderTop: '1px solid #eee',
            paddingTop: '15px'
          }}>
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                  {value}
                </div>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                  {key}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Example usage
function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <ProfileCard
        name="Sarah Johnson"
        title="Senior React Developer"
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
        bio="Passionate about creating beautiful and functional user interfaces. Love working with React and modern web technologies."
        stats={{
          Projects: 42,
          Followers: 1234,
          Following: 567
        }}
      />
    </div>
  );
}

export default App;`
    }

    if (lowerPrompt.includes("form") || lowerPrompt.includes("input")) {
      return `import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px',
    border: \`2px solid \${errors[fieldName] ? '#ef4444' : '#e5e7eb'}\`,
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    outline: 'none',
  });

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1f2937' }}>
        Contact Us
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle('name')}
            placeholder="Your full name"
          />
          {errors.name && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle('email')}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={inputStyle('subject')}
            placeholder="What is this about?"
          />
          {errors.subject && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            style={{...inputStyle('message'), resize: 'vertical'}}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '15px',
            backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;`
    }

    // Default component for other prompts
    return `import React, { useState } from 'react';

function CustomComponent() {
  const [message, setMessage] = useState('Hello from AI-generated component!');

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      margin: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        color: '#1e40af', 
        marginBottom: '20px',
        fontSize: '28px'
      }}>
        AI Generated Component
      </h2>
      <p style={{ 
        color: '#64748b', 
        marginBottom: '30px',
        fontSize: '18px'
      }}>
        {message}
      </p>
      <button
        onClick={() => setMessage('Component updated by AI!')}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600'
        }}
      >
        Update Message
      </button>
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#9ca3af' }}>
        Generated based on: "{prompt}"
      </div>
    </div>
  );
}

export default CustomComponent;`
  }

  const extractTitleFromPrompt = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase()
    if (lowerPrompt.includes("button")) return "Custom Button Component"
    if (lowerPrompt.includes("card") || lowerPrompt.includes("profile")) return "Profile Card Component"
    if (lowerPrompt.includes("form")) return "Contact Form Component"
    return "Custom Component"
  }

  return (
    <div className="flex-1 flex flex-col bg-background min-h-0">
      <Navigation />

      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="border-b bg-gradient-to-r from-primary/5 to-secondary/5 p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI React Builder</h1>
                <p className="text-muted-foreground">Describe your component and watch AI bring it to life</p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Instant Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-blue-500" />
                <span>{generatedComponents.length} Components Created</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
  <div className="flex-1 flex min-h-0">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Chat Panel */}
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">Describe what you want to build</p>
                </div>
                <div className="flex-1 flex flex-col">
                  {generatedComponents.length === 0 && (
                    <div className="p-4">
                      <PromptSuggestions onPromptSelect={handlePromptSubmit} />
                    </div>
                  )}
                  <AiChat
                    onPromptSubmit={handlePromptSubmit}
                    isGenerating={isGenerating}
                    generatedComponents={generatedComponents}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Preview Panel */}
            <ResizablePanel defaultSize={65} minSize={50}>
              {currentComponent ? (
                <AiCodePreview component={currentComponent} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
                      <Bot className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">Ready to Build Something Amazing?</h3>
                    <p className="text-muted-foreground">
                      Describe your React component idea and I'll generate the code for you instantly.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline">Buttons</Badge>
                      <Badge variant="outline">Forms</Badge>
                      <Badge variant="outline">Cards</Badge>
                      <Badge variant="outline">Navigation</Badge>
                      <Badge variant="outline">Modals</Badge>
                    </div>
                  </div>
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}
