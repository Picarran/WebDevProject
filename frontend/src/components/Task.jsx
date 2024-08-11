export class Task{
    constructor(id,title,owner,beginTime,endTime,description=""){
        this.id = id;
        this.title = title;
        this.owner = owner;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.description = description;
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