import React, { Component } from 'react'
import TaskCol from './taskCol';
import TaskItem from './taskItem';
import './index.css'

const STATUS_TODO = 'STATUS_TODO';
const STATUS_DOING= 'STATUS_DOING';
const STATUS_DONE = 'STATUS_DONE';

const STATUS_CODE = {
    STATUS_TODO: 'Prepare to study',
    STATUS_DOING: 'Learining...',
    STATUS_DONE: 'complete'
}
let tasks = [{
    id: 0,
    status: STATUS_TODO,
    title: 'html',
}, {
    id: 1,
    status: STATUS_TODO,
    title: 'javascript',
}, {
    id: 2,
    status: STATUS_TODO,
    title: 'css'
}, {
    id: 3,
    status: STATUS_TODO,
    title: 'css3'
}]

 
 
 
            
 export default class Move extends React.Component {
     state = {
         tasks: tasks,
         activeId: null
     }
     /**
      * 传入被拖拽任务项的 id
      */
     onDragStart = (id) => {
         this.setState({
             activeId: id
         })
     }
     //更新status
     onRefreshTask=(params)=>{
         this.setState({tasks:params})
     }
     
     dragTo = (status) => {
         let { tasks,  activeId} = this.state;
        if(activeId !== null){
            let task = tasks[activeId];
            if (task.status !== status) {
                task.status = status;
                this.setState({
                    tasks: tasks
                })
            }
        }
         this.cancelSelect();
     }
     
     cancelSelect = () => {
         this.setState({
             activeId: null
         })
     }
     
     render() {
         let { tasks, activeId } = this.state;
         let { onDragStart, onDragEnd, cancelSelect } = this;
         return (
                 <div className="task-wrapper">
                 {
                     Object.keys(STATUS_CODE).map(status => 
                         <TaskCol 
                             status={status} 
                             tasks = {this.state.tasks}
                             tasksRoot={tasks}
                             key={status} 
                             onRefreshTask={this.onRefreshTask}
                             dragTo={this.dragTo}
                             >
                             { tasks.filter(t => t.status === status).map(t => 
                                 <TaskItem
                                     onRefreshTask={this.onRefreshTask}
                                     tasks = {this.state.tasks}
                                     key={t.id}
                                     active={t.id === activeId}
                                     id={t.id}
                                     title={t.title} 
                                     point={t.point} 
                                     username={t.username}
                                     onDragStart={onDragStart}
                                     onDragEnd={cancelSelect}
                                 />
                                 )
                             }
                         </TaskCol>
                     )
                 }
             </div>
         )
     }
 }
