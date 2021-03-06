import React from "react";
import { connect } from "react-redux";
import { remove_work_session, toggle_work_session } from "../../../Redux/actions";
import './index.css';

class WorkSession extends React.Component {

    render(){

        const {
            // Session Props
            id,
            name, 
            location, 
            start,
            end, 
            total_duration,
            remaining_duration, 
            mapped_cards,
            selected,
            // Dispatch
            remove_work_session,
            toggle_work_session,
            // Calculated Props
            categories, 
            category,
            // Display Props
            show_cards
        } = this.props;

        return (
            <div 
                onClick={()=>toggle_work_session(id)}
                style={{backgroundColor: (selected === true) ? 'lightgrey': 'transparent'}}
                className="work-session">
                <h4>{name} - <span>({location})</span></h4>
                <div>{this.render_date(start)} - {this.render_date(end)}</div>
                <div>Remaining Duration: {remaining_duration}/{total_duration} min</div>
                <div>{categories[category].name}</div>
                <div>{show_cards && this.render_mapped_cards(mapped_cards)}</div>
                <button onClick={() => remove_work_session(id)}>Remove</button>
            </div>
        );
    }

    render_date = (date) => {
        let min_str = date.getMinutes().toString();
        min_str = min_str.length === 1 ? "0"+min_str : min_str; 

        return `${date.getHours()}:${min_str}`
    }

    render_mapped_cards = (mapped_cards) => {
        return Object.keys(mapped_cards)
                .map(id => mapped_cards[id])
                .sort((first, second) => {
                    if(first.place > second.place) return 1;
                    if(first.place < second.place) return -1;
                    return 0;
                })
                .map(card => 
                <div key={card.id}>
                    <p>{card.name}</p>
                    <p>duration: {card.duration}</p>
                    <p>start: {card.start_min}, end: {card.end_min}</p>
                </div>)
    }

}

const map_state_to_props = (state) => {
    return {
        categories: state.categories.work_session
    };
}

const map_dispatch_to_props = { 
    remove_work_session,
    toggle_work_session
 };

WorkSession = connect(
    map_state_to_props,
    map_dispatch_to_props
)(WorkSession);

export default WorkSession;