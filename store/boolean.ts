import {create} from 'zustand'

type State ={
    isScroll:boolean
    isPageOne:boolean

}

type Action = {
    updateIsScroll : (name:State['isScroll'])=>void
    updateIsPageOne:(isPageOne:State['isPageOne'])=>void


}

export const scrollValue = create<State & Action>((set)=>
 ({
    isScroll:true,
    isPageOne:true,
   
    updateIsScroll: (newValue)=>set(()=>({isScroll:newValue})),
    updateIsPageOne:(newValue)=>set(()=>({isPageOne:newValue}))

   
    
    
}))