import { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import data from "../data/mockData";

const StyledCell = ({ children, style, bgColor, variant = "td" }) =>
  variant === "th" ? (
    <th
      style={{ border: "1px solid gray", backgroundColor: bgColor, ...style }}
    >
      {children}
    </th>
  ) : (
    <td
      style={{ border: "1px solid gray", backgroundColor: bgColor, ...style }}
    >
      {children}
    </td>
  );

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = () => {
    const userArr = [];
    data.forEach((obj) => {
      userArr.push(obj.name);
    });
    setUserData({
      ...data[0],
      timesheet: data[0].timesheet.sort((a, b) => (a.date > b.date ? 1 : -1)),
    });
    setUsers(userArr);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const userChangeHandler = (e) => {
    setIsLoading(true);
    const item = data.find((i) => i?.name === e.target.value);
    const sortedTimesheet = item.timesheet.sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
    setUserData({ ...item, timesheet: sortedTimesheet });
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div>
        <div>
          <h1>Excel Report</h1>
          {data.map((userTimesheet) => {
            return (
              <div>
                <h2>{userTimesheet.name}</h2>
                <ReactHTMLTableToExcel
                  id={`table-xls-button`}
                  table="table-to-xls"
                  filename="timesheet"
                  sheet={userTimesheet.name}
                  buttonText="Download as XLS"
                />
                <table id={`table-xls-button`}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Feature</th>
                      <th>Subject</th>
                      <th>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTimesheet.timesheet.map((timesheet) => {
                      return (
                        <tr>
                          <td>{timesheet.date}</td>
                          <td>{timesheet.feature}</td>
                          <td>{timesheet.subject}</td>
                          <td>{timesheet.hours}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
          {/* <form>
            <label>Select User</label>
            <select onChange={(e) => userChangeHandler(e)}>
              {users.map((user, i) => (
                <option key={i} value={user}>
                  {(user || "").toUpperCase()}
                </option>
              ))}
            </select>
          </form>
          <table id="my-table">
            <thead>
              <tr>
                <StyledCell variant="th">Name</StyledCell>
                <StyledCell variant="th">Date</StyledCell>
                <StyledCell variant="th">Feature</StyledCell>
                <StyledCell variant="th">Subject</StyledCell>
                <StyledCell variant="th">Hours</StyledCell>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colspan="10">loading...</td>
                </tr>
              ) : (
                <>
                  {users.includes(userData.name) ? (
                    userData.timesheet.map((item, i) => {
                      let bgColor = "white";
                      if (item?.isWeekend) {
                        bgColor = "yellow";
                      } else if (item?.isHoliday) {
                        bgColor = "orange";
                      }
                      return (
                        <tr key={i}>
                          <StyledCell bgColor={bgColor}>
                            {userData?.name || "-"}
                          </StyledCell>
                          <StyledCell bgColor={bgColor}>
                            {item?.date || "-"}
                          </StyledCell>
                          <StyledCell bgColor={bgColor}>
                            {item?.feature || "-"}
                          </StyledCell>
                          <StyledCell bgColor={bgColor}>
                            {item?.subject || "-"}
                          </StyledCell>
                          <StyledCell bgColor={bgColor}>
                            {item?.hours || "-"}
                          </StyledCell>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>Select user</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
