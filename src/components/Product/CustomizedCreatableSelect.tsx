import React, { useState } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';



interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  createOption('')
];

export default ({gettingCategory}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState<Option | null>();
  let [categories, setCategories] = useState([]);

  React.useEffect(() => {
    getCategory();
}, []);


const getCategory = async () => {

  const res = await axios.get('http://localhost:8080/api/products/categories');
  for (const data of res.data) {

    const task = createOption(data);
      defaultOptions.push(task);

      
}
} 



  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => gettingCategory(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
};
