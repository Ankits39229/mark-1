import './globals.css'
import GooeyButtonDemo from './components/ui/gooey-menu/demo'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Your existing Electron app content here */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">Electron + React + Gooey Menu</h1>
        
        {/* Demo of the Gooey Menu */}
        <GooeyButtonDemo />
        
        {/* Fixed position gooey menu in bottom right as requested */}
        <div className="fixed bottom-6 right-6 z-50">
          <GooeyButtonDemo />
        </div>
      </div>
    </div>
  )
}

export default App
