"use client";

import { validatedTestingAction } from '@/server-actions/test.action';
import { useState } from 'react';

export default function Home() {
  const [msg, setMsg] = useState<string>("nothing here yet");

  return (
      <div className="">
        <button onClick={() => {
          validatedTestingAction({ stuff: "test" }).then((response) => setMsg(response.message));
        }}>
          Run server action
        </button>
        
        <h1>{msg}</h1>
      </div>
  )
}
