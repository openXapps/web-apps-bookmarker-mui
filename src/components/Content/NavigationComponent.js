import React from 'react';
import Box from '@material-ui/core/Box';

import { getCategories } from '../../utilities/localstorage';

const NavigationComponent = () => {
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        setCategories(getCategories());
        return () => true;
    }, []);

    return (
        <Box>
            {categories.statusOK ? (
                categories.data.map((v, i) => {
                    return (
                        <div key={i}>{v.category}</div>
                    );
                })
            ) : (null)}
        </Box>
    );
};

export default NavigationComponent;