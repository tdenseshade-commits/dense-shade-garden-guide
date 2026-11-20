import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, HeartPulse, MessageCircleQuestion, Send, Upload } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { DemoBadge } from "@/components/plants/PlantBits";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NativeSelect } from "@/components/forms/NativeSelect";
import { SUGGESTED_QUESTIONS, simulateAnswer, simulateHealth, simulateIdentify, type KnowledgeAnswer } from "@/lib/demo/assistant";
import { getSpecies, speciesImage } from "@/lib/demo/catalog";
import { useDemo } from "@/lib/demo/store";
import type { Species } from "@/lib/demo/types";
import { pageMeta } from "@/lib/seo";

const search = z.object({
  tab: z.enum(["identify", "health", "ask"]).optional(),
  plant: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/_main/assistant")({
  validateSearch: search,
  head: () => pageMeta("DenseShade AI demo", "Simulated plant identification, health checks and gardening answers."),
  component: AssistantPage,
});

function AssistantPage() {
  const { tab = "identify", plant } = Route.useSearch();
  return (
    <>
      <PageHeader
        eyebrow="DenseShade AI · demonstration"
        title="Your botanical helper"
        description="A preview of how DenseShade could help. Results are simulated from sample data - no real AI or plant database is connected."
        actions={<DemoBadge />}
      />
      <Tabs defaultValue={tab}>
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="identify"><Camera aria-hidden className="mr-1 h-4 w-4" />Identify</TabsTrigger>
          <TabsTrigger value="health"><HeartPulse aria-hidden className="mr-1 h-4 w-4" />Health check</TabsTrigger>
          <TabsTrigger value="ask"><MessageCircleQuestion aria-hidden className="mr-1 h-4 w-4" />Ask</TabsTrigger>
        </TabsList>
        <TabsContent value="identify"><Identify /></TabsContent>
        <TabsContent value="health"><Health initialPlant={plant} /></TabsContent>
        <TabsContent value="ask"><Ask /></TabsContent>
      </Tabs>
    </>
  );
}

function PhotoPicker({ label, onPick, preview }: { label: string; onPick: (f: File) => void; preview: string | null }) {
  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed bg-mist/50 p-6 text-center">
        {preview ? <img src={preview} alt="Your photo" className="max-h-56 rounded-2xl object-cover" /> : <Upload className="h-8 w-8 text-sage" aria-hidden />}
        <span className="font-semibold">{preview ? "Choose another photo" : label}</span>
        <span className="text-xs text-muted-foreground">Your photo stays on this device. It is not analysed.</span>
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); }} />
      </label>
    </div>
  );
}

function Confidence({ value, label }: { value: number; label: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm"><span>{label}</span><span className="font-semibold">{value}%</span></div>
      <Progress value={value} aria-label={label} />
    </div>
  );
}

function SpeciesLinks({ ids }: { ids: string[] }) {
  const { plants } = useDemo();
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map(getSpecies).filter((s): s is Species => !!s).map((s) => {
        const mine = plants.find((p) => p.speciesId === s.id && !p.archived);
        return (
          <span key={s.id} className="flex gap-1">
            <Button asChild size="sm" variant="outline"><Link to="/plants/$speciesId" params={{ speciesId: s.id }}>{s.commonName} guide</Link></Button>
            {mine && <Button asChild size="sm" variant="ghost"><Link to="/garden/$plantId" params={{ plantId: mine.id }}>My {mine.nickname}</Link></Button>}
          </span>
        );
      })}
    </div>
  );
}

