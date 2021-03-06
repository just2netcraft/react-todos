import React from "react";
import {connect} from "react-redux";
import {addTodo, setAllTodoCompleted} from "./actions";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AddTodo extends React.Component {

    addTodo(e){
        e.preventDefault();
        this.props.addTodo( this.input.value );
        this.input.value = "";
    }

    render(){
        return (
            <header className="header">
                <ReactCSSTransitionGroup
                    transitionName="logo"
                    transitionEnter={false}
                    transitionLeave={false}
                    transitionAppear={true}
                    transitionAppearTimeout={300}>
                        <h1 className="logo">todos</h1>
                    </ReactCSSTransitionGroup>
                <form onSubmit={ (e) => this.addTodo(e) }>
                    <input className="new-todo" placeholder="What needs to be done?" type="text" ref={ el => this.input = el }/>
                </form>
                <input
                    checked={ this.props.isAllCompletedChecked }
                    onClick={ (e) => this.props.setAllCompleted(e.target.checked) }
                    className="toggle-all" type="checkbox" />
            </header>
        )
    }
}

function mapStateToProps(state){
    return {
        isAllCompletedChecked: state.totalActive == 0
    }
}

function mapDispatchToProps(dispatch){
    return {
        addTodo: (label) => dispatch( addTodo(label) ),
        setAllCompleted: (isCompleted) => dispatch( setAllTodoCompleted(isCompleted) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
