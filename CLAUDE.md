# viral-claude-shorts

This repo turns the audio of a script (a narration: recorded or generated) into an animated 9:16 short, synced to what it says. The user may be a beginner: explain each step in one plain line, in the user's language, with no jargon.

## Channels

Each account/niche is a channel in `canales/<canal>/`: `canal.json` (language, style, ElevenLabs voice, Metricool brand, networks, schedule, hashtags), `formula.md` (how its scripts are written), `ideas.md` (idea bank with states), `resultados.md` (its metrics and learnings) and `videos/<topic>/` (one folder per video). `canales/comparacion.md` compares channels. `canales/_plantilla/` is the template: `node core/canal.ts nuevo <nombre>` creates a channel from it, and `node core/canal.ts` lists every channel and the state of each video. `ejemplos/` holds the engine's example (`blue-sky`) and the setup test (`hello`); they belong to no channel.

**Always know the channel first.** Infer it from the message (the topic, the niche, a folder name); if it's ambiguous, ask in one line. Never mix channels: a video, its texts and its Metricool brand all come from the same `canal.json`.

## When the user gives you an audio

A short message is enough: "anima este audio", "make a video from this", a dragged-in file with an idea, etc. Treat it as the production prompt: read `prompts/production.md` and follow its steps exactly, filling its blanks from the message:

- **Channel:** see above. The video goes in `canales/<canal>/videos/<topic>/`.
- **Audio:** the file they gave you. If there's none, ask for it (that's the only thing you can't infer).
- **Style:** the channel's `estilo` (`flat2d`, the only one installed) unless they ask for another one in `styles/`.
- **Idea:** what they said they want to get across. If they didn't say it, infer it from the transcription and tell them in one line.
- **Assets and notes:** only if they gave them.

Don't skip the storyboard approval: show it and wait for their OK before rendering. Then open (or reuse) the live preview with `node core/preview.ts canales/<canal>/videos/<topic>` and give them the link.

## Ideas, publishing and results

- **"More ideas" / "write a script":** read the channel's `formula.md` (structure, voice and rules), `ideas.md` (the bank and its states) and `resultados.md` (what worked), then write `canales/<canal>/videos/<topic>/guion.md` in the same format as the channel's `guionModelo` (or, if it has none yet, `canales/south-park/videos/emmy-warcraft/guion.md`), with verifiable facts and their sources. Add the topic to the bank / update its state.
- **"Make the video of <topic>" with no audio given:** if `canales/<canal>/videos/<topic>/guion.md` exists and `.env` has the ElevenLabs key, generate the voice with `node core/elevenlabs.ts canales/<canal>/videos/<topic>` (one take; voice, model and language come from `canal.json`, falling back to `.env`) and continue with the production prompt. After transcribing, compare `words.json` with the script text: if a word came out different (e.g. "era" instead of "ganó"), tell the user the second where it happens so they can listen before animating; regenerating costs credits, so ask before using `--force`. If `.env` is missing, tell them to copy `.env.example` to `.env` and fill it in themselves (never ask them to paste the API key in the chat).
- **"Upload / publish / schedule <topic>":** follow `prompts/publish.md`. Always show the plan (channel, date, time, texts, networks) and wait for the OK before scheduling. A channel whose `metricool.blogId` is `null` isn't connected yet: walk the user through that first.
- **"How are the videos doing?" / "results" / "compare channels":** follow `prompts/results.md`.
- **"New channel / new niche":** `node core/canal.ts nuevo <nombre>`, then fill `canal.json`, `formula.md` (with the hypothesis of why that niche can go viral) and an `ideas.md` bank of ~10 topics, and add a row to `canales/comparacion.md`.

## If something is missing

If `node_modules`, `.venv` or a tool (Node 22.18+, ffmpeg, Python) is missing, the project isn't set up yet: tell the user and offer to run the steps in `prompts/setup-flat2d.md` first.
