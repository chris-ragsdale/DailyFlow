import React from "react";
import { connect } from "react-redux";
import { toggle_board } from "../../../Redux/actions";

import "./index.css"

class ConfigView extends React.Component {

    handle_check_change = (event) => this.props.toggle_board(event.target.value) 
  
    render() {

      const { boards } = this.props;

      return (
          <div className="config-view">
              <div className="row">
                  <div className="col-md-12">
              
                      <form>
                          <label>
                              Boards Allowed:
                              {
                                  Object.keys(boards).map(id => 
                                      <React.Fragment key={id}>
                                            <br/>
                                            <input 
                                                type="checkbox"
                                                key={id} 
                                                value={id}
                                                checked={boards[id].config.display}
                                                onChange={this.handle_check_change}
                                            />
                                            {boards[id].name} 
                                      </React.Fragment>
                                  )
                              }
                          </label>
                      </form>

                  </div>
              </div>
          </div>
      );
    }
  
}

const map_state_to_props = (state) => { 
    return { 
      boards: state.trello_data.boards
    }; 
};

const map_dispatch_to_props = { toggle_board }

ConfigView = connect(
    map_state_to_props,
    map_dispatch_to_props
)(ConfigView);

export default ConfigView;