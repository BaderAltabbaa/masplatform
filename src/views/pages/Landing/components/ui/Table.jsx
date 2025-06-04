import React from "react";

const Table = ({className}) => {
  const levels = [
    { name: "Basic", amount: "0", icon: "🌑", percent: "3%", cashback: "0%" },
    { name: "Silver", amount: "100", icon: "🌕", percent: "2.5%", cashback: "0%" },
    { name: "Gold", amount: "250", icon: "🌟", percent: "2%", cashback: "0%" },
    { name: "Diamond", amount: "1500", icon: "💎", percent: "1.5%", cashback: "0%" },
    { name: "MAS Plus", amount: "10000", icon: "🔴", percent: "1%", cashback: "0%" },
  ];

  return (
    <div className={`${className ? className :""} flex items-center justify-center w-full md:overflow-hidden overflow-scroll`} style={{padding:"40px"}}>
      <table className="table-auto border-collapse w-full max-w-4xl text-white">
        <thead>
          <tr className=" ">
            <th className="px-4 py-4 border-b" style={{borderColor:"#1d0033"}}>Level</th>
            <th className="px-4 py-4 border-b" style={{borderColor:"#1d0033"}}>Amount</th>
            <th className="px-4 py-4 border-b" style={{borderColor:"#1d0033"}}>Icon</th>
            <th className="px-4 py-4 border-b  bg-[#1d0033] text-center rounded-t-md" style={{borderColor:"#1d0033"}}>
              Percent
            </th>
            <th className="px-6 py-4 border-b" style={{borderColor:"#1d0033"}}>Cashback</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "b" : ""
              } text-center`}
            >
              <td className="px-6 py-4 border-b" style={{borderColor:"#1d0033"}}>{level.name}</td>
              <td className="px-6 py-4 border-b" style={{borderColor:"#1d0033"}}>{level.amount}</td>
              <td className="px-6 py-4 border-b" style={{borderColor:"#1d0033"}}>
                <div className="w-8 h-8 bg-white text-center flex items-center justify-center rounded-full mx-auto">
                  {level.icon}
                </div>
              </td>
              <td className="px-6 py-4 border-b  bg-[#1d0033] font-bold" style={{borderColor:"#1d0033"}}>
                {level.percent}
              </td>
              <td className="px-6 py-4 border-b" style={{borderColor:"#1d0033"}}>{level.cashback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

