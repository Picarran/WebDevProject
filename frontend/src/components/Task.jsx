export class Task{
    constructor(title,index,owner,beginTime,endTime){
        this.title = title;
        this.index = index;
        this.owner = owner;
        this.beginTime = beginTime;
        this.endTime = endTime;
    }
}




const TaskComponent = ({task})=>{
    return (
        <div className="flex flex-col justify-between">
            <h3>{task.title}</h3>
            <button>f</button>
        </div>
    )
}
export default TaskComponent;