import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ShortcutManager, Shortcuts } from 'react-shortcuts';

import Grudges from '../Components/Grudges/Grudges';
import NewGrudge from '../Components/NewGrudge/NewGrudge';
import { keymap } from '../keymap';
const shortcutManager = new ShortcutManager(keymap)

class Application extends Component {
  getChildContext() {
    return { shortcuts: shortcutManager }
  }

  handleShortcuts = (action) => {
    switch (action) {
      case 'UNDO':
        this.props.undo();
        break;
      case 'REDO':
        this.props.redo();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Shortcuts name='TODO_ITEM' handler={this.handleShortcuts}>
        <div className="Application">
          <NewGrudge onSubmit={this.props.addGrudge} />
          <Grudges grudges={this.props.grudges} onForgive={this.props.toggleForgiveness} />
        </div>
      </Shortcuts>
    )
  }
};

Application.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
}

export { Application };
