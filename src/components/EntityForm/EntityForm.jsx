import React, { Component } from 'react';
import { pipe, pick, prop, all, map, identity } from 'ramda';
import classnames from "classnames";
import './EntityForm.css';

const REQUIRED_FIELDS = [
  "name", "description"
];
const OTHER_FIELDS = [
  "destination_id"
]

const ENTITY_FIELDS = REQUIRED_FIELDS.concat(OTHER_FIELDS);

class EntityForm extends Component {

  constructor(props) {
    super(props);
    this.state = {entity: this.props.entity || {}}
  }

  handleChange = (ev) => {
    const currentState = this.state;
    this.setState( {
      ...currentState,
      entity: {
        ...currentState.entity,
        [ev.target.name]: ev.target.value.toString().trim()
      }
    } )
  };

  handleAdd = (ev) => {
    this.props.add(this.state.entity)
  };

  valid = () => pipe(map(f => prop(f, this.state.entity)), all(identity))(REQUIRED_FIELDS)

  render() {
    const {entity} = this.state;
    const {displayOnly} = this.props;
    return (
      <div className={ classnames( "EntityForm", { "display-only": displayOnly } )} >
        <div className="form-row">
          <label className="form-label" >Entity Name</label>
          <input
            className="form-input"
            onChange={this.handleChange}
            type="text"
            name="name"/>
        </div>
        <div className="form-row">
          <label className="form-label" >Location</label>
          <input
            className="form-input"
            onChange={this.handleChange}
            type="text"
            name="location"/>
        </div>
        <div className="form-row">
          <label className="form-label" >Description</label>
          <textarea
            className="form-input"
            onChange={this.handleChange}
            name="description"/>
        </div>
        <div className="form-row">
          <label className="form-label" >Destination</label>
          <input
            className="form-input"
            onChange={this.handleChange}
            type="text"
            name="destination_id"/>
        </div>

        <button disabled={!this.valid()} onClick={this.handleAdd}>Add</button>
      </div>
    );
  }
}

export default EntityForm;
