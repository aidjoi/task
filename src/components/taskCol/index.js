import React from 'react'
import { PlusCircleTwoTone ,CloseCircleTwoTone} from '@ant-design/icons';

const STATUS_TODO = 'STATUS_TODO';
const STATUS_DOING= 'STATUS_DOING';
const STATUS_DONE = 'STATUS_DONE';

const STATUS_CODE = {
    STATUS_TODO: 'Prepare to study',
    STATUS_DOING: 'Learining...',
    STATUS_DONE: 'Complete'
}

export default class TaskCol extends React.Component {
    constructor(props){
        super(props)
    }
     state = {
         in: false,
         task:this.props.tasks
     }
     componentWillReceiveProps(nextProps){
         this.setState({task:nextProps.tasks})
     }
     handleDragEnter = (e) => {
         e.preventDefault();
         this.setState({in:true})
     }
     handleDragLeave = (e) => {
         e.preventDefault();
         this.setState({in:false})
     }
     handleDrop = (e) => {
         e.preventDefault();
         this.setState({in:false})
         this.props.dragTo(this.props.status);
     }
     addTask=()=>{
        let span = document.createElement('input');
        span.style.width='152px'
        span.style.marginLeft='10px'
        span.style.height='25px'
        let div = document.getElementById('addTask');
        div.appendChild(span);
        span.focus()
        const _this = this
        span.onkeydown=function(){
            document.onkeydown = function(e){
                var ev =  window.event || e; 
                if(ev.keyCode==13) {
                    if(span.value){
                        const obj = {
                            id:_this.state.task.length,
                            status: STATUS_TODO,
                            title:span.value
                        }
                        _this.setState({task:[..._this.props.tasks,obj]})
                        div.removeChild(span)
                        _this.props.onRefreshTask(_this.state.task)
                    }else{
                        div.removeChild(span)
                    }
                }
            }
        }
     }
     render() {

         let { status, children } = this.props;
         return (
           <div>
               <div id={`col-${status}`}  className={status==='STATUS_TODO'? 'col-one': status==='STATUS_DOING' ? 'col-two':'col-three'}>
               <header className={status==='STATUS_TODO'? 'col-header-one': status==='STATUS_DOING' ? 'col-header-two':'col-header-three'}>
                     {STATUS_CODE[status]}
               </header>
               </div>
                 <div 
                 className={status==='STATUS_TODO'? ('col-one'+(this.state.in ? ' active' : '')): status==='STATUS_DOING' ? ('col-two'+(this.state.in ? ' active' : '')):('col-three'+(this.state.in ? ' active' : ''))}
                 onDragEnter={this.handleDragEnter}
                 onDragLeave={this.handleDragLeave}
                 onDragOver={this.handleDragEnter}
                 onDrop={this.handleDrop}
                 draggable="true"
             >
                 <div style={{height:'500px'}}>
                 <main className='col-main'  >
                     {children}
                 </main>
                 <div id='addTask'></div>
                 {status==='STATUS_TODO'?  <PlusCircleTwoTone onClick={this.addTask} style={{marginLeft:'72px',marginTop:'20px',fontSize:'34px'}} twoToneColor="#e9c4e3"/>:''}
                 </div>
             </div>
           </div>
         );
     }
 }