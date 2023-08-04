import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

// Initialize the Supabase client with your supabaseUrl and supabaseKey
const supabase = createClient('https://iqmldsvxjttxfyuuktau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxbWxkc3Z4anR0eGZ5dXVrdGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4MDYyMTksImV4cCI6MjAwNjM4MjIxOX0.sF0qkXwiv2jXFG1NzlL4qbroX3nBUELMpUtlIbdyjp4');

function DataInput() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const HandleSave = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({ email: Email, password: Password });
      if (error) {
        throw error;
      }
      // User signed up successfully, you can redirect or show a success message
      console.log('Saved successfully', user);

      // Now insert the user information to the 'users' table in the database
      const { data, error: insertError } = await supabase
        .from('login')
        .insert([{ email: Email }]);
      if (insertError) {
        throw insertError;
      }
      console.log('User information saved to the database:', data);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={HandleSave}>Save Info</button>
    </div>
  );
}

export default DataInput;
