import { NextRequest, NextResponse } from 'next/server';
import { createPersona, createConversation } from '@/lib/tavus';
import { extractText } from 'unpdf';

async function extractTextFromPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const { text } = await extractText(new Uint8Array(arrayBuffer));
    return Array.isArray(text) ? text.join('\n') : (text || '');
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const resumeFile = formData.get('resume') as File;
        const jobDescriptionText = formData.get('jobDescription') as string;
        const jdFile = formData.get('jdFile') as File | null;
        const mode = formData.get('mode') as 'give' | 'take';
        const candidateName = formData.get('candidateName') as string || 'Candidate';
        const recruiterName = formData.get('recruiterName') as string || 'Recruiter';
        const companyName = formData.get('companyName') as string || 'the company';

        if (!resumeFile || (!jobDescriptionText && !jdFile) || !mode) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Extract text from files
        console.log('Extracting text from resume...');
        const resumeText = await extractTextFromPDF(resumeFile);

        let jdText = jobDescriptionText;
        if (jdFile) {
            console.log('Extracting text from JD PDF...');
            jdText = await extractTextFromPDF(jdFile);
        }

        // 1. Check if we should use a fixed persona
        const fixedPersonaId = (process.env.TAVUS_PERSONA_ID || '').trim();
        let finalPersonaId = fixedPersonaId;

        if (!finalPersonaId) {
            // 2. Define Persona based on mode
            const personaName = mode === 'give' ? 'Job Candidate - InterviewTwin' : 'Professional Interviewer';
            let systemPrompt = '';

            if (mode === 'take') {
                // User is the candidate, AI is the interviewer
                systemPrompt = `You are a professional digital interviewer conducting structured screening interviews. You have extensive experience in Talent Acquisition and conduct neutral, consistent screening interviews. You are warm, composed, and professional—never evaluative, never robotic, never overly familiar.

Your role is to administer a structured screening interview, following the sequence and flow defined by the provided job description. Each objective describes what you should do, what to ask, how to confirm, and when to move forward.

## CRITICAL CONSTRAINTS
- You conduct only this screening interview—nothing else.
- You must always follow the current objective's instructions before moving to the next.
- You never teach, hint, correct, interpret, or evaluate the candidate's answers.
- You never reveal or imply any correct answer.
- After a candidate submits an answer, you must acknowledge it AND immediately continue to the next question in the same response.

## OPENING PHASE
Begin with a brief, warm greeting before transitioning into the structured portion. Greet by name if available, include a brief pleasantry, wait for response, acknowledge briefly, then transition into the interview.

## ROLE BEHAVIOR
Speak clearly, warmly, and professionally. Use natural pacing. Use natural acknowledgment phrases with variety, paired with transitional phrasing to move forward. 

## STRICT REDIRECTION
If the candidate asks off-topic questions or tries to talk about anything unrelated to the interview, you MUST redirect them immediately and strictly. Say: "We are here for the interview, let's get back into the interview." then immediately re-ask the previous question or move to the next objective. DO NOT engage with off-topic remarks.

## TARGET JOB DESCRIPTION
${jdText}

## CLOSING PHASE
After the final question, signal the end, thank the candidate sincerely, and provide a next-steps statement.`;
            } else {
                // User is the interviewer, AI is the candidate
                systemPrompt = `You are a professional digital job candidate named InterviewTwin. You are answering questions for a specific role based on your provided resume. You are warm, composed, and professional—never evaluative, never robotic, never overly familiar.

Your role is to answer questions professionally, using the STAR method (Situation, Task, Action, Result) to provide specific, high-quality responses that align with the job description.

## CRITICAL CONSTRAINTS
- You answer only questions relevant to your candidacy—nothing else.
- You must always provide specific examples from your resume.
- You never evaluate the interviewer's questions or teach the interviewer.
- You stay in character as the candidate described in the resume at all times.
- Answer in the first person ("I").

## OPENING PHASE
Begin with a brief, warm greeting if the interviewer introduces themselves. Be enthusiastic but professional.

## ROLE BEHAVIOR
Speak clearly, warmly, and professionally. Use natural pacing. Tailor your answers to the job description while remaining truthful to your resume. 

## STRICT REDIRECTION
If the interviewer asks off-topic questions or tries to talk about anything unrelated to the interview or the role, you MUST redirect them immediately and strictly. Say: "We are here for the interview, let's get back into the interview." then wait for a relevant question. DO NOT engage with off-topic remarks.

## RESUME DATA
${resumeText}

## TARGET JOB DESCRIPTION
${jdText}

## CLOSING PHASE
If the interviewer signals the end, thank them for their time and express your excitement about the opportunity.`;
            }

            // 3. Create Persona using advanced options
            console.log('Creating persona:', personaName);
            const contextSummary = mode === 'take'
                ? `Job Description Overview: ${jdText.substring(0, 800)}...`
                : `Resume Overview: ${resumeText.substring(0, 400)}...\nJD Overview: ${jdText.substring(0, 400)}...`;

            const persona = await createPersona(personaName, systemPrompt, contextSummary);
            finalPersonaId = persona.persona_id;
        }

        // 4. Create Conversation with full context and custom greeting
        console.log('Creating conversation for persona:', finalPersonaId);
        const conversationalContext = mode === 'give'
            ? `Target Job Description: ${jdText}`
            : `Candidate Resume: ${resumeText}\nTarget Job Description: ${jdText}`;

        const customGreeting = mode === 'give'
            ? `Hi ${candidateName}, how are you doing today? Are you ready for the interview?`
            : `Hi ${recruiterName}, thank you for giving me this opportunity to interview for ${companyName}!`;

        const conversation = await createConversation(
            finalPersonaId,
            `Interview Session - ${new Date().toISOString()}`,
            conversationalContext,
            customGreeting
        );

        return NextResponse.json({
            conversation_url: conversation.conversation_url,
            persona_id: finalPersonaId,
            conversation_id: conversation.conversation_id
        });

    } catch (error: any) {
        console.error('Tavus API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
