import React from 'react'
import { PlusCircleOutlined ,CloseCircleTwoTone} from '@ant-design/icons';



export default class TaskItem extends React.Component {
    constructor(props){
        super(props)
    }

    state={
        deleteIcon:false,
        tasks:[]
    }
     handleDragStart = (e) => {
         this.props.onDragStart(this.props.id);
     }
     handleOver=(e)=>{
          this.setState({deleteIcon:true})
     }
     handleLeave=(e)=>{
         this.setState({deleteIcon:false})
     }
     handleDelete=(e)=>{
         const arr = [...this.props.tasks]
         var currentIndex = arr.findIndex((obj) => obj.id === this.props .id);
         arr.splice(currentIndex,1)
         this.setState({tasks:arr},()=>{
            this.props.onRefreshTask(this.state.tasks)
         })
        
     }
     render() {
         let { id, title, point, username, active, onDragEnd } = this.props;
         return (
            <div className={'item-top' + (active ? ' active' : '')} onMouseLeave={this.handleLeave} onMouseEnter={this.handleOver}>
                    {this.state.deleteIcon ? <CloseCircleTwoTone className='delete-icon' onMouseOver={this.handleOver} onClick={this.handleDelete}/>:''}
                 <div 
                 onDragStart={this.handleDragStart}
                 onDragEnd={onDragEnd}
                 id={`item-${id}`} 
                 className={'item' + (active ? ' active' : '')}
                 draggable="true"
             >
                 <main className="item-main">
                     {title}
                </main>
             </div>
            </div>
         );
     }
 }