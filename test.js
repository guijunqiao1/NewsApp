// // debounce--手写防抖:
// // function debounce(fn,delay){
// //   let timer = null;  
// //   return ()=>{
// //     if(timer){
// //       clearTimeout(timer);
// //     }
// //     timer = setTimeout(()=>{
// //       fn();
// //     },delay)
// //   }
// // }

// // 最终版本：
// function debounce(fn, delay = 300) {
//   let timer = null;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);
//   };
// }

// // 其中this指向问题的解释：
// // this → 取自外层防抖函数的上下文（也就是绑定事件的对象通常和fn同一个环境下，否则修改当前指向的内容）
// //需要注意的是return后不能是箭头而可以是匿名，前者会丢失实际调用到当前函数的环境的方向，而后者和正常函数的功能一致


// // 手写节流：

// function jieliu(fn, delay = 500) {
//   if (delay < 100) throw new Error('delay must be >= 100ms');
//   let last = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - last >= delay) {
//       fn.apply(this, args);
//       last = now;
//     }
//   };
// }


// // 其中this指向问题的解释：
// // this → 取自外层防抖函数的上下文（也就是绑定事件的对象通常和fn同一个环境下，否则修改当前指向的内容）
// //需要注意的是return后不能是箭头而可以是匿名，前者会丢失实际调用到当前函数的环境的方向，而后者和正常函数的功能一致





// // reduce实现：
// Array.prototype.myReduce = function (callback, initialValue) {
//   if (this == null) throw new TypeError('Cannot read property "reduce" of null or undefined');
//   if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

//   const arr = this;// 当前数组
//   let accumulator;
//   let startIndex = 0;

//   // 判断是否有 initialValue
//   if (arguments.length >= 2) {
//     accumulator = initialValue;
//   } else {
//     // 没有初始值时，取数组第一个有效元素作为初始值
//     while (startIndex < arr.length && !(startIndex in arr)) {
//       startIndex++;
//     }
//     if (startIndex >= arr.length) {
//       throw new TypeError('Reduce of empty array with no initial value');
//     }
//     accumulator = arr[startIndex++];
//   }

//   // 遍历数组
//   for (let i = startIndex; i < arr.length; i++) {
//     if (i in arr) {
//       accumulator = callback(accumulator, arr[i], i, arr);
//     }
//   }

//   return accumulator;
// };



