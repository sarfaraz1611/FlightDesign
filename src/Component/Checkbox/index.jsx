import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

import { forwardRef } from "react";


 const CheckBox= forwardRef((props,ref)=> {

  return (
    <div className='flex items-center'>
      <Checkbox  {...props} sx={{
        color: 'grey',
        '&.Mui-checked': {
          color: '#0F1035',
        },
      }}
      />
      {props.label &&
        <Typography variant="h6" sx={{
          color: '#0F1035',
          fontSize: '18px',
          fontWeight:'bold',
         
        }
        } >
          {props.label}
        </Typography>
      }

    </div>
  );
}
)
export default CheckBox;