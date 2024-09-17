import React, { useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [checkSearch, setCheckSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const [formFieldsDates, setFormFieldsDates] = useState({ startDate: "", endDate: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Dummy data
  const monthDates = Array.from({ length: 30 }, (_, i) => i + 1); // Days 1 to 30
  const attendance = [
    { 
      userName: 'john_doe', 
      fname: 'John Doe', 
      imageUrl: null, 
      dates: [1, 2, 3], 
      holidays: [4], 
      weekEnds: [5, 6] 
    },
    { 
      userName: 'jane_doe', 
      fname: 'Jane Doe', 
      imageUrl: null, 
      dates: [7, 8, 9], 
      holidays: [10], 
      weekEnds: [11, 12] 
    }
  ];
  const userNames = ['john_doe']; // For checkbox selection
  const totalRecordsInEmp = 2;
  const totalPages = 1;

  // Handlers (Dummy)
  const handleKeyPress = () => {
    console.log('Search Key Pressed');
  };
  const handleSearch = () => {
    console.log('Search Clicked');
  };
  const handleCheckboxChange = () => {
    console.log('Checkbox Changed');
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const closeModal = () => {
    setIsDelete(false);
  };
  const downloadData = (dates) => {
    console.log("Downloading data for date range:", dates);
  };
  const datesVal = (dates, day, holidays, weekends) => {
    // Dummy logic to render cells based on the day
    if (holidays.includes(day)) return <td className="text-red-500">A</td>;
    if (weekends.includes(day)) return <td className="text-gray-500">W</td>;
    if (dates.includes(day)) return <td className="text-green-500">P</td>;
    return <td className='text-black'>A</td>;
  };

  return (
    <div>
      {/* Dashboard Location */}
      <div id="dashboardlocation" className="flex flex-row justify-between relative -top-1 w-1/5">
        <span className="text-black text-[13px]">
          Dashboard &gt; Attendance
        </span>
      </div>

      {/* Search Section */}
      <div className="attendtopsearch bg-white p-2 flex justify-between pr-20 w-full rounded-lg">
        <input
          type="text"
          id="attendSearch"
          className="rounded-md h-8 w-[319px] ml-8"
          placeholder="Search By Employee"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCheckSearch(true);
          }}
          onKeyUp={handleKeyPress}
        />

        <input
          type="month"
          onChange={(e) => {
            if (e.target.value) {
              const [year, month] = e.target.value.split("-");
              setSearch("");
              // Assuming there's a function to handle setting month/year
              console.log("Search Month:", month, "Search Year:", year);
            }
          }}
          className="MonthInAttendance w-[319px]"
        />

        <input
          type="button"
          id="attendsearchbtn"
          className="relative top-0 left-8 bg-red-600 text-black rounded-full h-8 w-36 font-light cursor-pointer text-[15px]"
          value="Search"
          onClick={handleSearch}
        />

        <input
          type="button"
          id="attendsearchbtn"
          className="bg-green-600 text-black rounded-full h-8 w-36 font-light cursor-pointer text-[15px] ml-4"
          value="Export"
          onClick={() => setIsDelete(true)}
        />
      </div>

      {/* Table Section */}
      <div className="attendDivision bg-white relative rounded-lg mt-2 h-[70vh]">
        <Table striped bordered hover className="tableinAttendance w-screen">
          <thead>
            <tr className="tableheader text-black">
              <th>Employee Name</th>
              {monthDates?.map((d, index) => (
                <th key={index}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendance?.length === 0 ? (
              <div className="absolute top-[35vh] left-[60vh] text-lg font-bold text-black">
                No User Found
              </div>
            ) : (
              attendance.map((item, i) => (
                <tr key={i}>
                  <td className="wrapInAttendance flex max-w-[800px] text-black">
                    <input
                      type="checkbox"
                      name={item.userName}
                      checked={userNames.includes(item.userName)}
                      onChange={handleCheckboxChange}
                      className="m-0 w-auto"
                    />
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/25'}
                      alt="profile"
                      className="w-6 h-6 rounded-full mr-4"
                    />
                    <div>{item.fname}</div>
                  </td>
                  {monthDates?.map((d) =>
                    datesVal(item.dates, d, item.holidays, item.weekEnds)
                  )}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="paginationInAttendance">
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={currentPage}
          itemsCountPerPage={15}
          totalItemsCount={totalRecordsInEmp}
          pageRangeDisplayed={totalPages}
          onChange={handlePageChange}
        />
      </div>

      {/* Modal Section */}
      <Modal show={isDelete} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h5 className="text-center">Select Date Range</h5>
          <Form className="flex justify-around">
            <div className="attendanceFormControl">
              <span className="font-bold">
                Start Date <span className="text-red-600">*</span> :
              </span>
              <Form.Control
                type="date"
                className="w-auto h-auto p-1"
                isInvalid={isSubmitted && !formFieldsDates.startDate}
                onChange={(e) =>
                  setFormFieldsDates({
                    ...formFieldsDates,
                    startDate: e.target.value,
                    endDate: "",
                  })
                }
              />
            </div>

            <div className="attendanceFormControl">
              <span className="font-bold">
                End Date <span className="text-red-600">*</span> :
              </span>
              <Form.Control
                type="date"
                className="w-auto h-auto p-1"
                min={formFieldsDates.startDate}
                isInvalid={isSubmitted && !formFieldsDates.endDate}
                onChange={(e) =>
                  setFormFieldsDates({
                    ...formFieldsDates,
                    endDate: e.target.value,
                  })
                }
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button variant="secondary" onClick={closeModal} className="ml-2">
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => downloadData(formFieldsDates)} className="ml-2">
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Attendance;
