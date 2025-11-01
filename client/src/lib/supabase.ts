import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Supabase Environment Check:', {
  urlExists: !!supabaseUrl,
  keyExists: !!supabaseAnonKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING',
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration missing!', {
    VITE_SUPABASE_URL: supabaseUrl || 'undefined',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? 'defined' : 'undefined',
  });
}

let supabaseClient = null;
let initError = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        fetch: fetch.bind(globalThis),
      },
    });
    console.log('✅ Supabase client initialized successfully');
  }
} catch (error) {
  initError = error;
  console.error('❌ Failed to initialize Supabase client:', error);
}

export const supabase = supabaseClient;
export const isSupabaseConfigured = () => supabase !== null;
export const getSupabaseInitError = () => initError;
