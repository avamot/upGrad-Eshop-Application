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

                    <option value="HighToLow">Price: High to Low</option>

                    <option value="LowToHigh">Price: Low to High</option>

                    <option value="Newest">Newest</option>

                </select>

            </label>

        </div>

    );

};

export default Dropdown;