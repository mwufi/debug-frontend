export async function GET() {
    const componentCode = `<div>Hello from dynamic component!</div>`;

    return new Response(componentCode, {
        headers: {
            'Content-Type': 'application/javascript',
        },
    });
}