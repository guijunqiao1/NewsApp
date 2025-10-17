//watch——debounce封装
import { watch } from "vue"

export function watchDebounced(watch_cal,callback,option){
    if(!option) return new Error('....');
    if(option.debounce===undefined){
        throw new Error('...');
    }
    let timer = null;
    watch(watch_cal,
    (newVal,oldVal)=>{
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            callback(newVal,oldVal);
        },option.debounce)
    },
    option);
}