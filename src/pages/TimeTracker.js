import React, { useState } from "react";
import * as XLSX from "xlsx";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const TimeTracker = () => {
  const [xlsFile, setXlsFile] = useState(null);
  const [allUser, setallUser] = useState([]);
  const [officeData, setofficeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [nextArrays, setNextArrays] = useState([]);
  const [newArray, setnewArray] = useState([]);
  const [totalTime, settotalTime] = useState([]);
  const [Fi, setFi] = useState([]);
  const [Fo, setFo] = useState([]);
  const [Co, setCo] = useState([]);
  const [Ci, setCi] = useState([]);
  const [Mi, setMi] = useState([]);
  const [Mo, setMo] = useState([]);
  const [updatedFi, setupdatedFi] = useState([]);
  const [updatedFo, setupdatedFo] = useState([]);
  const [reason, setreason] = useState([]);
  const [updatedCi, setupdatedCi] = useState([]);
  const [updatedCo, setupdatedCo] = useState([]);
  const [CabienTime, setCabienTime] = useState([]);
  const [FloorTime, setFloorTime] = useState([]);
  const [newFi, setnewFi] = useState([]);
  const [newFo, setnewFo] = useState([]);
  const [Maingatetime, setMaingatetime] = useState([]);

  const [Days, setDays] = useState([])
  const [toggle, settoggle] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setXlsFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setofficeData(jsonData);
      getalluser(jsonData); // call getalluser method after parsing data
    };

    reader.readAsArrayBuffer(file);
  };

  const getalluser = (data) => {

    const arr = [];
    const ignoredNames = ["Guest", "Nawratna", "Abhiman", "Admin"];
    console.log("sds",data)
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].indexOf("Employee Name :") !== -1 &&
        data[i].indexOf("Emp Code:") !== -1
      ) {
        let employeeName = data[i][7];
        let employeeCode = data[i][2];
        // RegExp to check if string contains number
        var hasNumber = /\d/;

        if (
          employeeName.length > 3 &&
          !ignoredNames.includes(employeeName) &&
          !hasNumber.test(employeeName)
        ) {
          arr.push({ employeeName, employeeCode });
        }
      }
    }

    setallUser(arr);
  };

  

  const getNextArrays = (targetArray, officeData) => {
    const targetIndex = officeData.findIndex(
      (arr) => arr.toString() === targetArray.toString()
    );

    if (targetIndex !== -1 && targetIndex < officeData.length - 1) {
      const nextArrays = [];
      let currentIndex = targetIndex + 1;

      while (currentIndex < officeData.length) {
        const currentArray = officeData[currentIndex];

        if (
          currentArray.includes("Emp Code:") ||
          currentArray.includes("Employee Name :")
        ) {
          break;
        }

        if (!currentArray.includes("WeeklyOff")) {
          nextArrays.push(currentArray);
        }

        currentIndex++;
      }

      return nextArrays;
    }

    return [];
  };

  const handleChange = (event) => {
    const selectedEmployeeCode = event.target.value;
    const employee = allUser.find(
      (item) => item.employeeCode === selectedEmployeeCode
    );

    if (employee) {
      setSelectedEmployee(employee);

      const updatedTargetArray = [
        null,
        "Emp Code:",
        employee.employeeCode,
        "Employee Name :",
        null,
        null,
        null,
        employee.employeeName,
      ];

      let nextArrays = getNextArrays(updatedTargetArray, officeData);
      setNextArrays(nextArrays);

      let newArray = [];

      for (var i = 1; i < nextArrays.length - 2; i++) {
        newArray.push(nextArrays[i]);
      }
      setnewArray(newArray);

      const arr = [];

      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].length == 16) {
          var modifiedText = newArray[i][15].replace(/in|out/g, "");

          arr.push(modifiedText);
        } else {
          arr.push(newArray[i][14]);
        }
      }

      var FI = [];
      var FO = [];
      var CI = [];
      var CO = [];
      var MI = [];
      var MO = [];

      for (var i = 0; i < arr.length; i++) {
        function floorinTime(string, keyword) {
          var arrtime2 = [];
          var index = string.indexOf(keyword);

          while (index !== -1) {
            arrtime2.push(index);
            index = string.indexOf(keyword, index + 1);
          }

          return arrtime2;
        }

        var floorIN = floorinTime(arr[i], "FI");

        var fiextractedValues = floorIN.map((item) => {
          return arr[i].slice(item - 7, item - 2);
        });

        FI.push(fiextractedValues);

        function floorOutTime(string, keyword) {
          var arrtime2 = [];
          var index = string.indexOf(keyword);

          while (index !== -1) {
            arrtime2.push(index);
            index = string.indexOf(keyword, index + 1);
          }

          return arrtime2;
        }

        var floorOut = floorOutTime(arr[i], "FO");

        var foextractedValues = floorOut.map((item) => {
          return arr[i].slice(item - 7, item - 2);
        });

        FO.push(foextractedValues);

        function CabienInTime(string, keyword) {
          var arrtime2 = [];
          var index = string.indexOf(keyword);

          while (index !== -1) {
            arrtime2.push(index);
            index = string.indexOf(keyword, index + 1);
          }

          return arrtime2;
        }

        var CabienIn = CabienInTime(arr[i], "CI");

        var CiextractedValues = CabienIn.map((item) => {
          return arr[i].slice(item - 7, item - 2);
        });

        CI.push(CiextractedValues);

        function CabienOutTime(string, keyword) {
          var arrtime2 = [];
          var index = string.indexOf(keyword);

          while (index !== -1) {
            arrtime2.push(index);
            index = string.indexOf(keyword, index + 1);
          }

          return arrtime2;
        }

        var CabienOut = CabienOutTime(arr[i], "CO");

        var CoextractedValues = CabienOut.map((item) => {
          return arr[i].slice(item - 7, item - 2);
        });

        CO.push(CoextractedValues);

        function MainInTime(string, keyword) {
          var arrtime2 = [];
          var index = string.indexOf(keyword);

          while (index !== -1) {
            arrtime2.push(index);
            index = string.indexOf(keyword, index + 1);
          }

          return arrtime2;
        }

        var MainIn = MainInTime(arr[i], "MI");

        var MiextractedValues = MainIn.map((item) => {
          return arr[i].slice(item - 7, item - 2);
        });

        MI.push(MiextractedValues);

        function MainOutTime(string, keyword) {
          var arrtime2 = [];
          var index = string.indexOf(keyword);

          while (index !== -1) {
            arrtime2.push(index);
            index = string.indexOf(keyword, index + 1);
          }

          return arrtime2;
        }

        var MainOut = MainOutTime(arr[i], "MO");

        var MoextractedValues = MainOut.map((item) => {
          return arr[i].slice(item - 7, item - 2);
        });

        MO.push(MoextractedValues);
      }

      setFi(FI);
      setFo(FO);
      setCi(CI);
      setCo(CO);
      setMi(MI);
      setMo(MO);

      const foot = [];
      const fiit = [];
      const reasonarray = [];
      const newPunchinErrorIndex=[]

      const newFival = [];
      const newFoval = [];

      for (var i = 0; i < FI.length; i++) {
        const FiCheck = [...new Set(FI[i])];
        const FoCheck = [...new Set(FO[i])];

        newFival.push(FiCheck);
        newFoval.push(FoCheck);

        const lastelement = FoCheck[FoCheck.length - 1];
        

        const Fiarr = [];
        const Foarr = [];
        for (let i = 0; i < FiCheck.length; i++) {
          //let prevFi = FiCheck[i - 1];
          let prevFo = FoCheck[i - 1];

          if (lastelement === FoCheck[i] && FiCheck[i] <= FoCheck[i]) {
         
            reasonarray.push("-");
            Fiarr.push(FiCheck[i]);
            Foarr.push(FoCheck[i]);
            break;
          } else if (prevFo > FiCheck[i]) {
            newPunchinErrorIndex.push(i)
            reasonarray.push(`Punch in record are invalid`);
            break;
          } else if (FiCheck[i] > FoCheck[i]) {
           
          
           reasonarray.push(
              `Your entry time is higher than exit time, how's it's possible?`
            );
            break;
          } else {
            Fiarr.push(FiCheck[i]);
            Foarr.push(FoCheck[i]);
          }
        }
        foot.push(Foarr);
        fiit.push(Fiarr);
      }

      const Ciit = [];
      const Coot = [];

      for (let i = 0; i < CI.length; i++) {
        const CiCheck = [...new Set(CI[i])];
        const CoCheck = [...new Set(CO[i])];

        const Ciarr = [];
        const Coarr = [];

        for (let i = 0; i < CiCheck.length; i++) {
          if (CoCheck[i] <= CiCheck[i]) {
            Ciarr.push(CiCheck[i]);
            Coarr.push(CoCheck[i]);
          } else {
            break;
          }
        }

        Ciit.push(Ciarr);
        Coot.push(Coarr);
      }

      const Miit = [];
      const Moot = [];

      for (let i = 0; i < MI.length; i++) {
        const MiCheck = [...new Set(MI[i])];
        const MoCheck = [...new Set(MO[i])];

        const Miarr = [];
        const Moarr = [];

        const firstele = MiCheck[0];
        const lastele = MoCheck[MoCheck.length - 1];

        Miit.push(firstele);
        Moot.push(lastele);
      }

      //calculate time of fi and fo
      const floorTime = [];

      for (var i = 0; i < foot.length; i++) {
        var totalHours = 0;
        var totalMinutes = 0;
        var isValid = true;

        for (var j = 0; j < foot[i].length; j++) {
          var foEntry = foot[i][j].split(":");
          var fiEntry = fiit[i][j].split(":");

          var foHours = parseInt(foEntry[0]);
          var foMinutes = parseInt(foEntry[1]);

          var fiHours = parseInt(fiEntry[0]);
          var fiMinutes = parseInt(fiEntry[1]);

          if (
            foHours < fiHours ||
            (foHours === fiHours && foMinutes < fiMinutes)
          ) {
            isValid = false;
            break;
          }

          var diffHours = foHours - fiHours;
          var diffMinutes = foMinutes - fiMinutes;

          if (diffMinutes < 0) {
            diffHours--;
            diffMinutes += 60;
          }

          totalHours += diffHours;
          totalMinutes += diffMinutes;
        }

        if (isValid) {
          totalHours += Math.floor(totalMinutes / 60);
          totalMinutes %= 60;
          const totalTime = totalHours + " hours " + totalMinutes + " minutes";
          floorTime.push(totalTime);
        }
      }
      //calculate time of ci  and co
      const CabientTime = [];
      for (let i = 0; i < Ciit.length; i++) {
        let totalHours = 0;
        let totalMinutes = 0;
        let isValid = true;

        for (let j = 0; j < Ciit[i].length; j++) {
          let CoEntry = Ciit[i][j].split(":");
          let CiEntry = Coot[i][j].split(":");

          let CoHours = parseInt(CoEntry[0]);
          let CoMinutes = parseInt(CoEntry[1]);

          let CiHours = parseInt(CiEntry[0]);
          let CiMinutes = parseInt(CiEntry[1]);

          if (
            CoHours < CiHours ||
            (CoHours === CiHours && CoMinutes < CiMinutes)
          ) {
            isValid = false;
            break;
          }

          let diffHours = CoHours - CiHours;
          let diffMinutes = CoMinutes - CiMinutes;

          if (diffMinutes < 0) {
            diffHours--;
            diffMinutes += 60;
          }

          totalHours += diffHours;
          totalMinutes += diffMinutes;
        }

        if (isValid) {
          totalHours += Math.floor(totalMinutes / 60);
          totalMinutes %= 60;
          let totalTime = totalHours + " hours " + totalMinutes + " minutes";

          CabientTime.push(totalTime);
        }
      }

      //calculate time of mi  and mo
      const MainEntranceTime = [];

      for (let i = 0; i < Math.min(Miit.length, Moot.length); i++) {
        if (Moot[i] && Miit[i]) {
          const miitDate = new Date(`January 1, 2023 ${Miit[i]}`);
          const mootDate = new Date(`January 1, 2023 ${Moot[i]}`);
          const diff = Math.abs(mootDate - miitDate);
          const diffHours = Math.floor(diff / 1000 / 60 / 60);
          const diffMinutes = Math.floor((diff / 1000 / 60) % 60);
          MainEntranceTime.push(
            `${diffHours} hours and ${diffMinutes} minutes`
          );
        } else {
          MainEntranceTime.push(`----`);
        }
      }

      //Total Employee time

      const totalEmployeeTime = [];

      for (let i = 0; i < floorTime.length; i++) {
        const floorSplit = floorTime[i].split(" ");
        const cabinetSplit = CabientTime[i].split(" ");

        const floorHours = parseInt(floorSplit[0]);
        const floorMinutes = parseInt(floorSplit[2]);

        const cabinetHours = parseInt(cabinetSplit[0]);
        const cabinetMinutes = parseInt(cabinetSplit[2]);

        const totalMinutes =
          (floorHours - cabinetHours) * 60 + (floorMinutes - cabinetMinutes);
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        const totalTime = `${totalHours} hours ${remainingMinutes} minutes`;
        totalEmployeeTime.push(totalTime);
      }

      // Count total days before 8hourrs

      const lesserThan8HoursIndexes = [];

     
      for (let i = 0; i < totalEmployeeTime.length; i++) {
        const timeString = totalEmployeeTime[i];
        const hours = parseInt(timeString.split(" hours")[0]);
        
        if (hours < 8 && timeString !== "0 hours 0 minutes") {
            lesserThan8HoursIndexes.push(i);
        }
    }

     

      setDays(lesserThan8HoursIndexes)   
      settotalTime(totalEmployeeTime);   
      setFloorTime(floorTime);
      setupdatedFi(fiit);
      setupdatedFo(foot);
      setupdatedCi(Ciit);
      setupdatedCo(Coot);
      setCabienTime(CabientTime);
      setreason(reasonarray);
      setnewFi(newFival);
      setnewFo(newFoval);
      setMaingatetime(MainEntranceTime);
    }
  };

  return (
    <div>
      <h1>Checking Our Data</h1>

      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />

      <select onChange={handleChange}>
        <option value="">Select a User</option>
        {allUser.map((item, index) => (
          <option key={index} value={item.employeeCode}>
            {`${item.employeeName} (${item.employeeCode})`}
          </option>
        ))}
      </select>

   
     <input style={{marginLeft:"30px" }}  type="checkbox"  onClick={()=>settoggle(!toggle)}   />Time less than 8 Hours 

     <input style={{marginLeft:"30px" }}  type="checkbox"  onClick={()=>settoggle(!toggle)}   />Punch In error 

   
      {newArray.length > 0 && (
        <table style={{ border: "1px solid red", borderCollapse: "collapse" }}>
          <thead>
         
        {toggle? <>
        <tr>
              <th>Date</th>
              <th>Count</th>
              
            </tr>
            <td>
              
               {
                Days &&Days.length>0&&Days.map((item)=>(
                  <>
                   {item+1 },
                  </>
                ))
               }
            </td>

            <td>
             <h4>{Days.length}days</h4>
            </td>
        </>:''}
        <div style={{borderLeft:"6px solid black" ,height:'100px' }}></div>
          
          


            <tr>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Att. Date
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                InTime
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                OutTime
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>Shift</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                S. InTime
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                S. OutTime
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Work Dur.
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>OT</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Tot. Dur.
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                LateBy
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Punch Records
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Total Time Spent in office
              </th>

              <th style={{ border: "1px solid red", padding: "8px" }}>FI</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>FO</th>

              <th style={{ border: "1px solid red", padding: "8px" }}>Time</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>UFI</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>UFO</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>CI</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>Co</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>Time</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>UCI</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>UCo</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Reason
              </th>
              <th style={{ border: "1px solid red", padding: "8px" }}>Mi</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>Mo</th>
              <th style={{ border: "1px solid red", padding: "8px" }}>
                Main Time
              </th>
            
            </tr>
          </thead>
          <tbody>
            {newArray.map((rowData, index) => (
              <>
                <tr key={index}>
                  {rowData.map((cellData, cellIndex) => (
                    <>
                      <td
                        key={cellIndex}
                        style={{
                          border: "1px solid red",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {cellData || "-"}
                      </td>
                    </>
                  ))}

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {totalTime[index]}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {newFi.length > 0 &&
                      newFi[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {newFo.length > 0 &&
                      newFo[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {FloorTime[index]}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {updatedFi.length > 0 &&
                      updatedFi[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {updatedFo.length > 0 &&
                      updatedFo[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {Co.length > 0 &&
                      Co[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {Ci.length > 0 &&
                      Ci[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    {CabienTime[index]}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {updatedCo.length > 0 &&
                      updatedCo[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {updatedCi.length > 0 &&
                      updatedCi[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {"----"}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {Mi.length > 0 &&
                      Mi[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {Mo.length > 0 &&
                      Mo[index].map((item, i) => <p key={i}>{item}</p>)}
                  </td>

                  <td
                    style={{
                      border: "1px solid red",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {Maingatetime[index]}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeTracker;
