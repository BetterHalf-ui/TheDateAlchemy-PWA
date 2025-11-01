import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DiagnosticTest() {
  const [result, setResult] = useState<string>("");

  const testDirectFetch = async () => {
    setResult("Testing direct fetch to Supabase...");
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      setResult("❌ Environment variables missing!");
      return;
    }

    try {
      const url = `${supabaseUrl}/rest/v1/ice_breaking_questions?is_active=eq.true&order=created_at.asc`;
      
      console.log("Making direct fetch to:", url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        setResult(`❌ HTTP ${response.status}: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setResult(`✅ Success! Got ${data.length} questions`);
      console.log("Data:", data);
      
    } catch (error) {
      console.error("Fetch error:", error);
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Diagnostic Test</h1>
      
      <div className="space-y-4">
        <Button onClick={testDirectFetch}>
          Test Direct Fetch
        </Button>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
