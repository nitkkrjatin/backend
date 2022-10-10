// import data from '../utils/StackedBar.tsx';
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default function StackedChart(props) {

    
  const arr=props.tasks

  let monN=0, tueN=0, wedN=0, thuN=0, friN=0,satN=0, sunN=0
  let monW=0, tueW=0, wedW=0, thuW=0, friW=0,satW=0, sunW=0
  let monM=0, tueM=0, wedM=0, thuM=0, friM=0,satM=0, sunM=0
  for(let i=0;i<arr.length;i++){
    let subDate =
    arr[i].startTime.substr(8, 2)
    const d=new Date(arr[i].startTime)
      let x=d.getDay()
    if(x===1){
        if(arr[i].type==="Break"){
            monN+=arr[i].timeTaken;
        }else if(arr[i].type==="Meeting"){
            monM+=arr[i].timeTaken;
        }else{
            monW+=arr[i].timeTaken;
        }
            
        
    }else if(x===2){
        if(arr[i].type==="Break"){
            tueN+=arr[i].timeTaken;
        }else if(arr[i].type==="Meeting"){
            tueM+=arr[i].timeTaken;
        }else{
            tueW+=arr[i].timeTaken;
        }
    }else if(x===3){
        if(arr[i].type==="Break"){
            wedN+=arr[i].timeTaken;
        }else if(arr[i].type==="Meeting"){
            wedM+=arr[i].timeTaken;
        }else{
            wedW+=arr[i].timeTaken;
        }
    }else if(x===4){
        if(arr[i].type==="Break"){
            thuN+=arr[i].timeTaken;
        }else if(arr[i].type==="Meeting"){
            thuM+=arr[i].timeTaken;
        }else{
            thuW+=arr[i].timeTaken;
        }
    }else if(x===5){
        if(arr[i].type==="Break"){
            friN+=arr[i].timeTaken;
        }else if(arr[i].type==="Meeting"){
            friM+=arr[i].timeTaken;
        }else{
            friW+=arr[i].timeTaken;
        }
    }else if(x===6){
        if(arr[i].type==="Break"){
            satN+=arr[i].timeTaken;
        }else if(arr[i].type==="Meeting"){
            satM+=arr[i].timeTaken;
        }else{
            satW+=arr[i].timeTaken;
        }
    }else if(x===0){
        if(arr[i].type==="Break"){
            sunN+=arr[i].timeTaken;
        }else if(arr[i].type==="Meeting"){
            sunM+=arr[i].timeTaken;
        }else{
            sunW+=arr[i].timeTaken;
        }
    }
  }
  
  const data = [
    {
      name: "Monday",
      NotWorking: monN,
      Working: monW,
      Meeting: monM
    },
    {
      name: "Tuesday",
      NotWorking: tueN,
      Working: tueW,
      Meeting: tueM
    },
    {
      name: "Wednesday",
      NotWorking: wedN,
      Working: wedW,
      Meeting: wedM
    },
    {
      name: "Thursday",
      NotWorking: thuN,
      Working: thuW,
      Meeting: thuM
    },
    {
      name: "Friday",
      NotWorking: friN,
      Working: friW,
      Meeting: friM
    },
    {
      name: "Saturday",
      NotWorking: satN,
      Working: satW,
      Meeting: satM
    },
    {
      name: "Sunday",
      NotWorking: sunN,
      Working: sunW,
      Meeting: sunM
    }
  ];
  
  
  

    return (
        <div>
            <div style={{width:'auto', border:'1px solid red', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <BarChart 
                width={650}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="NotWorking" stackId="a" fill="#8884d8" />
                <Bar dataKey="Working" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Meeting" stackId="a" fill="#2159" />
            </BarChart>
            </div>
        </div>
    );
}