function Identify() {
  const { plants } = useDemo();
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof simulateIdentify> | null>(null);
  const pick = (f: File) => {
    setPreview(URL.createObjectURL(f));
    setResult(simulateIdentify(`${f.name}${f.size}`, plants.filter((p) => !p.archived).map((p) => p.speciesId)));
  };
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Identify a plant" description="Add a photo to see a sample identification.">
        <PhotoPicker label="Upload a plant photo" onPick={pick} preview={preview} />
      </SectionCard>
      {result && (
        <SectionCard title="Suggested match" action={<DemoBadge label="Simulated" />}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <img src={speciesImage(result.species)} alt="" className="h-20 w-20 rounded-2xl object-cover" />
              <div>
                <p className="text-lg font-semibold">{result.species.commonName}</p>
                <p className="text-sm italic text-muted-foreground">{result.species.scientificName}</p>
                <Badge variant="outline" className="mt-1">{result.species.category}</Badge>
              </div>
            </div>
            <Confidence value={result.confidence} label="Demo confidence" />
            <dl className="space-y-1 text-sm">
              <div><dt className="inline font-semibold">Light: </dt><dd className="inline">{result.species.light}</dd></div>
              <div><dt className="inline font-semibold">Water: </dt><dd className="inline">{result.species.water}</dd></div>
              <div><dt className="inline font-semibold">Difficulty: </dt><dd className="inline">{result.species.difficulty}</dd></div>
            </dl>
            <SpeciesLinks ids={[result.species.id]} />
            <div>
              <p className="mb-2 text-sm font-semibold">Other possible matches</p>
              <ul className="space-y-2">
                {result.alternatives.map((a) => (
                  <li key={a.species.id} className="flex items-center justify-between gap-3 text-sm">
                    <Link to="/plants/$speciesId" params={{ speciesId: a.species.id }} className="underline-offset-2 hover:underline">{a.species.commonName} <span className="italic text-muted-foreground">{a.species.scientificName}</span></Link>
                    <span className="text-muted-foreground">{a.confidence}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function Health({ initialPlant }: { initialPlant: string | undefined }) {
  const { plants } = useDemo();
  const active = plants.filter((p) => !p.archived);
  const [plantId, setPlantId] = useState(initialPlant ?? active[0]?.id ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof simulateHealth> | null>(null);
  const plant = active.find((p) => p.id === plantId);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Check plant health" description="Pick a plant, then add a photo of the leaves or stem.">
        <div className="space-y-4">
          <NativeSelect aria-label="Plant" value={plantId} onChange={(e) => { setPlantId(e.target.value); setResult(null); }}>
            {active.map((p) => <option key={p.id} value={p.id}>{p.nickname}</option>)}
          </NativeSelect>
          <PhotoPicker label="Upload a photo" preview={preview} onPick={(f) => { setPreview(URL.createObjectURL(f)); setResult(simulateHealth(`${plantId}${f.name}${f.size}`)); }} />
        </div>
      </SectionCard>
      {result && (
        <SectionCard title="Possible picture" description="Not a diagnosis - just ideas to look into gently." action={<DemoBadge label="Simulated" />}>
          <div className="space-y-4 text-sm">
            <p><span className="font-semibold">Possible symptom: </span>{result.scenario.symptom}</p>
            <Confidence value={result.confidence} label="Demo confidence" />
            <p className="rounded-xl bg-mist p-3">A photo can't show roots, soil or pests up close, so this could easily be something else. If you're unsure, ask a local nursery.</p>
            <List title="Potential causes" items={result.scenario.causes} />
            <List title="Safe checks you can do" items={result.scenario.checks} />
            <List title="Suggested next steps" items={result.scenario.nextSteps} />
            {plant && <Button asChild variant="outline" size="sm"><Link to="/garden/$plantId" params={{ plantId: plant.id }}>Open {plant.nickname}</Link></Button>}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-1 font-semibold">{title}</p>
      <ul className="list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

interface Turn { q: string; a: KnowledgeAnswer | null }

function Ask() {
  const [style, setStyle] = useState<"simple" | "advanced">("simple");
  const [text, setText] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const ask = (q: string) => { if (!q.trim()) return; setTurns((t) => [...t, { q: q.trim(), a: simulateAnswer(q) }]); setText(""); };
  const last = turns[turns.length - 1];
  const suggestions = last?.a?.followUps ?? SUGGESTED_QUESTIONS;
  return (
    <SectionCard
      title="Ask a gardening question"
      description="Sample answers from a small built-in demo set."
      action={
        <div className="flex rounded-full border p-1" role="group" aria-label="Explanation style">
          {(["simple", "advanced"] as const).map((s) => (
            <Button key={s} size="sm" variant={style === s ? "default" : "ghost"} aria-pressed={style === s} onClick={() => setStyle(s)}>{s === "simple" ? "Simple" : "Advanced"}</Button>
          ))}
        </div>
      }
    >
      <div className="space-y-4">
        <ul className="space-y-4">
          {turns.map((t, i) => (
            <li key={i} className="space-y-2">
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground">{t.q}</p>
              <div className="max-w-[90%] space-y-3 rounded-2xl bg-mist px-4 py-3 text-sm">
                {t.a ? (
                  <>
                    <p className="leading-relaxed">{style === "simple" ? t.a.simple : t.a.advanced}</p>
                    <SpeciesLinks ids={t.a.speciesIds} />
                  </>
                ) : (
                  <p>I don't have a sample answer for that yet. Try one of the suggested questions below.</p>
                )}
                <p className="text-xs text-muted-foreground">Simulated answer · not verified advice</p>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <p className="mb-2 text-sm font-semibold">{last ? "You could also ask" : "Try asking"}</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((q) => <Button key={q} size="sm" variant="outline" className="h-auto whitespace-normal text-left" onClick={() => ask(q)}>{q}</Button>)}
          </div>
        </div>
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
          <Input value={text} onChange={(e) => setText(e.target.value)} maxLength={200} placeholder="e.g. How often should I water my Monstera?" aria-label="Your question" />
          <Button type="submit" disabled={!text.trim()} aria-label="Send"><Send aria-hidden /></Button>
        </form>
      </div>
    </SectionCard>
  );
}
