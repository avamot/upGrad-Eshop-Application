import * as React from 'react';

const Dropdown = () => {

    const [value, setValue] = React.useState();

    const handleChange = (event) => {

        setValue(event.target.value);

    };

    return (

        <div style={{ marginLeft: "100px" }}>

            <label style={{ fontSize: '12px' }}>

                Sort By:

                <br /><select defaultValue="" value={value} style={{ width: "200px", height:"25px" }} onChange={handleChange}>
                    <option disabled={true} value="">Select...</option>

                    <option value="default">Default</option>

                    <option value="option1">Price: High to Low</option>

                    <option value="option2">Price: Low to High</option>

                    <option value="option3">Newest</option>

                </select>

            </label>

        </div>

    );

};

export default Dropdown;