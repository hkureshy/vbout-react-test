import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ShortcutManager, Shortcuts } from 'react-shortcuts';

import NewGrudge from '../Components/NewGrudge/NewGrudge';
import GrudgeActions from '../Components/GrudgeActions/GrudgeActions';
import Grudges from '../Components/Grudges/Grudges';
import { keymap } from '../keymap';
const shortcutManager = new ShortcutManager(keymap)

class Application extends Component {
  getChildContext() {
    return { shortcuts: shortcutManager }
  }

  handleShortcuts = (action, e) => {
    switch (action) {
      case 'UNDO':
        e.preventDefault();
        if(this.props.present.id) {
          this.props.undo();
        }
        break;
      case 'REDO':
        e.preventDefault();
        if(this.props.future.length) {
          this.props.redo();
        }
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Shortcuts name='TODO_ITEM' handler={this.handleShortcuts}>
        <div className='Application'>
          <NewGrudge onSubmit={this.props.addGrudge} />
          <GrudgeActions undo={this.props.undo} redo={this.props.redo} />
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
