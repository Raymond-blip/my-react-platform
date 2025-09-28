"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, FileText, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlaygroundSidebarProps {
  files: Record<string, string>
  activeFile: string
  onFileSelect: (fileName: string) => void
  onTemplateLoad: (template: { name: string; code: string }) => void
}

export function PlaygroundSidebar({ files, activeFile, onFileSelect, onTemplateLoad }: PlaygroundSidebarProps) {
  const templates = [
    {
      name: "Counter Component",
      description: "A simple counter with increment/decrement",
      code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default Counter;`,
    },
    {
      name: "Todo List",
      description: "A basic todo list with add/remove functionality",
      code: `import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Todo List</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            padding: '8px',
            border: '1px solid #ccc',
            marginBottom: '4px'
          }}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
    },
    {
      name: "Form with Validation",
      description: "A contact form with basic validation",
      code: `import React, { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: errors.name ? '2px solid red' : '1px solid #ccc'
            }}
          />
          {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: errors.email ? '2px solid red' : '1px solid #ccc'
            }}
          />
          {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({...form, message: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: errors.message ? '2px solid red' : '1px solid #ccc',
              minHeight: '80px'
            }}
          />
          {errors.message && <div style={{ color: 'red', fontSize: '12px' }}>{errors.message}</div>}
        </div>
        <button type="submit" style={{ 
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;`,
    },
  ]

  return (
    <div className="h-full border-r bg-muted/20">
      <Tabs defaultValue="files" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 m-2">
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="flex-1 m-0">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Project Files</h3>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              {Object.keys(files).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => onFileSelect(fileName)}
                  className={cn(
                    "w-full flex items-center gap-2 p-2 text-left rounded-md transition-colors hover:bg-accent",
                    activeFile === fileName && "bg-accent text-accent-foreground",
                  )}
                >
                  {fileName.endsWith(".css") ? <Palette className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  <span className="text-sm">{fileName}</span>
                  {activeFile === fileName && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Active
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <h3 className="font-medium">Code Templates</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <Card key={template.name} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                      <Button size="sm" className="w-full" onClick={() => onTemplateLoad(template)}>
                        Load Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
