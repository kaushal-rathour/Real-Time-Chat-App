import { Typography, Button } from '@mui/material';
import { Result } from 'antd';
import { useSelector } from 'react-redux';

export default function PageNotFound  ()  {
    const darkTheme = useSelector((state)=> state.themeKey);
    return (
        <div className={`PageNotFoundContainer`}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist." 
                extra={<Button href="/welcome" variant="contained" style={{ backgroundColor: darkTheme ? '#333' : '#f0f0f0', color: darkTheme ? 'white' : 'black' }}>Go Back Home</Button>}
            />
        </div>
    );
};

