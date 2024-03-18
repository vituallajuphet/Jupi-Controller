import { StyleProp, ViewStyle } from 'react-native';

export const st = (cls?: string) => {
    const ob: StyleProp<ViewStyle> = {}

    if(cls?.includes('flex-1')){
        ob.flex = 1
    }
     if(cls?.includes('j-between')){
        ob.justifyContent = 'space-between'
    }
    if(cls?.includes('j-center')){
        ob.justifyContent = 'center'
    }
     if(cls?.includes('f-row')){
        ob.flexDirection = 'row'
    }
     if(cls?.includes('f-col')){
        ob.flexDirection = 'column'
    }

    if(cls?.includes('items-center')){
        ob.alignItems = 'center'
    }

    if(cls?.includes('gap-x-')){
        const index = cls?.indexOf('gap-x-')
        ob.columnGap = 0
        if(index !== -1){
          const value =  cls?.slice(index+ 6, index + 8)
           ob.columnGap = parseInt(value)
        }
    }
    if(cls?.includes('gap-y-')){
        const index = cls?.indexOf('gap-y-')
        ob.rowGap = 0
        if(index !== -1){
          const value =  cls?.slice(index+ 6, index + 8)
           ob.rowGap = parseInt(value)
        }
    }


    return ob

}
