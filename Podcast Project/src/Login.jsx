import { createClient } from '@supabase/supabase-js';
// import { useState } from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react'
// import {useNavigate} from "react-router-dom"




export const supabase = createClient(
'https://iqmldsvxjttxfyuuktau.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxbWxkc3Z4anR0eGZ5dXVrdGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4MDYyMTksImV4cCI6MjAwNjM4MjIxOX0.sF0qkXwiv2jXFG1NzlL4qbroX3nBUELMpUtlIbdyjp4'
);


export default function Login () {

  return (
    <div className='LoginBack'>

  <div className= "login">
      <header className= "App-Header">
 <Auth 
     supabaseClient={supabase}
     appearance={{ theme: ThemeSupa }}
     theme="dark"
     providers={["google"]}

    />
      </header>
  </div>
  </div>
  )
}