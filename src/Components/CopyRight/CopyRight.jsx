import { Typography } from '@mui/material'
import React from 'react'

const CopyRight = (props) => {
    return (
        <div style={{backgroundColor: "#f0f3fa"}}>
             <a href = "mailTo:yashu9490@gmail.com" target='_blank'>
            <Typography variant="body1" fontWeight="bold" color="text.secondary" align="center" style={{ color: '#1976d2',  }}>
                Contact Us
            </Typography>
            </a>
             <a>
            <Typography variant="body1" fontWeight="bold" color="text.secondary" align="center" {...props} style={{ color: '#1976d2',  }}>
                {' '}
                {new Date().getFullYear()}
                {/* {'.'} */}
                {' © '}
                ABC
            </Typography>
            </a>
        </div>

        
    )
}

export default CopyRight