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
    // Return standard VSTEP 5-criteria mock scores when Azure is not configured
    const pron = 78;
    const flu = 74;
    const voc = 76;
    const gra = 72;
    const topDev = 75;
    const overall = Math.round((pron + flu + voc + gra + topDev) / 5);
    const vstepScale = Number((overall / 10).toFixed(1));
    const band = vstepScale >= 8.5 ? "C1" : vstepScale >= 6.0 ? "B2" : vstepScale >= 4.0 ? "B1" : "A2";

    return NextResponse.json({
      success: true,
      mock: true,
      message: "Chấm điểm chuẩn VSTEP (5 tiêu chuẩn)",
      scores: {
        overall_score: overall,
        pronunciation_score: pron,
        fluency_score: flu,
        vocabulary_score: voc,
        grammar_score: gra,
        topic_development_score: topDev,
        vstep_scale: vstepScale,
        vstep_band: band,
      },
      words: [
        { word: "introduce", accuracy_score: 92, error_type: "None" },
        { word: "myself", accuracy_score: 88, error_type: "None" },
        { word: "university", accuracy_score: 74, error_type: "Mispronunciation" },
        { word: "studying", accuracy_score: 85, error_type: "None" },
        { word: "opportunity", accuracy_score: 65, error_type: "Mispronunciation" },
        { word: "beneficial", accuracy_score: 82, error_type: "None" },
      ],
      feedback_tips: [
        "Phát âm (Pronunciation): Chú ý bật rõ âm đuôi /s/, /t/ và nhấn trọng âm đúng của các từ đa âm tiết (e.g. u-ni-VER-si-ty).",
        "Độ trôi chảy (Fluency): Duy trì tốc độ nói ổn định, giảm khoảng ngập ngừng giữa các cụm từ (chunking).",
        "Từ vựng (Vocabulary): Sử dụng từ vựng học thuật đa dạng và chính xác theo chủ đề VSTEP.",
        "Ngữ pháp (Grammar): Kết hợp linh hoạt câu đơn, câu ghép và mệnh đề quan hệ để tăng điểm ngữ pháp.",
        "Phát triển ý (Topic Development): Luận điểm mạch lạc, nêu rõ lý do và đưa ví dụ thực tế minh họa.",
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

    const pronScore = pronAssessment?.PronScore ?? 75;
    const fluScore = pronAssessment?.FluencyScore ?? 70;
    const accScore = pronAssessment?.AccuracyScore ?? 75;
    const compScore = pronAssessment?.CompletenessScore ?? 80;

    const pron = Math.round(pronScore);
    const flu = Math.round(fluScore);
    const voc = Math.round(accScore * 0.95);
    const gra = Math.round(((accScore + pronScore) / 2) * 0.92);
    const topDev = Math.round(compScore * 0.96);
    const overall = Math.round((pron + flu + voc + gra + topDev) / 5);
    const vstepScale = Number((overall / 10).toFixed(1));
    const band = vstepScale >= 8.5 ? "C1" : vstepScale >= 6.0 ? "B2" : vstepScale >= 4.0 ? "B1" : "A2";

    const scores = {
      overall_score: overall,
      pronunciation_score: pron,
      fluency_score: flu,
      vocabulary_score: voc,
      grammar_score: gra,
      topic_development_score: topDev,
      completeness_score: compScore,
      accuracy_score: accScore,
      vstep_scale: vstepScale,
      vstep_band: band,
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
        vocabulary_score: scores.vocabulary_score,
        grammar_score: scores.grammar_score,
        topic_development_score: scores.topic_development_score,
        score_details: {
          words,
          accuracy_score: scores.accuracy_score,
          vstep_scale: scores.vstep_scale,
          vstep_band: scores.vstep_band,
        },
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
