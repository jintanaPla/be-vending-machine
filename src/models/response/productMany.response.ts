// {
//     "status": {
//       "code": 1000,
//       "description": ""
//     },
//     "data": [
//             {
//               "location": "Bangkok",
//                 "picture": "coke.png",
//                 "product_name": "Coke",
//                 "product_price": "18.00",
//                 "product_number": 0,
//                 "upadte_date": ""
//             },
//             {
//               "location": "Samut...",
//                 "picture": "orange.png",
//                 "product_name": "Orange",
//                 "product_price": "20.00",
//                 "product_number": 40,
//                 "upadte_date": ""
//             }
//         ]
//   }
import {Status} from 'src/models/response/status.response';
import {InformationMany} from 'src/models/response/information.response';
export class ProductMany {
    status: Status;
    data: InformationMany;
   
}

