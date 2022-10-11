import React, { useEffect, useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StackedChart from "./StackedChart";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../features/tasks/taskSlice";
import { getCurrentDate } from "../utils/Date";


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function User() {
  const dispatch = useDispatch();
  const {id}=useParams()

  const { tasks, isError, isSuccess, message } = useSelector(
    (state) => state.tasks
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // console.log(tasks);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!isSuccess) {
      dispatch(getTasks(id));
    }
  }, [isSuccess, tasks, isError, message,id, dispatch]);

  let breakTime = 0;
  let meetingTime = 0;
  let workTime = 0;

  let breakTimeP = 0;
  let meetingTimeP = 0;
  let workTimeP = 0;


  for (let i = 0; i < tasks.length; i++) {
    let subDate =
      tasks[i].startTime.substr(0, 4) +
      tasks[i].startTime.substr(5, 2) +
      tasks[i].startTime.substr(8, 2);
      let x=parseInt(subDate)
      let y=parseInt(getCurrentDate())
    // console.log(x)
    // console.log(y)
    if (x === y) {
      if (tasks[i].type === "Break") {
        breakTime += tasks[i].timeTaken;
      } else if (tasks[i].type === "Meeting") {
        meetingTime += tasks[i].timeTaken;
      } else {
        workTime += tasks[i].timeTaken;
      }
    }
    if (x === y-1) {
      if (tasks[i].type === "Break") {
        breakTimeP += tasks[i].timeTaken;
      } else if (tasks[i].type === "Meeting") {
        meetingTimeP += tasks[i].timeTaken;
      } else {
        workTimeP += tasks[i].timeTaken;
      }
    }
  }
  
  const data = [
    { name: "Break", value: breakTime },
    { name: "Meeting", value: meetingTime },
    { name: "Work", value: workTime },
  ]
  // previous day-----
 
  const data1 = [
    { name: "Break", value: breakTimeP },
    { name: "Meeting", value: meetingTimeP },
    { name: "Work", value: workTimeP },
  ];
  // previous day ends here

  return (
    <div>
      <div
        style={{
          border: "1px solid red",
          width: "auto",
          height: "auto",
          margin: "20px 40px",
          borderRadius: "4px",
        }}
        className="d-flex justify-content-between flex-wrap"
      >
        <div
          style={{
            border: "1px solid red",
            padding: "10px 20px",
            alignSelf: "center",
          }}
        >
          <h1 style={{ fontSize: "25px", textAlign: "center" }}>Today</h1>
          <PieChart width={500} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={250}
              cy={200}
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </div>
        <div
          style={{
            border: "1px solid red",
            padding: "10px 20px",
            alignSelf: "center",
          }}
        >
          <h1 style={{ fontSize: "25px", textAlign: "center" }}>
            Previous Day
          </h1>
          <PieChart width={500} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data1}
              cx={250}
              cy={200}
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </div>
      </div>
      <div>
        <StackedChart tasks={tasks}/>
      </div>
    </div>
  );
}
