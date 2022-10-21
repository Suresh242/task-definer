let taskList =[];
let badList =[];
const totalHrsPerWeek = 24*7;

const handleOnSubmit=(e) =>{
    const frmData = new FormData(e);
    const task = frmData.get("task");
    const hr = +frmData.get("hr");
    const obj ={
        task,
        hr,
    };
    const totalInputHours = totalTaskHours()+totalBadHours();
    if(totalInputHours + hr>totalHrsPerWeek){
        return alert("sorry, the maximum hours is already filled")
    }
    taskList.push(obj);
    console.log(taskList);
    displayTask();
    totalTaskHours();
}
const displayTask = ()=>{
    let str ='';
    taskList.map((item,i)=>{
        str+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
        <button onclick="deleteTask(${i})" class="btn btn-danger">
        <i class ="fa-solid fa-trash"></i>
        <button onclick="markAsNotToDo(${i})" class ="btn btn-success">
        <i class ="fa-solid fa-arrow-right-long"></i>
        </button>
        </td>
        </tr>
        `;
    });
    document.getElementById("task-list").innerHTML=str;
    


}
const displayBadList =()=>{
    let str='';
    badList.map((item,i)=>{
        str+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${item.task}</td>
        <td>${item.hr}hr</td>
        <td>
        <button onclick="markAsToDo(${i})" class ="btn btn-success">
        <i class ="fa-solid fa-arrow-left-long"></i>
        </button>
        <button onclick="deleteBadTask(${i})" class="btn btn-danger">
        <i class ="fa-solid fa-trash"></i>
        
        </td>
        </tr>
        
        `;
    })
    document.getElementById("bad-list").innerHTML = str;
    totalBadHours();

}
const totalTaskHours =()=>{
    const total = taskList.reduce((s,i)=>s+i.hr,0);
    document.getElementById("totalHours").innerText=total+totalBadHours();
    return total;


}
const totalBadHours =()=>{
    const total =badList.reduce((s,i)=>s+i.hr,0);
    document.getElementById("badHours").innerText=total;
    return total;

}
const deleteTask =(i)=>{
    if(!window.confirm("Are you sure, you want to delete this task")){
        return;
    }
    taskList = taskList.filter((item, index) => index !== i);

    displayTask();
    totalTaskHours();
  };
  
  const deleteBadTask = (i) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
  
    badList = badList.filter((item, index) => index !== i);
  
    displayBadList();
    totalTaskHours();
  };
  
  const markAsNotToDo = (i) => {
    const itm = taskList.splice(i, 1);
    badList.push(itm[0]);
  
    displayTask();
    displayBadList();
  };
  
  const markAsToDo = (i) => {
    const itm = badList.splice(i, 1);
    taskList.push(itm[0]);
  
    displayTask();
    displayBadList();
  };
