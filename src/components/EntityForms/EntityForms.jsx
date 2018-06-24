import React, { Component } from "react";
import { find, map, merge, omit, append} from "ramda";

import EntityForm from "../EntityForm/EntityForm";
import "./EntityForms.css";

class EntityForms extends Component {

  constructor(props) {
    super(props)
    this.state = {
      entities: []
    }
  }

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

  renderExistingEntities = () => {
    const { entities } = this.state;
    const formattedEntities = map( (entity) => {
      return {
        [entity.name]: {
          id: entity.name,
          behaviors: [],
          props: omit(["name", "id"], entity)
        }
      };
    }, entities);
    const gameState = {
      entities: formattedEntities
    };

    return JSON.stringify(gameState, null, 2);
  };

  render() {
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
          <EntityForm add={this.addEntity} />
        </aside>
      </div>
    );
  }
};

export default EntityForms;