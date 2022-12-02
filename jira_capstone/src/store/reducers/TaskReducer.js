import { CHANGE_ASSGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER } from "../types"

const initialState = {
  taskDetailModal:{
    "priorityTask": {
      "priorityId": 1,
      "priority": "High"
    },
    "taskTypeDetail": {
      "id": 1,
      "taskType": "bug"
    },
    "assigness": [
      {
        "id": 3411,
        "avatar": "https://ui-avatars.com/api/?name=khang",
        "name": "khang",
        "alias": "khang"
      },
      {
        "id": 3432,
        "avatar": "https://ui-avatars.com/api/?name=trankhang",
        "name": "trankhang",
        "alias": "trankhang"
      }
    ],
    "lstComment": [],
    "taskId": 7318,
    "taskName": "Khang",
    "alias": "khang",
    "description": "<p>huhu</p>",
    "statusId": "2",
    "originalEstimate": 12,
    "timeTrackingSpent": 11,
    "timeTrackingRemaining": 2,
    "typeId": 1,
    "priorityId": 1,
    "projectId": 9644
   },
}

export const TaskReducer= (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL:{
      return {...state,taskDetailModal:action.taskDetailModal}
    }
    case CHANGE_TASK_MODAL:{
      const {name,value}=action
      console.log(state.taskDetailModal)
      return {...state,taskDetailModal:{...state.taskDetailModal,[name]:value}}
    }
    case CHANGE_ASSGNESS:{
      state.taskDetailModal.assigness=[...state.taskDetailModal.assigness,action.userSelected]
      return {...state}
    }
    case REMOVE_USER:{
      state.taskDetailModal.assigness=[...state.taskDetailModal.assigness.filter(us=>us.id!==action.userId)]
      return {...state}
    }
  default:
    return state
  }
}
