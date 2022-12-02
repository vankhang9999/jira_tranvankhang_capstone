import { quanLyTaskService } from "../../services/quanLyTaskServices"
import { GET_ALL_PRIORITY, GET_ALL_STATUS, GET_ALL_TASK, GET_ALL_USER, GET_TASK_DETAIL, GET_USER_BYID } from "../types"
import { notifiFunction } from "../../util/settings/Notification/nontificationCyber"
import { quanLyNguoiDungAction } from "./quanLyNguoiDungActions"
import { quanLyProjectService } from "../../services/quanLyProjectService"
import { quanLyNguoiDungService } from "../../services/quanLyNguoidungService"


export const quanLyTaskAction={
  getAllTaskTypeAction:()=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.getAllTaskType()
        if(result.data.statusCode===200){
          notifiFunction('success','Get AllTypeTask success!','')
          dispatch({
            type:GET_ALL_TASK,
            Task:result.data.content
          })
        }
      }catch(error){
        notifiFunction('error','Get AllTypeTask Not success!','')
      }
    }
  },
  GetPriorityAll:()=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.getPriorityAll()
        if(result.data.statusCode===200){
          notifiFunction('success','Get Priority success!','')
          dispatch({
            type:GET_ALL_PRIORITY,
            ArrPriority:result.data.content
          })
        }
      }catch(error){
        notifiFunction('error','Get Priority Not success!','')
      }

    }
  },
  GetAllUser:(key)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.getAllUser(key)
        if(result.data.statusCode===200){
          notifiFunction('success','Get AllUser success!','')
          dispatch({
            type:GET_ALL_USER,
            ArrUser:result.data.content
          })
        }
      }catch(error){
        notifiFunction('error','Get AllUser not success!','')
      }

    }
  },
  GetAllStatus:()=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.getAllStatus()
        if(result.data.statusCode===200){
          notifiFunction('success','Get Status success!','')
          dispatch({
            type:GET_ALL_STATUS,
            ArrStatus:result.data.content
          })
        }
      }catch(error){
        notifiFunction('error','Get Status Not success!','')
      }
    }
  },
  CreateTask:(DATA)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.createTask(DATA)
        if(result.data.statusCode===200){
          console.log('getall',result.data.content)
          notifiFunction('success','Create Task success!','')
          // dispatch({
          //   type:GET_ALL_STATUS,
          //   ArrStatus:result.data.content
          // })
        }
      }catch(error){
        notifiFunction('error','Create Task is Not success!','')
      }
    }
  },
  GetUserByProjectId:(ID)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.GetUserByProjectId(ID)
        if(result.data.statusCode===200){
          console.log('GetUserByProjectId',result.data.content)
          notifiFunction('success','GetUserByProjectId success!','')
          dispatch({
            type:GET_USER_BYID,
            ArrUserBYId:result.data.content
          })
        }
      }catch(error){
        notifiFunction('error','GetUserByProjectId is Not success!','')
        if(error.reponse.data.status===404){
          dispatch({
            type:GET_USER_BYID,
            ArrUserBYId:[]
          })
        }
      }
    }
  },
  GetTaskDetailAction:(ID)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.gettaskDetail(ID)
        if(result.data.statusCode===200){
          console.log('GetUserByProjectId',result.data.content)
          notifiFunction('success','gettaskDetail success!','')
          dispatch({
            type:GET_TASK_DETAIL,
            taskDetailModal:result.data.content
          })
        }
      }catch(error){
        notifiFunction('error','gettaskDetail is Not success!','')
        // if(error.reponse.data.status===404){
        //   dispatch({
        //     type:GET_USER_BYID,
        //     ArrUserBYId:[]
        //   })
        // }
      }
    }
  },
  UpdateStatusAction:(taskId)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.updateStatus(taskId)
        if(result.data.statusCode===200){
          await dispatch(quanLyNguoiDungAction.getProjectDetail(taskId.projectId))
          await dispatch(quanLyTaskAction.GetTaskDetailAction(taskId.taskId))
           notifiFunction('success','updateStatus success!','')
        }
        
      }catch(error){
        notifiFunction('error','updateStatus is Not success!','')
      }
    }
  },
  UpdateTask:(task)=>{
    return async(dispatch)=>{
      try{
        const result=await quanLyTaskService.updateTask(task)
        if(result.data.statusCode===200){
           notifiFunction('success','updateTask success!','')
        }
        
      }catch(error){
        notifiFunction('error','updateTask is Not success!','')
      }
    }
  },
userEditAction:(Data)=>{
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.editUser(Data)
            if (result.data.statusCode === 200) {
            await  dispatch(quanLyNguoiDungAction.getUserAction(""));    
            }
        } catch (errors) {
            console.log("errors: ", errors);
        }
    }
},
DeleteUserAction:(Id)=>{
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.DeleteUser(Id)
            if (result.data.statusCode === 200) {
                alert('done')
            await  dispatch(quanLyNguoiDungAction.getUserAction(""));    
            }
        } catch (errors) {
            alert('Không thể xóa người dùng đã tạo project')
            console.log("errors: ", errors);
        }
    }
}
}