import { PrevoyanceForm } from "@/components/ui/PrevoyanceForm";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center bg-atlas-white overflow-hidden">
      {/* Subtle decorative background element to keep it discrete but premium */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-atlas-pearl/40 to-transparent -z-10" />

      <div className="w-full flex-grow flex flex-col">
        <PrevoyanceForm />
      </div>

    </main>
  );
}
