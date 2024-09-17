/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { BanknotesIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import React from 'react';
import { StatisticsCard } from "../components/Staticcards";
import { StatisticsChart } from "../components/Statisticcharts";

const Dashboard = () => {
  const chartsConfig = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#37474f",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#37474f",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const dailySalesChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Presenties",
        data: [200, 220, 290, 300, 267, 250],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
    },
  };

  const statisticsChartsData = [
    {
      color: "white",
      title: "Daily Attendance",
      description: "Total employees : 300",
      footer: "updated 4 min ago",
      chart: dailySalesChart,
    },
  ];

  const statisticsCardsData = [
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "Active(office)",
      value: "250",
      footer: {
        color: "text-green-500",
        value: "20",
        label: "less than last day",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Active(worksite)",
      value: "2,300",
      footer: {
        color: "text-green-500",
        value: "30",
        label: "more than last month",
      },
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg w-full max-w-6xl border-4 border-gray-300">
        {/* Heading for Chart */}
        <div className="text-center mb-6 w-full p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Attendance Overview</h1>
          <p className="text-lg text-gray-600 mt-2">Monitor the daily attendance trends and performance.</p>
        </div>
        {/* Flex container for Chart and Cards */}
        <div className="flex flex-col lg:flex-row w-full gap-6 p-6 bg-gray-100 rounded-lg">
          {/* Chart Section */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            {statisticsChartsData.map((props) => (
              <div className="w-full">
                <StatisticsChart
                  key={props.title}
                  {...props}
                  footer={
                    <Typography
                      variant="small"
                      className="flex items-center font-normal text-blue-gray-600"
                    >
                      <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                      &nbsp;{props.footer}
                    </Typography>
                  }
                />
              </div>
            ))}
          </div>

          {/* Cards Section */}
          <div className="flex flex-col space-y-6 w-full lg:w-1/3">
            {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
              <div key={title} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full">
                <StatisticsCard
                  {...rest}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-8 h-8 text-gray-700",
                  })}
                  footer={
                    <Typography className="font-normal text-blue-gray-600">
                      <strong className={footer.color}>{footer.value}</strong>
                      &nbsp;{footer.label}
                    </Typography>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;