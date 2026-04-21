"use client";

export default function UnityPage() {
  return (
    <main style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh", 
      background: "#111" 
    }}>
      <h1 style={{ color: "#fff", marginBottom: "20px" }}>Meu Projeto Unity</h1>
      
      <div style={{ 
        width: "960px", 
        height: "600px", 
        border: "2px solid #333",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)" 
      }}>
        <iframe 
          src="/my-game/index.html" /*  */
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Unity Game"
        />
      </div>
    </main>
  );
}