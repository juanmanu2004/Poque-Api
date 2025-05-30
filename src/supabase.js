// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flveofrmigajfdijuvdi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdmVvZnJtaWdhamZkaWp1dmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Njc1NzQsImV4cCI6MjA2NDE0MzU3NH0.FppmJvQwlZmA0MKuweHY01i0c1De31n7jmfLuQGit8M'
export const supabase = createClient(supabaseUrl, supabaseKey);