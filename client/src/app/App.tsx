import "@/styles/App.css";
import PageRoutes from "@/app/PageRoutes";

function App() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-[#fff9f5]">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 220, 190, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 245, 238, 0.35) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 210, 180, 0.15) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10">
          <PageRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
