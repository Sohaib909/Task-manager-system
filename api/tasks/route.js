// This is a placeholder for API routes
// Use the standalone server.js for the Express backend
export async function GET() {
  return new Response(
    JSON.stringify({
      message: "Use the standalone Express backend at localhost:5000",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  )
}
