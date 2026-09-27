import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/speech/assess
 *
 * Receives audio data and reference text, sends to Azure Speech
 * Pronunciation Assessment API, returns scoring results.
 *
 * Body (FormData):
 *   - audio: File (audio/webm or audio/wav)
 *   - referenceText: string
 *   - exerciseId: string
 */
export async function POST(request: NextRequest) {
  // 1. Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse form data
  const formData = await request.formData();
  const audioFile = formData.get("audio") as File | null;
  const referenceText = formData.get("referenceText") as string | null;
  const exerciseId = formData.get("exerciseId") as string | null;

  if (!audioFile || !referenceText || !exerciseId) {
    return NextResponse.json(
      { error: "Missing required fields: audio, referenceText, exerciseId" },
      { status: 400 }
    );
  }

  // 3. Check Azure credentials
  const speechKey = process.env.AZURE_SPEECH_KEY;
  const speechRegion = process.env.AZURE_SPEECH_REGION;

  if (!speechKey || speechKey === "your-azure-speech-key") {
    // Return mock scores when Azure is not configured
    return NextResponse.json({
      success: true,
      mock: true,
      message: "Azure Speech not configured — returning mock scores",
      scores: {
        overall_score: 75.5,
        pronunciation_score: 78.2,
        fluency_score: 72.1,
        completeness_score: 80.0,
        accuracy_score: 76.8,
      },
      words: [
        { word: "hello", accuracy_score: 95, error_type: "None" },
        { word: "world", accuracy_score: 68, error_type: "Mispronunciation" },
      ],
    });
  }

  // 4. Convert audio to WAV buffer for Azure
  const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

  // 5. Call Azure Pronunciation Assessment REST API
  try {
    const pronunciationAssessmentParams = {
      ReferenceText: referenceText,
      GradingSystem: "HundredMark",
      Dimension: "Comprehensive",
      EnableMiscue: true,
    };

    const response = await fetch(
      `https://${speechRegion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": speechKey,
          "Content-Type": "audio/webm; codecs=opus",
          Accept: "application/json",
          "Pronunciation-Assessment": Buffer.from(
            JSON.stringify(pronunciationAssessmentParams)
          ).toString("base64"),
        },
        body: audioBuffer,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Azure Speech API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Speech assessment failed", details: errorText },
        { status: 502 }
      );
    }

    const result = await response.json();

    // 6. Extract scores from Azure response
    const nBest = result.NBest?.[0];

    if (!nBest) {
      return NextResponse.json(
        { error: "No assessment results returned" },
        { status: 502 }
      );
    }

    const pronAssessment = nBest.PronunciationAssessment;

    const scores = {
      overall_score: pronAssessment?.PronScore ?? null,
      pronunciation_score: pronAssessment?.PronScore ?? null,
      fluency_score: pronAssessment?.FluencyScore ?? null,
      completeness_score: pronAssessment?.CompletenessScore ?? null,
      accuracy_score: pronAssessment?.AccuracyScore ?? null,
    };

    // 7. Extract word-level scores
    const words =
      nBest.Words?.map(
        (w: {
          Word: string;
          PronunciationAssessment?: {
            AccuracyScore?: number;
            ErrorType?: string;
          };
        }) => ({
          word: w.Word,
          accuracy_score: w.PronunciationAssessment?.AccuracyScore ?? 0,
          error_type: w.PronunciationAssessment?.ErrorType ?? "None",
        })
      ) ?? [];

    // 8. Upload audio to Supabase Storage
    const timestamp = Date.now();
    const audioPath = `${user.id}/${exerciseId}_${timestamp}.webm`;

    await supabase.storage
      .from("audio-recordings")
      .upload(audioPath, audioBuffer, {
        contentType: "audio/webm",
        upsert: false,
      });

    // 9. Save attempt to database
    const { data: attempt, error: attemptError } = await supabase
      .from("attempts")
      .insert({
        user_id: user.id,
        exercise_id: exerciseId,
        audio_url: audioPath,
        overall_score: scores.overall_score,
        fluency_score: scores.fluency_score,
        completeness_score: scores.completeness_score,
        pronunciation_score: scores.pronunciation_score,
        score_details: { words, accuracy_score: scores.accuracy_score },
        duration_seconds: null,
      })
      .select()
      .single();

    if (attemptError) {
      console.error("Error saving attempt:", attemptError);
    }

    return NextResponse.json({
      success: true,
      mock: false,
      scores,
      words,
      attempt_id: attempt?.id ?? null,
    });
  } catch (err) {
    console.error("Speech assessment error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
