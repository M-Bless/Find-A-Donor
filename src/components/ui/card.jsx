// // src/components/ui/card.jsx
// import React from 'react';

// export const Card = ({ title, value, icon, bgColor, textColor, trend }) => (
//   <div className={`${bgColor} rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl`}>
//     <div className="flex items-center justify-between">
//       <div className={textColor}>
//         <p className="text-sm font-medium opacity-80">{title}</p>
//         <p className="text-3xl font-bold mt-2">{value}</p>
//         {trend && (
//           <p className="text-sm mt-1 opacity-70">
//             <span className="text-green-200">↗ {trend}%</span> from last month
//           </p>
//         )}
//       </div>
//       <div className={`${textColor} opacity-80`}>
//         {icon}
//       </div>
//     </div>
//   </div>
// );


// // export const CardContent = ({ children, className = '' }) => {
// //   return (
// //     <div className={`p-4 ${className}`}>
// //       {children}
// //     </div>
// //   );
// // };
