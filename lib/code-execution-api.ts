// Code Execution API for Interactive Examples
export interface CodeExecutionRequest {
  code: string
  language: 'javascript' | 'jsx' | 'tsx'
  dependencies?: string[]
}

export interface CodeExecutionResponse {
  success: boolean
  output?: string
  error?: string
  logs?: string[]
  renderedHTML?: string
}

// Using CodeSandbox API for code execution
export class CodeExecutionAPI {
  private sandboxUrl = 'https://codesandbox.io/api/v1/sandboxes/define'
  
  async executeCode(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      // Create a sandbox with the code
      const sandboxData = {
        files: {
          'index.js': {
            content: request.code
          },
          'package.json': {
            content: JSON.stringify({
              dependencies: {
                'react': '^18.0.0',
                'react-dom': '^18.0.0',
                ...request.dependencies
              }
            })
          }
        }
      }
      
      const response = await fetch(this.sandboxUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sandboxData)
      })
      
      const result = await response.json()
      
      return {
        success: true,
        output: result.sandbox_id,
        renderedHTML: `<iframe src="https://codesandbox.io/embed/${result.sandbox_id}" />`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
  
  // Alternative: Use StackBlitz API
  async executeWithStackBlitz(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      const stackblitzData = {
        files: {
          'index.js': request.code,
          'package.json': JSON.stringify({
            dependencies: {
              'react': '^18.0.0',
              'react-dom': '^18.0.0'
            }
          })
        }
      }
      
      const response = await fetch('https://stackblitz.com/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stackblitzData)
      })
      
      const result = await response.json()
      
      return {
        success: true,
        output: result.id,
        renderedHTML: `<iframe src="https://stackblitz.com/edit/${result.id}" />`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}
