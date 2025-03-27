'use client';

interface ProgressBar {
  label: string;
  value: number;
}

export default function ProgressPage() {
  const progressData: ProgressBar[] = [
    { label: 'Daily', value: 86 },
    { label: 'Weekly', value: 42 },
    { label: 'Monthly', value: 73 },
  ];

  return (
    <div className="max-w-md mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold text-center text-green-900 drop-shadow-md mb-8">Progress</h1>

      <div className="bg-yellow-50/90 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-green-900 mb-6">Overall Progress</h2>
        
        <div className="space-y-6">
          {progressData.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium text-green-800">{item.label}</span>
                <span className="text-green-700">{item.value}%</span>
              </div>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 ease-in-out"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 