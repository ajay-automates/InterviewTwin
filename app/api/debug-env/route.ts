import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasApiKey: !!process.env.TAVUS_API_KEY,
        replicaId: process.env.TAVUS_REPLICA_ID,
        personaId: process.env.TAVUS_PERSONA_ID,
    });
}
