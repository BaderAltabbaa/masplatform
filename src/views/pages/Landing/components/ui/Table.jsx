import React from "react";

const Table = ({ className }) => {
  const levels = [
    { name: "Basic", amount: "0", icon: "🌑", percent: "3%", cashback: "0%" },
    { name: "Silver", amount: "100", icon: "🌕", percent: "2.5%", cashback: "0%" },
    { name: "Gold", amount: "250", icon: "🌟", percent: "2%", cashback: "0%" },
    { name: "Diamond", amount: "1500", icon: "💎", percent: "1.5%", cashback: "0%" },
    { name: "MAS Plus", amount: "10000", icon: "🔴", percent: "1%", cashback: "0%" },
  ];

  return (
    <div 
      className={`${className || ""} w-full overflow-x-auto py-6 md:py-10 px-4`}
     
    >
      <div className="mx-auto max-w-4xl">
        {/* Mobile Cards View */}
        <div className="md:hidden space-y-4">
          {levels.map((level, index) => (
            <div 
              key={index}
              className="bg-[#1a052e] rounded-lg p-4 shadow-lg border border-[#2d0a4d]"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full">
                    {level.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white">{level.name}</h3>
                </div>
                <span className="text-sm opacity-80 text-white">Min: {level.amount}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#3f016e] p-3 rounded text-center">
                  <p className="text-sm opacity-80 text-white">Percent</p>
                  <p className="font-bold text-white">{level.percent}</p>
                </div>
                <div className="bg-[#1a052e] p-3 rounded text-center border border-[#3f016e]">
                  <p className="text-sm opacity-80 text-white">Cashback</p>
                  <p className="font-bold text-white">{level.cashback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="hidden md:table w-full border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-3 text-left border-b border-[#2d0a4d] text-sm font-medium opacity-80 text-white">Level</th>
              <th className="px-2 py-3 text-left border-b border-[#2d0a4d] text-sm font-medium opacity-80 text-white">Amount</th>
              <th className="px-2 py-3 text-center border-b border-[#2d0a4d] text-sm font-medium opacity-80 text-white">Icon</th>
              <th className="px-2 py-3 text-center border-b border-[#2d0a4d] bg-[#1d0033] text-sm font-medium rounded-t-md text-white">Percent</th>
              <th className="px-2 py-3 text-center border-b border-[#2d0a4d] text-sm font-medium opacity-80 text-white">Cashback</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level, index) => (
              <tr 
                key={index}
              >
                <td className="px-2 py-4 border-b border-[#2d0a4d] font-medium text-white">{level.name}</td>
                <td className="px-2 py-4 border-b border-[#2d0a4d] text-white">{level.amount}</td>
                <td className="px-2 py-4 border-b border-[#2d0a4d] text-center ">
                  <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-full mx-auto">
                    {level.icon}
                  </div>
                </td>
                <td className="px-2 py-4 border-b border-[#2d0a4d] bg-[#1d0033] font-bold text-center text-white">
                  {level.percent}
                </td>
                <td className="px-2 py-4 border-b border-[#2d0a4d] text-center text-white">
                  {level.cashback}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;