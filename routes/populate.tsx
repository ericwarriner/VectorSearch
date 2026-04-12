import DatabaseSeeder from "../islands/DatabaseSeeder.tsx";

export default function Populate() {
  return (
    <div class="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <DatabaseSeeder />
    </div>
  );
}
