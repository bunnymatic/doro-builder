import React, { Component } from 'react'

class Entity extends Component {

  constructor(props) {
    super(props);
  }

  handleAdd = (ev) => {
    this.props.edit(this.state.entity)
  };

  render() {
    const { entity } = this.props;
    return (
      <div className={ classnames( "EntityForm", { "display-only": displayOnly } )} >
        <section "EntityForm-form">
          <div className="form-row">
            <label className="form-label" >Entity Name</label>
            <input
              disabled="true"
              value={entity.name}
              className="form-input"
              type="text"
              name="name"/>
          </div>
          <div className="form-row">
            <label className="form-label" >Location</label>
            <input
              disabled="true"
              value={entity.location}
              className="form-input"
              type="text"
              name="location"/>
          </div>
          <div className="form-row">
            <label className="form-label" >Description</label>
            <textarea
              disabled="true"
              value={entity.description}
              className="form-input"
              name="description"/>
          </div>
          <div className="form-row">
            <label className="form-label" >Destination</label>
            <input
              disabled="true"
              value={entity.destination_id}
              className="form-input"
              type="text"
              name="destination_id"/>
          </div>

          <button onClick={this.handleEdit}>Edit</button>
        </section>
        <aside>
          <pre>
            <code>
              {`${JSON.stringify(entity, {space: 2})}`}
            </code>
          </pre>
        </aside>

      </div>
    );
  }
}

export default Entity;