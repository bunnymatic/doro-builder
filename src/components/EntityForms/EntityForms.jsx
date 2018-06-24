import React, { Component } from "react";
import { find, map, merge, omit, append, pick, prop, uniq, identity, compact, filter, pipe} from "ramda";

import EntityForm from "../EntityForm/EntityForm";
import "./EntityForms.css";

class EntityForms extends Component {

  constructor(props) {
    super(props)
    this.state = {
      entities: []
    }
  }

  remapEntity = (entity) => {
    return {
      id: entity.id,
      name: entity.name,
      behaviors: [],
      proto: null,
      props: omit(["name", "id"], entity)
    };
  };

  currentGameState = () => {
    const { entities } = this.state;
    const formattedEntities = map( this.remapEntity, entities);
    return {
      entities: formattedEntities
    };
  };

  addEntity = (entity) => {
    const currentState = this.state;

    const upsert = (obj, data) => {
      const findByName = (entry) => ( obj.name === entry.name )
      const mergeIfMatch = (entry) => ( (entry.name === obj.name) ? merge(entry, obj) : entry )
      return find( findByName, data ) ? map(mergeIfMatch, data) :  append(obj, data);
    }

    this.setState({
      ...currentState,
      entities: upsert(entity, currentState.entities)
    });
  }

  reset = (_ev) => {
    const currentState = this.state;

    this.setState({
      ...currentState,
      entities: []
    });
  };

  renderExistingEntities = () => {
    return JSON.stringify(this.currentGameState(), null, 2);
  };

  render() {
    const { entities } = this.state;
    console.log(entities);
    const availableEntities =
      pipe(
        map(prop('name')),
        uniq,
        filter(identity)
      )(entities)
    console.log('e', availableEntities);
    return (
      <div className="EntityForms">
        <section className="EntityForms-current">
          <pre>
            <code>
              { this.renderExistingEntities() }
            </code>
          </pre>
        </section>
        <aside className="EntityForms-addNew">
          <EntityForm
            add={this.addEntity}
            availableEntities={ availableEntities }
          />
          <button onClick={this.reset}>Reset</button>
        </aside>
      </div>
    );
  }
};

export default EntityForms;