const TAVUS_API_URL = 'https://tavusapi.com/v2';

export interface PersonaResponse {
    persona_id: string;
    persona_name: string;
}

export interface ConversationResponse {
    conversation_id: string;
    conversation_url: string;
}

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-api-key': process.env.TAVUS_API_KEY || '',
});

export async function createPersona(
    name: string,
    systemPrompt: string,
    context?: string,
    layers?: any,
    defaultReplicaId?: string
): Promise<PersonaResponse> {
    const response = await fetch(`${TAVUS_API_URL}/personas`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            persona_name: name,
            pipeline_mode: 'full',
            system_prompt: systemPrompt,
            context: context || '',
            default_replica_id: defaultReplicaId || process.env.TAVUS_REPLICA_ID,
            layers: layers || {
                perception: { perception_model: 'raven-1' },
                tts: {
                    tts_engine: 'cartesia',
                    tts_emotion_control: true,
                    tts_model_name: 'sonic-3',
                    voice_settings: { speed: 0.94, stability: 0.5 }
                },
                llm: {
                    model: 'tavus-gpt-4.1',
                    speculative_inference: true
                },
                conversational_flow: {
                    turn_detection_model: 'sparrow-1',
                    turn_taking_patience: 'medium',
                    replica_interruptibility: 'medium'
                }
            }
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to create persona: ${error}`);
    }

    return response.json();
}

export async function uploadToKnowledgeBase(personaId: string, file: File | Blob, fileName: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file, fileName);

    const response = await fetch(`${TAVUS_API_URL}/personas/${personaId}/knowledge-base`, {
        method: 'POST',
        headers: {
            'x-api-key': process.env.TAVUS_API_KEY || '',
        },
        body: formData,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to upload to knowledge base: ${error}`);
    }
}

export async function uploadTextToKnowledgeBase(personaId: string, text: string): Promise<void> {
    const response = await fetch(`${TAVUS_API_URL}/personas/${personaId}/knowledge-base`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to upload text to knowledge base: ${error}`);
    }
}

export async function createConversation(
    personaId: string,
    conversationName: string,
    conversationalContext?: string,
    customGreeting?: string
): Promise<ConversationResponse> {
    const response = await fetch(`${TAVUS_API_URL}/conversations`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            replica_id: process.env.TAVUS_REPLICA_ID,
            persona_id: personaId,
            conversation_name: conversationName,
            conversational_context: conversationalContext || '',
            custom_greeting: customGreeting || '',
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to create conversation: ${error}`);
    }

    return response.json();
}
