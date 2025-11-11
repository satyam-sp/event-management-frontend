// src/components/AuthContainer.tsx
export default function AuthContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 to-white">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
