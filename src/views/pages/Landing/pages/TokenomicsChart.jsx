import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Box, Typography } from "@mui/material";

// Example data
const data = [
  { name: "Seed round", value: 5.5 },
  { name: "Private round", value: 20 },
  { name: "Public round", value: 7.5 },
  { name: "Team", value: 5 },
  { name: "Advisors", value: 9 },
  { name: "Liquidity", value: 20 },
  { name: "Ecosystem", value: 25 },
  { name: "Reserve", value: 8 },
];

// Custom colors
const COLORS = [
  "#f8ac59", // Seed round
  "#f77b55", // Private round
  "#d74e82", // Public round
  "#b455aa", // Team
  "#8a3c8f", // Advisors
  "#6c2b8b", // Liquidity
  "#a23c7e", // Ecosystem
  "#e87e8f", // Reserve
];

const TokenomicsChart = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        position: "relative",
        background: (theme) => theme.custom.PageBackGround,
        pb:{xs:10,md:2},
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "white" }}
      >
        Tokenomics
      </Typography>

      {/* Donut Chart */}
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={100}
            outerRadius={130}
            paddingAngle={1}
            dataKey="value"
            label={({ value }) => `${value}%`}
            stroke="none" // 🚫 removes white border
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      {/* Centered Logo */}
      <Box
        sx={{
          position: "absolute",
          top: {xs:"45%",md:"55%"},
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 150,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="\assets\Images\masfooter-logo1.svg" // 🖼 Replace with actual path to your logo
          alt="Logo"
          
        />
      </Box>
    </Box>
  );
};

export default TokenomicsChart;
