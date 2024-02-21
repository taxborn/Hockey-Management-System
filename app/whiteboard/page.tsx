"use client";

import { Tldraw } from "@tldraw/tldraw";
import "./index.css";


export default function app() {
  return (
    <> 
    <div style={{ position: 'fixed', top: '8%', left: 0, right: 0, bottom: 0 }}>
      <Tldraw />
    </div>
    </>
  );
}
