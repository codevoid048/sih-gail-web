/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [checkSearch, setCheckSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [formFieldsDates, setFormFieldsDates] = useState({ startDate: "", endDate: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Dummy data
  const monthDates = Array.from({ length: 30 }, (_, i) => i + 1); // Days 1 to 30
  const attendance = [
    { 
      userName: 'Vikram', 
      fname: 'vikram', 
      imageUrl: null, 
      dates: [1, 2, 3], 
      holidays: [4], 
      weekEnds: [5, 6] 
    },
    { 
      userName: 'John', 
      fname: 'John', 
      imageUrl: null, 
      dates: [7, 8, 9], 
      holidays: [10], 
      weekEnds: [11, 12] 
    },
    { 
      userName: 'Liam', 
      fname: 'Will', 
      imageUrl: null, 
      dates: [9, 16, 22], 
      holidays: [1, 10, 25], 
      weekEnds: [7, 14, 21, 28] 
    }
  ];
  const totalRecordsInEmp = 2;
  const totalPages = 1;

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };  
  const filteredAttendance = attendance.filter(emp =>
    emp.fname.toLowerCase().includes(search.toLowerCase()) || emp.userName.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyPress = () => {
    console.log('Search Key Pressed');
  };

  const handleSearch = () => {
    console.log('Search Clicked');
    toast.success("Search executed successfully!");
  };
  const downloadData = (dates) => {
    console.log("Downloading data for date range:", dates);
    closeOverlay(); 
  };
  const datesVal = (dates, day, holidays, weekends) => {
    if (holidays.includes(day)) return <td className="text-red-500">A</td>;
    if (weekends.includes(day)) return <td className="text-gray-500">W</td>;
    if (dates.includes(day)) return <td className="text-green-500">P</td>;
    return <td className='text-black'>A</td>;
  };

  return (
    <div className='p-6'>
      <ToastContainer />
      <div className="attendtopsearch bg-white p-4 flex flex-wrap items-center justify-between w-full rounded-lg shadow-md mb-4">
        <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
          <input
            type="text"
            id="attendSearch"
            className="rounded-lg h-10 w-full md:w-80 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search By Employee"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCheckSearch(true);
            }}
            onKeyUp={handleKeyPress}
          />
        </div>

        {/* Month Picker */}
        <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
          <input
            type="month"
            onChange={(e) => {
              if (e.target.value) {
                const [year, month] = e.target.value.split("-");
                setSearch("");
                console.log("Search Month:", month, "Search Year:", year);
              }
            }}
            className="rounded-lg h-10 w-full md:w-80 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
          <input
            type="button"
            id="attendsearchbtn"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full h-10 w-36 font-light cursor-pointer transition-colors duration-300"
            value="Search"
            onClick={handleSearch}
          />
        </div>

        {/* Export Button */}
        <div className="flex items-center w-full md:w-auto">
          <input
            type="button"
            id="attendexportbtn"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full h-10 w-36 font-light cursor-pointer transition-colors duration-300"
            value="Export"
            onClick={() => setIsOverlayOpen(true)} // Open modal
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="attendDivision bg-gray-100 p-4 rounded-lg h-screen overflow-auto">
        <Table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="p-3 text-left">Employee Name</th>
              {monthDates?.map((d, index) => (
                <th key={index} className="p-3 text-center">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan={monthDates.length + 1} className="text-center p-6 text-gray-500">
                  No User Found
                </td>
              </tr>
            ) : (
              filteredAttendance.map((item, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="p-3 flex items-center">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/25'}
                      alt="profile"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="font-medium text-gray-700">{item.fname}</span>
                  </td>
                  {monthDates?.map((d, index) => (
                    <td key={index} className="p-3 text-center">
                      {datesVal(item.dates, d, item.holidays, item.weekEnds)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal Section */}
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-lg font-bold mb-4 text-black">Select Date Range</h2>
            <Form className="flex flex-col">
              <div className="mb-4">
                <label className="font-bold text-black">Start Date:</label>
                <Form.Control
                  type="date"
                  className="w-full rounded-md"
                  onChange={(e) => setFormFieldsDates({ ...formFieldsDates, startDate: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="font-bold text-black">End Date:</label>
                <Form.Control
                  type="date"
                  className="w-full rounded-md"
                  onChange={(e) => setFormFieldsDates({ ...formFieldsDates, endDate: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <Button variant="secondary" onClick={closeOverlay} className="mr-2">Cancel</Button>
                <Button variant="primary" onClick={() => downloadData(formFieldsDates)}>Download</Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
