'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  console.error('[Global Error]', error);
  return (
    <html>
      <body>
        <div style={{minHeight:'100vh',display:'grid',placeItems:'center'}}>
          <div>
            <h1>Global xato</h1>
            <pre>{error.message}</pre>
            <button onClick={() => reset()}>Qayta urinish</button>
          </div>
        </div>
      </body>
    </html>
  );
}
