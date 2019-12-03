import {
    REQUEST_BOARDS, RECEIVE_BOARDS, RECEIVE_BOARDS_ERROR,
    REQUEST_CHILDREN, RECEIVE_CHILDREN, RECEIVE_CHILDREN_ERROR
} from '../../actions/trello_data'

// fetch_status state diagram:

// fetch_status: {
//     boards_fetched: T/F,
//     boards_children_pending: [],
//     boards_children_errors: []
// }

const fetch_status = (
    state = {
        boards_pending: false,
        boards_error: false,
        boards_children_pending: [],
        boards_children_errors: []
    },
    action
) => {
    switch(action.type){
        case REQUEST_BOARDS:
            return {
                ...state,
                boards_pending: true
            }
        case RECEIVE_BOARDS:
            return {
                ...state,
                boards_pending: false,
                boards_error: false
            }
        case RECEIVE_BOARDS_ERROR:
            return {
                ...state,
                boards_pending: false,
                boards_error: true
            }
        case REQUEST_CHILDREN:
            return {
                ...state,
                boards_children_pending: state.boards_children_pending.concat(action.board_id)
            }
        case RECEIVE_CHILDREN:
            return {
                ...state,
                boards_children_pending: state.boards_children_pending.filter(id => id !== action.board_id)
            }
        case RECEIVE_CHILDREN_ERROR:
            return {
                ...state,
                boards_children_error: state.boards_children_error.concat(action.board_id)
            }
    }
}