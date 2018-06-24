import React, { Component } from 'react';
import { pipe, pick, prop, all, prepend, map, identity } from 'ramda';
import classnames from "classnames";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
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

  handleChangeDropdown = (fieldname) => {
    return (selectedValue) => {
      const currentState = this.state;
      this.setState( {
        ...currentState,
        entity: {
          ...currentState.entity,
          [fieldname]: selectedValue.value
        }
      })
    };
  };

  handleChangeName = (ev) => {
    const currentState = this.state;
    const newName = ev.target.value || '';
    this.setState( {
      ...currentState,
      entity: {
        ...currentState.entity,
        id: newName.replace(/[^\w\d]+/gi, "-").toLowerCase(),
        name: newName
      }
    });
  };

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
    const {displayOnly, availableEntities} = this.props;

    const entitiesForSelect = prepend({value:"", label: "none"}, map(
      (dest) => ({ value: dest, label: dest }),
      availableEntities || []
    ));
    return (
      <div className={ classnames( "EntityForm", { "display-only": displayOnly } )} >
        <div className="form-row">
          <label className="form-label" >Entity Name</label>
          <input
            className="form-input"
            onChange={this.handleChangeName}
            type="text"
            name="name"/>
        </div>
        <div className="form-row">
          <label className="form-label" >Entity Id</label>
          <input
            className="form-input"
            value={entity.id}
            onChange={this.handleChange}
            type="text"
            name="id"/>
        </div>
        <div className="form-row">
          <label className="form-label" >Description</label>
          <textarea
            className="form-input"
            onChange={this.handleChange}
            name="description"/>
        </div>
        <div className="form-row">
          <label className="form-label" >Location</label>
          <Select
            name="location"
            className="form-input"
            value={entity.location}
            options={entitiesForSelect}
            onChange={this.handleChangeDropdown("location")}
          />
        </div>
        <div className="form-row">
          <label className="form-label" >Destination</label>
          <Select
            name="destination_id"
            className="form-input"
            value={entity.destination_id}
            options={entitiesForSelect}
            onChange={this.handleChangeDropdown("destination_id")}
          />
        </div>

        <button disabled={!this.valid()} onClick={this.handleAdd}>Add</button>
      </div>
    );
  }
}

export default EntityForm;
