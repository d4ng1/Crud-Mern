import React, { Component } from "react";

class App extends Component{

    constructor(){
        super();
        this.state = {
            title : '',
            description : '',
            tasks : [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res=>res.json(res))
            .then(data=>{
                console.log(data)
                M.toast({html : 'Task Updated'});
                this.setState({title : '', description: ''});
                this.fetchTasks();
            })

        } else {
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res=>res.json(res))
            .then(data=>{
                console.log(data)
                M.toast({html : 'Task Saved'});
                this.setState({title : '', description: ''});
                this.fetchTasks();
            })
            .catch(err=>console.error(err));
        }
        
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/task')
        .then(res=>res.json())
        .then(data=>{
            this.setState({tasks: data});
            console.log(this.state.tasks);
        });
    }

    handleChange(e){
        const {name ,value}=  e.target;
        this.setState({
            [name] : value
        })
    }

    deleteTask(id){
        if(confirm('Do you wanna delete it?')){
            fetch(`/api/task/${id}`,{
                method: 'DELETE',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                M.toast({html : 'Task Deleted'});
                this.fetchTasks();
            });
        }
        
    }

    editTask(id){
        fetch(`api/task/${id}`)
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                title : data.title,
                description : data.description,
                _id: data._id
            })
        });
    }

    render(){
        return (
            // Navegacion-\
            <div>
                <nav className="purple darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Crud</a>
                    </div>
                </nav>
            {/* // Navegacion-\ */}
            
                {/* Content */}
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea name="description"  onChange={this.handleChange} className="materialize-textarea" placeholder="Task Description" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <div className="center">
                                        <button type="submit" className="btn purple darken-2">
                                            Send
                                        </button>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col s7">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task=>{
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={()=>this.editTask(task._id)} className="btn light-blue darken-4">
                                                            <i className="material-icons" >edit</i>
                                                        </button>
                                                        <button onClick={()=>this.deleteTask(task._id)} className="btn red darken-4" style={{margin : '5px'}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                    
                </div>






            </div>
            
        )
    }
}

export default App;