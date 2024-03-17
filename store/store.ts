import {create} from 'zustand'

type State ={
    name:string,
    email:string
}

type Action = {
    updateName : (name:State['name'])=>void
    updateEmail:(email:State['email'])=>void 
}

export const useUserStore = create<State & Action>((set)=>
 ({
    name:'',
    email:'',
    updateName: (newName)=>set(()=>({name:newName})),
    updateEmail:(newEmail)=>set(()=>({email:newEmail}))
    
}))