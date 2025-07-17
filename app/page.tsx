"use client";

import { AppChoice } from "./components/app-choice";
import { useRouter } from "next/navigation";
import { HelpCircle } from "lucide-react";

const apps = [
  {
    name: "Plan Generator",
    description: "Generate your QGC plan file",
    image: "/images/flight-tracker.jpg",
  },
  {
    name: "4D Trajectory Generator",
    description: "Generate trajectories from QGC plan file.",
    image: "/images/uas-planner.jpg",
  },
    {
    name: "Plan Activation",
    description: "Ready to fly? Activate your approved flight plan.",
    image: "/images/uas-planner.jpg",
  },
];

export default function MainPage() {
  const router = useRouter();

  const handleLaunchApp = (appName: string) => {
    // Implement app launch logic here
    console.log(`Launching ${appName}`);
    // For example, navigate to the trajectory-generator page when launching UAS Planner
    if (appName === "4D Trajectory Generator") {
      router.push("/trajectory-generator");
    }
    if (appName === "Plan Generator") {
      router.push("/plan-generator");
    }
    if (appName === "Plan Activation") {
      router.push("/plan-activation");
    }
  };

  return (
    <div className="bg-gray-900">
      {/* Help Button */}
      <a
        href="/how-it-works"
        className="fixed top-24 right-8 z-50 bg-blue-700 hover:bg-blue-800 text-white rounded-full p-3 shadow-lg flex items-center gap-2 transition-all duration-200"
        title="Need help?"
      >
        <HelpCircle className="w-6 h-6" />
      </a>
      <main className="container mx-auto px-4 py-8">
        {/* App Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <AppChoice
              key={index}
              {...app}
              onLaunch={() => handleLaunchApp(app.name)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
