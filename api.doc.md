# Musicgpt API Documentation

## Docs

- [Audio Cutter](https://docs.musicgpt.com/api-documentation/conversions/audiocutter.md): Trims an audio file using the specified start and end times.
- [Audio Mastering](https://docs.musicgpt.com/api-documentation/conversions/audiomastering.md): Processes an input audio file to match the mastering characteristics of a reference track.
- [Audio Speed Changer](https://docs.musicgpt.com/api-documentation/conversions/audiospeedchanger.md): Processes an audio file to change its playback speed based on a speed factor.
- [Audio to MIDI](https://docs.musicgpt.com/api-documentation/conversions/audiotomidi.md): Processes an audio file and converts it into a MIDI file. Optionally generates a sonified .wav and/or a CSV of note events. This request is handled asynchronously.
- [Audio Transcribe](https://docs.musicgpt.com/api-documentation/conversions/audiotranscription.md): Processes an audio file to generate a transcription of the spoken content with support for language detection, translation, and multiple output formats.
- [Cover Song](https://docs.musicgpt.com/api-documentation/conversions/cover.md): Convert an audio file or URL into a cover song using a different voice.
- [Deecho](https://docs.musicgpt.com/api-documentation/conversions/deecho.md): Initiate an echo removal task using either an audio URL or file upload with optional webhook callback.
- [Denoise](https://docs.musicgpt.com/api-documentation/conversions/denoise.md): Initiate a noise removal task using either an audio URL or file upload with optional webhook callback.
- [Dereverb](https://docs.musicgpt.com/api-documentation/conversions/dereverb.md): Initiate a reverberation removal task using either an audio URL or file upload with optional webhook callback.
- [Extend](https://docs.musicgpt.com/api-documentation/conversions/extend.md): This endpoint allows users to extend an existing audio file or stream by appending new audio content after a specific timestamp. The new audio is generated using a prompt (e.g., describing the desired sound) and optional lyrics.
- [Extraction](https://docs.musicgpt.com/api-documentation/conversions/extraction.md): Process an audio file to extract specified stems (vocals, instrumental, or other components) with optional preprocessing. Supports file upload or URL with webhook callback.
- [Key & BPM Extraction](https://docs.musicgpt.com/api-documentation/conversions/extractkeybpm.md): Processes an audio file to extract key changes, dominant key, and BPM (Beats Per Minute).
- [File Conversion](https://docs.musicgpt.com/api-documentation/conversions/fileconvert.md): Initiate a file conversion task using either an audio URL or file upload with optional format parameters and webhook callback.
- [Image to Song](https://docs.musicgpt.com/api-documentation/conversions/imagetosong.md): Generate a song from an image by analyzing it and creating music based on visual content. The process can optionally include custom lyrics, voice conversion, and various musical parameters.
- [Inpaint](https://docs.musicgpt.com/api-documentation/conversions/inpaint.md): This endpoint allows users to replace a specific time segment of an audio clip using a textual prompt and optional lyrics. The inpainting operation blends new audio content into the selected range, guided by user-defined style and voice preferences.
- [Lyrics Generator](https://docs.musicgpt.com/api-documentation/conversions/lyrics_generator.md): This endpoint takes a natural language prompt (e.g., a theme, vibe, or idea) and generates original lyrics based on it. If the prompt has been used before, a variation may be returned. It also estimates the credit cost of generation.
- [Music AI](https://docs.musicgpt.com/api-documentation/conversions/musicai.md): Create music powered by AI using just a prompt, lyrics, or a defined music style.
- [Music AI Single Song](https://docs.musicgpt.com/api-documentation/conversions/musicaibatch.md): Create music powered by AI using just a prompt, lyrics, or a defined music style.
- [Music AI V2](https://docs.musicgpt.com/api-documentation/conversions/musicaistreaming.md): Create music powered by AI using just a prompt, lyrics, or a defined music style.
- [Remix](https://docs.musicgpt.com/api-documentation/conversions/remix.md): This endpoint allows users to remix an input audio file or URL using a descriptive prompt, optional lyrics, and a gender selection for vocal tone.
- [Sing Over Instrumental](https://docs.musicgpt.com/api-documentation/conversions/sing_over_instrumental.md): This endpoint allows users to sing over an instrumental audio track using a text prompt and lyrics. It supports either a file upload or a URL to the input audio and generates a vocal overlay based on the provided lyrics and style.
- [Sound Generator](https://docs.musicgpt.com/api-documentation/conversions/soundgenerator.md): Creates an audio file based on a textual prompt. The generation process is asynchronous and returns a task ID for tracking.
- [Text To Speech](https://docs.musicgpt.com/api-documentation/conversions/texttospeech.md): Synthesize speech from text with voice and gender customization, plus optional webhook callback.   Give priority to the sample audio first, then to the voice ID, and lastly to gender.
- [Voice Changer](https://docs.musicgpt.com/api-documentation/conversions/voicechanger.md): Convert the voice from an audio file or URL to a different voice.
- [MUSIC AI](https://docs.musicgpt.com/api-documentation/endpoint/MusicAI.md): Create music powered by AI using just a prompt, lyrics, or a defined music style.
- [MUSIC AI V2](https://docs.musicgpt.com/api-documentation/endpoint/Musicaistreaming.md): Create music powered by AI using just a prompt, lyrics, or a defined music style.
- [Text To Speech](https://docs.musicgpt.com/api-documentation/endpoint/TextToSpeech.md): Synthesize speech from text with voice and gender customization, plus optional webhook callback.   Give priority to the sample audio first, then to the voice ID, and lastly to gender.
- [Audio Cutter](https://docs.musicgpt.com/api-documentation/endpoint/audio_cutter.md): Trims an audio file using the specified start and end times.
- [Audio Mastering](https://docs.musicgpt.com/api-documentation/endpoint/audio_mastering.md): Processes an input audio file to match the mastering characteristics of a reference track.
- [Audio Speed Changer](https://docs.musicgpt.com/api-documentation/endpoint/audio_speed_changer.md): Processes an audio file to change its playback speed based on a speed factor.
- [Audio To MIDI](https://docs.musicgpt.com/api-documentation/endpoint/audio_to_midi.md): Processes an audio file and converts it into a MIDI file. Optionally generates a sonified .wav and/or a CSV of note events. This request is handled asynchronously.
- [Audio Transcribe](https://docs.musicgpt.com/api-documentation/endpoint/audiotranscribe.md): Processes an audio file to generate a transcription of the spoken content with support for language detection, translation, and multiple output formats.
- [Cover](https://docs.musicgpt.com/api-documentation/endpoint/cover.md): Convert an audio file or URL into a cover song using a different voice.
- [DeEcho](https://docs.musicgpt.com/api-documentation/endpoint/deecho.md): Initiate an echo removal task using either an audio URL or file upload with optional webhook callback.
- [DeNoise](https://docs.musicgpt.com/api-documentation/endpoint/denoise.md): Initiate a noise removal task using either an audio URL or file upload with optional webhook callback.
- [DeReverb](https://docs.musicgpt.com/api-documentation/endpoint/dereverb.md): Initiate a reverberation removal task using either an audio URL or file upload with optional webhook callback.
- [Extend](https://docs.musicgpt.com/api-documentation/endpoint/extend.md): This endpoint allows users to extend an existing audio file or stream by appending new audio content after a specific timestamp. The new audio is generated using a prompt (e.g., describing the desired sound) and optional lyrics.
- [Extract Key BPM](https://docs.musicgpt.com/api-documentation/endpoint/extract_key_bpm.md): Processes an audio file to extract key changes, dominant key, and BPM (Beats Per Minute).
- [Extraction](https://docs.musicgpt.com/api-documentation/endpoint/extraction.md): Process an audio file to extract specified stems (vocals, instrumental, or other components) with optional preprocessing. Supports file upload or URL with webhook callback.
- [File Conversion](https://docs.musicgpt.com/api-documentation/endpoint/fileconvert.md): Initiate a file conversion task using either an audio URL or file upload with optional format parameters and webhook callback.
- [Get All Voices](https://docs.musicgpt.com/api-documentation/endpoint/getAllVoices.md): Fetch all available voices with their IDs.
- [Get Conversion Details By ID](https://docs.musicgpt.com/api-documentation/endpoint/getById.md): Retrieve details of a conversion using `task_id` or `conversion_id`.
- [Get Conversion Details By Id Streaming](https://docs.musicgpt.com/api-documentation/endpoint/getByStreaming.md): Streams the generated audio for a conversion created with **Music AI v2**.
- [Image to Song](https://docs.musicgpt.com/api-documentation/endpoint/imagetosong.md): Generate a song from an image by analyzing it and creating music based on visual content. The process can optionally include custom lyrics, voice conversion, and various musical parameters.
- [Inpaint](https://docs.musicgpt.com/api-documentation/endpoint/inpaint.md): This endpoint allows users to replace a specific time segment of an audio clip using a textual prompt and optional lyrics. The inpainting operation blends new audio content into the selected range, guided by user-defined style and voice preferences.
- [Lyrics Generator](https://docs.musicgpt.com/api-documentation/endpoint/lyrics_generator.md): This endpoint takes a natural language prompt (e.g., a theme, vibe, or idea) and generates original lyrics based on it. If the prompt has been used before, a variation may be returned. It also estimates the credit cost of generation.
- [Music AI Single Song](https://docs.musicgpt.com/api-documentation/endpoint/musicaibatch.md): Create music powered by AI using just a prompt, lyrics, or a defined music style.
- [Remix](https://docs.musicgpt.com/api-documentation/endpoint/remix.md): This endpoint allows users to remix an input audio file or URL using a descriptive prompt, optional lyrics, and a gender selection for vocal tone.
- [Get Voices by Name](https://docs.musicgpt.com/api-documentation/endpoint/searchVoices.md): Search for voices to get their voice ID by their names using a query string.
- [Sing Over Instrumental](https://docs.musicgpt.com/api-documentation/endpoint/sing_over_instrumental.md): This endpoint allows users to sing over an instrumental audio track using a text prompt and lyrics. It supports either a file upload or a URL to the input audio and generates a vocal overlay based on the provided lyrics and style.
- [Sound Generator](https://docs.musicgpt.com/api-documentation/endpoint/soundgenerator.md): Creates an audio file based on a textual prompt. The generation process is asynchronous and returns a task ID for tracking.
- [Voice Changer](https://docs.musicgpt.com/api-documentation/endpoint/voicetovoice.md): Convert the voice from an audio file or URL to a different voice.
- [FAQs](https://docs.musicgpt.com/api-documentation/index/FAQs.md)
- [Authentication](https://docs.musicgpt.com/api-documentation/index/authentication.md)
- [Changelog](https://docs.musicgpt.com/api-documentation/index/changelog.md)
- [Create an API Account](https://docs.musicgpt.com/api-documentation/index/createapiaccount.md)
- [Introduction](https://docs.musicgpt.com/api-documentation/index/introduction.md)
- [Keys to the Castle](https://docs.musicgpt.com/api-documentation/index/keystocastle.md)
- [Pricing Plans](https://docs.musicgpt.com/api-documentation/index/pricing.md)
- [SDK and Tools](https://docs.musicgpt.com/api-documentation/index/sdk.md)
- [Status Check](https://docs.musicgpt.com/api-documentation/index/statuscheck.md)
- [Webhook Integration](https://docs.musicgpt.com/api-documentation/index/webhook.md)
- [The First Time](https://docs.musicgpt.com/api-documentation/index/yourfirstrequest.md)
- [Sample Helper Request](https://docs.musicgpt.com/api-documentation/sample-get-request.md): Retrieve details of a conversion using `task_id` or `conversion_id`.
- [Sample Conversion Request](https://docs.musicgpt.com/api-documentation/sample-post-request.md): Create music powered by AI using just a prompt, lyrics, or a defined music style.
- [Handling Errors](https://docs.musicgpt.com/api-documentation/utilities/error.md)
- [Final Notes](https://docs.musicgpt.com/api-documentation/utilities/finalnotes.md)
- [Ratelimits](https://docs.musicgpt.com/api-documentation/utilities/ratelimits.md)

## OpenAPI Specs

- [openapi](https://docs.musicgpt.com/api-documentation/openapi.json)

## Optional

- [Documentation](https://docs.musicgpt.com)


Built with [Mintlify](https://mintlify.com).